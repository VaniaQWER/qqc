/**
 * @file 注册
 * @summary 注册页面
 * @author Vania
 */
import React, { Component } from 'react';
import { Steps, Icon,Row,Col,Button,Form,Select ,Input,Alert,message,Upload,Modal,Cascader} from 'antd';
import { Link } from 'react-router';
import { fetchData } from 'utils/tools';
import api from 'api';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;


class StepOneForm extends Component{
    state = {
        dirtyClick: false,
        orgName: this.props.data ?this.props.data.orgName :"",
        dataSource:[],
        previewVisible: false,
        previewImage: '',
        fileList: this.props.data ? this.props.data.picFile :[],
        initData:this.props.data,
        disabled:false

    }
    normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    componentDidMount = () => {
        //查询机构列表
        fetchData({
            url: api.SEARCH_ORGS,
            success: data => {
                if(data.length >0 ){
                    this.setState( {dataSource : data})
                }
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({dirtyClick: true})
        this.props.form.validateFields((err, values) => {
            this.setState({dirtyClick: false})
          if (!err) {
                if(this.state.fileList.length === 0)
                {
                    return message.error("请上传附件!")
                }
                values.auditTfAccessory = this.state.fileList[0].thumbUrl;
                values.picFile = this.state.fileList;
                values.orgName = this.state.orgName;
                console.log('partOne--postData--1', values);
                this.props.cb(1,values);
          }
        })
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
    
    handleChange = ({ fileList }) => this.setState({ fileList })
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { 
                span: 12,
            },
          };
        const tailFormItemLayout = {
            wrapperCol: {
              span: 14,
              offset: 6,
            },
        };
        const { initData } = this.state;
       
        return(

            <Form style={{marginTop: '16px'}} onSubmit={this.handleSubmit}>
                <FormItem
                {...formItemLayout}
                label="机构"
                >
                {getFieldDecorator('orgId',{
                    initialValue:initData.orgId,
                    rules: [{ required: true, message: '请选择机构!' }],
                    })(
                    <Select onSelect={(value,option)=>{
                            this.setState({ orgName: option.props.children})
                            if(option.props.tfAccessory){
                                this.setState({
                                    fileList:[{
                                        uid: -1,
                                        name: '图片.png',
                                        status: 'done',
                                        url: api.LOADPIC + option.props.tfAccessory,
                                    }]
                                })
                            }else{
                                this.setState({fileList:[]})
                            }
                            if(option.props.auditOrgCode){
                                this.props.form.setFieldsValue({
                                    auditOrgCode: option.props.auditOrgCode,
                                })
                                this.setState({ disabled:true})
                            }else{
                                this.props.form.setFieldsValue({
                                    auditOrgCode:"",
                                })
                                this.setState({ disabled:false})
                            }

                        }}
                        showSearch
                        allowClear={true}
                        placeholder="请选择"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {
                            this.state.dataSource.map((item,index)=>{
                              return  <Option auditOrgCode={item.orgCode} tfAccessory={item.tfAccessory} key={index} value={item.value.toString()}>{item.text}</Option>
                            })
                        }
                    </Select>
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="组织机构代码"
                >
                {getFieldDecorator('auditOrgCode',{
                    initialValue:initData.auditOrgCode,
                    rules: [{ required: true, message: '请输入组织机构代码号!' },
                    {max:25,message:'字符长度不能超过25'}, ],
                    })(
                    <Input placeholder="请输入组织机构代码号" disabled={this.state.disabled}/>
                    )
                }
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
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.dirtyClick}>下一步</Button>
               </FormItem>
            </Form>
        )
    }
}
const StepOne = Form.create()(StepOneForm);

class StepTwoForm extends Component{
    state ={
        address:[],
        dirtyClick: false,
        emailOptions: [],
        secondData:"",
    }
    componentDidMount = () => {
        fetchData({
            url: api.CITY,
            method: 'get',
            type: 'application/json',
            success: data => this.setState({address: data})
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({dirtyClick: true})
        this.props.form.validateFields((err, values) => {
            this.setState({dirtyClick: false})
          if (!err) {
            console.log('partOne--postData--', values);
            this.setState({secondData:values});
            this.props.cb(2,values);
          }
        })
    }
    //验证邮箱
    emailAutoCompeleteCheck = (value) => {
        let emailOptions;
        if (!value || value.indexOf('@') >= 0) {
          emailOptions = [];
        } else {
          emailOptions = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
            const email = `${value}@${domain}`;
            return <Option key={email}>{email}</Option>;
          });
        }
        return emailOptions;
    }
    emailHandleChange = (value) => {
        this.setState({ emailOptions: this.emailAutoCompeleteCheck(value) });
    }
    //验证密码
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('pwd')) {
          callback('密码不一致!');
        } else {
          callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirmPwd'], { force: true });
        }
        callback();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { 
                span: 12
            },
          };
        const tailFormItemLayout = {
            wrapperCol: {
              span: 14,
              offset: 6,
            },
        };
        return(
            <Form style={{marginTop: '16px'}} onSubmit={this.handleSubmit}>
            <Row>
                <Col span={12}>
                <FormItem
                    {...formItemLayout}
                    label="账号"
                    >
                    {getFieldDecorator('userNo',{
                        initialValue:this.props.data !=="" ?this.props.data.userNo :"",
                        rules: [{ required: true, message: '请输入邮箱作为登录账号!' },
                        {type: 'email', message: '邮箱格式不正确(例如:phxl@163.com)'},
                        {max:25,message:'字符长度不能超过23'}],
                    })(
                        <Select  mode="combobox"
                        style={{ width: '100%' }}
                        onChange={this.emailHandleChange}
                        filterOption={false}
                        placeholder="请输入邮箱作为登录账号"
                        >
                        {this.state.emailOptions}
                        </Select>
                    )
                    }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="密码"
                    >
                    {getFieldDecorator('pwd',{
                        initialValue:this.props.data !=="" ?this.props.data.pwd :"",
                        rules: [
                            {required: true, message: '输入账户密码'},
                            {max:50,message:'字符长度不能超过50'}, 
                            {validator: this.checkConfirm}],
                    })(
                        <Input placeholder="请输入账户密码"/>
                        )
                    }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    >
                    {getFieldDecorator('confirmPwd',{
                        initialValue:this.props.data !=="" ?this.props.data.confirmPwd :"",
                        rules: [
                            {required: true, message: '请确认账户密码!' }, 
                            {max:50,message:'字符长度不能超过50'}, 
                            {validator: this.checkPassword}],
                    })(
                        <Input placeholder="请确认账户密码"/>
                        )
                    }
                    </FormItem>
                    <FormItem
                        label='科室'
                        {...formItemLayout}
                    >  
                        {getFieldDecorator('a', {
                        rules: [{ required: true, message: '请输入科室' }],
                        initialValue:this.props.data !=="" ?this.props.data.a :"",
                        })(
                        <Input  placeholder="请输入科室"/>
                        )}
                    </FormItem>
                    <FormItem
                        label='职务'
                        {...formItemLayout}
                    >  
                        {getFieldDecorator('b', {
                        rules: [{ required: true, message: '请输入职务' }],
                        initialValue:this.props.data !=="" ?this.props.data.b :"",
                        })(
                        <Input placeholder="请输入职务"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    >
                    {getFieldDecorator('userName',{
                        initialValue:this.props.data !=="" ?this.props.data.userName :"",
                        rules: [{ required: true, message: '请输入相关业务联系人姓名!' },
                        {max:25,message:'字符长度不能超过25'}, ],
                    })(
                        <Input placeholder="请输入相关业务联系人姓名"/>
                        )
                    }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="联系电话"
                    >
                    {getFieldDecorator('mobilePhone',{
                        initialValue:this.props.data !=="" ?this.props.data.mobilePhone :"",
                        rules: [{ required: true, message: '请输入联系电话!' },
                        {max:15,message:'字符长度不能超过15'}, ],
                    })(
                        <Input placeholder="请输入联系电话"/>
                        )
                    }
                    </FormItem>
                    <FormItem
                        label='邮箱'
                        {...formItemLayout}
                    >  
                        {getFieldDecorator('email', {
                        initialValue:this.props.data !=="" ?this.props.data.email :"",
                        })(
                        <Input placeholder="请输入邮箱"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="所在地"
                    >
                    {getFieldDecorator('address', {
                        initialValue: ['湖北', '武汉', '江汉区'],
                        rules: [{ type: 'array' },{ required: true, message: '请选择省市区!' }],
                        })(
                        <Cascader  options={this.state.address} changeOnSelect placeholder='请选择'/>
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="地址"
                    >
                    {getFieldDecorator('userAddress',{
                        initialValue:this.props.data !=="" ?this.props.data.userAddress :"",
                        rules: [{ required: true, message: '请输入联系地址!' },
                        {max:100,message:'字符长度不能超过100'}, ],
                    })(
                        <Input placeholder="请输入联系地址"/>
                        )
                    }
                    </FormItem>
                </Col>
            </Row>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={this.state.dirtyClick}>下一步</Button>
                <Button type="danger" style={{marginLeft:'16px'}} ghost onClick={this.props.cb.bind(this, 0, this.props.data)}>
                    <Icon type="left" />上一页
                </Button>
           </FormItem>
        </Form>
        )
    }
}
const StepTwo = Form.create()(StepTwoForm);
class StepThree extends Component{
    //注册数据交互
    save = ()=>{
        const firstData = this.props.firstData;
        const secondData = this.props.secondData;
        const postData = {...firstData,...secondData};
        console.log(postData,'注册数据')
        fetchData({
            url: api.USERREGISTER,
            body: JSON.stringify(postData),
            success: data => {
              if (data.status) {
                this.props.cb(3);
              }else{
                message.error(data.msg)
              }
            },
            type:'application/json'
          })
       
    }
    render(){
        const firstData = this.props.firstData;
        const secondData = this.props.secondData;
        return(
            <Row style={{marginTop:16}}>
                <Col span={12} offset={6}>
                    <Alert message="基本信息已经输入完毕，如下信息确认无误后提交审核：" type="success" showIcon />
                    <div className="ant-row">
                        <div className="ant-col-8 ant-form-item-label-left">
                            <label>医疗机构</label>
                        </div>
                        <div className="ant-col-16">
                            <div className="ant-form-item-control">
                                { firstData.orgName }
                            </div>
                        </div>
                    </div>
                    <div className="ant-row">
                        <div className="ant-col-8 ant-form-item-label-left">
                            <label>组织机构代码</label>
                        </div>
                        <div className="ant-col-16">
                            <div className="ant-form-item-control">
                                { firstData.auditOrgCode }
                            </div>
                        </div>
                    </div>
                    <div className="ant-row">
                        <div className="ant-col-8 ant-form-item-label-left">
                            <label>业务联系人姓名</label>
                        </div>
                        <div className="ant-col-16">
                            <div className="ant-form-item-control">
                                { secondData.userName }
                            </div>
                        </div>
                    </div>
                    <div className="ant-row">
                        <div className="ant-col-8 ant-form-item-label-left">
                            <label>业务联系人电话</label>
                        </div>
                        <div className="ant-col-16">
                            <div className="ant-form-item-control">
                                { secondData.mobilePhone }
                            </div>
                        </div>
                    </div>
                    <div className="ant-row">
                        <div className="ant-col-8 ant-form-item-label-left">
                            <label>业务联系人地址</label>
                        </div>
                        <div className="ant-col-16">
                            <div className="ant-form-item-control">
                                { secondData.userAddress }
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop:16}}>
                        <Button type="primary" onClick={this.save} >下一步</Button>
                        <Button type="danger" style={{marginLeft:'16px'}} ghost onClick={this.props.cb.bind(this, 1,this.props.secondData)}>
                            <Icon type="left" />上一页
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}

class StepFour extends Component{
    render(){
        const message = "您的账号:"+ this.props.data.userNo + ";正在审核,请耐心等待...";
        return(
           <div style={{marginTop:48,textAlign:"center"}}>
               <Alert
                    message="恭喜！"
                    description={message}
                    type="success"
                />
            <Link  to='/login'>前往登录界面</Link>
           </div>
        )
    }
}


class RegisterHosptital extends Component {
    state ={
        current: 0,
        firstData: "",
        secondData: "",
        postData: ""
    }
    goIndex = (index) => {
        this.setState({
          current: index
        })
    }
    
    render(){
        const { current } = this.state;
        const steps = [{
            title: '基础信息',
            content: <StepOne
            data={this.state.firstData}
            cb={(index,data)=>{
               this.goIndex(index)
               this.setState({ firstData : data})
            }}
            />,
            icon:'user'
          }, {
            title: '账号信息',
            content: <StepTwo
            data={this.state.secondData}
            cb={(index,data)=>{
               this.goIndex(index)
               this.setState({ secondData : data})
            }}
            />,
            icon: 'solution'
          }, {
            title: '提交审核',
            content: <StepThree
            firstData={this.state.firstData}
            secondData={this.state.secondData}
            cb={(index,data) =>{ 
                this.setState({ postData: data})
                this.goIndex(index)
            }}
            />,
            icon: 'credit-card'
          }, {
            title: '审核状态',
            content: <StepFour
            data={this.state.secondData}
            cb={index => this.goIndex(index)}
            />,
            icon: 'smile-o'
          }];
          const bg = "zcbg" + current;
        return(
            <div className={bg}>
            <Row>
                <Col span={8}>
                    <div className="back">
                        <Link to='/login'>返回首页</Link>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{paddingTop:"14%"}}>
                        <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon} />}/>)}
                        </Steps>
                        <div className="steps-content">{steps[this.state.current].content}</div>
                    </div>
                </Col>
            </Row>
            </div>
        )
    }
}

export default RegisterHosptital;