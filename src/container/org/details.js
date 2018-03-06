/**
 * @file 机构详情
 */
import React, { Component } from 'react';
import { Row, Col, Form, Select, Input, Button, Modal, Cascader, Breadcrumb,
   BackTop, Upload, Icon, message } from 'antd';
import { formItemLayout } from 'constants';
// import { getLocalOption } from 'utils/common';
import { fetchData,CommonData } from 'utils/tools';
import { hashHistory, Link } from 'react-router';
import querystring from 'querystring';
import api from 'api';
const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 注册表单
 */
class RegisterFormWrapper extends Component {
  state = {
    disabled:true,
    org:this.props.org,
    previewVisible: false,
    previewImage: '',
    fileList: this.props.org.tfAccessory ? [{
      uid: -1,
      name: '图片.png',
      status: 'done',
      url: api.LOADPIC + this.props.org.tfAccessory,
    }] : [],
    address: [],
    hospitalLevels: [],
    hospitalPropertys: [],
    hospitalTypes: []
  };
  componentDidMount = () => {
    fetchData({
      url: api.CITY,
      method: 'get',
      type: 'application/json',
      success: data => this.setState({address: data})
    })
       //机构性质
    CommonData('HOSPITAL_PROPERTY', (data) => {
      this.setState({ hospitalPropertys : data})
    })
    //医疗机构类型
    CommonData('HOSPITAL_TYPE', (data) => {
      this.setState({ hospitalTypes : data})
    })
    //医院等级
    CommonData('HOSPITAL_LEVEL', (data) => {
      this.setState({ hospitalLevels : data})
    })
  }
  submitHandler = (e) => {
    e.preventDefault();
    const { form, submit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      console.log(this.props.org.tfAccessory,'111')
      if (!err ) {
        console.log(values,'values')
      
       if(!this.props.org.tfAccessory)
       {
        values.tfAccessory =   this.state.fileList[0].thumbUrl;
       }
     
        const address = values.address;
        values.tfProvince = address[0];
        values.tfCity = address[1];
        values.tfDistrict = address[2];
        values.orgId = this.props.org.orgId;
        submit(values);
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
  handleTimeChange = (value) =>{
    fetchData({
      url: api.SEARCH_ORGS_LIST,
      body:querystring.stringify({pYear:value,orgId:this.props.org.orgId}),
      success: data => {
        if(data.result.rows.length>0){
          this.setState({org: data.result.rows[0]})
        }else{
          const org = {actualBedSum:null,
            auditFstate:null,
            hospitalLevel:null,
            hospitalProperty:null,
            hospitalType:null,
            lxdh:null,
            lxr:null,
            orgAddress:null,
            orgAlias:this.props.org.orgAlias,
            orgCode:null,
            orgId:null,
            orgName:this.props.org.orgName,
            orgType:null,
            pYear:null,
            planBedSum :null,
            qcOrgName:null,
            staffSum:null,
            healthTechnician:null,
            administrator:null,
            tfCity:null,
            tfDistrict:null,
            tfProvince:null};
          this.setState({org: org})
        }
       
      }
    })
    this.setState({ disabled : false})
  }
  render () {
    const { form } = this.props;
    const  org  = this.state.org;
    const  fileList = this.state.fileList;
    const { previewVisible, previewImage } = this.state;
    console.log(fileList,'1111')
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
              <Select onChange={this.handleTimeChange}>
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
              initialValue: this.props.org.orgCode
            })(
              <Input placeholder='请输入组织机构代码' disabled={ this.props.org.orgCode ? true:false}/>
            )}
          </FormItem> 
          <FormItem
            label='上传附件'
            {...formItemLayout}
          >  
            <div className="clearfix">
              <Upload
                action={api.UPLOADPIC}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                showUploadList={{showRemoveIcon:fileList.length===1 ? false : true}}
              >
                { fileList.length === 1 ? null :
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传</div>
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
              <Input placeholder='请输入机构全称' disabled={true}/>
            )}
          </FormItem> 
          <FormItem
            label='机构简称'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgAlias', {
              rules: [{ required: true, message: '请输入机构简称' }],
              initialValue:org.orgAlias
            })(
              <Input placeholder='请输入机构简称' disabled={true}/>
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
              <Select placeholder="请选择" disabled={!org.hospitalProperty ? false : true}>
              {
                this.state.hospitalPropertys.map((item,index)=>{
                  return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                })
              }
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
              <Cascader disabled={!org.tfProvince ? false : true} options={this.state.address} changeOnSelect placeholder='请选择地址'/>
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
              <Select placeholder="请选择" disabled={!org.hospitalType ? false : true}>
              {
                this.state.hospitalTypes.map((item,index)=>{
                  return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                })
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
              <Select placeholder="请选择" disabled={!org.hospitalLevel ? false : true}>
              {
                this.state.hospitalLevels.map((item,index)=>{
                  return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                })
              }
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
              <Input placeholder='请输入数字，例如2000' disabled={!org.planBedSum ? false : true}/>
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
              <Input placeholder='请输入数字，例如2000' disabled={!org.actualBedSum ? false : true}/>
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
              <Input placeholder='请输入数字，例如2000' disabled={!org.staffSum ? false : true}/>
            )}
          </FormItem> 
          <FormItem
            label='卫生技术人员'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('healthTechnician', {
              rules: [{ required: true, message: '请输入卫生技术人员' }],
              initialValue: org.healthTechnician
            })(
              <Input placeholder='请输入数字，例如2000' disabled={!org.healthTechnician ? false : true}/>
            )}
          </FormItem> 
          <FormItem
            label='管理人员'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('administrator', {
              rules: [{ required: true, message: '请输入管理人员' }],
              initialValue: org.administrator
            })(
              <Input placeholder='请输入数字，例如2000' disabled={!org.administrator ? false : true}/>
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