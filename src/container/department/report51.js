import React, { Component } from 'react';
// import ReportOtherForm from 'container/department/reportOtherForm';
import { Form  ,Tooltip ,Icon ,  Row , Col , Checkbox , Button , InputNumber , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
/**
 * @file 2医疗机构基本情况
 */

const FormItem = Form.Item;
const tip1 = '甲乙类大型医疗设备范围：'+
'一、卫规财发【2004】474号'+
'甲类（国务院卫生行政部门管理）'+
'1、X线---正电子发射计算机断层扫描仪（PET--CT，包括正电子发射型断层仪即PET）'+
'2、伽玛射线立体定位治疗系统（γ刀）'+
'3、医用电子回旋加速治疗系统 （MM50）'+
'4、质子治疗系统'+
'5、其它未列入管理品目、区域内首次配置的单价在500万元以上的医用设备'+
'乙类（省级卫生行政部门管理）					'+
'1、X线电子计算机断层扫描装置（CT）'+
'2、医用磁共振成像设备（MRI）'+
'3、800毫安以上数字减影血管造影X线机（DSA）'+
'4、单光子发射型电子计算机断层扫描仪（SPECT）'+
'5、医用电子直线加速器（LA）'+
'二、卫规财发【2009】43号'+
'甲类大型医用设备管理品目（第二批）'+
'1、X线立体定向放射治疗系统（英文名为CyberKnife）'+
'2、断层放射治疗系统（英文名为Tomo Therapy）'+
'3、306道脑磁图'+
'4、内窥镜手术器械控制系统（英文名为da Vnici S）'+
'三、卫规财发【2013】4号'+
'甲类大型医用设备管理品目（第三批）'+
'1、正电子发射磁共振成像系统（英文简称PET-MR,包括一体化和分体式两种类型）'+
'2、TrueBeam、TrueBeam STX型医用直线加速器'+
'3、Axesse型医用直线加速器';
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
class RegistrationForm51 extends React.Component {
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
        md: { span: 8 },
        lg: { span: 8 },
      },
    };
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
      <h2 style={styles.head}>5.1医疗设备购置管理情况</h2>
      <Form onSubmit={this.handleSubmit}  >
        <div style={styles.formWarp}>
        <FormItem
          {...formItemLayout}
          label="医疗设备资产总值"
        >
          {getFieldDecorator('zichanzongzhi',{
            rules: [
              { required: true, type: 'number', message: '请填写医疗设备资产总值！' , whitespace: true},
              ],
          })(
            <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text">万元</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="医疗设备总数（固定资产入账）"
        >
          {getFieldDecorator('yiliaozongshu',{
            rules: [
              { required: true, type: 'number',  message: '请填写医疗设备总数！' , whitespace: true},
              ],
          })(
            <InputNumber min={0} max={99999999999} style={{minWidth:180}} addonAfter={<span>平方米</span>}/>
          )}
          <span className="ant-form-text">台件</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
            甲乙类大型设备总值&nbsp;
              <Tooltip title={tip1}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('zongzhi',{
            rules: [
              { required: true,  type: 'number', message: '请填写甲乙类大型设备总值！' , whitespace: true},
              ],
          })(
            <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text">万元</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="甲乙类大型设备总数"
        >
          {getFieldDecorator('daxingshebeizongshu',{
            rules: [
              { required: true, type: 'number', message: '请填写甲乙类大型设备总数！' , whitespace: true},
              ],
          })(
            <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text">台件</span>
        </FormItem>

        <FormItem
        {...formItemLayout}
        label="医疗设备采购金额（2017年度）"
      >
        {getFieldDecorator('caigounumber', {
          rules: [
            { required: true, type: 'number', message: '请填写医疗设备采购金额！' , whitespace: true},
            ],
        })(
          <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
        )}
        <span className="ant-form-text">万元</span>
      </FormItem>

        <FormItem
          {...formItemLayout}
          label="医疗设备采购总数（2017年度）"
        >
          {getFieldDecorator('caigouzongshu', {
            rules: [
              { required: true, type: 'number', message: '请填写医疗设备采购总数！' , whitespace: true},
              ],
          })(
            <InputNumber min={0} max={99999999999} style={{minWidth:180}} />
          )}
          <span className="ant-form-text">台件</span>
        </FormItem>

        <FormItem {...formItemLayout} 
        label="已开展的技术管理（设备）">
          {getFieldDecorator('agreement', {
            rules: [
              { required: true, message: '请选择已开展的技术管理！'},
            ],
            valuePropName: 'checked',
          })(
            <Checkbox.Group>
            
              <Row> 
                <Col span={8}>
                <Checkbox value={'1'} >年度规划</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'2'} >临床需求评估</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'3'} >政策合规评审</Checkbox>
                </Col>
              </Row> 

              <Row> 
                <Col span={8}>
                  <Checkbox value={'4'} >采购可行性论证</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'21'} >功能评价</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'5'} >成本效益分析</Checkbox>
                </Col>
               
              </Row> 
              <Row> 
                <Col span={8}>
                  <Checkbox value={'6'} >招标采购</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'7'} >政府采购</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'8'} >安装验收</Checkbox>
                </Col>
                
              </Row> 
              <Row> 
                <Col span={8}>
                  <Checkbox value={'9'} >报废处置管理</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'10'} >供应商管理</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'11'} >采购追溯管理</Checkbox>
                </Col>
                
              </Row> 
              <Row> 
                <Col span={8}>
                  <Checkbox value={'12'} >档案管理</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={'13'} >临床使用效果评价</Checkbox>
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

const WrappedRegistrationForm = Form.create()(RegistrationForm51);


class Report51 extends Component {


    constructor(props){
      super(props)
      this.State={
        formInfo:{}
      }
    }

    componentWillMount(){

      const testData = {
        caigouzongshu:123123131,
        caigounumber:123123213
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

export default Report51;