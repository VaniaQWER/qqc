/**
 * @file 质量详情
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Select, Table } from 'antd';
import { Link } from 'react-router';
import Bar from 'component/bar';
import Settings from 'component/settings';
import { getLocalOption } from 'utils/common';
import { fetchData } from 'utils/tools';
import api from 'api';
import querystring from 'querystring';
const { Content } = Layout;
const Option = Select.Option;
const columns = [
  { title: '时间', dataIndex: 'pYear', width: 100},
  { title: '医院名称', dataIndex: 'fOrgName', width: 200},
  { title: '医院等级', dataIndex: 'hospitalLevelName', width: 60},
  { title: '医院性质', dataIndex: 'hospitalTypeName', width: 60},
  { title: '医院床位数', dataIndex: 'numeratorValue', width: 70},
  { title: '医学工程人员数量', dataIndex: 'denominatorValue', width: 80},
  { title: '医学工程人员配置水平', dataIndex: 'indexValue', width: 80, render: value => `${Number(value * 100).toFixed(2)}%` },
  { title: '同级医院平均配置水平对比', dataIndex: 'indexValueLevel', width: 100, render: value => `${Number(value * 100).toFixed(2)}%`},
  { title: '全省医院平均配置水平对比', dataIndex: 'indexValueAll', width: 100, render: value => `${Number(value * 100).toFixed(2)}%`}
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
    dynamicColumns: [],
    pagination: {},
    loading: false,
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
  setGrid = (page) => {
    const { pYear, codeValue } = this.state;
    const orgId = this.props.routeParams.id;
    fetchData({
      url: api.SEARCH_FORMULA_DETAILS,
      body: querystring.stringify({ pYear, orgId, indexValue: codeValue, page: page.current}),
      success: data => {
        if (data.status) {
          const { pager } = data.result;
          let { pagination } = this.state;
          pagination.total = pager.records;
          pagination.pageSize = 5;
          pagination.current = page.current;
          this.setState({
            dataSource: pager.rows,
            pagination
          })
        }
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
          let pagination = this.state.pagination;
          pagination.total = pager.records;
          pagination.pageSize = 5;
          pagination.current = 1;
          this.setState({
            barSeries: {
              series: series,
              xAxis:  xAxis,
              legend: legend  
            },
            dynamicColumns: dynamicColumns,
            dataSource: pager.rows,
            pagination
          })
        }
      }
    })
  }
  render () {
    const { location } = this.props;
    const orgId = this.props.routeParams.id;
    const { barSeries, codeOption, dataSource, dynamicColumns, pYear, codeValue, pagination } = this.state;
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
          <Bar series={barSeries.series} xAxis={barSeries.xAxis} legend={barSeries.legend} formatter={true}/>
        </Card>
        <Row style={{paddingTop: '4px'}}>
          <Col push={24}>
            <Table
              scroll={{x: 2000}}
              rowKey={'RN'}
              dataSource={dataSource}
              columns={columns.concat(dynamicColumns)}
              pagination={pagination}
              onChange={this.setGrid}
            />
            <div style={{position: 'absolute', right: 10, bottom: 40, fontSize: 30}}>
              <Settings exportUrl={`http://120.26.128.15:8903/${api.EXPORT_FORNLA}?pYear=${pYear}&indexValue=${codeValue}&orgId=${orgId}`}/>
            </div>
          </Col>
        </Row>
      </Content>  
    )
  }
}
export default QualityDetails;