/**
 * @file 质量上报表达
 * @summary 动态生成
 */
import React, { Component } from 'react';
import { Form, Card, Input, Row, Icon, Tooltip, Button, Col, Select, message } from 'antd';
import querystring from 'querystring';
import { fetchData } from 'utils/tools';
import { getLocalOption, getHalfYear } from 'utils/common';
import api from 'api';
const FormItem = Form.Item;
const styles = {
  row: {
    padding: 8
  },
  col: {
    marginTop: 10
  },
  card: {
    marginTop: 5
  },
  button: {
    marginRight: 20
  },
  tool: {
    marginTop: 10,
    textAlign: 'center'
  }
}
//一行一条样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const getTips = (tips) => {
  let tip = [];
  tips.map((item, index) => tip.push(<p key={index}>{item}</p>))
  return tip;
}

const year = getHalfYear();

class QualityWrapperForm extends Component {
  state = {
    cardItems: [],
    pYear: year,
  }
  submitData = (values, type) => {
    const refs = this.refs;
    let postData = {};
    for (let key in refs) {
      if (key.includes('card')) {
        postData[key.split('-')[1]] = [];
      }
    }
    for (let key in values) {
      const k = key.split('-')[1];
      const old = postData[k];
      old.push(values[key])
    }
    fetchData({
      url: api.UPDATE_FORMULA_DETAILS,
      body: {...postData, isCommit: [type]},
      success: data => {
        if (data.status) {
          message.success('操作成功')
        } else {
          message.error(data.msg)
        }
      },
      type: 'application/json'
    })
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.submitData(values, 1);
      }
    });
  }
  save = () => {
    const values = this.props.form.getFieldsValue();
    this.submitData(values, 2);
  }
  getCardItems = (year) => {
    fetchData({
      url: api.SELECT_FORMULA_DETAIL,
      body: querystring.stringify({
        orgId: '',//暂时先用用
        pYear: year || this.state.pYear,
      }),
      success: data => {
        if (data.status) {
          this.setState({
            cardItems: data.result
          })
          this.countProgress();
        } else {
          message.warning(data.msg);
          this.setState({
            cardItems: []
          })
          this.props.setProgress(0);
        }
      }
    })
  }
  getCode = (value) => {
    this.getCardItems(value)
    this.setState({
      pYear: value
    })
  }
  componentDidMount = () => {
    this.getCardItems();
  }
  countProgress = () => {
    const values = this.props.form.getFieldsValue();
    let total = 0;
    let result = 0;
    for (let key in values) {
      if (values[key]) {
        result++;
      }
      total++;
    }
    const progress = (result/total).toFixed(2) * 100;
    this.props.setProgress(progress || 0);
  }
  render () {
    const { form } = this.props;
    const { cardItems } = this.state;
    return (
      <Row style={styles.row} className='right_content'>
        <Col span={24} className="ant-advanced-search-form">
          <Select defaultValue={getHalfYear()} style={{width: 300}} placeholder='请选择年份' onChange={this.getCode}>
            {
              getLocalOption('yearMonth')
            }
          </Select>
        </Col>
        <Col span={24}>
          <Form onSubmit={this.submit}>
            {
              !cardItems.length ? <h2 style={{color: '#e5e5e5', textAlign: 'center'}}>没有数据</h2> :
              cardItems.map((item, index) => (
                <Card
                  style={{marginBottom: 5}}
                  key={`${index}`}
                  ref={`card-${item.indexDetailGuid}`}
                  title={`${item.fsort}:${item.title}`}
                  extra={<Tooltip placement="topRight" title={<div>{ getTips(item.tips) }</div>}>
                          <Icon type="question-circle" style={{fontSize: '2em'}}/>
                        </Tooltip>}
                >
                  {
                    item.mapList.map((subItem, i) => (
                      <FormItem
                        key={i}
                        {...formItemLayout}
                        label={subItem.label}
                      >
                        {form.getFieldDecorator(`${subItem.key}-${item.indexDetailGuid}`, {
                          rules: [
                            {required: subItem.required, message: `请输入${subItem.label}`}
                          ],
                          initialValue: subItem.value
                        })(
                          <Input disabled={subItem.readonly} onBlur={this.countProgress}/>
                        )}
                      </FormItem> 
                    ))
                  }
                </Card>
              ))
            }
            {
              cardItems.length ? 
              <Col span={24} style={styles.tool}>
                <Button type='primary' style={styles.button} htmlType='submit'>提交</Button>
                <Button style={styles.button} onClick={this.save}>暂存</Button>
                <Button type='danger' onClick={this.reset}>重置</Button>
              </Col> : null
            }
          </Form>
        </Col>
      </Row>
    )
  }
}

const QualityForm = Form.create()(QualityWrapperForm);
export default QualityForm;