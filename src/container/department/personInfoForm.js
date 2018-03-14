import React, { PureComponent } from 'react';
import { Card, Form, Input, Row, Col, Select, DatePicker,
  message, BackTop, Spin,
  Checkbox, Radio, Button, Icon, Divider } from 'antd';
import api from 'api';
import moment from 'moment';
import { fetchData } from 'utils/tools';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
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
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const formItemLayoutForLine = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
  wrapperCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
}

/**
 * @file 质控上报
 */
class PersonInfoForm extends PureComponent {
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
    let items = [
      <Col span={12} key={1}>
        <FormItem
          {...formItemLayout}
          label='姓名'
        >
          {form.getFieldDecorator('fname-' + i, {
            rules: [{ required: true, message: '请输入姓名' }],
            initialValue: initialValue[`fname-${i}`]
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>, 
      <Col span={12} key={2}>
        <FormItem
          {...formItemLayout}
          label='性别'
        >
          {form.getFieldDecorator('gender-' + i, {
            initialValue: initialValue[`gender-${i}`]
          })(
            <Select style={{width:'100%'}}>
              <Option value={'男'}>男</Option>
              <Option value={'女'}>女</Option>
            </Select>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={3}>
        <FormItem
          {...formItemLayout}
          label='出生年月'
        >
          {form.getFieldDecorator('birthday-' + i, {
            // rules: [{ required: true, message: '请输入出生年月' }],
            initialValue: initialValue[`birthday-${i}`] ? moment(initialValue[`birthday-${i}`], 'YYYY-MM-DD') : null
          })(
            <DatePicker format="YYYY-MM-DD" />
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={4}>
        <FormItem
          {...formItemLayout}
          label='政治面貌'
        >
          {form.getFieldDecorator('politicalStatus-' + i, {
            initialValue: initialValue[`politicalStatus-${i}`]
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={5}>
        <FormItem
          {...formItemLayoutForMore}
          label='入职（本部门）年月'
        >
          {form.getFieldDecorator('entryDate-' + i, {
            // rules: [{ required: true, message: '请输入入职（本部门）年月' }],
            initialValue: initialValue[`entryDate-${i}`] ? moment(initialValue[`entryDate-${i}`], 'YYYY-MM') : null
          })(
            <DatePicker format={'YYYY-MM'}/>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={6}>
        <FormItem
          {...formItemLayout}
          label='学历'
        >
          {form.getFieldDecorator('highestEducation-' + i, {
            initialValue: initialValue[`highestEducation-${i}`]
          })(
            <Select style={{width:'100%'}}>
              <Option value={'01'}>博士</Option>
              <Option value={'02'}>硕士</Option>
              <Option value={'03'}>本科</Option>
              <Option value={'04'}>大专</Option>
              <Option value={'05'}>大专以下</Option>
            </Select>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={7}>
        <FormItem
          {...formItemLayout}
          label='最高学历毕业院校'
        >
          {form.getFieldDecorator('highestEducationSchool-' + i, {
            initialValue: initialValue[`highestEducationSchool-${i}`]
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={8}>
        <FormItem
          {...formItemLayout}
          label='职称'
        >
          {form.getFieldDecorator('technicalTitlesB-' + i, {
            initialValue: initialValue[`technicalTitlesB-${i}`]
          })(
            <RadioGroup>
              <Radio value={'01'}>正高</Radio>
              <Radio value={'02'}>副高</Radio>
              <Radio value={'03'}>中级</Radio>
              <Radio value={'04'}>初级</Radio>
              <Radio value={'05'}>未聘</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={9}>
        <FormItem
          {...formItemLayout}
          label='职称获取途径(可多选)'
        >
          {form.getFieldDecorator('technicalSource-' + i, {
            initialValue: initialValue[`technicalSource-${i}`]
          })(
            <Checkbox.Group>
              <Col span={8}><Checkbox value={'01'}>医院</Checkbox></Col>
              <Col span={8}><Checkbox value={'02'}>大学</Checkbox></Col>
              <Col span={8}><Checkbox value={'03'}>药监局</Checkbox></Col>
              <Col span={8}><Checkbox value={'04'}>卫计委</Checkbox></Col>
              <Col span={4}><Checkbox value={'99'}>其他</Checkbox></Col>
              <Col span={6}>
                {form.getFieldDecorator('technicalSourceOther-' + i, {
                  initialValue: initialValue[`technicalSourceOther-${i}`]
                  })(<Input placeholder='请输入'/>
                )}
              </Col>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={10}>
        <FormItem
          {...formItemLayout}
          label='医院是否认可和聘任以上职称'
        >
          {form.getFieldDecorator('approvalFlag-' + i, {
            initialValue: initialValue[`approvalFlag-${i}`]
          })(
            <RadioGroup>
              <Radio value={'01'}>是</Radio>
              <Radio value={'02'}>否</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={11}>
        <FormItem
          {...formItemLayout}
          label='专业背景(可多选)'
        >
          {form.getFieldDecorator('zy-' + i, {
            // rules: [{ required: true, message: '专业背景' }],
            initialValue: initialValue[`zy-${i}`]
          })(
            <Checkbox.Group>
              <Row>
                <Col span={6}><Checkbox value="01">生物医学工程</Checkbox></Col>
                <Col span={6}><Checkbox value="02">计算机</Checkbox></Col>
                <Col span={6}><Checkbox value="03">电子</Checkbox></Col>
                <Col span={6}><Checkbox value="07">机械</Checkbox></Col>
                <Col span={6}><Checkbox value="05">管理</Checkbox></Col>
                <Col span={6}><Checkbox value="04">经济</Checkbox></Col>
                <Col span={6}><Checkbox value="06">医学</Checkbox></Col>
                <Col span={6}><Checkbox value="08">护理</Checkbox></Col>
                <Col span={6}><Checkbox value="09">药学</Checkbox></Col>
                <Col span={6}><Checkbox value="99">其他</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={12}>
        <FormItem
          {...formItemLayout}
          label='岗位类型(可多选)'
        >
          {form.getFieldDecorator('postType-' + i, {
            initialValue: initialValue[`postType-${i}`]
          })(
            <Checkbox.Group>
              <Row>
                <Col span={8}><Checkbox value="01">设备购置管理</Checkbox></Col>
                <Col span={8}><Checkbox value="02">耗材采购管理</Checkbox></Col>
                <Col span={8}><Checkbox value="03">耗材物流管理</Checkbox></Col>
                <Col span={8}><Checkbox value="04">设备维修维护</Checkbox></Col>
                <Col span={8}><Checkbox value="05">质量安全管理</Checkbox></Col>
                <Col span={8}><Checkbox value="06">教学科研</Checkbox></Col>
                <Col span={4}><Checkbox value={'99'}>其他</Checkbox></Col>

                {form.getFieldDecorator('postTypeOther-' + i, {
                  initialValue: initialValue[`postTypeOther-${i}`]
                  })(<Col span={6}><Input placeholder='请输入'/></Col>
                )}

              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={18} key={15}>
        <FormItem
          {...formItemLayoutForLine}
          label='近3年以第一作者、通讯作者发表论文数量（具有ISSN和CN刊号的国内外期刊:'
        >
          {form.getFieldDecorator('publishThesis-' + i, {
            initialValue: initialValue[`publishThesis-${i}`]
          })(
            <Input style={{width: 100}}  addonAfter={<span>篇</span>}/>
          )}
        </FormItem> 
      </Col>,
      <Col style={{textAlign: 'right'}} key={13} span={24}>
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
        values.investigationGuid = this.state.initialValue.investigationGuid;
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
      url: api.QUESTION4_BACK,
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
    const { itemOneList, formLoading, btnLoading } = this.state;
    return (
      <Spin spinning={formLoading} delay={500}>
        <Form onSubmit={this.handleSubmit} style={{padding: '40px 80px'}} className='right_content'>
          <BackTop />
          <Row>
            <Card style={{marginBottom: 20}}>
              <h2 style={{textAlign: 'center'}}> 4.医学工程部门人员情况 </h2>
              <span style={{color: 'red'}}>(含在编和合同制员工。部门职能范围包括1、设备购置  2、耗材采购  3、耗材物流管理  4、设备维修维护  5、医疗器械质量安全管理。需填写每位职工信息)</span>
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

export default Form.create()(PersonInfoForm);
