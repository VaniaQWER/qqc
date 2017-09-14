import React, { Component } from 'react';
import { Form, Input, Icon, Row, Checkbox, BackTop, Button, message, DatePicker, Cascader,
         Col, Card, Select, Radio } from 'antd';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
import moment from 'moment';
import api from 'api';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let uuid = 2, vvid = 2;

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

const children = [
  {value: '无', label: '无'},
  {value: '初级', label: '初级'},
  {value: '中级', label: '中级'},
  {value: '高级', label: '高级'}
]

const options = [{
  value: '工程师',
  label: '工程师',
  children
}, {
  value: '医师',
  label: '医师',
  children
}, {
  value: '技师',
  label: '技师',
  children
}, {
  value: '护师',
  label: '护师',
  children
}];

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
//一行多条样式
const formItemLayoutForMore = {
  labelCol: {
    sm: { span: 10 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};


class ReportWrapperForm extends Component {
  state = {
    pYear: '',
    schedule: '',
    deptInfo: {
      deptName: '',
      deptTypeName: '',
      deptParentName: '',
      workScope: {
        workScopeValue: '',
        workScopeName: ''
      },
      workOther: {
        workOtherValue: '',
        workOtherName: ''
      }    
    },
    userListItem: [0, 1],
    meetingListItem: [0, 1],
    progress: 0,
    updateData: {},
    constrDeptGuid: null
  }
  //计算进度
  getProgress = () => {
    const { form, setProgress } = this.props;
    const all = form.getFieldsValue();//获取当前表单
    const total = Object.keys(all).length;
    let count = 0;
    for (let k in all) {
      if (all[k]) {
        count++;
      }
    }
    const progress = Number(count/total).toFixed(2) * 100;
    this.setState({ progress })
    setProgress(progress)
  }
  //返回提交数据
  getPostData = () => {
    const postData = this.props.form.getFieldsValue();
    let { deptTypeName, deptParentName, workScope, workOther, logisticsType } = postData;
    if (deptTypeName === '其他') {
      postData.deptTypeNameOther = this.refs.deptTypeName.refs.input.value;
    }
    if (deptParentName === '其他') {
      postData.deptParentNameOther = this.refs.deptParentName.refs.input.value;
    }
    if (workScope) {
      workScope.map((item, index) => {
        if (item === '其他') {
          postData.workScopeOther = this.refs.workScope.refs.input.value;
        }
        return null;
      })
    }  
    if (workOther) {
      workOther.map((item, index) => {
        if (item === '3') {
          postData.workMassName = this.refs.workOther_1.refs.input.value;
        } 
        if (item === '4') {
          postData.workOtherName = this.refs.workOther_2.refs.input.value;
        }
        return null;
      })
    }  
    if (logisticsType) {
      logisticsType.map((item, index) => {
        if (item === '其他') {
          postData.logisticsTypeOther = this.refs.logistics.refs.input.value;
        } 
        return null;
      })
    }  
    postData.schedule = this.state.progress.toFixed(2);
    const { userListItem, meetingListItem } = this.state;
    postData.userCount = userListItem.length;
    postData.meetingCount = meetingListItem.length;
    postData.constrDeptGuid = this.state.constrDeptGuid;
    return postData;
  }
  submit = (postData) => {
    fetchData({
      url: api.INSERT_CONSTR_DEPT,
      body: JSON.stringify(postData),//querystring.stringify(postData),
      type: 'application/json',
      success: data => {
        if (data.status) {
          alert('成功了...我也不知道跳转去哪里!')
        } else {
          message.error(data.msg);
        }
      }
    })
  }
  //暂存
  save = () => {
    const postData = this.getPostData();
    postData.auditFstate = '00';
    console.log('暂存数据:', postData);
    this.submit(postData);
  }
  //提交事件
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const postData = this.getPostData();
        postData.auditFstate = '10';
        console.log('提交数据:', postData);
        this.submit(postData);
      }
    });
  }
  //重置
  handlerReset = () => {
    this.props.form.resetFields();
    if (this.refs.workOther_1) {
      this.refs.workOther_1.refs.input.value = '';
    }
    if (this.refs.workOther_2) {
      this.refs.workOther_2.refs.input.value = '';
    }
    if (this.refs.deptParentName) {
      this.refs.deptParentName.refs.input.value = '';
    }
    if (this.refs.deptTypeName) {
      this.refs.deptTypeName.refs.input.value = '';
    }
    if (this.refs.workScope) {
      this.refs.workScope.refs.input.value = '';
    }
  }
  //deptInfo radio change 事件
  //key 类型    e  dom对象
  setRadioChange = (key, e) => {
    const { deptInfo } = this.state;
    const { form } = this.props;
    const result = {};
    result[key] = e.target.value;
    const newInfo = Object.assign({}, deptInfo, result);
    form.setFieldsValue(result);
    this.setState({deptInfo: newInfo});
    this.getProgress();
  }
  //deptInfo checkbox change事件
  //key 类型  values 选中值
  setCheckboxChange = (key, values) => {
    const { deptInfo } = this.state;
    const { form } = this.props;
    const result = {};
    result[key] = values;
    const newInfo = Object.assign({}, deptInfo, result);
    form.setFieldsValue(result);
    this.setState({deptInfo: newInfo});
    this.getProgress();
  }
  //添加更多
  addItem = (key) => {
    const item = this.state[key];
    if (key === 'userListItem') {
      item.push(uuid)
      uuid++;
      this.setState({userListItem: item})
    } else {
      item.push(vvid)
      vvid++;
      this.setState({meetingListItem: item})
    }
  }
  // 删除添加的更多
  deleteItem = (index, key) => {
    const item = this.state[key];
    if (item.length <= 1) {
      return message.warn('至少保留一条记录!')
    }
    let num = null;
    item.map((list, i) => {
      if (list === index) {
        num = i;
      }
      return null;
    })
    if (key === 'userListItem') {
      if (num || num === 0) {
        item.splice(num, 1);
        this.setState({userListItem: item})
      }
    } else {
      if (num || num === 0) {
        item.splice(num, 1);
        this.setState({meetingListItem: item})
      }
    }
  }
  renderArr = (index) => {
    let array = [];
    for (let i=0;i<index;i++) {
      array.push(i);
    }
    return array;
  }
  getData = (value) => {
    fetchData({
      url: api.SEARCH_CONSTR_DEPT,
      body: querystring.stringify({pYear: value}),
      success: data => {
        this.setState({
          updateData: data.result,
          constrDeptGuid: data.result.constrDeptGuid,
          meetingListItem: this.renderArr(data.result.meetingCount),
          userListItem: this.renderArr(data.result.userCount),
        })
        if (data.result.deptTypeName === '其他') {
          this.refs.deptTypeName.refs.input.value = data.result.deptTypeNameOther;
        }
        if (data.result.deptParentName === '其他') {
          this.refs.deptParentName.refs.input.value = data.result.deptParentNameOther;
        }
        if (data.result.workScope) {
          data.result.workScope.map((item, index) => {
            if (item === '其他') {
              this.refs.workScope.refs.input.value = data.result.workScopeOther; 
            }
            return null;
          })
        }  
        if (data.result.workOther) {
          data.result.workOther.map((item, index) => {
            if (item === '3') {
              this.refs.workOther_1.refs.input.value = data.result.workMassName; 
            } 
            if (item === '4') {
              this.refs.workOther_2.refs.input.value = data.result.workOtherName; 
            }
            return null;
          })
        }  
        if (data.result.logisticsType) {
          data.result.logisticsType.map((item, index) => {
            if (item === '其他') {
              this.refs.logistics.refs.input.value = data.result.logisticsTypeOther;
            } 
            return null;
          })
        }  
        this.getProgress();
      }
    })
  }
  render () {
    const { deptInfo, userListItem, meetingListItem, updateData } = this.state;
    const { form } = this.props;
    return (
      <Row style={styles.row} className='right_content'>
        <Form onSubmit={this.handleSubmit}>
          <Col span={3}>
            <h3>选择上报时间</h3>
          </Col>  
          <Col span={21}>
            {form.getFieldDecorator('pYear', {
              rules: [{ required: true, message: '请选择上报时间' }],
              })(
                <Select style={{width: 300}} onChange={(value) => {
                  form.setFieldsValue({pYear: value});
                  //this.getProgress();
                  this.getData(value);
                }}>
                  <Option value={'2015'}>2015</Option>
                  <Option value={'2016'}>2016</Option>
                  <Option value={'2017'}>2017</Option>
                  <Option value={'2018'}>2018</Option>
                </Select>
              )}
          </Col>
          <Col span={24} style={styles.col}>
            <Card title="医学工程部门基本情况">
              <FormItem
                {...formItemLayout}
                label='部门名称'
              >
                {form.getFieldDecorator('deptName', {
                  rules: [{ required: true, message: '请输入部门名称' }],
                  initialValue: updateData.deptName
                })(
                  <Input onBlur={this.getProgress}/>
                )}
              </FormItem>  
              <FormItem
                label='部门级别'
                {...formItemLayout}
              >
                {form.getFieldDecorator('deptTypeName', {
                  rules: [{ required: true, message: '请选择部门级别' }],
                  initialValue: updateData.deptTypeName
                })(
                  <RadioGroup onChange={this.setRadioChange.bind(this, 'deptTypeName')}>
                    <Radio value={'1'}>处/部</Radio>
                    <Radio value={'2'}>科</Radio>
                    <Radio value={'3'}>组</Radio>
                    <Radio value={'其他'}>其他
                      { ( deptInfo.deptTypeName === '其他' || updateData.deptTypeName === '其他' ) ?  
                        <Input ref='deptTypeName' style={{ width: 100, marginLeft: 10 }}/> : null
                      }
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>  
              <FormItem
                label='上级管理部门'
                {...formItemLayout}
              >
                {form.getFieldDecorator('deptParentName', {
                  rules: [{ required: true, message: '请选择上级管理部门' }],
                  initialValue: updateData.deptParentName
                })(
                  <RadioGroup onChange={this.setRadioChange.bind(this, 'deptParentName')}>
                    <Radio value={'1'}>医务</Radio>
                    <Radio value={'2'}>后勤</Radio>
                    <Radio value={'3'}>科教</Radio>
                    <Radio value={'4'}>独立运行</Radio>
                    <Radio value={'其他'}>其他
                      { ( deptInfo.deptParentName === '其他' || updateData.deptParentName === '其他' ) ? 
                        <Input ref='deptParentName' style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                label='部门业务管理范围'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('workScope', {
                  rules: [{ required: true, message: '请选择部门业务管理范围' }],
                  initialValue: updateData.workScope
                })(
                  <Checkbox.Group onChange={this.setCheckboxChange.bind(this, 'workScope')}>
                    <Row>
                      <Col span={6}><Checkbox value="1">设备</Checkbox></Col>
                      <Col span={6}><Checkbox value="2">耗材</Checkbox></Col>
                      <Col span={6}><Checkbox value="3">试剂</Checkbox></Col>
                      <Col span={6}><Checkbox value="4">药品</Checkbox></Col>
                      <Col span={6}><Checkbox value="5">办公用品</Checkbox></Col>
                      <Col span={6}><Checkbox value="6">总务</Checkbox></Col>
                      <Col span={3}><Checkbox value="其他">其他</Checkbox></Col>
                      <Col span={6}><Input ref='workScope'/></Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </FormItem>  
              <FormItem
                label='部门承担的其它工作'
                {...formItemLayout}
              >
                {form.getFieldDecorator('workOther', {
                  rules: [{ required: true, message: '请选择部门承担的其它工作' }],
                  initialValue: updateData.workOther
                })(
                  <Checkbox.Group onChange={this.setCheckboxChange.bind(this, 'workOther')}>
                    <Row>
                      <Col><Checkbox value="1">本省、市卫生行政部门：医疗器械管理质控中心</Checkbox></Col>
                      <Col><Checkbox value="2">本省、市药监部门：医疗器械临床实验基地</Checkbox></Col>
                      <Col span={16}><Checkbox value="3">本省、市质量技术监督部门：计量与测试技术合作</Checkbox></Col>
                      <Col span={8}><Input ref='workOther_1' placeholder='请输入'/></Col>
                      <Col span={5}><Checkbox value="4">其他工作：</Checkbox></Col>
                      <Col span={19}><Input ref='workOther_2' placeholder='请输入'/></Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </FormItem>  
            </Card>
          </Col>   
          <Col span={24}>
            <Card title={'医学工程部门相关业务管理现状'} style={styles.card}>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医疗设备总数量'
                >
                  {form.getFieldDecorator('equipmentSum', {
                    rules: [{ required: true, message: '请输入医疗设备总数量' }],
                    initialValue: updateData.equipmentSum
                  })(
                    <Input addonAfter={<span>台件</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem> 
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医疗设备总价值'
                >
                  {form.getFieldDecorator('equipmentValue', {
                    rules: [{ required: true, message: '请输入医疗设备总价值' }],
                    initialValue: updateData.equipmentValue
                  })(
                    <Input addonAfter={<span>万元</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='甲乙类医疗设备总数量'
                >
                  {form.getFieldDecorator('abEquipmentSum', {
                    rules: [{ required: true, message: '请输入甲乙类医疗设备总数量' }],
                    initialValue: updateData.abEquipmentSum
                  })(
                    <Input addonAfter={<span>台件</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='甲乙类医疗设备总价值'
                >
                  {form.getFieldDecorator('abEquipmentValue', {
                    rules: [{ required: true, message: '请输入甲乙类医疗设备总价值' }],
                    initialValue: updateData.abEquipmentValue
                  })(
                    <Input addonAfter={<span>万元</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医用耗材（产品）总数量'
                >
                  {form.getFieldDecorator('consuSum', {
                    rules: [{ required: true, message: '请输入医用耗材（产品）总数量' }],
                    initialValue: updateData.consuSum
                  })(
                    <Input addonAfter={<span>种</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医用耗材年度消耗总金额'
                >
                  {form.getFieldDecorator('consuValue', {
                    rules: [{ required: true, message: '请输入医用耗材年度消耗总金额' }],
                    initialValue: updateData.consuValue
                  })(
                    <Input addonAfter={<span>万元</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='高值耗材（产品）总数量'
                >
                  {form.getFieldDecorator('highConsuSum', {
                    rules: [{ required: true, message: '请输入高值耗材（产品）总数量' }],
                    initialValue: updateData.highConsuSum
                  })(
                    <Input addonAfter={<span>种</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='高值耗材（产品）总金额'
                >
                  {form.getFieldDecorator('highConsuValue', {
                    rules: [{ required: true, message: '请输入高值耗材（产品）总金额' }],
                    initialValue: updateData.highConsuValue
                  })(
                    <Input addonAfter={<span>万元</span>} onBlur={this.getProgress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label='医疗器械物流管理开展范围'
                  {...formItemLayout}
                >  
                  {form.getFieldDecorator('logisticsScope', {
                    rules: [{ required: true, message: '请选择医疗器械物流管理开展范围' }],
                    initialValue: updateData.logisticsScope
                  })(
                    <Checkbox.Group onChange={this.setCheckboxChange.bind(this, 'logisticsScope')}>
                      <Row>
                        <Col span={8}><Checkbox value="1">医疗设备物流</Checkbox></Col>
                        <Col span={8}><Checkbox value="2">普通卫生材料物流</Checkbox></Col>
                        <Col span={8}><Checkbox value="3">植入、介入类耗材物流</Checkbox></Col>
                        <Col span={8}><Checkbox value="4">消毒供应材料物流</Checkbox></Col>
                        <Col span={8}><Checkbox value="5">试剂物流</Checkbox></Col>
                        <Col span={8}><Checkbox value="6">医疗废弃物物流</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  )}
                </FormItem>
              </Col>  
              <Col span={24}>
                <FormItem
                  label='卫生材料医疗器械物流管理模式'
                  {...formItemLayout}
                >  
                  {form.getFieldDecorator('logisticsType', {
                    rules: [{ required: true, message: '请选择卫生材料医疗器械物流管理模式' }],
                    initialValue: updateData.logisticsType
                  })(
                    <Checkbox.Group onChange={this.setCheckboxChange.bind(this, 'logisticsType')}>
                      <Row>
                        <Col span={6}><Checkbox value="1">物流管理外包</Checkbox></Col>
                        <Col span={6}><Checkbox value="2">仓库外包</Checkbox></Col>
                        <Col span={6}><Checkbox value="3">零库存管理</Checkbox></Col>
                        <Col span={6}><Checkbox value="4">第三方托管</Checkbox></Col>
                        <Col span={6}><Checkbox value="5">二级库管</Checkbox></Col>
                        <Col span={6}><Checkbox value="其他">其他</Checkbox></Col>
                        <Col span={6}><Input ref='logistics'/></Col>
                      </Row>
                    </Checkbox.Group>
                  )}
                </FormItem>
              </Col>  
            </Card>
          </Col>  
          <Col span={24}>
            <Card title={'医学工程部门人员情况'} style={styles.card}>
              {
                userListItem.map((item, index) => (
                  <AddFormItems 
                    i={item} 
                    updateData={updateData}
                    form={form} 
                    deleteRow={this.deleteItem} 
                    key={index}
                    getProgress={this.getProgress}
                  />
                ))
              }
              <Button style={{ width: '60%', marginLeft: '20%' }} onClick={this.addItem.bind(this, 'userListItem')}>
                <Icon type="plus" /> 添加更多
              </Button>
            </Card>
          </Col>
          <Col span={24}>
            <Card title={'医学工程部门培训情况'} style={styles.card}>
              {
                meetingListItem.map((item, index) => {
                  return (
                    <AddFormItemsTwo 
                      updateData={updateData}
                      i={item} 
                      form={form} 
                      deleteRow={this.deleteItem} 
                      key={index}
                      getProgress={this.getProgress}
                    />
                  )
                })
              }
              <Button style={{ width: '60%', marginLeft: '20%' }} onClick={this.addItem.bind(this, 'meetingListItem')}>
                <Icon type="plus" /> 添加更多
              </Button>
            </Card>
          </Col>
          <Col span={24} style={styles.tool}>
            <Button type='primary' style={styles.button} htmlType='submit'>提交</Button>
            <Button style={styles.button} onClick={this.save}>暂存</Button>
            <Button type='danger' onClick={this.handlerReset}>重置</Button>
          </Col>
        </Form>
        <BackTop/>
      </Row> 
    ) 
  }
}
//医学工程部门人员情况
const AddFormItems = ({i, form, deleteRow, getProgress, updateData}) => {
  return (
  <Row style={styles.row}>
    <Col span={8}>
      <FormItem
        label='姓名'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('fname-' + i, {
          rules: [{ required: true, message: '请输入姓名' }],
          initialValue: updateData['fname-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='性别'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('gender-' + i, {
          rules: [{ required: true, message: '请选择性别' }],
          initialValue: updateData['gender-' + i]
        })(
          <Select
            onChange={value => {
              form.setFieldsValue({['gender-' + i]: value})
              getProgress();
            }}
          >
            <Option value={'男'}>男</Option>
            <Option value={'女'}>女</Option>
          </Select>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='年龄'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('birthChar-' + i, {
          rules: [{ required: true, message: '请选择年龄' }],
          initialValue: updateData['birthChar-' + i]
        })(
          <Select
            onChange={value => {
              form.setFieldsValue({['birthChar-' + i]: value})
              getProgress();
            }}
          >
            <Option value={'<30'}>&lt;30</Option>
            <Option value={'30~39'}>30~39</Option>
            <Option value={'40~49'}>40~49</Option>
            <Option value={'≥50'}>≥50</Option>
          </Select>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='职称'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('technicalTitles-' + i, {
          rules: [{ required: true, message: '请选择职称' }],
          initialValue: updateData['technicalTitles-' + i]
        })(
          <Cascader 
            placeholder='请选择职称'
            options={options} 
            onChange={value => {
              form.setFieldsValue({['technicalTitles-' + i]: value});
              getProgress();
            }} />
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='岗位'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('postName-' + i, {
          rules: [{ required: true, message: '请输入岗位' }],
          initialValue: updateData['postName-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='岗位工龄'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('postAge-' + i, {
          rules: [{ required: true, message: '请输入岗位工龄' }],
          initialValue: updateData['postAge-' + i]
        })(
          <Input addonAfter={<span>年</span>} onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='学历'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('highestEducation-' + i, {
          rules: [{ required: true, message: '请选择学历' }],
          initialValue: updateData['highestEducation-' + i]
        })(
          <Select
            onChange={value => {
              form.setFieldsValue({['highestEducation-' + i]: value});
              getProgress();
            }}
          >
            <Option value={'博士及以上'}>博士及以上</Option>
            <Option value={'硕士'}>硕士</Option>
            <Option value={'本科'}>本科</Option>
            <Option value={'大专'}>大专</Option>
            <Option value={'高中及以下'}>高中及以下</Option>
          </Select>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='专业'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('majorName-' + i, {
          rules: [{ required: true, message: '请选择专业' }],
          initialValue: updateData['majorName-' + i]
        })(
          <Select
            onChange={value => {
              form.setFieldsValue({['majorName-' + i]: value});
              getProgress();
            }}
          >
            <Option value={'生物医学工程'}>生物医学工程</Option>
            <Option value={'计算机'}>计算机</Option>
            <Option value={'电子'}>电子</Option>
            <Option value={'经济'}>经济</Option>
            <Option value={'管理'}>管理</Option>
            <Option value={'医学'}>医学</Option>
            <Option value={'机械'}>机械</Option>
            <Option value={'护理'}>护理</Option>
            <Option value={'药学'}>药学</Option>
            <Option value={'其他'}>其他</Option>
          </Select>
        )}
      </FormItem>
    </Col>
    <Col style={{textAlign: 'right'}}>
      <Button type="dashed" style={{marginRight: 10}} onClick={deleteRow.bind(this, i, 'userListItem')}>删除该行</Button>
    </Col>
    <Col span={24} style={{textAlign: 'center'}}>
      <div style={{height: 1, borderTop: '1px solid #808080'}}></div>
    </Col>
  </Row>
)}

//医学工程部门培训情况
const AddFormItemsTwo = ({i, form, deleteRow, getProgress, updateData}) => (
  <Row style={styles.row}>
    <Col span={8}>
      <FormItem
        label='会议名称'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingName-' + i, {
          rules: [{ required: true, message: '请输入会议名称' }],
          initialValue: updateData['meetingName-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='会议类型'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingType-' + i, {
          rules: [{ required: true, message: '请选择会议类型' }],
          initialValue: updateData['meetingType-' + i]
        })(
          <Select
            onChange={value => {
              form.setFieldsValue({['meetingType-' + i]: value});
              getProgress();
            }}
          >
            <Option value={'年会'}>年会</Option>
            <Option value={'专业会议'}>专业会议</Option>
            <Option value={'代表会议'}>代表会议</Option>
            <Option value={'论坛会议'}>论坛会议</Option>
            <Option value={'座谈会、专题讨论会'}>座谈会、专题讨论会</Option>
            <Option value={'讲座'}>讲座</Option>
            <Option value={'讨会、专家讨论会、讨论会'}>研讨会、专家讨论会、讨论会</Option>
            <Option value={'专题讨论会'}>专题讨论会</Option>
            <Option value={'培训性会议'}>培训性会议</Option>
            <Option value={'奖励会议'}>奖励会议</Option>
          </Select>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='时间'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingTime-' + i, {
          rules: [{ required: true, message: '请选择时间' }],
          initialValue: moment(updateData['meetingTime-' + i])
        })(
          <DatePicker onChange={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='地点'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingAddress-' + i, {
          rules: [{ required: true, message: '请输入地点' }],
          initialValue: updateData['meetingAddress-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='主办方'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingSponsor-' + i, {
          rules: [{ required: true, message: '请输入主办方' }],
          initialValue: updateData['meetingSponsor-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='参会人数'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingAllUserSum-' + i, {
          rules: [{ required: true, message: '请输入参会人数' }],
          initialValue: updateData['meetingAllUserSum-' + i]
        })(
          <Input addonAfter={<span>人</span>} onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='科室参会人数'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingDeptUserSum-' + i, {
          rules: [{ required: true, message: '请输入科室参会人数' }],
          initialValue: updateData['meetingDeptUserSum-' + i]
        })(
          <Input addonAfter={<span>人</span>} onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem
        label='备注'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('tfRemark-' + i, {
          rules: [{ required: true, message: '请输入备注' }],
          initialValue: updateData['tfRemark-' + i]
        })(
          <Input onBlur={getProgress}/>
        )}
      </FormItem>
    </Col>
    <Col style={{textAlign: 'right'}}>
      <Button type="dashed" style={{marginRight: 10}} onClick={deleteRow.bind(this, i, 'meetingListItem')}>删除该行</Button>
    </Col>
    <Col span={24} style={{textAlign: 'center'}}>
      <div style={{height: 1, borderTop: '1px solid #808080'}}></div>
    </Col>
  </Row>
)

const ReportForm = Form.create()(ReportWrapperForm);
export default ReportForm;