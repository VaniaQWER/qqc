import React, { Component } from 'react';
import {Form ,Tooltip ,Icon ,  Row , Col , Checkbox , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
/**
 * @file 5.2医用耗材采购管理情况
 */

const styles = {
  row: {
    padding: 8
  },
  col: {
    marginTop: 10
  },
  card: {
    marginTop: 5
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

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const tip1 = '（计算到耗材的品规、型号）';
const tip2 = '（包括普通卫生材料、植入和介入类耗材）';
const tip3 = '植入和介入类耗材：包括血管介入类（心脏介入类、周围血管介入类）、非血管介入、骨科植入（脊柱、关节、创伤）、神经外科、电生理类、起搏器类、体外循环及血液净化、眼科（晶体等）等。';
const tip4 = '计算公式：植入和介入类耗材采购金额/医用耗材采购金额x100%';
const tip5 = '定义：指医疗机构用于医疗、教学、科研、预防、保健等工作，按国家相关法规纳入医疗器械注册管理的或取得上级行政主管部门行政许可，并具有卫生专业技术特征的消耗性材料，包括一次性及可重复使用的医疗器械等。'
const help5= '计算公式：医用耗材收入/医疗收入x100%（不含药品）'
 
let Guid = '';
let SuppliesGuid = '';
class RegistrationForm52 extends React.Component {
  state = {
    confirmDirty: false,
    data:{},
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //这里的values是json数据。
        values.investigationGuid = Guid;
        values.investigationSuppliesGuid = SuppliesGuid;
        for(let item in values ){
          if(!values[item]){
            delete values[item]
          }
        }
        fetchData({
          url: api.ADD_Supplies,
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
      data:nextProps.formInfo,
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
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
        md: { span: 12 },
        lg: { span: 12 },
      },
    };
    const twoItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
        md: { span: 9 },
        lg: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 12 },
      },
    }
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
      <h2 style={styles.head}>5.2医用耗材采购管理情况</h2>
      <Form onSubmit={this.handleSubmit}  >
        <div style={styles.formWarp}>
      
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              医用耗材总数（2017年度）&nbsp;
                <Tooltip title={tip1}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('suppliesTotalSl', {
              initialValue:data.suppliesTotalSl,
            })(
              <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
            )}
            <span className="ant-form-text">种类</span>
          </FormItem>
        
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              医用耗材采购金额（2017年度）&nbsp;
                <Tooltip title={tip2}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('suppliesTotalPrice', {
              initialValue:data.suppliesTotalPrice,
            })(
              <InputNumber min={0} max={99999999999} style={{minWidth:180}}/>
            )}
            <span className="ant-form-text">万元</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={(
              <span>
              植入和介入类耗材采购比例&nbsp;
                <Tooltip title={tip3}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            help={tip4}
          >
            {getFieldDecorator('purchaseRatio', {
              initialValue:data.purchaseRatio,
            })(
              
                <InputNumber min={0} max={100} />
              
            )}
            <span className="ant-form-text">%</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='一级耗材库房'>
            {getFieldDecorator('storageFlag1', {
              initialValue:data.storageFlag1,
            })(
              <RadioGroup>
                <Radio value={'01'}>有</Radio>
                <Radio value={'00'}>无</Radio>
              </RadioGroup>
            )}
          </FormItem> 
        
          <FormItem
            {...formItemLayout}
            label="场地面积"
          >
            {getFieldDecorator('storageAcreage1', {
              initialValue:data.storageAcreage1,
            })(
              <InputNumber  min={0}/>
            )}
            <span className="ant-form-text">平方米</span>
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="管理人员"
            >
              {getFieldDecorator('managementTotalSl',{
                initialValue:data.managementTotalSl,
              } )(
                <InputNumber  min={0}/>
              )}
              <span className="ant-form-text">人</span>
          </FormItem>
       
          <Row>
            <Col span={14} offset={5}>
            手术室二级耗材库房
            </Col>
          
              <FormItem
              {...formItemLayout}
              label="手术室面积"
            >
              {getFieldDecorator('operationAcreage', {
                initialValue:data.operationAcreage,
              })(
                <InputNumber  min={0}/>
              )}
              <span className="ant-form-text">平方米</span>
            </FormItem>
          
              <FormItem
              {...formItemLayout}
              label="手术间数量"
            >
              {getFieldDecorator('operationTotalSl',{
                initialValue:data.operationTotalSl,
              })(
                <InputNumber  min={0}/>
              )}
              <span className="ant-form-text">间</span>
            </FormItem>
            <FormItem
                  {...formItemLayout}
                  label='二级库房'
                >
                  {getFieldDecorator('storageFlag2', {
                    initialValue:data.storageFlag2,
                  })(
                        <RadioGroup onChange={this.handleBChange}>
                          <Radio value="01">有</Radio>
                          <Radio value="00">无</Radio>
                        </RadioGroup>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label='二级库房场地面积'
                >
                  {getFieldDecorator('storageAcreage2',{
                    initialValue:data.storageAcreage2,
                  })(
                      <InputNumber min={0}/>
                  )}
                  <span className="ant-form-text">平方米</span>
                </FormItem>
          </Row>

        <Row>
            <FormItem {...formItemLayout} 
            label="二级库房存储耗材类型">
              {getFieldDecorator('suppliesType', {
                initialValue:data.suppliesType,
              })(
                <Checkbox.Group>
                  <Row> 
                      
                        血管介入类（ &nbsp;
                          <Checkbox value={'01'} >心脏介入类</Checkbox>、
                          <Checkbox value={'02'} >周围血管介入类</Checkbox>
                        &nbsp;）
                  </Row> 
                  <Row> 
                  <Checkbox value={'03'} >非血管介入</Checkbox>
                  </Row> 
                  <Row> 
                  
                    骨科植入（ &nbsp;
                      <Checkbox value={'04'} >脊柱</Checkbox>、
                      <Checkbox value={'05'} >关节</Checkbox>、
                      <Checkbox value={'06'} >创伤</Checkbox>
                    &nbsp;）
                </Row>
                  <Row> 
                    <Col span={8}>
                      <Checkbox value={'07'} >神经外科</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'08'} >电生理类</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'09'} >起搏器类</Checkbox>
                    </Col>
                  </Row> 

                  <Row> 
                    <Col span={8}>
                      <Checkbox value={'10'} >体外循环及血液净化</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'11'} >眼科（晶体等）</Checkbox>
                    </Col>
                  </Row> 
                  <Row> 
                  <Checkbox value={'12'} >普外通用高值耗材（吻合器、止血材料、穿刺器等）</Checkbox>
                  </Row> 
                  
                </Checkbox.Group>
              )}
            </FormItem>
            <Col span={18} offset={6}>管理人员组成：</Col>
            <Row>
              <Col xl={9} xxl={6} offset={6}>
                  <FormItem 
                    {...twoItemLayout}
                    label="临床科室 专职" 
                  >
                    {getFieldDecorator('fulltimeClinicalSl', {
                      initialValue:data.fulltimeClinicalSl,
                    })(
                        <InputNumber min={0} max={99999999999}/>
                    )}
                    <span className="ant-form-text">人</span>
                  </FormItem>
                </Col>
                <Col xl={8} xxl={5}>
                <FormItem 
                {...twoItemLayout}
                label="兼职" 
              >
                {getFieldDecorator('parttimeClinicalSl', {
                  initialValue:data.parttimeClinicalSl,
                })(
                    <InputNumber min={0} max={99999999999}/>
                )}
                <span className="ant-form-text">人</span>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xl={11} xxl={7} offset={5}>
                  <FormItem 
                    {...twoItemLayout}
                    label="医学工程部门 专职" 
                  >
                    {getFieldDecorator('fulltimeYxgcSl', {
                      initialValue:data.fulltimeYxgcSl,
                    })(
                        <InputNumber min={0} max={99999999999}/>
                    )}
                    <span className="ant-form-text">人</span>
                  </FormItem>
                </Col>
                <Col xl={8} xxl={5}>
                <FormItem 
                {...twoItemLayout}
                label="兼职" 
              >
                {getFieldDecorator('parttimeYxgcSl', {
                  initialValue:data.parttimeYxgcSl,
                })(
                    <InputNumber min={0} max={99999999999}/>
                )}
                <span className="ant-form-text">人</span>
              </FormItem>
              </Col>
            </Row>
        </Row>
        
        <FormItem
          {...formItemLayout}
          label={(
            <span>
            耗占比（2017年）&nbsp;
              <Tooltip title={tip5}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          help={help5}
        >
          {getFieldDecorator('hzb', { 
            initialValue:data.hzb,
          })(
              <InputNumber min={0} max={100} />
          )}
          <span className="ant-form-text">%</span>
        </FormItem>

        <FormItem {...formItemLayout} 
        label="已开展的技术管理（耗材）">
          {getFieldDecorator('manageSup', {
            initialValue:data.manageSup,
          })(
            <Checkbox.Group>
             
                <Col xxl={8} xl={12}>
                  <Checkbox value={'01'} >医用耗材准入遴选</Checkbox>
                </Col>
                <Col xxl={8} xl={12}>
                  <Checkbox value={'02'} >医用耗材验收</Checkbox>
                </Col>
                <Col xxl={8} xl={12}>
                  <Checkbox value={'03'} >追溯管理</Checkbox>
                </Col>
             
                <Col xxl={8} xl={12}>
                  <Checkbox value={'04'} >临床使用效果评价</Checkbox>
                </Col>
                <Col xxl={8} xl={12}>
                  <Checkbox value={'05'} >供应商服务能力评价</Checkbox>
                </Col>
                <Col xxl={8} xl={12}>
                  <Checkbox value={'06'} >卫生技术评估</Checkbox>
                </Col>
              
                <Col xxl={8} xl={12}>
                  <Checkbox value={'07'} >耗材使用培训</Checkbox>
                </Col>
                <Col xxl={8} xl={12}>
                  <Checkbox value={'08'} >产品与供应商资质管理</Checkbox>
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
      let that = this;
      fetchData({
        url: api.QUERY_Supplies,
        body: {},
        success: data => {
          if (data.status) {
            //回填数据操作
            let info = data.result;
            if(data.investigationGuid){
              Guid = data.investigationGuid
            }
            if(data.investigationUserGuid){
              SuppliesGuid = data.investigationSuppliesGuid
            }
            that.setState({
              formInfo:info || {}
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
