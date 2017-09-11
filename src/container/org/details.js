/**
 * @file 机构详情
 */
import React, { Component } from 'react';
import { Row, Col, Form, Select, Input, Button, Modal, Cascader, Breadcrumb,
   BackTop, Upload, Icon, message } from 'antd';
import { formItemLayout } from 'constants';
import { getLocalOption } from 'utils/common';
import { fetchData } from 'utils/tools';
import { hashHistory, Link } from 'react-router';
import api from 'api';
const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 注册表单
 */
class RegisterFormWrapper extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    address: []
  };
  componentDidMount = () => {
    fetchData({
      url: api.CITY,
      method: 'get',
      type: 'application/json',
      success: data => this.setState({address: data})
    })
  }
  submitHandler = (e) => {
    e.preventDefault();
    const { form, submit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      //&& this.state.fileList.length
      if (!err ) {
        //values.tfAccessory = this.state.fileList[0].thumbUrl;
        const address = values.address;
        values.tfProvince = address[0];
        values.tfCity = address[1];
        values.tfDistrict = address[2];
        values.orgId = this.props.org.orgId;
        submit(values);
      } else {
        message.error('请上传附件')
      }
    });
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  handleChange = ({ fileList }) => this.setState({ fileList })
  render () {
    const { form, org } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    console.log(org);
    return (
      <Row style={{padding: 8}} className={'right_content'}>
        <Breadcrumb style={{marginBottom: 10, fontSize: '1.1em'}}>
          <Breadcrumb.Item><Link to='/org/orgInfo'>机构管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>机构详情</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          onSubmit={this.submitHandler}
        >
          <FormItem
            label='信息统计时间'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('pYear', {
              rules: [{ required: true, message: '请选择统计时间' }],
              initialValue: org.pYear
            })(
              <Select>
                <Option value={'2015'}>2015</Option>
                <Option value={'2016'}>2016</Option>
                <Option value={'2017'}>2017</Option>
                <Option value={'2018'}>2018</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='组织机构代码'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgCode', {
              rules: [{ required: true, message: '请输入组织机构代码' }],
              initialValue: org.orgCode
            })(
              <Input placeholder='请输入组织机构代码' disabled={true}/>
            )}
          </FormItem> 
          <FormItem
            label='上传附件'
            {...formItemLayout}
          >  
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                disabled={true}
              >
                { fileList.length === 1 ? null :
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                }
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </FormItem> 
          <FormItem
            label='机构名称'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgName', {
              rules: [{ required: true, message: '请输入机构名称' }],
              initialValue: org.orgName
            })(
              <Input placeholder='请输入机构全称'/>
            )}
          </FormItem> 
          <FormItem
            label='机构简称'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgAlias', {
              rules: [{ required: true, message: '请输入机构简称' }],
              initialValue: org.orgAlias
            })(
              <Input placeholder='请输入机构简称'/>
            )}
          </FormItem> 
          <FormItem
            label='机构性质'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalProperty', {
              rules: [{ required: true, message: '请选择机构性质' }],
              initialValue: org.hospitalProperty
            })(
              <Select>
                <Option value={'公立医院'}>公立医院</Option>
                <Option value={'非公立医院'}>非公立医院</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='机构地址'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('address', {
              rules: [{ required: true, message: '请选择机构地址' }],
              initialValue: [org.tfProvince, org.tfCity, org.tfDistrict]
            })(
              <Cascader options={this.state.address} changeOnSelect placeholder='请选择地址'/>
            )}
          </FormItem> 
          <FormItem
            label='医疗机构类型'
            {...formItemLayout}
            >  
            {form.getFieldDecorator('hospitalType', {
              rules: [{ required: true, message: '请选择医院机构类型' }],
              initialValue: org.hospitalType
            })(
              <Select>
                <Option value={'综合性医院'}>综合性医院</Option>
                <Option value={'专科医院'}>专科医院</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院教学类型'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalTeaching', {
              rules: [{ required: true, message: '请选择医院教学类型' }],
              initialValue: org.hospitalTeaching
            })(
              <Select>
                {
                  getLocalOption('hospitalTeaching')
                }
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院等级'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalLevel', {
              rules: [{ required: true, message: '请选择等级' }],
              initialValue: org.hospitalLevel
            })(
              <Select>
                <Option value={'三甲'}>三甲</Option>
                <Option value={'二甲'}>二甲</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院编制床位数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('planBedSum', {
              rules: [{ required: true, message: '请输入医院编制床位数' }],
              initialValue: org.planBedSum
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <FormItem
            label='医院开放床位数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('actualBedSum', {
              rules: [{ required: true, message: '请输入医院开放床位数' }],
              initialValue: org.actualBedSum
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <FormItem
            label='职工总数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('staffSum', {
              rules: [{ required: true, message: '请输入职工总数' }],
              initialValue: org.staffSum
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <Col push={24} style={{textAlign: 'center'}}>
            <Button htmlType='submit' type='primary'>提交</Button>
            <Button 
              type="danger" 
              style={{marginLeft: 10}} 
              onClick={() => form.resetFields()}
            >
              重置
            </Button>
          </Col>
        </Form>  
        <BackTop/>
      </Row>
    )
  }
}
const RegisterForm = Form.create()(RegisterFormWrapper);
class OrgAdd extends Component {
  submit = postData => {
    console.log('提交数据:', postData);
    fetchData({
      url: api.ADD_ORG,
      body: JSON.stringify(postData),
      success: data => {
        if (data.status) {
          message.success('操作成功!')
          hashHistory.push('/org/orgInfo')
        } else {
          message.error(data.msg);
        }
      },
      type: 'application/json'
    })
  }
  render () {
    const { location } = this.props;
    return (
      <RegisterForm submit={this.submit} org={location.state ? location.state.org : null}/>
    )
  }
}

export default OrgAdd;