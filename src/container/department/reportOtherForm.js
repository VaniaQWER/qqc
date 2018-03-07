import React, { PureComponent } from 'react';
import { Card, Form, Input, Row, Col, 
  message, Select, DatePicker, BackTop,
  Checkbox, Radio, Button, Icon, Divider } from 'antd';
import moment from 'moment';
import api from 'api';
import 'moment/locale/zh-cn';
import { fetchData } from 'utils/tools';
moment.locale('zh-cn');
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker } = DatePicker;
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
  }
}

//一行一条样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formItemLayoutForMore = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

/**
 * @file 质控上报
 */

let uuid = 1, vvid = 1;
class ReportOtherForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemOneList: [ 0 ],
      itemTwoList: [ 0 ],
      progress: 0
    }
  }
  createItemsTwo = i => {
    const { form } = this.props;
    let items = [
      <Col span={12} key={1}>
        <FormItem
          {...formItemLayout}
          label='姓名'
        >
          {form.getFieldDecorator('fname-' + i, {
            rules: [{ required: true, message: '请输入姓名' }],
            // initialValue: data[`${fname}-i`]
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>, 
      <Col span={12} key={2}>
        <FormItem
          {...formItemLayout}
          label='性别'
        >
          {form.getFieldDecorator('gender-' + i, {
            rules: [{ required: true, message: '请输入性别' }],
            // initialValue: data[`${gender}-i`]
          })(
            <Select style={{width:'100%'}} onChange={value => {
              form.setFieldsValue({['gender-' + i]: value})
              //this.getProgress();
            }}>
              <Option value={'男'}>男</Option>
              <Option value={'女'}>女</Option>
            </Select>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={3}>
        <FormItem
          {...formItemLayout}
          label='出生年月'
        >
          {form.getFieldDecorator('birthday-' + i, {
            rules: [{ required: true, message: '请输入出生年月' }],
            //initialValue: updateData.deptName
          })(
            <DatePicker format="YYYY-MM" onChange={(value, val) => {
              form.setFieldsValue({['birthday-' + i]: val})
              //this.getProgress();
            }}/>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={4}>
        <FormItem
          {...formItemLayout}
          label='政治面貌'
        >
          {form.getFieldDecorator('politicalStatus-' + i, {
            rules: [{ required: true, message: '请输入政治面貌' }],
            //initialValue: updateData.deptName
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={5}>
        <FormItem
          {...formItemLayoutForMore}
          label='入职（本部门）年月'
        >
          {form.getFieldDecorator('entryDate-' + i, {
            rules: [{ required: true, message: '请输入入职（本部门）年月' }],
          })(
            <MonthPicker
              onChange={(value, val) => {
                form.setFieldsValue({['entryDate-' + i]: val})
                //this.getProgress();
              }}
              format="YYYY-MM"
            />
          )}
        </FormItem> 
      </Col>,
      <Col span={8} key={6}>
        <FormItem
          {...formItemLayoutForMore}
          label='学历'
        >
          {form.getFieldDecorator('highestEducation-' + i, {
            rules: [{ required: true, message: '学历' }],
            //initialValue: updateData.deptName
          })(
            <Select style={{width:'100%'}} onChange={(value) => {
              form.setFieldsValue({['highestEducation-' + i]: value})
              //this.getProgress();
            }}>
              <Option value={'01'}>博士</Option>
              <Option value={'02'}>硕士</Option>
              <Option value={'03'}>本科</Option>
              <Option value={'04'}>大专</Option>
              <Option value={'05'}>大专以下</Option>
            </Select>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={7}>
        <FormItem
          {...formItemLayout}
          label='最高学历毕业院校'
        >
          {form.getFieldDecorator('highestEducationSchool-' + i, {
            rules: [{ required: true, message: '学历' }],
            //initialValue: updateData.deptName
          })(
            <Input/>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={8}>
        <FormItem
          {...formItemLayout}
          label='职称'
        >
          {form.getFieldDecorator('technicalTitlesB-' + i, {
            rules: [{ required: true, message: '职称' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup onChange={(value) => {
              form.setFieldsValue({['technicalTitlesB-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'1'}>正高</Radio>
              <Radio value={'2'}>副高</Radio>
              <Radio value={'3'}>中级</Radio>
              <Radio value={'4'}>初级</Radio>
              <Radio value={'5'}>未聘</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={9}>
        <FormItem
          {...formItemLayout}
          label='职称获取途径(可多选)'
        >
          {form.getFieldDecorator('technicalSource-' + i, {
            rules: [{ required: true, message: '职称获取途径' }],
            //initialValue: updateData.deptName
          })(
            <Checkbox.Group onChange={(value) => {
              form.setFieldsValue({['technicalSource-' + i]: value})
              //this.getProgress();
            }}>
              <Col span={8}><Checkbox value={'1'}>医院</Checkbox></Col>
              <Col span={8}><Checkbox value={'2'}>大学</Checkbox></Col>
              <Col span={8}><Checkbox value={'3'}>药监局</Checkbox></Col>
              <Col span={8}><Checkbox value={'4'}>卫计委</Checkbox></Col>
              <Col span={4}><Checkbox value={'5'}>其他</Checkbox></Col>
              <Col span={6}>
                {form.getFieldDecorator('technicalSourceOther-' + i, {
                  // rules: [{ required: true, message: '职称获取途径' }],
                  // initialValue: updateData.deptName
                  })(<Input placeholder='请输入'/>
                )}
              </Col>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={10}>
        <FormItem
          {...formItemLayout}
          label='医院是否认可和聘任以上职称'
        >
          {form.getFieldDecorator('approvalFlag-' + i, {
            rules: [{ required: true, message: '医院是否认可和聘任以上职称' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup onChange={(value) => {
              form.setFieldsValue({['approvalFlag-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'01'}>是</Radio>
              <Radio value={'02'}>否</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={11}>
        <FormItem
          {...formItemLayout}
          label='专业背景(可多选)'
        >
          {form.getFieldDecorator('majorName-' + i, {
            rules: [{ required: true, message: '专业背景' }],
            //initialValue: updateData.deptName
          })(
            <Checkbox.Group onChange={(value) => {
              form.setFieldsValue({['majorName-' + i]: value})
              //this.getProgress();
            }}>
              <Row>
                <Col span={6}><Checkbox value="01">生物医学工程</Checkbox></Col>
                <Col span={6}><Checkbox value="02">计算机</Checkbox></Col>
                <Col span={6}><Checkbox value="03">电子</Checkbox></Col>
                <Col span={6}><Checkbox value="04">机械</Checkbox></Col>
                <Col span={6}><Checkbox value="05">管理</Checkbox></Col>
                <Col span={6}><Checkbox value="06">经济</Checkbox></Col>
                <Col span={6}><Checkbox value="07">医学</Checkbox></Col>
                <Col span={6}><Checkbox value="08">护理</Checkbox></Col>
                <Col span={6}><Checkbox value="09">药学</Checkbox></Col>
                <Col span={6}><Checkbox value="10">其他</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={12}>
        <FormItem
          {...formItemLayout}
          label='岗位类型(可多选)'
        >
          {form.getFieldDecorator('postType-' + i, {
            rules: [{ required: true, message: '岗位类型' }],
            //initialValue: updateData.deptName
          })(
            <Checkbox.Group onChange={(value) => {
              form.setFieldsValue({['postType-' + i]: value})
              //this.getProgress();
            }}>
              <Row>
                <Col span={8}><Checkbox value="1">设备购置管理</Checkbox></Col>
                <Col span={8}><Checkbox value="2">耗材采购管理</Checkbox></Col>
                <Col span={8}><Checkbox value="3">耗材物流管理</Checkbox></Col>
                <Col span={8}><Checkbox value="4">设备维修维护</Checkbox></Col>
                <Col span={8}><Checkbox value="5">质量安全管理</Checkbox></Col>
                <Col span={8}><Checkbox value="6">教学科研</Checkbox></Col>
                <Col span={4}><Checkbox value={'7'}>其他</Checkbox></Col>

                {form.getFieldDecorator('postTypeOther-' + i, {
                  // rules: [{ required: true, message: '职称获取途径' }],
                  //initialValue: updateData.deptName
                  })(<Col span={6}><Input placeholder='请输入'/></Col>
                )}

              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={6} key={14}>
        近3年以第一作者、通讯作者发表论文数量（具有ISSN和CN刊号的国内外期刊:
      </Col>,
      <Col span={18} key={15}>
        {form.getFieldDecorator('publishThesis-' + i, {
          rules: [{ required: true, message: '不能为空' }],
          //initialValue: updateData.deptName
        })(
          <Input style={{width: 100}}  addonAfter={<span>篇</span>}/>
        )}
      </Col>,
      <Col style={{textAlign: 'right'}} key={13} span={24}>
        <Button type="dashed" style={{marginRight: 10}} onClick={() => this.delItem('itemTwoList', i)}>删除该行</Button>
        <Divider/>
      </Col>
    ]
    return items;
  }
  createItems = i => {
    const { form } = this.props;
    let items = [
      <Col span={12} key={1}>
        <FormItem {...formItemLayout} label='部门名称'>
          {form.getFieldDecorator('deptName-'+i, {
            rules: [{ required: true, message: '请输入部门名称' }],
            //initialValue: updateData.deptName
          })(
            <Input />
          )}
        </FormItem> 
      </Col>,
      <Col span={12} key={2}>
        说明：如以上医学工程部门业务属于集中管理，则填写一个部门名称及其相关部门信息。如以上医学工程部门业务属于多部门管理，则添加部门信息，各部门分别单独填写。
      </Col>,
      <Col span={24} key={3}>
        <FormItem {...formItemLayout} label='部门医学工程业务管理范围(可多选)'>
          {form.getFieldDecorator('workScope-'+i, {
            rules: [{ required: true, message: '请选择部门医学工程业务管理范围' }],
            //initialValue: updateData.deptName
          })(
            <Checkbox.Group onChange={(value) => {
              form.setFieldsValue({['workScope-' + i]: value})
              //this.getProgress();
            }}>
              <Row>
                <Col span={8}><Checkbox value="1">设备购置</Checkbox></Col>
                <Col span={8}><Checkbox value="2">耗材采购</Checkbox></Col>
                <Col span={8}><Checkbox value="3">耗材物流管理</Checkbox></Col>
                <Col span={8}><Checkbox value="4">设备维修维护</Checkbox></Col>
                <Col span={10}><Checkbox value="5">医疗器械质量安全管理</Checkbox></Col>
                <Col span={4}><Checkbox value="6">其他</Checkbox></Col>
                {form.getFieldDecorator('workScopeOther-'+i, {
                  // rules: [{ required: true, message: '请输入部门名称' }],
                  //initialValue: updateData.deptName
                })(
                  <Col span={2}>
                    <Input style={{width: 200}}/>
                  </Col>
                )}
                
              </Row>
            </Checkbox.Group>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={4}>
        <FormItem {...formItemLayout} label='部门行政级别'>
          {form.getFieldDecorator('deptTypeName-'+i, {
            rules: [{ required: true, message: '部门行政级别' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['deptTypeName-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'3'}>处级</Radio>
              <Radio value={'2'}>科级</Radio>
              <Radio value={'1'}>科级以下</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={5}>
        <FormItem {...formItemLayout} label='部门职工总人数' style={{display: 'flex'}}>
          {form.getFieldDecorator('deptTotalStaff-'+i, {
            rules: [{ required: true, message: '部门职工总人数' }],
            //initialValue: updateData.deptName
          })(
            <Input style={{width: 100}}/>
          )}
          <span style={{display: 'inlineBlock', padding: 5}}>(仅本部门涉及医学工程业务人员数量)</span>
        </FormItem> 
      </Col>,
      <Col span={24} key={6}>
        <FormItem {...formItemLayout} label='部门占地面积'>
          {form.getFieldDecorator('deptAcreage-'+i, {
            rules: [{ required: true, message: '部门占地面积' }],
            //initialValue: updateData.deptName
          })(
            <Input style={{width: 150}} addonAfter={<span>平方米</span>}/>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={7}>
        <FormItem {...formItemLayout} label='部门归属'>
          {form.getFieldDecorator('deptBelong-'+i, {
            rules: [{ required: true, message: '部门归属' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['deptBelong-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'0'}>医技</Radio>
              <Radio value={'1'}>后勤</Radio>
              <Radio value={'2'}>行政</Radio>
              <Radio value={'3'}>其他 
              {form.getFieldDecorator('deptBelongOther-'+i, {
                // rules: [{ required: true, message: '部门归属' }],
                //initialValue: updateData.deptName
              })(
                <Input style={{ width: 100, marginLeft: 10 }}/>
              )}
              </Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={8}>
        <FormItem {...formItemLayout} label='负责人姓名'>
          {form.getFieldDecorator('leaderName-'+i, {
            rules: [{ required: true, message: '负责人姓名' }],
            //initialValue: updateData.deptName
          })(
            <Input />
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={9}>
        <FormItem {...formItemLayout} label='负责人职称'>
          {form.getFieldDecorator('leaderPost-'+i, {
            rules: [{ required: true, message: '负责人职称' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['leaderPost-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'04'}>正高</Radio>
              <Radio value={'01'}>副高</Radio>
              <Radio value={'03'}>中级</Radio>
              <Radio value={'02'}>初级</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={99}>
        <FormItem {...formItemLayout} label='负责人学位'>
          {form.getFieldDecorator('leaderDegree-'+i, {
            rules: [{ required: true, message: '负责人职称' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['leaderDegree-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'01'}>博士</Radio>
              <Radio value={'02'}>硕士</Radio>
              <Radio value={'03'}>本科</Radio>
              <Radio value={'04'}>专科</Radio>
              <Radio value={'05'}>专科以下</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={88}>
        <FormItem {...formItemLayout} label='负责人专业'>
          {form.getFieldDecorator('leaderMajor-'+i, {
            rules: [{ required: true, message: '负责人专业' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['leaderMajor-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'01'}>生物医学工程</Radio>
              <Radio value={'02'}>计算机</Radio>
              <Radio value={'03'}>电子</Radio>
              <Radio value={'04'}>机械</Radio>
              <Radio value={'05'}>经济</Radio>
              <Radio value={'06'}>管理</Radio>
              <Radio value={'07'}>医学</Radio>
              <Radio value={'08'}>护理</Radio>
              <Radio value={'09'}>药学</Radio>
              <Radio value={'10'}>其他</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={10}>
        <FormItem {...formItemLayout} label='负责人年龄'>
          {form.getFieldDecorator('leaderAge-'+i, {
            rules: [{ required: true, message: '负责人年龄' }],
            //initialValue: updateData.deptName
          })(
            <RadioGroup style={{width: 500}} onChange={(value) => {
              form.setFieldsValue({['leaderAge-' + i]: value})
              //this.getProgress();
            }}>
              <Radio value={'01'}>＜30岁</Radio>
              <Radio value={'02'}>30～39岁</Radio>
              <Radio value={'03'}>40～49岁</Radio>
              <Radio value={'04'}>≥50岁</Radio>
            </RadioGroup>
          )}
        </FormItem> 
      </Col>,
      <Col span={24} key={11}>
        <FormItem {...formItemLayout} label='负责人在本部门任职年限'>
          {form.getFieldDecorator('leaderAgeLimit-'+i, {
            rules: [{ required: true, message: '负责人在本部门任职年限' }],
            //initialValue: updateData.deptName
          })(
            <Input style={{width: 100}} addonAfter={<span>年</span>} />
          )}
        </FormItem> 
      </Col>,
      <Col style={{textAlign: 'right'}} key={12} span={24}>
        <Button type="dashed" style={{marginRight: 10}} onClick={() => this.delItem('itemOneList', i)}>删除该行</Button>
        <Divider/>
      </Col>
    ]
    return items;
  }
  //计算进度
  getProgress = (e) => {
    const { form, setProgress } = this.props;
    const all = form.getFieldsValue();//获取当前表单
    let start = 0;
    Object.keys(all).map(item =>  item.indexOf('Other') > 0 ? start++ : null)
    let count = 0;
    for (let k in all) {
      if (Array.isArray(all[k]) && all[k].length) {
        count++;
      } else if (!Array.isArray(all[k]) && all[k]){
        count++;
      }
    }
    const progress = Number(count/(Object.keys(all).length - start)).toFixed(2) * 100;
    this.setState({ progress })
    setProgress(progress)
  }
  delItem = (key, index) => {
    const list = this.state[key];
    if (list.length <= 1) {
      return message.warn('至少保留一条记录!')
    }
    let sq = null;
    for (let i=0; i<list.length; i++) {
      if (list[i] === index) {
        sq = i;
        break;
      }
    }
    list.splice(sq, 1);
    this.setState({ 
      [key]: [...list]
    })
  }
  addItem = (key) => {
    const list = this.state[key]
    let id = null;
    if ( key === 'itemOneList' ) {
      id = uuid;
      uuid++;
    } else {
      id = vvid;
      vvid++;
    }
    this.setState({
      [key]: [
        ...list, id
      ]
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (key.indexOf('birthday') >= 0 || key.indexOf('entryDate') >= 0) {
            values[key] = values[key].format('YYYY-DD-MM');
          }
        }
        values.schedule = 100.00;
        fetchData({
          url: api.INSERT_CONSTR_DEPT,
          body: JSON.stringify(values),//querystring.stringify(postData),
          type: 'application/json',
          success: data => {
            if (data.status) {
              this.props.form.resetFields();
              this.setState({
                itemOneList: [0],
                itemTwoList: [0]
              })
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
  componentWillMount = () => {
    const data = []
    this.setState({
      data
    })
  }
  
  render() {
    const { itemOneList, itemTwoList } = this.state;
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <BackTop />
        <Row style={styles.row} className='right_content'>
          <Card>
            <Col span={24}>
              是否建立独立、且业务完善的医学工程部门？
            </Col>
            <Col span={24}>
              说明：建立的医学工程部门包括以下业务：1、设备购置 2、耗材采购 3、耗材物流管理  4、设备维修维护  5、医疗器械质量安全管理。
            </Col>
            <Col span={24}>
              <FormItem>
                {form.getFieldDecorator('buildFlag', {
                  rules: [{ required: true, message: '请选择, 不能为空' }],
                  //initialValue: updateData.deptName
                })(
                  <RadioGroup onChange={(value) => {
                    form.setFieldsValue({buildFlag: value})
                    //this.getProgress();
                  }}>
                    <Radio value={'01'}>有</Radio>
                    <Radio value={'00'}>无</Radio>
                  </RadioGroup>
                )}
              </FormItem> 
            </Col>
          </Card>  
          <Card title="医学工程部门基本情况" style={{marginTop: 20}}>
            { itemOneList.map(item => (
                this.createItems(item)
              )) 
            }
            <Button style={{ width: '60%', marginLeft: '20%' }} onClick={() => this.addItem('itemOneList')}>
              <Icon type="plus" /> 添加更多
            </Button>
          </Card>  
          <Card title="医学工程部门人员情况" style={{marginTop: 20}}>
            { itemTwoList.map(item => (
                this.createItemsTwo(item)
              )) 
            }
            <Button style={{ width: '60%', marginLeft: '20%' }} onClick={() => this.addItem('itemTwoList')}>
              <Icon type="plus" /> 添加更多
            </Button>
          </Card>   
        </Row>
        <Row>
          <Col style={{textAlign: 'center', marginBottom: 10}}> 
            <Button 
              htmlType='submit'
              type='primary'
              style={{width: 300}}
            >
              <Icon type="save" /> 保存
            </Button>
          </Col>
        </Row>
      </Form>  
    )
  }
}

export default Form.create()(ReportOtherForm);