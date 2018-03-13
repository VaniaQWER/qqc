import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form , Input , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
/**
 * @file 2医疗机构基本情况
 */

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const styles={
  container:{
    padding:'40px 80px'
  },
  head:{
    textAlign:'center',
    padding: 8,
    border:'1px solid #dcdcdc'
  },
  formWarp:{
    marginTop:30,
    border:'1px solid #dcdcdc',
    borderColor:'#dcdcdc',
    padding:20,
    marginBottom:30
  }
}
let Guid ='';
let OrgGuid = '';

class RegistrationForm2 extends React.Component {
  state = {
    confirmDirty: false,
    data:{}
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.investigationGuid = Guid;
        values.investigationOrgGuid = OrgGuid;
        //这里的values是json数据。
        fetchData({
          url: api.ADD_Hospital,
          body: querystring.stringify(values),
          success: data => {
            if (data.status) {
              message.success('操作成功')
            } else {
              message.error(data.msg);
            }
          }
        })
      }
    });
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      data: nextProps.formInfo
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state; 
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
        lg: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset:11,
        },
        md: { 
          span: 12,
          offset:11,
        },
        lg: { 
          span: 12,
          offset:11,
         },
      },
    };

    return (
      <div style={styles.container}>
      <h2 style={styles.head}>2.医疗机构基本情况</h2>
      <Form onSubmit={this.handleSubmit}  >
        <div style={styles.formWarp}>
        <FormItem
          {...formItemLayout}
          label="医院名称"
        >
          {getFieldDecorator('hospitalName', {
            initialValue: data.hospitalName,
            rules: [
              {
                required: true, message: '请填写医院名称！',
              }
          ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="医院登记号"
        >
          {getFieldDecorator('hospitalRegisterNo', {
            initialValue: data.hospitalRegisterNo,
            rules: [ {
              required: true, message: '请填写医院登记号！',
            }],
          })(
            <Input />
          )}
        </FormItem>
          
        <FormItem
          {...formItemLayout}
          label="医疗机构等级"
        >
          {getFieldDecorator('hospitalLevel',{
            initialValue: data.hospitalLevel,
            rules: [
              { required: true, message: '请选择医疗机构等级！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="1">三甲</Radio>
              <Radio value="2">三乙</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="医院类型"
        >
          {getFieldDecorator('hospitalType',{
            initialValue:data.hospitalType,
            rules: [
              { required: true, message: '请选择医院类型！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="8">综合性医院</Radio>
              <Radio value="6">专科医院</Radio>
              <Radio value="2">中医院</Radio>
              <Radio value="4">中西医结合医院</Radio>
              <Radio value="99">其他</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="医院性质"
        >
          {getFieldDecorator('hospitalProperty',{
            initialValue:data.hospitalProperty,
            rules: [
              { required: true, message: '请选择医院性质！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="01">公立医院</Radio>
              <Radio value="02">非公立医院</Radio>
              <Radio value="03">教学医院</Radio>
              <Radio value="04">非教学医院</Radio>
              <Radio value="99">其他</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="编制床位数"
        >
          {getFieldDecorator('planBedSum', {
            initialValue:data.planBedSum,
            rules: [
            { required: true, type: 'number', message: '请填写编制床位数！' , whitespace: true},
            ],
          })(
            <InputNumber min={1} max={99999999999} style={{minWidth:180}}/>
          )}
          <span className="ant-form-text"> 张</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开放床位数"
        >
          {getFieldDecorator('actualBedSum', {
            initialValue:data.actualBedSum,
            rules: [
            { required: true, type: 'number',message: '请填写开放床位数！' , whitespace: true},
            ],
          })(
            <InputNumber min={1} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text"> 张</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="职工总数"
        >
          {getFieldDecorator('staffSum',{
            initialValue:data.staffSum,
            rules: [
            { required: true,type: 'number', message: '请填写职工总数！' , whitespace: true},
            ],
          })(
            <InputNumber min={1} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text"> 人</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="卫生技术人员"
        >
          {getFieldDecorator('healthTechnician', {
            initialValue:data.healthTechnician,
            rules: [
            { required: true, type: 'number', message: '请填写卫生技术人员总数！' , whitespace: true},
            ],
          })(
            <InputNumber min={1} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text"> 人</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="管理人员"
        >
          {getFieldDecorator('administrators', {
            initialValue:data.administrators,
            rules: [
            { required: true, type: 'number', message: '请填写管理人员总数！' , whitespace: true},
            ],
          })(
            <InputNumber min={1} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text"> 人</span>
        </FormItem>
        </div>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm2);


class Report2 extends Component {
    constructor(props){
      super(props)
      this.state={
        formInfo:{}
      }
    }

    componentWillMount(){

      
      //此处应该发出用户信息的请求，获取之前该表格内容回填
      let that = this ; 
      fetchData({
        url: api.QUERY_Hospital,
        body: {},
        type: 'application/json',
        success: data => {
          if (data.status) {

            let info = data.result;
            if(info.investigationGuid){
              Guid = info['investigationGuid']
            }else if(info.investigationOrgGuid){
              OrgGuid = info['investigationOrgGuid']
            }
           
            //回填数据操作
            that.setState({
              formInfo:data.result || {}
            })
          } else {
            message.error(data.msg);
          }
        }
      })
      
    }


    render(){
      return(
        <WrappedRegistrationForm formInfo={this.state.formInfo} ></WrappedRegistrationForm>
      )
    }
}

export default Report2;