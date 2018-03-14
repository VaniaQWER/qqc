import React, { Component } from 'react';
import { Form, Button ,Row ,Input ,message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
const FormItem = Form.Item;

class EditPwdFormWrapper extends Component {
			state = {
				confirmDirty: false,
				data:{}
			};
			handleSubmit = (e) => {
					e.preventDefault();
					
					let that = this ;
					this.props.form.validateFieldsAndScroll((err, values) => {
						if (!err) {
								//这里的values是json数据。
								
								fetchData({
									url: api.CHANGEPwd,
									body: querystring.stringify(values),
									success: data => {
											if (data.status) {
												message.success('操作成功')
												that.props.signout.push({
													pathname: '/',
												})
											} else {
											message.error(data.msg);
											}
									}
								})
						}
					});
			}
			compareToFirstPassword = (rule, value, callback) => {
				const form = this.props.form;
				debugger
				if (value && value !== form.getFieldValue('newPwd')) {
					callback('填写的新密码需要保持一致!');
				} else {
					callback();
				}
			}
			handleConfirmBlur = (e) => {
				const value = e.target.value;
				this.setState({ confirmDirty: this.state.confirmDirty || !!value });
			}
			componentWillReceiveProps = nextProps => {
					this.setState({
					data: nextProps.formInfo
					})
			}
	render () {
			const { getFieldDecorator } = this.props.form;
			// const { data } = this.state; 
			return (
				<Row style={{display:'flex',justifyContent:'center',margin:'50px 230px 50px 0px'}}>
					<Form onSubmit={this.handleSubmit} >
							<FormItem
									label="新密码"
								>
									{getFieldDecorator('newPwd', {
										rules: [{
											required: true, message: '请输入密码！',
										}, {
											validator: this.validateToNextPassword,
										}],
									})(
										<Input type="password"  style={{width:250}}/>
									)}
							</FormItem>
							<FormItem
								label="重复密码"
							>
								{getFieldDecorator('repeatNewPwd', {
									rules: [{
										required: true, message: '请再次输入新密码！',
									}, {
										validator: this.compareToFirstPassword,
									}],
								})(
									<Input type="password" onBlur={this.handleConfirmBlur}  style={{width:250}} />
								)}
							</FormItem>
							<Button type="primary" htmlType="submit" className="login-form-button" style={{width:250}}>
							确定
							</Button>
					</Form>
				</Row>
			)
	}
}
const EditPwdForm = Form.create()(EditPwdFormWrapper);

export default class EditPwd extends Component{
    constructor(props){
        super(props)
        this.state={
          formInfo:{}
        }
      }
      render(){
        return(
          <EditPwdForm formInfo={this.state.formInfo} signout={this.props.router}></EditPwdForm>
        )
      }
}