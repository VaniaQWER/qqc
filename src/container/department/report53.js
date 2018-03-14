import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form  ,Input, Tooltip , Icon , Row , Col , Checkbox , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
/**
 * @file 53
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
const tip='注：请选择具有自修能力且自修比例不低于50%的设备类型'
let Guid = '';
let RepairGuid = '';
class RegistrationForm52 extends React.Component {
  state = {
    confirmDirty: false,
    data:{}
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //这里的values是json数据。
         values.investigationGuid  =  Guid;
         values.investigationRepairGuid  =  RepairGuid;
          for(let item in values ){
            if(!values[item]){
              delete values[item]
            }
          }
          fetchData({
            url: api.ADD_Repair,
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
  componentWillReceiveProps = (nextProps) =>{
    this.setState({
      data:nextProps.formInfo
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } =this.state;
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
          <Col xxl={8} xl={10} offset={6}>
            <FormItem 
            {...formItemLayout}
            label='设备维修场地'>
              {getFieldDecorator('repairSpaceFlag', {
                initialValue: data.repairSpaceFlag
              })(

                <RadioGroup>
                  <Radio value={'01'}>有</Radio>
                  <Radio value={'00'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem> 
          </Col>
          <Col xxl={4} xl={8}>
              <FormItem
              {...formItemLayout}
              label="场地面积"
            >
              {getFieldDecorator('repairSpaceAcreage', { initialValue: data.repairSpaceAcreage })(
               
                <InputNumber min={0}/>
              )}
              <span className="ant-form-text"> 平方米</span>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col  xxl={8} xl={10} offset={6}>
            <FormItem 
            {...formItemLayout}
            label='维修备件库房'>
              {getFieldDecorator('attachmentStorageFlag', {
                initialValue: data.attachmentStorageFlag
              })(

                <RadioGroup>
                  <Radio value={'01'}>有</Radio>
                  <Radio value={'00'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem> 
          </Col>
          <Col xxl={4} xl={8}>
              <FormItem
              {...formItemLayout}
              label="场地面积"
            >
              {getFieldDecorator('attachmentStorageAcreage', { initialValue: data.attachmentStorageAcreage })(
                <InputNumber min={0}/>
              )}
              <span className="ant-form-text"> 平方米</span>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="维修维护工程师"
        >
          {getFieldDecorator('maintenanceEngineer', { 
            initialValue:data.maintenanceEngineer,
          })(
              <InputNumber min={0}/>
          )}
        <span className="ant-form-text"> 人</span>
      </FormItem>
      <FormItem
      {...formItemLayout}
        label="人员岗位职责划分">
          {getFieldDecorator('postDuty', {
            initialValue:data.postDuty,
          })(
            <RadioGroup>
                <Radio value={'01'} >按临床科室区域划分</Radio>
                <Radio value={'02'} >按设备类型划分</Radio>
                <Radio value={'03'} >无明确划分</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否定时定期轮岗"
        >
          {getFieldDecorator('workShiftFlag',{
            initialValue:data.workShiftFlag,
          })(
            <RadioGroup>
              <Radio value={'01'}>是</Radio>
              <Radio value={'00'}>否</Radio>
            </RadioGroup>
          )}
        </FormItem> 


            <FormItem
            {...formItemLayout}
            label="专业维修工具">
              {getFieldDecorator('tool', {
                initialValue:data.tool,
              })(
                <Checkbox.Group>
                  <Row style={{marginTop:10}}> 
                    <Col xxl={4} xl={8}>
                    <Checkbox value={'01'} >万用表</Checkbox>
                    </Col>
                    <Col xxl={4} xl={8}>
                      <Checkbox value={'02'} >示波器</Checkbox>
                    </Col>
                    <Col xxl={4} xl={8}>
                      <Checkbox value={'03'} >在线测试仪</Checkbox>
                    </Col>
                    
                    <Col span={24} style={{marginTop:10}}>
                        <Checkbox value={'99'} >其他:&nbsp;&nbsp;
                          <FormItem 
                          style={{display:'inline-block',verticalAlign:'baseline'}}>
                            {getFieldDecorator('typeOther',{initialValue:data.toolOther})(
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
              {getFieldDecorator('equip', {
                initialValue:data.equip,
              })(
                <Checkbox.Group>
                  <Row > 
                    <Col xxl={8} xl={12}>
                    <Checkbox value={'01'} >监护仪 ( 台数：
                      <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                        {getFieldDecorator('jhysl', { initialValue:data.jhysl})(
                          <InputNumber min={0} max={99999999999}/>
                        )}
                      </FormItem>
                      
                    )</Checkbox>
                    </Col>
                    <Col xxl={8} xl={12}>
                      <Checkbox value={'02'} >输液泵 ( 台数：
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('sybsl', { initialValue: data.sybsl })(
                            <InputNumber min={0} max={99999999999}/>
                          )}
                        </FormItem>
                        
                      )</Checkbox>
                    </Col>
                    <Col xxl={8} xl={12}>
                      <Checkbox value={'03'} >呼吸机 ( 台数：
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('hxysl', { initialValue:data.hxysl })(
                            <InputNumber min={0} max={99999999999}/>
                          )}
                        </FormItem>
                        
                      )</Checkbox>
                    </Col>
                    
                    <Col xxl={8} xl={12}>
                      <Checkbox value={'04'} >除颤仪 ( 台数：
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('ccysl', { initialValue: data.ccysl })(
                            <InputNumber min={0} max={99999999999}/>
                          )}
                        </FormItem>
                      )</Checkbox>
                    </Col>
                    <Col xxl={8} xl={12}>
                      <Checkbox value={'99'} >其他:&nbsp;&nbsp;
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('equipmentOther',{initialValue:data.equipmentOther})(
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
              <Col xxl={8} xl={10} offset={6}>
                <FormItem 
                {...formItemLayout}
                label='应急库房'>
                  {getFieldDecorator('emergencyStorageFlag', {
                    initialValue:data.emergencyStorageFlag,
                  })(

                    <RadioGroup>
                      <Radio value={'01'}>有</Radio>
                      <Radio value={'00'}>无</Radio>
                    </RadioGroup>
                  )}
                </FormItem> 
              </Col>
              <Col xxl={4} xl={8}>
                  <FormItem
                  {...formItemLayout}
                  label="场地面积"
                >
                  {getFieldDecorator('attachmentStorageAcreage', { initialValue: data.attachmentStorageAcreage })(
                    <InputNumber min={0}/>
                  )}
                  <span className="ant-form-text">平方米</span>
                </FormItem>
              </Col>
            </Row>

            <FormItem
              {...formItemLayout}
              label="医疗设备维修量(当年):"
            >
              {getFieldDecorator('repairTotalSl',{ 
                initialValue:data.repairTotalSl,
              })(
                  <InputNumber min={0}/>
              )}
              <span className="ant-form-text"> 台</span>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="医疗设备维修总费用"
              >
              {getFieldDecorator('repairTotalPrice', { 
                initialValue:data.repairTotalPrice,
              })(
                <InputNumber min={0}/>
              )}
              <span className="ant-form-text">万元</span>
            </FormItem>
          
            <Col span={12} offset={6}>
            其中保修费用：
            </Col>
              <FormItem
                  {...formItemLayout}
                  label="原厂保修"
                >
                {getFieldDecorator('originalRepair', { 
                  initialValue:data.originalRepair,
                })(
                  <InputNumber min={0}/>
                )}
                <span className="ant-form-text">万元</span>
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="第三方维修"
                >
                {getFieldDecorator('thirdPartyRepair',{ 
                  initialValue:data.thirdPartyRepair,
                })(
                  <InputNumber min={0}/>
                )}
                <span className="ant-form-text">万元</span>
              </FormItem>

            <FormItem
                {...formItemLayout}
                label={(
                  <span>
                  自修的医疗设备类型&nbsp;
                    <Tooltip title={tip}>
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}>
                {getFieldDecorator('type', {
                  initialValue: data.type,
                })(
                  <Checkbox.Group>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'01'} >普通放射类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'02'} >CT/MR类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'03'} >血液透析</Checkbox>
                      </Col>
                      
                      <Col span={6}>
                        <Checkbox value={'04'} >超声影像类</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'05'} >内窥镜类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'06'} >血液净化类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'07'} >放疗类</Checkbox>
                      </Col>
                      
                      <Col span={6}>
                        <Checkbox value={'08'} >核医学类</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'09'} >检验类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'10'} >消毒灭菌类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'11'} >呼吸麻醉类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'12'} >监护、电生理类</Checkbox>
                      </Col>
                    </Row>
                    <Row style={{marginTop:10}}> 
                      <Col span={6}>
                      <Checkbox value={'13'} >输液类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'14'} >除颤类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'15'} >电刀类</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={'16'} >病房普通设备</Checkbox>
                      </Col>
                    </Row>
                    <Row>
                      <Checkbox value={'99'} >其他:&nbsp;&nbsp;
                        <FormItem style={{display:'inline-block',verticalAlign:'baseline'}}>
                          {getFieldDecorator('typeOther',{initialValue:data.typeOther})(
                            <Input/>
                          )}
                        </FormItem>
                      </Checkbox>
                    </Row>
                    
                    
                  </Checkbox.Group>
                )}
            </FormItem>
          

        
          <FormItem
          {...formItemLayout}
          label="已开展的维修技术管理">
            {getFieldDecorator('repair', {
              initialValue:data.repair,
            })(
              <Checkbox.Group>
                
                  <Col xxl={8} xl={8}>
                  <Checkbox value={'01'} >开机率统计分析</Checkbox>
                  </Col>
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'02'} >修复时间统计分析</Checkbox>
                  </Col>
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'03'} >报修响应时间统计分析</Checkbox>
                  </Col>
                  
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'04'} >失效模式与影响分析（FMEA）</Checkbox>
                  </Col>
                  <Col xxl={8} xl={8}>
                  <Checkbox value={'05'} >根因分析（RCA）</Checkbox>
                  </Col>
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'06'} >维修后质量检测和校准</Checkbox>
                  </Col>
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'07'} >维修记录档案管理</Checkbox>
                  </Col>
                  
                  <Col xxl={8} xl={8}>
                    <Checkbox value={'08'} >售后服务评价</Checkbox>
                  </Col>
              
              </Checkbox.Group>
            )}
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

const WrappedRegistrationForm = Form.create()(RegistrationForm52);

class Report52 extends Component {

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
        url: api.QUERY_Repair,
        body: {},
        success: data => {
          if (data.status) {
            //回填数据操作
            let info = data.result;
            if(data.investigationGuid){
              Guid = data.investigationGuid
            }
            if(data.investigationRepairGuid){
              RepairGuid = data.investigationRepairGuid
            }
            that.setState({
              formInfo:info ||{}
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

export default Report52;