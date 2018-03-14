import React, { PureComponent } from 'react';
import { Card, Form, Input, Row, Col, 
  message, BackTop, Spin,
  Checkbox, Radio, Button, Icon, Divider } from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//一行一条样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formItemLayoutForMore = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
}

/**
 * @file 质控上报
 */

class BaseInfoForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemOneList: [ 0 ],
      btnLoading: false,
      initialValue: {},
      formLoading: true
    }
    this.uuid = 1;
  }
  createItems = i => {
    const { form } = this.props;
    const { initialValue } = this.state;
    // console.log(Array.isArray(initialValue['workScope-'+i]))
    console.log(initialValue['workScopeOther-'+i])
    let items = [
      <Col span={12} key={1}>
        <FormItem {...formItemLayout} label='部门名称'>
          {form.getFieldDecorator('deptName-'+i, {
            rules: [{ required: true, message: '请输入部门名称' }],
            initialValue: initialValue['deptName-'+i]
          })(
            <Input />
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={2} style={{color: 'red'}}>
        说明：如以上医学工程部门业务属于集中管理，则填写一个部门名称及其相关部门信息。如以上医学工程部门业务属于多部门管理，则添加部门信息，各部门分别单独填写。
      </Col>,
      <Col span={24} key={3} style={{marginTop: 16}}>
        <FormItem {...formItemLayoutForMore} label={'部门医学工程业务管理范围(多选)'}>
          {form.getFieldDecorator('workScope-'+i, {
            initialValue: initialValue['workScope-'+i]
          })(
            <Checkbox.Group>
              <Row>
                <Col span={8}><Checkbox value="01">设备购置</Checkbox></Col>
                <Col span={8}><Checkbox value="02">耗材采购</Checkbox></Col>
                <Col span={8}><Checkbox value="03">耗材物流管理</Checkbox></Col>
                <Col span={8}><Checkbox value="04">设备维修维护</Checkbox></Col>
                <Col span={8}><Checkbox value="05">医疗器械质量安全管理</Checkbox></Col>
                <Col span={6}><Checkbox value="99">其他</Checkbox></Col>
                {form.getFieldDecorator('workScopeOther-'+i, {
                  initialValue: 12345
                })(
                  <Col span={2} pull={3}>
                    <Input style={{width: 120}}/>
                  </Col>
                )}
                
              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={4}>
        <FormItem {...formItemLayout} label='部门行政级别'>
          {form.getFieldDecorator('deptTypeName-'+i, {
            initialValue: initialValue['deptTypeName-'+i]
          })(
            <RadioGroup style={{width: 500}}>
              <Radio value={'3'}>处级</Radio>
              <Radio value={'2'}>科级</Radio>
              <Radio value={'1'}>科级以下</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={5}>
        <FormItem {...formItemLayout} label='部门职工总人数' style={{display: 'flex'}}>
          {form.getFieldDecorator('deptTotalStaff-'+i, {
            initialValue: initialValue['deptTotalStaff-'+i]
          })(
            <Input style={{width: 150}} addonAfter={<span>人</span>}/>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={6}>
        <FormItem {...formItemLayout} label='部门占地面积'>
          {form.getFieldDecorator('deptAcreage-'+i, {
            initialValue: initialValue['deptAcreage-'+i]
          })(
            <Input style={{width: 150}} addonAfter={<span>平方米</span>}/>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={7}>
        <FormItem {...formItemLayout} label='部门归属'>
          {form.getFieldDecorator('deptBelong-'+i, {
            initialValue: initialValue['deptBelong-'+i]
          })(
            <RadioGroup style={{width: 500}}>
              <Radio value={'0'}>医技</Radio>
              <Radio value={'1'}>后勤</Radio>
              <Radio value={'2'}>行政</Radio>
              <Radio value={'3'}>其他 
              {form.getFieldDecorator('deptBelongOther-'+i, {
                initialValue: initialValue['deptBelongOther-'+i]
              })(
                <Input style={{ width: 100, marginLeft: 10 }}/>
              )}
              </Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={8}>
        <FormItem {...formItemLayout} label='负责人姓名'>
          {form.getFieldDecorator('leaderName-'+i, {
            initialValue: initialValue['leaderName-'+i]
          })(
            <Input />
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={9}>
        <FormItem {...formItemLayout} label='负责人职称'>
          {form.getFieldDecorator('leaderPost-'+i, {
            initialValue: initialValue['leaderPost-'+i]
          })(
            <RadioGroup style={{width: 500}}>
              <Radio value={'04'}>正高</Radio>
              <Radio value={'01'}>副高</Radio>
              <Radio value={'03'}>中级</Radio>
              <Radio value={'02'}>初级</Radio>
              <Radio value={'05'}>未聘</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={99}>
        <FormItem {...formItemLayout} label='负责人学位'>
          {form.getFieldDecorator('leaderDegree-'+i, {
            initialValue: initialValue['leaderDegree-'+i]
          })(
            <RadioGroup style={{width: 500}} >
              <Radio value={'01'}>博士</Radio>
              <Radio value={'02'}>硕士</Radio>
              <Radio value={'03'}>本科</Radio>
              <Radio value={'04'}>专科</Radio>
              <Radio value={'05'}>专科以下</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={88}>
        <FormItem {...formItemLayout} label='负责人专业'>
          {form.getFieldDecorator('leaderMajor-'+i, {
            initialValue: initialValue['leaderMajor-'+i]
          })(
            <RadioGroup style={{width: 500}}>
              <Radio value={'01'}>生物医学工程</Radio>
              <Radio value={'02'}>计算机</Radio>
              <Radio value={'03'}>电子</Radio>
              <Radio value={'04'}>机械</Radio>
              <Radio value={'05'}>经济</Radio>
              <Radio value={'06'}>管理</Radio>
              <Radio value={'07'}>医学</Radio>
              <Radio value={'08'}>护理</Radio>
              <Radio value={'09'}>药学</Radio>
              <Radio value={'10'}>其他</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={10}>
        <FormItem {...formItemLayout} label='负责人年龄'>
          {form.getFieldDecorator('leaderAge-'+i, {
            initialValue: initialValue['leaderAge-'+i]
          })(
            <RadioGroup style={{width: 500}}>
              <Radio value={'01'}>＜30岁</Radio>
              <Radio value={'02'}>30～39岁</Radio>
              <Radio value={'03'}>40～49岁</Radio>
              <Radio value={'04'}>≥50岁</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={11}>
        <FormItem {...formItemLayout} label='负责人在本部门任职年限'>
          {form.getFieldDecorator('leaderAgeLimit-'+i, {
            initialValue: initialValue['leaderAgeLimit-'+i]
          })(
            <Input style={{width: 100}} addonAfter={<span>年</span>} />
          )}
        </FormItem> 
      </Col>,
      <Col style={{textAlign: 'right'}} key={12} span={24}>
        <Button type="dashed" style={{marginRight: 10}} onClick={() => this.delItem('itemOneList', i)}>删除该行</Button>
        <Divider/>
      </Col>
    ]
    return items;
  }
  delItem = (key, index) => {
    const list = this.state[key];
    if (list.length <= 1) {
      return message.warn('至少保留一条记录!')
    }
    let sq = null;
    for (let i=0; i<list.length; i++) {
      if (list[i] === index) {
        sq = i;
        break;
      }
    }
    list.splice(sq, 1);
    this.setState({ 
      [key]: [...list]
    })
  }
  addItem = () => {
    const list = this.state.itemOneList
    this.setState({
      itemOneList: [
        ...list, this.uuid++
      ]
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.schedule = 100.00;
        this.setState({btnLoading: true});
        fetchData({
          url: api.QUESTION_3,
          body: JSON.stringify(values),//querystring.stringify(postData),
          type: 'application/json',
          success: data => {
            if (data.status) {
              message.success('操作成功')
            } else {
              message.error(data.msg);
            }
            this.setState({btnLoading: false});
          }
        })
      }
    });
  }
  componentWillMount = () => {
    fetchData({
      url: api.QUSETION3_BACK,
      type: 'application/json',
      success: data => {
        if (data.status) {
          if (data.result.total) {
            const items = Array.apply(null, Array(data.result.total)).map((item, i) => i)
            this.setState({
              initialValue: data.result,
              itemOneList: items,
              formLoading: false
            })
            this.uuid = data.result.total;
          } else {
            this.setState({
              formLoading: false
            })
          }
        } else {
          message.error(data.msg);
        }
      }
    })
  }
  render() {
    const { itemOneList, btnLoading, formLoading, initialValue } = this.state;
    const { form } = this.props;
    return (
      <Spin spinning={formLoading}>
        <Form onSubmit={this.handleSubmit} style={{padding: '40px 80px'}} className='right_content'>
          <BackTop />
          <Row>
            <Card style={{marginBottom: 20}}>
              <h2 style={{textAlign: 'center'}}> 3.医学工程部门基本情况 </h2>
            </Card>
            <Card>
              <Col span={24}>
                是否建立独立、且业务完善的医学工程部门？
              </Col>
              <Col span={24}>
                <FormItem>
                  {form.getFieldDecorator('buildFlag', {
                    initialValue: initialValue.buildFlag
                  })(
                    <RadioGroup>
                      <Radio value={'01'}>有</Radio>
                      <Radio value={'00'}>无</Radio>
                    </RadioGroup>
                  )}
                </FormItem> 
              </Col>
              <Col span={24} style={{color: 'red'}}>
                说明：建立的医学工程部门包括以下业务：1、设备购置 2、耗材采购 3、耗材物流管理  4、设备维修维护  5、医疗器械质量安全管理。
              </Col>
            </Card>  
            <Card style={{marginTop: 20}}>
              { itemOneList.map(item => (
                  this.createItems(item)
                )) 
              }
              <Button style={{ width: '60%', marginLeft: '20%' }} onClick={() => this.addItem()}>
                <Icon type="plus" /> 添加更多
              </Button>
            </Card>   
          </Row>
          <Row>
            <Col style={{textAlign: 'center', marginTop: 10}}> 
              <Button 
                htmlType='submit'
                type='primary'
                style={{width: 300}}
                loading={btnLoading}
              >
                <Icon type="save" /> 保存
              </Button>
            </Col>
          </Row>
        </Form> 
      </Spin> 
    )
  }
}

export default Form.create()(BaseInfoForm);
