import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form  ,Input, Card , Row , Col , Checkbox , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
/**
 * @file 2医疗机构基本情况
 */

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const styles = {
  row: {
    padding: 8
  },
  col: {
    marginTop: 10
  },
  card: {
    marginTop: 5,
    border:0
  },
  button: {
    marginRight: 20
  },
  tool: {
    marginTop: 10,
    textAlign: 'center'
  },
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
class RegistrationForm52 extends React.Component {
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
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
      },
    };
    const inlineLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
        md: { span: 3 },
        lg: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
        md: { span: 15 },
        lg: { span: 15 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 13,
          offset:11,
        },
        md: { 
          span: 13,
          offset:11,
        },
        lg: { 
          span: 13,
          offset:11,
         },
      },
    };

    return (

      <div style={styles.container}>
      <h2 style={styles.head}>5.3医疗设备维修维护状况</h2>
      <Form onSubmit={this.handleSubmit}  >
        <div style={styles.formWarp}>

        <Row>
          <Col span={6} offset={6}>
            <FormItem 
            {...formItemLayout}
            label='设备维修场地'>
              {getFieldDecorator('buildFlag', {
                rules: [{ required: true, message: '请选择, 不能为空' }],
                //initialValue: updateData.deptName
              })(

                <RadioGroup>
                  <Radio value={'01'}>有</Radio>
                  <Radio value={'00'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem> 
          </Col>
          <Col span={4}>
              <FormItem
              {...formItemLayout}
              label="场地面积"
            >
              {getFieldDecorator('平方米', { initialValue: 0 })(
                <span>
                <InputNumber/>&nbsp;&nbsp;平方米
                </span>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={6}>
            <FormItem 
            {...formItemLayout}
            label='维修备件库房'>
              {getFieldDecorator('buildFlag', {
                rules: [{ required: true, message: '请填写维修备件库房！' }],
                //initialValue: updateData.deptName
              })(

                <RadioGroup>
                  <Radio value={'01'}>有</Radio>
                  <Radio value={'00'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem> 
          </Col>
          <Col span={4}>
              <FormItem
              {...formItemLayout}
              label="场地面积"
            >
              {getFieldDecorator('平方米', { initialValue: 0 })(
                <span>
                <InputNumber/>&nbsp;&nbsp;平方米
                </span>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="维修维护工程师"
        >
        {getFieldDecorator('weixiuweihugongchengshu', { 
          rules:[{
            type:'number',required:true,message:'请填写维修维护工程师数量！'
          }]
        })(
          <span>
          <InputNumber min={0}/>&nbsp;&nbsp;人
          </span>
        )}
      </FormItem>
      <FormItem
      {...formItemLayout}
        label="人员岗位职责划分">
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules:[{
              required:true,message:'请选择人员岗位职责划分！'
            }]
          })(
            <Checkbox.Group>
                <Col span={4}>
                <Checkbox value={'1'} >按临床科室区域划分</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value={'2'} >按设备类型划分</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value={'3'} >无明确划分</Checkbox>
                </Col>
            </Checkbox.Group>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否定时定期轮岗"
        >
          {getFieldDecorator('buildFlag',{
            valuePropName: 'checked',
            rules:[{
              required:true,message:'请选择是否定时定期轮岗！'
            }]
          })(
            <RadioGroup>
              <Radio value={'01'}>有</Radio>
              <Radio value={'00'}>无</Radio>
            </RadioGroup>
          )}
        </FormItem> 


            <FormItem
            {...formItemLayout}
            label="专业维修工具">
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                rules:[{
                  required:true,message:'请选择专业维修工具！'
                }]
              })(
                <Checkbox.Group>
                  <Row style={{marginTop:10}}> 
                    <Col span={4}>
                    <Checkbox value={'1'} >万用表</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={'2'} >示波器</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={'3'} >在线测试仪</Checkbox>
                    </Col>
                    
                    <Col span={24} style={{marginTop:10}}>
                        <Checkbox value={'2'} >其他:&nbsp;&nbsp;
                          <FormItem 
                          style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('qitaneirong',)(
                              <Input/>
                            )}
                          </FormItem>
                        </Checkbox>
                    </Col>          
                  </Row>
                </Checkbox.Group>
              )}
            </FormItem>

              <FormItem
              {...formItemLayout}
              label="应急库房设备">
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  rules:[{
                    required:true,message:'请选择应急库房设备！'
                  }]
                })(
                  <Checkbox.Group>
                    <Row > 
                      <Col span={8}>
                      <Checkbox value={'1'} >监护仪 ( 台数：
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                            <InputNumber min={0} max={99999999999}/>
                          )}
                        </FormItem>
                        
                      )</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value={'2'} >输液泵 ( 台数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value={'2'} >呼吸机 ( 台数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      
                      <Col span={8}>
                        <Checkbox value={'2'} >除颤仪 ( 台数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value={'2'} >其他:&nbsp;&nbsp;
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('qitaneirong',)(
                              <Input style={{width:'145px'}}/>
                            )}
                          </FormItem>
                        </Checkbox>
                      </Col>
                    </Row>
                  
                  </Checkbox.Group>
                )}
              </FormItem>

              <Row>
                <Col span={6} offset={6}>
                  <FormItem 
                  {...formItemLayout}
                  label='应急库房'>
                    {getFieldDecorator('buildFlag', {
                      rules: [{ required: true, message: '请选择, 不能为空' }],
                      //initialValue: updateData.deptName
                    })(

                      <RadioGroup>
                        <Radio value={'01'}>有</Radio>
                        <Radio value={'00'}>无</Radio>
                      </RadioGroup>
                    )}
                  </FormItem> 
                </Col>
                <Col span={4}>
                    <FormItem
                    {...formItemLayout}
                    label="场地面积"
                  >
                    {getFieldDecorator('平方米', { initialValue: 0 })(
                      <span>
                      <InputNumber/>&nbsp;&nbsp;平方米
                      </span>
                    )}
                  </FormItem>
                </Col>
              </Row>


              <Row>
                    
              </Row>
        <Card style={styles.card}>
          <Row span={6}> 
              <FormItem
                {...inlineLayout}
                label="医疗设备维修量(当年):"
              >
              {getFieldDecorator('pingfangmi', { 
                rules:[{
                  required:true,type:'number','message':'请填写医疗设备维修量！'
                }]
              })(
                <span>
                <InputNumber min={0}/>&nbsp;&nbsp;台
                </span>
              )}
            </FormItem>
          </Row>

          <Row span={6}> 
              <FormItem
                {...inlineLayout}
                label="医疗设备维修总费用"
              >
              {getFieldDecorator('pingfangmi', { 
                rules:[{
                  type:'number','message':'请填写医疗设备维修总费用！'
                }]
              })(
                <span>
                <InputNumber min={0}/>&nbsp;&nbsp;万元
                </span>
              )}
            </FormItem>
          </Row>
          
          <Col span={24}>
          其中保修费用：
          </Col>
          <Row span={8}>
            <FormItem
                {...inlineLayout}
                label="原厂保修"
              >
              {getFieldDecorator('pingfangmi', { 
                rules:[{
                  type:'number','message':'请填写原厂保修费用！'
                }]
              })(
                <span>
                <InputNumber min={0}/>&nbsp;&nbsp;万元
                </span> 
              )}
            </FormItem>

            <FormItem
                {...inlineLayout}
                label="第三方维修"
              >
              {getFieldDecorator('pingfangmi',{ 
                rules:[{
                  type:'number','message':'请填写第三方维修费用！'
                }]
              })(
                <span>
                <InputNumber min={0}/>&nbsp;&nbsp;万元
                </span>
              )}
            </FormItem>

          </Row>
          
        </Card> 

        <Card style={styles.card}>
          <Col span={24}>
            自修的医疗设备类型<br/>
            <small>注：请选择具有自修能力且自修比例不低于50%的设备类型</small>
          </Col>  
          <Col span={24}>
          <FormItem>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox.Group>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >普通放射类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >CT/MR类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >血液透析</Checkbox>
                  </Col>
                  
                  <Col span={6}>
                    <Checkbox value={'3'} >超声影像类</Checkbox>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >内窥镜类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >血液净化类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >放疗类</Checkbox>
                  </Col>
                  
                  <Col span={6}>
                    <Checkbox value={'3'} >核医学类</Checkbox>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >检验类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >消毒灭菌类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >呼吸麻醉类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >监护、电生理类</Checkbox>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >输液类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >除颤类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >电刀类</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >病房普通设备</Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Checkbox value={'2'} >其他:&nbsp;&nbsp;
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('qitaneirong',)(
                            <Input/>
                          )}
                        </FormItem>
                      </Checkbox>
                  </Col>
                </Row>
                
                
              </Checkbox.Group>
            )}
          </FormItem>
          </Col>
        </Card> 

        <Card style={styles.card}>
          <Col span={24}>
          已开展的维修技术管理
          </Col>  
          <Col span={24}>
          <FormItem>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox.Group>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >开机率统计分析</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >修复时间统计分析</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >报修响应时间统计分析</Checkbox>
                  </Col>
                  
                  <Col span={6}>
                    <Checkbox value={'3'} >失效模式与影响分析（FMEA）</Checkbox>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}> 
                  <Col span={6}>
                  <Checkbox value={'1'} >根因分析（RCA）</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'2'} >维修后质量检测和校准</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value={'3'} >维修记录档案管理</Checkbox>
                  </Col>
                  
                  <Col span={6}>
                    <Checkbox value={'3'} >售后服务评价</Checkbox>
                  </Col>
                </Row>
              
              </Checkbox.Group>
            )}
          </FormItem>
          </Col>
        </Card> 


        

        </div>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm52);


class Report52 extends Component {


    constructor(props){
      super(props)
      this.State={
        formInfo:{}
      }
    }

    componentWillMount(){

      const testData = {
        caigouzongshu:"湖北省中医院",
        caigounumber:"999999-HAHAHAH"
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

export default Report52;