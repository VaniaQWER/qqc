/**
 * @file 新增用户
 */
import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Upload, Modal, 
        Icon, Breadcrumb, Button,message } from 'antd';
import { Link ,hashHistory} from 'react-router';
import SearchSelect from 'component/searchSelect';
import api from 'api';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';

const { RemoteSelect } = SearchSelect;
const FormItem = Form.Item;
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

class UserAddForm extends Component {
  state = {
    base: true,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    other: true,
    orgId:this.props.location.state? this.props.location.state.user.orgId : ""
  }
  componentDidMount = () => {
    const { location } = this.props;
    if (typeof location.state === 'undefined') {
      this.setState({
        base: false,
        other: false
      })
    } else {
      if (location.state.type === '详情') {
        this.setState({
          base: true,
          other: true
        })
      } else {
        this.setState({
          base: true,
          other: false
        }) 
      }
    }
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
  submitHandler = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.orgId = this.state.orgId;
        if(this.props.location.state ){
          values.userId = this.props.location.state.user.userId;
        }
        console.log(values,'111')
        fetchData({
          url: api.ADDUPDATEUSER,
          body: querystring.stringify(values),
          success: data => {
            if (data.status) {
              message.success('操作成功!')
              hashHistory.push('/user/userInfo')
            } else {
              message.error(data.msg);
            }
          }
        })
      }
    });
  }
  change = (value) => {
    fetchData({
      url: api.SEARCH_ORGS_LIST,
      body: querystring.stringify({orgId: value}),
      success: data => {
        this.setState({orgId:value})
        this.props.form.setFieldsValue({
         orgCode: data.result.rows[0].orgCode
          })
        }
    })
  }
  render () {
    const { base, other, previewVisible, previewImage, fileList } = this.state;
    const { form, location } = this.props;
    const { state } = location;
    console.log(this.props.location.state)
    return (
      <Row style={{padding: 8}} className={'right_content'}>
        {
          state ? 
          <Breadcrumb style={{marginBottom: 10, fontSize: '1.1em'}}>
            <Breadcrumb.Item><Link to='/user/userInfo'>用户管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{ state.type }</Breadcrumb.Item>
          </Breadcrumb>
          : null
        }
        <Form
          onSubmit={this.submitHandler}
        >
          <Col span={24}>
            <Card title={'基础信息'}>
              <FormItem
                label='医院'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('orgId', {
                  //rules: [{ required: true, message: '请选择医院' }],
                  initialValue: state ? state.user.orgName : null
                })(
                  state ? <Input disabled={base}/> : 
                  <RemoteSelect url={api.SEARCH_ORGS} cb={value => this.change(value)}/>
                )}
              </FormItem> 
              <FormItem
                label='组织机构代码'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('orgCode', {
                  rules: [{ required: true, message: '组织机构代码不能为空'}],
                  initialValue: state ? state.user.orgCode : null
                })(
                  <Input disabled={true}/>
                )}
              </FormItem> 
              <FormItem
                label='缩略图'
                {...formItemLayout}
              >  
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
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
            </Card>
          </Col>
          <Col span={24}>
            <Card title={'账号信息'} style={{marginTop: 20}}>
              <FormItem
                label='账号'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('userNo', {
                  rules: [{ required: true, message: '请输入账号' }],
                  initialValue: state ? state.user.userNo : null
                })(
                  <Input disabled={other}/>
                )}
              </FormItem>
              {
                state  ? null :
                <div>
                <FormItem
                label='密码'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('pwd', {
                  rules: [{ required: true, message: '请输入密码' }],
                  initialValue: state ? state.user.pwd : null
                })(
                  <Input type='password' disabled={other}/>
                )}
              </FormItem>
              <FormItem
                label='确认密码'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('confirmPwd', {
                  rules: [{ required: true, message: '请二次输入密码' }],
                  initialValue: state ? state.user.pwd : null
                })(
                  <Input type='password' disabled={other}/>
                )}
              </FormItem>
              </div>

              }
              <FormItem
                label='联系人'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入联系人' }],
                  initialValue: state ? state.user.userName : null
                })(
                  <Input disabled={other}/>
                )}
              </FormItem>
              <FormItem
                label='联系电话'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('mobilePhone', {
                  rules: [{ required: true, message: '请输入联系电话' }],
                  initialValue: state ? state.user.mobilePhone : null
                })(
                  <Input disabled={other}/>
                )}
              </FormItem>
              <FormItem
                label='联系地址'
                {...formItemLayout}
              >  
                {form.getFieldDecorator('userAddress', {
                  rules: [{ required: true, message: '请输入联系地址' }],
                  initialValue: state ? state.user.userAddress : null
                })(
                  <Input disabled={other}/>
                )}
              </FormItem>
            </Card>
          </Col>
          <Col span={24} style={{textAlign: 'center', marginTop: 10}}>
            <Button htmlType='submit' type='primary'>
            {
              (typeof state === 'undefined' || state.type === '编辑') ? '提交' : '通过'
            }    
            </Button>
            <Button type='danger' onClick={() => form.resetFields()} style={{marginLeft: 20}}>重置</Button>
          </Col>
        </Form>
      </Row>
    )
  }
}
const UserAdd = Form.create()(UserAddForm);
export default UserAdd;