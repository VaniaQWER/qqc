import React, { Component } from 'react';
import { Form  , Tooltip ,Icon ,  Row , Col , Checkbox , Button , Radio , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
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
            {getFieldDecorator('zichanzongzhi', {
              rules: [
              { required: true, type: 'number', message: '请填写医用耗材总数！' , whitespace: true},
              ],
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
            {getFieldDecorator('caigoujine', {
              rules: [
              { required: true, type: 'number', message: '请填写医用耗材采购金额！' , whitespace: true},
              ],
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
            {getFieldDecorator('caigoubili', {
              rules: [
              { required: true, type: 'number', message: '请填写植入和介入类耗材采购比例！' , whitespace: true},
              ],
            })(
              
                <InputNumber min={0} max={100} />
              
            )}
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='一级耗材库房'>
            {getFieldDecorator('yijihaocai', {
              rules:[{
                required:true,message:'请选择是否有一级耗材库房'
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
            label="场地面积"
          >
            {getFieldDecorator('yijichangdimiaji', )(
              
              <InputNumber  min={0}/>
            )}
            <span className="ant-form-text">平方米</span>
          </FormItem>
        
        
            <FormItem
            {...formItemLayout}
            label="管理人员"
          >
            {getFieldDecorator('yijiguanlirenyuangeshu', )(
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
            {getFieldDecorator('erjichangdimiaji', {
              rules:[{
                required:true,type:'number',message:'请填写手术室面积'
              }]
            })(
              <InputNumber  min={0}/>
            )}
            <span className="ant-form-text">平方米</span>
          </FormItem>
        
            <FormItem
            {...formItemLayout}
            label="手术间数量"
          >
            {getFieldDecorator('erjiguanlirenyuangeshu',{
              rules:[{
                required:true,type:'number',message:'请填写手术间数量'
              }]
            })(
              <InputNumber  min={0}/>
            )}
            <span className="ant-form-text">间</span>
          </FormItem>
          <FormItem
                {...formItemLayout}
                label='二级库房'
              >
                {getFieldDecorator('erjikufang', {
                  rules:[{
                    required:true,message:'请选择有无二级库房'
                  }]
                })(
                      <RadioGroup>
                        <Radio value="a">有</Radio>
                        <Radio value="b">无</Radio>
                      </RadioGroup>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label='二级库房场地面积'
              >
                {getFieldDecorator('erjikufangmianji')(
                     <InputNumber min={0}/>
                )}
                <span className="ant-form-text">平方米</span>
              </FormItem>
        </Row>

        <Row>
            <FormItem {...formItemLayout} 
            label="二级库房存储耗材类型">
              {getFieldDecorator('erjikufanghaocun', {
                valuePropName: 'checked',
                rules:[{
                  required:true,message:'请选择二级库房存储耗材类型'
                }]
              })(
                <Checkbox.Group>
                  <Row> 
                      <Checkbox value={'1'} >
                        血管介入类（ &nbsp;
                          <Checkbox value={'11'} >心脏介入类</Checkbox>、
                          <Checkbox value={'12'} >周围血管介入类</Checkbox>
                        &nbsp;）
                      </Checkbox>
                  </Row> 
                  <Row> 
                  <Checkbox value={'2'} >非血管介入</Checkbox>
                  </Row> 
                  <Row> 
                  <Checkbox value={'3'} >
                        骨科植入（ &nbsp;
                          <Checkbox value={'31'} >脊柱</Checkbox>、
                          <Checkbox value={'32'} >关节</Checkbox>、
                          <Checkbox value={'33'} >创伤</Checkbox>
                        &nbsp;）
                      </Checkbox>
                </Row>
                  <Row> 
                    <Col span={8}>
                      <Checkbox value={'2'} >神经外科</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'2'} >电生理类</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'3'} >起搏器类</Checkbox>
                    </Col>
                  </Row> 

                  <Row> 
                    <Col span={8}>
                      <Checkbox value={'4'} >体外循环及血液净化</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'21'} >眼科（晶体等）</Checkbox>
                    </Col>
                  </Row> 
                  <Row> 
                  <Checkbox value={'2'} >普外通用高值耗材（吻合器、止血材料、穿刺器等）</Checkbox>
                  </Row> 
                  
                </Checkbox.Group>
              )}
            </FormItem>
            <Col span={24} offset={6}>管理人员组成：</Col>
            <FormItem 
              {...twoItemLayout}
              label="临床科室"
            >
              {getFieldDecorator('linchuangkeshi', {
                rules:[{
                  type:'number', required:true,message:'请填写临床科室人员数量！'
                }]
              })(
                  <InputNumber min={0} max={99999999999}/>
              )}
              <span className="ant-form-text">人</span>
            </FormItem>

            
            <FormItem
              {...twoItemLayout}
              label="医学工程部门"
              >
              {getFieldDecorator('yixuekechengbumen', {
                rules:[{
                  type:'number', required:true,message:'请填写医学工程部门数量！'
                }]
              })(
                <InputNumber min={0} max={99999999999}/>
              )}
              <span className="ant-form-text">人</span>
            </FormItem>
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
          {getFieldDecorator('haozhanbi', { 
            rules:[{
              required:true,message:'请填写耗占比'
            }]
          })(
              <InputNumber min={0} max={100} />
          )}
          <span className="ant-form-text">%</span>
        </FormItem>

        <FormItem {...formItemLayout} 
        label="已开展的技术管理（耗材）">
          {getFieldDecorator('jishuguanli', {
            valuePropName: 'checked',
            rules:[{
              required:true,message:'请填写耗占比'
            }]
          })(
            <Checkbox.Group>
              <Row> 
                <Col span={8}>
                <Checkbox value={'1'} >医用耗材准入遴选</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'2'} >医用耗材验收</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'3'} >追溯管理</Checkbox>
                </Col>
              </Row> 

              <Row> 
                <Col span={8}>
                  <Checkbox value={'4'} >临床使用效果评价</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'21'} >供应商服务能力评价</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'5'} >卫生技术评估</Checkbox>
                </Col>
               
              </Row> 
              <Row> 
                <Col span={8}>
                  <Checkbox value={'6'} >耗材使用培训</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'7'} >产品与供应商资质管理</Checkbox>
                </Col>
                
              </Row> 
              
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