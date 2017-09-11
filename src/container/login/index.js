/**
 * @file 登录
 * @summary 登录页面
 * @author Vania
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert,message } from 'antd';
import { Link } from 'react-router';
import api from 'api';
import { fetchData } from 'utils/tools';
import md5 from 'md5';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  state ={
    loading: false,
    alert: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let pwd = md5(values.password);
        console.log(values,"登录数据")
        fetchData({
          url: api.USERLOGIN,
          body: 'userNo='+values.userName+'&pwd=' + pwd + '&token=vania',
          success: data => {
            if (!data.result.userInfo) {
              message.error(data.result.loginResult)
            } else {
              this.props.login.push({
                pathname: 'home',
                state: { tips: data.result.loginResult }
              })
            }
          }
        })
      }

    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bg">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名!'}],
              })(
                <Input addonBefore={<Icon type='user'/>} placeholder='用户名'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
              )}
            </FormItem>
            {this.state.alert ? <Alert  onClose={this.onClose} message="网络异常" closable type="error" showIcon /> : null}
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我!</Checkbox>
              )}
            <Link className="login-form-forgot" to='/register'>注册</Link>
      
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                登录
              </Button>
            </FormItem>
          </Form>
          </div>
     
    )
  }
}
const LoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
  render () {
    return (
      <div>
         <LoginForm login={this.props.router}/>
      </div>
    )
  }
}
export default Login;