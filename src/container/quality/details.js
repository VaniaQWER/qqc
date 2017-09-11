/**
 * @file 质量详情
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Icon } from 'antd';
import { Link } from 'react-router';
import Bar from 'component/bar';
import TableGrid from 'component/tableGrid';
const { Content } = Layout;
class QualityDetails extends Component {
  state = {
    barSeries: {
      series: [
        { 
          name: '配置水平',
          type: 'bar',
          data: ['2.3', '1.8', '1.5'],
          barMaxWidth: '30px'
        },
        { 
          name: '平均值1',
          type: 'line',
          data: ['1.5', '1.5', '1.5']
        },
        { 
          name: '平均值2',
          type: 'line',
          data: ['2.0', '2.0', '2.0']
        }
      ],
      xAxis: {
        data: ['2015年', '2016年', '2017年']
      },
      legend: {
        data: ['值1', '值2', '值3']
      }
    },
  }
  render () {
    const { location } = this.props;
    const { barSeries } = this.state;
    return (
      <Content style={{ padding: '0 20px' }} className={'right_content'}>
        <Breadcrumb style={{ margin: '12px 0', fontSize: '1.1em'}}>
          <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to='/department/deptInfo'>科室建设</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{ location.state.deptName }</Breadcrumb.Item>
        </Breadcrumb>
        <Card title='医学工程人员配置水平'>
          <Bar series={barSeries.series} xAxis={barSeries.xAxis} legend={barSeries.legend}/>
        </Card>
      </Content>  
    )
  }
}
export default QualityDetails;