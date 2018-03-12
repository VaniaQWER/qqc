import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form , Row , Col , Checkbox , Button , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
/**
 * @file 2医疗机构基本情况
 */

const FormItem = Form.Item;
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
class RegistrationForm62 extends React.Component {
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
        xs: { span: 0 },
        sm: { span: 0 },
        md: { span: 0 },
        lg: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset:11,
        },
        md: { 
          span: 14,
          offset:11,
        },
        lg: { 
          span: 14,
          offset:11,
         },
      },
    };

    return (

      <div style={styles.container}>
      <h2 style={styles.head}>6.2耗材信息化现状</h2>
      <Form onSubmit={this.handleSubmit}>
        <div style={styles.formWarp}>
       
        <Row>
          <Col span={4}> &nbsp;</Col>
          <Col span={3} style={{textAlign: 'center'}}>医用耗材采购管理OA</Col>
          <Col span={3} style={{textAlign: 'center'}}>耗材物流管理</Col>
          <Col span={4} style={{textAlign: 'center'}}>植入/介入类耗材追溯管理</Col>
          <Col span={3} style={{textAlign: 'center'}}>耗材使用数据分析与应用</Col>
          <Col span={3} style={{textAlign: 'center'}}>产品与供应商资质管理</Col>
          <Col span={3} style={{textAlign: 'center'}}>供应商服务能力评价</Col>
        </Row>

        <Row>
          <Col span={4} style={{textAlign: 'center', border:'1px'}}>是否建立</Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                  <Checkbox value={'1'} ></Checkbox>
              )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
              <FormItem {...formItemLayout} >
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                  <Checkbox value={'1'} ></Checkbox>
              )}
              </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={4} style={{textAlign: 'center', border:'1px'}}>是否属于HRP中模块</Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                  <Checkbox value={'1'} ></Checkbox>
              )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
              <FormItem {...formItemLayout} >
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                  <Checkbox value={'1'} ></Checkbox>
              )}
              </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreemen43t', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement123', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement32', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('agreement12', {
              valuePropName: 'checked',
            })(
                <Checkbox value={'1'} ></Checkbox>
            )}
            </FormItem>
          </Col>
        </Row>
        </div>
        <Row>
          <FormItem {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit" >保存</Button>
          </FormItem>
        </Row>
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm62);


class Report62 extends Component {


    constructor(props){
      super(props)
      this.State={
        formInfo:{}
      }
    }

    componentWillMount(){

      const testData = {
        agreement:true
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

export default Report62;