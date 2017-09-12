// import React, { Component } from 'react';
// import { Form, Button } from 'antd';
// const FormItem = Form.Item;

// class EditPwdFormWrapper extends Component {
//   render () {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <FormItem
//           label="新密码"
//         >
//           {getFieldDecorator('newPwd', {
//             rules: [{ required: true, message: '请输入新密码' }],
//           })(
//             <Input type="password" placeholder="输入新密码" />
//           )}
//         </FormItem>
//         <FormItem
//         label="重复新密码"
//         >
//           {getFieldDecorator('repeatNewPwd', {
//             rules: [{ required: true, message: '请重复新密码' }],
//           })(
//             <Input  type="password" placeholder="重复新密码" />
//           )}
//         </FormItem>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           确定
//         </Button>
//       </Form>
//     )
//   }
// }
// const EditPwdForm = Form.create()(EditPwdFormWrapper);
// const EditPwd = () => (
//   <Modal
//     title="修改密码"
//     visible={this.state.visible}
//     onOk={this.hideModal}
//     onCancel={this.hideModal}
//     okText="确认"
//     cancelText="取消"
//   >
//     <p>Bla bla ...</p>
//     <p>Bla bla ...</p>
//     <p>Bla bla ...</p>
//   </Modal>
// )