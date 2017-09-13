import React, { Component } from 'react';
import { Form, Input, Row, Checkbox, BackTop, Button, message, DatePicker, Cascader,
         Col, Card, Select, Radio } from 'antd';
import { fetchData } from 'utils/tools';
import api from 'api';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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


class DeptCheckDetailWrapper extends Component {
  state = {

  }
  //返回提交数据
  getPostData = () => {
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
  render () {
    const { deptInfo, userListItem, meetingListItem } = this.state;
    const { form } = this.props;
    return (
      <Row style={styles.row} className='right_content'>
        <Form onSubmit={this.handleSubmit}>
          <Col span={3}>
            <h3>选择上报时间</h3>
          </Col>  
          <Col span={21}>
            {form.getFieldDecorator('pYear')(
                <Input/>
              )}
          </Col>
          <Col span={24} style={styles.col}>
            <Card title="医学工程部门基本情况">
              <FormItem
                {...formItemLayout}
                label='部门名称'
              >
                {form.getFieldDecorator('deptName')(
                  <Input />
                )}
              </FormItem>  
              <FormItem
                label='部门级别'
                {...formItemLayout}
              >
                {form.getFieldDecorator('deptTypeName')(
                  <RadioGroup>
                    <Radio value={'1'}>处/部</Radio>
                    <Radio value={'2'}>科</Radio>
                    <Radio value={'3'}>组</Radio>
                    <Radio value={'其他'}>其他
                      { deptInfo.deptTypeName === '其他' ? <Input ref='deptTypeName' style={{ width: 100, marginLeft: 10 }}/> : null}
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>  
              <FormItem
                label='上级管理部门'
                {...formItemLayout}
              >
                {form.getFieldDecorator('deptParentName')(
                  <RadioGroup>
                    <Radio value={'1'}>医务</Radio>
                    <Radio value={'2'}>后勤</Radio>
                    <Radio value={'3'}>科教</Radio>
                    <Radio value={'4'}>独立运行</Radio>
                    <Radio value={'其他'}>其他
                      { deptInfo.deptParentName === '其他' ? <Input ref='deptParentName' style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                label='部门业务管理范围'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('workScope')(
                  <Checkbox.Group>
                    <Row>
                      <Col span={6}><Checkbox value="1">设备</Checkbox></Col>
                      <Col span={6}><Checkbox value="2">耗材</Checkbox></Col>
                      <Col span={6}><Checkbox value="3">药剂</Checkbox></Col>
                      <Col span={6}><Checkbox value="4">办公用品</Checkbox></Col>
                      <Col span={6}><Checkbox value="5">总务</Checkbox></Col>
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
                {form.getFieldDecorator('workOther')(
                  <Checkbox.Group>
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
                  {form.getFieldDecorator('equipmentSum')(
                    <Input addonAfter={<span>台件</span>}/>
                  )}
                </FormItem> 
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医疗设备总价值'
                >
                  {form.getFieldDecorator('equipmentValue')(
                    <Input addonAfter={<span>万元</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='甲乙类医疗设备总数量'
                >
                  {form.getFieldDecorator('abEquipmentSum')(
                    <Input addonAfter={<span>台件</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='甲乙类医疗设备总价值'
                >
                  {form.getFieldDecorator('abEquipmentValue')(
                    <Input addonAfter={<span>万元</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医用耗材（产品）总数量'
                >
                  {form.getFieldDecorator('consuSum')(
                    <Input addonAfter={<span>种</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='医用耗材年度消耗总金额'
                >
                  {form.getFieldDecorator('consuValue')(
                    <Input addonAfter={<span>万元</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='高值耗材（产品）总数量'
                >
                  {form.getFieldDecorator('highConsuSum')(
                    <Input addonAfter={<span>种</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayoutForMore}
                  label='高值耗材（产品）总金额'
                >
                  {form.getFieldDecorator('highConsuValue')(
                    <Input addonAfter={<span>万元</span>}/>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label='医疗器械物流管理开展范围'
                  {...formItemLayout}
                >  
                  {form.getFieldDecorator('logisticsScope')(
                    <Checkbox.Group>
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
                  {form.getFieldDecorator('logisticsType')(
                    <Checkbox.Group>
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
                userListItem.map(item => (
                  <AddFormItems 
                    i={item} 
                    form={form} 
                    key={item}
                  />
                ))
              }
            </Card>
          </Col>
          <Col span={24}>
            <Card title={'医学工程部门培训情况'} style={styles.card}>
              {
                meetingListItem.map(item => (
                  <AddFormItemsTwo 
                    i={item} 
                    form={form} 
                    key={item}
                  />
                ))
              }
            </Card>
          </Col>
          <Col span={24} style={styles.tool}>
            <Button type='primary' style={styles.button} htmlType='submit'>通过</Button>
            <Button type='danger' style={styles.button}>重置</Button>
          </Col>
        </Form>
        <BackTop/>
      </Row> 
    ) 
  }
}
//医学工程部门人员情况
const AddFormItems = ({i, form, deleteRow, getProgress}) => (
  <Row style={styles.row}>
    <Col span={8}>
      <FormItem
        label='姓名'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('fname-' + i, {
          rules: [{ required: true, message: '请输入姓名' }],
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
)

//医学工程部门培训情况
const AddFormItemsTwo = ({i, form, deleteRow, getProgress}) => (
  <Row style={styles.row}>
    <Col span={8}>
      <FormItem
        label='会议名称'
        {...formItemLayoutForMore}
      >  
        {form.getFieldDecorator('meetingName-' + i, {
          rules: [{ required: true, message: '请输入会议名称' }],
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

const DeptCheckDetail = Form.create()(DeptCheckDetailWrapper);
export default DeptCheckDetail;