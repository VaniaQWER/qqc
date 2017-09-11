/**
 * @file 质量上报表达
 * @summary 动态生成
 */
import React, { Component } from 'react';
import { Form, Card, Input, Row, Icon, Tooltip, Button, Col } from 'antd';
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

const cardItems = [
  {
    title: '1.医学工程人员（医疗设备、医用耗材管理和工程技术人员）配置水平',
    tips: '提示1',//todo
    list: [
      { 
        label: '医学工程人员的数量',
        value: '30',
        rules: [{ required: true, message: '请输入医学工程人员的数量' }],
        key: 'chart1',
        readonly: true
      },
      { 
        label: '床位数量',
        rules: [{ required: true, message: '请输入床位数量' }],
        key: 'chart2',
        value: '6000',
        readonly: true
      },
      { 
        label: '医学工程人员配置水平',
        rules: [{ required: true, message: '请输入医学工程人员配置水平' }],
        value: '0.5%',
        key: 'chart3',
        readonly: true
      }
    ]
  },   {
    title: '2.医学工程人员业务培训率',
    tips: '提示2',//todo
    list: [
      { 
        label: '医学工程人员业务培训人次数',
        value: '30',
        rules: [{ required: true, message: '请输入医学工程人员业务培训人次数' }],
        key: 'chart4',
        readonly: true
      },
      { 
        label: '医学工程人员数量',
        rules: [{ required: true, message: '请输入床位数量' }],
        key: 'chart5',
        value: '6000',
        readonly: true
      },
      { 
        label: '医学工程人员配置水平',
        rules: [{ required: true, message: '请输入医学工程人员配置水平' }],
        value: '0.5%',
        key: 'chart6',
        readonly: true
      }
    ]
  },  {
    title: '3.临床科室人员医疗器械培训率',
    tips: '提示3',//todo
    list: [
      { 
        label: '临床科室参加培训人数',
        rules: [{ required: true, message: '请输入临床科室参加培训人数' }],
        key: 'chart7'
      },
      { 
        label: '科室总人数',
        rules: [{ required: true, message: '请输入科室总人数数' }],
        key: 'chart8'
      },
      { 
        label: '科室名称',
        rules: [{ required: true, message: '请输入科室名称' }],
        key: 'chart9'
      },
      { 
        label: '医学工程人员配置水平',
        rules: [{ required: true, message: '请输入医学工程人员配置水平' }],
        key: 'chart10'
      }
    ]
  }
]

class QualityWrapperForm extends Component {
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
    });
  }
  render () {
    const { form } = this.props;
    return (
      <Row style={styles.row} className='right_content'>
        <Form onSubmit={this.submit}>
          {
            cardItems.map((item, index) => (
              <Card
                style={{marginBottom: 5}}
                key={index}
                title={item.title}
                extra={<Tooltip placement="topRight" title={<a>{item.tips}</a>}>
                        <Icon type="question-circle" style={{fontSize: '2em'}}/>
                      </Tooltip>}
              >
                {
                  item.list.map((subItem, i) => (
                    <FormItem
                      key={i}
                      {...formItemLayout}
                      label={subItem.label}
                    >
                      {form.getFieldDecorator(subItem.key, {
                        rules: subItem.rules,
                        initialValue: subItem.value
                      })(
                        <Input disabled={subItem.readonly}/>
                      )}
                    </FormItem> 
                  ))
                }
              </Card>
            ))
          }
          <Col span={24} style={styles.tool}>
            <Button type='primary' style={styles.button} htmlType='submit'>提交</Button>
            <Button style={styles.button}>暂存</Button>
            <Button type='danger'>重置</Button>
          </Col>
        </Form>
      </Row>
    )
  }
}

const QualityForm = Form.create()(QualityWrapperForm);
export default QualityForm;