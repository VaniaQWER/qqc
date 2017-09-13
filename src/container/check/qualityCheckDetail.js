/**
 * @file 指标信息审核详情
 */
import React, { Component } from 'react';
import api from 'api';
import { Form, Card, Input, Row, Icon, Tooltip, Breadcrumb, BackTop,
  Button, Col, message } from 'antd';
import { hashHistory, Link } from 'react-router';
import querystring from 'querystring';
import { fetchData } from 'utils/tools';
const FormItem = Form.Item;

const styles = {
  row: {
    padding: 8,
    minHeight: 480
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

class QualityCheckDetailWrapper extends Component {
  state = {
    cardItems: []
  }
  componentDidMount = () => {
    const { location, routeParams } = this.props;
    if (routeParams.id && location.state) {
      fetchData({
        url: api.SELECT_FORMULA_DETAIL,
        body: querystring.stringify({
          orgId: routeParams.id,
          pYear: location.state.record.pYearValue
        }),
        success: data => {
          if (data.status) {
            this.setState({
              cardItems: data.result
            })
          }
        }
      })
    } else {
      hashHistory.push({
        pathname: `/check/qualityCheckList`
      })
    }
  }
  submit = (e) => {
    e.preventDefault();
    const indexGuid = this.props.location.state.record.constrDeptGuid;
    fetchData({
      url: api.UPDATE_FORMULA,
      body: querystring.stringify({
        indexGuid,
        isTransat: 0        
      }),
      success: data => {
        if (data.status) {
          message.success('操作成功!');
          hashHistory.push({
            pathname: `/check/qualityCheckList`
          })
        } else {
          message.error(data.msg)
        }
      }
    })
  }
  render () {
    const { form } = this.props;
    const { cardItems } = this.state;
    const { state } = this.props.location;
    return (
      <Row style={styles.row} className='right_content'>
        <Breadcrumb style={{fontSize: '1.1em'}}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'/check/qualityCheckList'}>指标信息</Link></Breadcrumb.Item>
          <Breadcrumb.Item>审核</Breadcrumb.Item>
        </Breadcrumb>
        <Col span={24} className="ant-advanced-search-form">
          <Input value={state.record.pYearText}  disabled={true}/>
        </Col>
        <Col span={24} style={{marginTop: 10}}>
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
                          <Input disabled={true}/>
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
                <Button type='primary' style={styles.button} htmlType='submit'>审核</Button>
                <Button type='danger' style={styles.button}>取消</Button>
              </Col> : null
            }
          </Form>
        </Col>
        <BackTop/>
      </Row>
    )  
  }
}
const QualityCheckDetail = Form.create()(QualityCheckDetailWrapper);
export default QualityCheckDetail;