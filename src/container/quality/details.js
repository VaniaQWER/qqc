/**
 * @file 质量详情
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Icon, Select, Table } from 'antd';
import { Link } from 'react-router';
import Bar from 'component/bar';
import TableGrid from 'component/tableGrid';
import { getLocalOption } from 'utils/common';
import { fetchData } from 'utils/tools';
import api from 'api';
import querystring from 'querystring';

const { RemoteTable } = TableGrid;
const { Content } = Layout;
const Option = Select.Option;
const columns = [
  { title: '时间', dataIndex: 'pYear', width: 100},
  { title: '医院名称', dataIndex: 'fOrgName', width: 200},
  { title: '医院等级', dataIndex: 'hospitalLevel', width: 60},
  { title: '医院性质', dataIndex: 'hospitalType', width: 60},
  { title: '医院床位数', dataIndex: 'numeratorValue', width: 70},
  { title: '医学工程人员数量', dataIndex: 'denominatorValue', width: 80},
  { title: '医学工程人员配置水平', dataIndex: 'indexValue', width: 80},
  { title: '同级医院平均配置水平对比', dataIndex: 'indexValueLevel', width: 100},
  { title: '全省医院平均配置水平对比', dataIndex: 'indexValueAll', width: 100}
]
class QualityDetails extends Component {
  state = {
    codeOption: [],
    pYear: '',
    barSeries: {
      series: [],
      xAxis: {
        data: []
      },
      legend: {
        data: []
      }
    },
    dataSource: [],
    dynamicColumns: []
  }
  //时间下拉框获取公式
  getCode = (value) => {
    this.setState({
      codeValue: null,
      pYear: value,
      barSeries: {},
      dataSource: []
    })
    fetchData({
      url: api.SELECT_CODE,
      body: querystring.stringify({ pYear: value}),
      success: data => {
        const options = data.result.map(item => ({value: item.value, text: item.text}))
        this.setState({
          codeOption: options
        })
      }
    })
  }
  //根据公式以及年份  获取详情
  getDetails = (value) => {
    this.setState({codeValue: value});
    let { pYear } = this.state;
    const orgId = this.props.routeParams.id;
    fetchData({
      url: api.SEARCH_FORMULA_DETAILS,
      body: querystring.stringify({ pYear, orgId, indexValue: value}),
      success: data => {
        if (data.status) {
          const { titleMap, pager, series, xAxis, legend } = data.result;
          let dynamicColumns = [];
          for (let key in titleMap) {
            let params = {
              title: titleMap[key],
              dataIndex: key,
              width: titleMap[key].length * 12
            }
            dynamicColumns.push(params)
          }
          this.setState({
            barSeries: {
              series: series,
              xAxis:  xAxis,
              legend: legend  
            },
            dynamicColumns: dynamicColumns,
            dataSource: pager.rows
          })
        }
      }
    })
  }
  render () {
    const { location } = this.props;
    const { barSeries, codeOption, dataSource, dynamicColumns } = this.state;
    return (
      <Content style={{ padding: '0 20px', minHeight: 480 }} className={'right_content'}>
        <Breadcrumb style={{ margin: '12px 0', fontSize: '1.1em'}}>
          <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to='/quality/qualityInfo'>质量管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{ location.state.orgName }</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{padding: 10}} className="ant-advanced-search-form">
          <Col span={12}>
            <Select style={{width: 300}} placeholder='请选择年份' onChange={this.getCode}>
              {
                getLocalOption('yearMonth')
              }
            </Select>
          </Col>
          <Col span={12}>
            <Select 
              style={{width: 300}} 
              placeholder='请选择公式' 
              value={this.state.codeValue}
              onChange={this.getDetails}
            >
              {
                codeOption.map((item, index) => (
                  <Option value={item.value} key={index}>{ item.text }</Option>
                ))
              }
            </Select>
          </Col>
        </Row>
        <Card title='医学工程人员配置水平'>
          <Bar series={barSeries.series} xAxis={barSeries.xAxis} legend={barSeries.legend}/>
        </Card>
        <Row style={{padding: '4px'}}>
          <Col push={24}>
            <Table
              scroll={{x: 2000}}
              rowKey={'RN'}
              dataSource={dataSource}
              columns={columns.concat(dynamicColumns)}
            />
          </Col>
        </Row>
      </Content>  
    )
  }
}
export default QualityDetails;