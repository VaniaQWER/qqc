import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form , Input , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
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

class RegistrationForm2 extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //这里的values是json数据。

        fetchData({
          url: api.INSERT_CONSTR_DEPT,
          body: JSON.stringify(values),//querystring.stringify(postData),
          type: 'application/json',
          success: data => {
            if (data.status) {
              this.props.form.resetFields();
              message.success('操作成功')
              this.props.setProgress(0)
            } else {
              message.error(data.msg);
            }
          }
        })
      }
    });
  }
  componentDidMount = () => {
    console.log(this.props.formInfo)
    const { formInfo } = this.props ; 
    this.props.form.setFieldsValue(formInfo)
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

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
          {getFieldDecorator('yiyuanmingchen', {
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
          {getFieldDecorator('yiyuandengjihao', {
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
          {getFieldDecorator('radio-group',{
            rules: [
              { required: true, message: '请选择医疗机构等级！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="a">三甲</Radio>
              <Radio value="b">三乙</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="医院类型"
        >
          {getFieldDecorator('yiyuantype',{
            rules: [
              { required: true, message: '请选择医院类型！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="a">综合性医院</Radio>
              <Radio value="b">专科医院</Radio>
              <Radio value="b">中医院</Radio>
              <Radio value="b">中西医结合医院</Radio>
              <Radio value="b">其他</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="医院性质"
        >
          {getFieldDecorator('yiyuanxingzhi',{
            rules: [
              { required: true, message: '请选择医院性质！' , whitespace: true},
              ],
          })(
            <RadioGroup>
              <Radio value="a">公立医院</Radio>
              <Radio value="b">非公立医院</Radio>
              <Radio value="c">教学医院</Radio>
              <Radio value="d">非教学医院</Radio>
              <Radio value="e">其他</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="编制床位数"
        >
          {getFieldDecorator('in-chuangwei', {
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
          {getFieldDecorator('open-chuangwei', {
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
          {getFieldDecorator('deptnum',{
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
          {getFieldDecorator('deptnum-weisheng', {
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
          {getFieldDecorator('deptnum-admin', {
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
      this.State={
        formInfo:{}
      }
    }

    componentWillMount(){

      const testData = {
        yiyuanmingchen:"湖北省中医院",
        yiyuandengjihao:"999999-HAHAHAH"
      }
      this.setState({
        'formInfo':testData
      })
      

      //此处应该发出用户信息的请求，获取之前该表格内容回填
      // fetchData({
      //   url: api.INSERT_CONSTR_DEPT,
      //   body: JSON.stringify({'userid':'12314546'}),//querystring.stringify(postData),
      //   type: 'application/json',
      //   success: data => {
      //     if (data.status) {
      //       //回填数据操作
      //       this.setState({
      //         formInfo:testData
      //       })
      //     } else {
      //       message.error(data.msg);
      //     }
      //   }
      // })
      
    }


    render(){
      return(
        <WrappedRegistrationForm formInfo={this.state.formInfo} ></WrappedRegistrationForm>
      )
    }
}

export default Report2;