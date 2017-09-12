import React, { Component } from 'react';
import TableGrid from 'component/tableGrid';
import SearchSelect from 'component/searchSelect';
import { Row, Col, Select, Form, Button, Icon } from 'antd';
import { getLocalOption } from 'utils/common';
import { CommonData ,fetchData} from 'utils/tools';
import { Link } from 'react-router';
import { orgType } from 'constants';
import querystring from 'querystring';
import api from 'api';
const { RemoteSelect } = SearchSelect;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
class SearchFormWrapper extends Component {
  state = {
    display: 'block',
    orgId: null,
    hospitalLevels: [],
    hospitalPropertys: [],
    hospitalTypes: [],
    qcOrgData:[]
  }
  componentDidMount = () => {
     //机构性质
     CommonData('HOSPITAL_PROPERTY', (data) => {
     this.setState({ hospitalPropertys : data})
    })
    //医疗机构类型
    CommonData('HOSPITAL_TYPE', (data) => {
     this.setState({ hospitalTypes : data})
    })
    //医院等级
    CommonData('HOSPITAL_LEVEL', (data) => {
      this.setState({ hospitalLevels : data})
    })
    fetchData({
      url: api.SEARCH_ORGS,
      body: querystring.stringify({orgType:3}),
      success: (data)=>{
        this.setState({qcOrgData: data})
      }
    })
    
  }
  handleSearch = (e) => {
    e.preventDefault();
    const postData = this.props.form.getFieldsValue();
    this.props.submit({...postData, orgId: this.state.orgId})
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'block' ? 'none' : 'block',
      expand: !expand
    })
  }
  change = (value) => {
    this.setState({orgId: value})
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.reset();
  }

  render () {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form; 
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={14} pull={2}>
            <FormItem {...formItemLayout} label={`质控管理机构`}>
              {getFieldDecorator(`qcOrgId`)(
                <Select allowClear={true}>
                <Option key={-1} value={''}>全部</Option>
                  {
                    this.state.qcOrgData.map((item,index)=>{
                      return <Option key={index} value={item.orgId}>{item.qcOrgName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`医院名称`}>
              {getFieldDecorator(`orgId`)(
                <RemoteSelect allowClear={true} url={api.SEARCH_ORGS} cb={value => this.change(value)}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`机构类型`}>
              {getFieldDecorator(`orgType`)(
                <Select allowClear={true}>
                  <Option value={''}>全部</Option>
                  {
                    getLocalOption('orgType')
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`机构等级`}>
              {getFieldDecorator(`hospitalLevel`)(
                <Select allowClear={true}>
                <Option key={-1} value={''}>全部</Option>
                  {
                    this.state.hospitalLevels.map((item,index)=>{
                      return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`机构性质`}>
              {getFieldDecorator(`hospitalProperty`)(
                <Select allowClear={true}>
                <Option key={-1} value={''}>全部</Option>
                {
                  this.state.hospitalPropertys.map((item,index)=>{
                    return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                  })
                }
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`编制床位数`}>
              {getFieldDecorator(`planBedSum`)(
                <Select allowClear={true}>
                  <Option value={''}>全部</Option>
                  {
                    getLocalOption('planBedSum')
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`职工总数`}>
              {getFieldDecorator(`staffSum`)(
                <Select allowClear={true}>
                  <Option value={''}>全部</Option>
                  {
                    getLocalOption('staffSum')
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`信息统计时间`}>
              {getFieldDecorator(`pYear`)(
                <Select allowClear={true}>
                  <Option value={''}>全部</Option>
                  <Option value={'2016'}>2016</Option>
                  <Option value={'2017'}>2017</Option>
                  <Option value={'2018'}>2018</Option>
                  <Option value={'2019'}>2019</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{marginTop: 5}}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" icon='search'>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            {this.state.expand ? '展开' : '收起'} <Icon type={this.state.expand ? 'down' : 'up'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);
class OrgInfo extends Component {
  state ={
    hospitalLevels: [],
    hospitalPropertys: [],
  }
  componentDidMount = () => {
    //机构性质
    CommonData('HOSPITAL_PROPERTY', (data) => {
    this.setState({ hospitalPropertys : data})
   })
   //医院等级
   CommonData('HOSPITAL_LEVEL', (data) => {
    this.setState({ hospitalLevels : data})
  })
  }
  submit = (postData) => {
    console.log('查询数据:', postData);
    this.refs.remote.fetch({...postData});
  }
  reset = ()=>{
    this.refs.remote.fetch({});
  }
  render () {
    const columns = [
      {
        title: '操作',
        dataIndex: 'orgId',
        width: 100,
        render: (value, record) => <Link to={{pathname: '/org/orgInfo/details', state: {org: record}}}>详情</Link>
      },
      {
        title: '组织机构代码',
        dataIndex: 'orgCode',
        width: 200
      },  {
        title: '信息统计时间',
        dataIndex: 'pYear',
        width: 200
      },  {
        title: '机构类型',
        dataIndex: 'orgType',
        width: 100,
        render: value => orgType[value]
      },  {
        title: '质控管理机构',
        dataIndex: 'qcOrgName',
        width: 200
      },  {
        title: '机构名称',
        dataIndex: 'orgName',
        width: 200
      },  {
        title: '机构简称',
        dataIndex: 'orgAlias',
        width: 100
      },  {
        title: '机构等级',
        dataIndex: 'hospitalLevel',
        width: 100,
        render: (text)=>{
          return this.state.hospitalLevels.map((item,index)=>{
            if(item.TF_CLO_CODE === text){
              return item.TF_CLO_NAME
            }
            return null;
          })
        }
      },  {
        title: '机构性质',
        dataIndex: 'hospitalProperty',
        width: 100,
        render: (text)=>{
          return this.state.hospitalPropertys.map((item,index)=>{
            if(item.TF_CLO_CODE === text){
              return item.TF_CLO_NAME
            }
            return null;
          })
        }
      },  {
        title: '编制床位数',
        dataIndex: 'planBedSum',
        width: 150
      },  {
        title: '开放床位数',
        dataIndex: 'actualBedSum',
        width: 150
      },  {
        title: '职工总数',
        dataIndex: 'staffSum',
        width: 100
      },  {
        title: '机构地址',
        dataIndex: 'orgAddress',
        width: 200
      },  {
        title: '联系人',
        dataIndex: 'lxr',
        width: 200
      },  {
        title: '联系电话',
        dataIndex: 'lxdh',
        width: 200
      }
    ]
    return (
      <Row style={{padding: 8, minHeight: 480}} span={6} className={'right_content'}>
        <SearchForm
          submit={this.submit}
          reset={this.reset}
        /> 
        <RemoteTable
          ref='remote'
          url={api.SEARCH_ORGS_LIST}
          scroll={{x: '1800px'}}
          columns={columns}
          rowKey={'orgId'}
        />
      </Row>
    )
  }
}

export default OrgInfo;