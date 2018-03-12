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

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 9 },
    //     md: { span: 6 },
    //     lg: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 24 },
    //     md: { span: 24 },
    //     lg: { span: 24},
    //   },
    // };
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
      <h2 style={styles.head}>5.4质量和风险管理</h2>
        <Form onSubmit={this.handleSubmit}>
          <div style={styles.formWarp}>
          
            <Card style={styles.card}>
              <Col span={24}>
              是否建立院级主管领导、医疗业务管理部门、医疗器械管理部门、临床使用部门、后勤保障、信息中心等部门共同组成的医疗器械安全管理和质量控制组织？
              </Col>  
              <Col span={24}>
                <FormItem>
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
            </Card> 
            <Card style={styles.card}>
              <Col span={24}>
              是否建立的医疗器械质量和安全管理规划、计划？
              </Col>  
              <Col span={24}>
                <FormItem>
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
            </Card> 
            <Card style={styles.card}>
              <Col span={24}>
              医疗质量监控考核指标中是否包括医疗器械质量控制的内容？
              </Col>  
              <Col span={24}>
                <FormItem>
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
            </Card> 

            <Card style={styles.card}>
              <Col span={24}>
              已建立的质控管理制度和流程
              </Col>  
              <Col span={24}>
              <FormItem>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  // rules:[
                  //   {
                  //     required:true,message:'请选择，不能为空！'
                  //   }
                  // ]
                })(
                  <Checkbox.Group>
                      <Col xxl={8} xl={12}>
                      <Checkbox value={'1'} >采购、验收、预防性维护、维修、质量检测、处置制度与流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'2'} >临床使用部门管理制度</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'3'} >医疗器械医疗不良事件报告与处理制度与流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'4'} >急救和生命支持医疗器械应急调配与保障完好待用状态制度与流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'21'} >甲乙类大型医疗设备的使用制度和流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'5'} >植入和介入类器械管理制度和流程</Checkbox>
                      </Col>
                    
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'6'} >一次性使用医疗器械的使用管理制度和流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'7'} >医疗器械应用质量分析与评价制度和流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'7'} >使用环境与支持系统质量管理制度和流程</Checkbox>
                      </Col>
                      
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'6'} >院内物流全生命周期溯源管理制度和流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'7'} >医疗器械合理使用评价制度和流程</Checkbox>
                      </Col>
                      <Col xxl={8} xl={12}>
                        <Checkbox value={'7'} >人员培训考核制度与流程</Checkbox>
                      </Col>
                    
                  </Checkbox.Group>
                )}
              </FormItem>
              </Col>
            </Card> 
            <Card style={styles.card}>
              <Col span={24}>
                专职的医疗器械质控管理人员 <br/>
                从事医院医疗器械质量安全的制度制定、方案规划、监督实施等管理工作的人数:&nbsp;&nbsp;

                <FormItem style={{    display: 'inline-block',
                  verticalAlign: 'middle',marginTop:15}}>
                  {getFieldDecorator('buildFlag', {
                    rules: [{ type:'number', required: true, message: '请选择, 不能为空' }],
                  })(
                    <InputNumber style={{width: 150}} />
                  )}
                </FormItem> 
                <span>&nbsp;&nbsp;人</span>
              </Col>
            </Card> 

            <Card style={styles.card}>
              <Col span={24}>
              专业质控设备
              </Col>  
              <Col span={24}>
              <FormItem>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox.Group>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'1'} >电气安全分析仪</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'2'} >气流分析仪</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'3'} >患者模拟器</Checkbox>
                      </Col>
                      
                      <Col span={6}>
                        <Checkbox value={'3'} >电刀分析仪</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'1'} >婴儿培养箱分析仪</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'2'} >输液设备分析仪</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'3'} >除颤分析仪</Checkbox>
                      </Col>
                      
                      <Col span={6}>
                        <Checkbox value={'3'} >血透分析仪</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'1'} >磁共振性能模体</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'2'} >漏射线巡检仪</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'3'} >CT计量模体</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'3'} >X射线测试工具</Checkbox>
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
                已开展的医疗器械质量控制管理业务
              </Col>  
              <Col span={24}>
              <FormItem>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox.Group>
                      <Col xxl={6} xl={12}>
                      <Checkbox value={'1'} >大型设备配置许可</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >厂商与供应商评价</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >大型医用设备临床使用记录</Checkbox>
                      </Col>
                      
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >急救和生命支持设备完好待用状态管理</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                      <Checkbox value={'1'} >大型设备机房环境监测并有记录</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >放射辐射类设备机房防护检测并有记录</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >库房环境定期检查并有记录</Checkbox>
                      </Col>
                      
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >医疗器械不良事件报告、记录和分析</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                      <Checkbox value={'1'} >对医学工程技术人员培训</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >对临床使用人员培训</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >预防性维护并有记录</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'3'} >开展设备巡检并有记录</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                      <Checkbox value={'1'} >医疗器械应用质量分析与评价</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >医疗器械合理使用评价</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >其他:&nbsp;&nbsp;
                            <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                              {getFieldDecorator('qitaneirong')(
                                <Input/>
                              )}
                            </FormItem>
                          </Checkbox>
                      </Col>
                    
                    
                  </Checkbox.Group>
                )}
              </FormItem>
              </Col>
            </Card> 


            <Card style={styles.card}>
              <Col span={24}>
              已开展PM（含巡检、质量检测）的设备种类与数量
              </Col>
              <Col span={24}>
              <FormItem>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox.Group>
                    <Row style={{marginTop:10}}> 
                      <Col xxl={6} xl={12}>
                      <Checkbox value={'1'} >呼吸机 ( 年PM次数：
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                            <InputNumber min={0} max={99999999999}/>
                          )}
                        </FormItem>
                        
                      )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >监护仪 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >除颤仪 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >高频电刀 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >输注泵 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >血透机 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >婴儿培养箱 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >普通放射类 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                        )</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >超声影像设备 ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >CT ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >MR ( 年PM次数：
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('in-chuangwei', { initialValue: 0 })(
                              <InputNumber min={0} max={99999999999}/>
                            )}
                          </FormItem>
                          
                        )</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
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
              选择在近五年参加过含医学装备管理内容的以下评审和检查
              </Col>  
              <Col span={24}>
              <FormItem>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox.Group>
                      <Col xxl={6} xl={8}>
                      <Checkbox value={'1'} >国家卫生计生委医院管理评审</Checkbox>
                      </Col>
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'2'} >地方等级医院评审</Checkbox>
                      </Col>
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'3'} >JCI评审</Checkbox>
                      </Col>
                      
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'3'} >ISO9000质量体系评审</Checkbox>
                      </Col>
                      <Col xxl={6} xl={8}>
                      <Checkbox value={'1'} >区域质量控制检查</Checkbox>
                      </Col>
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'2'} >三好一满意</Checkbox>
                      </Col>
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'3'} >质量万里行</Checkbox>
                      </Col>
                      
                      <Col xxl={6} xl={8}>
                        <Checkbox value={'3'} >未参加</Checkbox>
                      </Col>
                      <Col xxl={6} xl={12}>
                        <Checkbox value={'2'} >其他:&nbsp;&nbsp;
                          <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('qitaneirong',)(
                              <Input/>
                            )}
                          </FormItem>
                        </Checkbox>
                    </Col>  
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