/**
 * @file 科室建设明细
 * @summary 科室建设明细展示(包含数据卡, 图标, 表格)
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Select } from 'antd';
import TableGrid from 'component/tableGrid';
import Pie from 'component/pie';
import Bar from 'component/bar';
import CardContent from 'component/card';
import Settings from 'component/settings';
import { hashHistory, Link } from 'react-router';
import { fetchData } from 'utils/tools';
import { getLocalOption } from 'utils/common'
import api from 'api';
import querystring from 'querystring';
const { RemoteTable } = TableGrid;
const { Content } = Layout;
const pYear = new Date().getFullYear();
//样式
const styles = {
  card_left: {
    marginLeft: 10
  },
  card_blue: {
    backgroundColor: '#ecf6fd'
  },
  card_green: {
    backgroundColor: '#ebf8f2'
  },
  card_red: {
    backgroundColor: '#fef0ef'
  },
  card_purple: {
    backgroundColor: '#b3acf2'
  },
  card_yellow: {
    backgroundColor: '#ffe9a7'
  }
}

const columns = [{
  title: '姓名',
  dataIndex: 'fname'
}, {
  title: '性别',
  dataIndex: 'gender'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '岗位',
  dataIndex: 'postName'
}, {
  title: '岗位工龄',
  dataIndex: 'postAge'
}, {
  title: '学历',
  dataIndex: 'highestEducation'
}, {
  title: '专业',
  dataIndex: 'majorName'
}, {
  title: '职称类型',
  dataIndex: 'technicalTitlesA'
}, {
  title: '职称等级',
  dataIndex: 'technicalTitlesB'
}];

class DepartmentDetail extends Component {
  state = {
    dataSource: [],
    pieSeries: {
      data: [],
      name: '年龄'
    },
    educationSeries: {
      data: [],
      name: '学历'
    },
    majorSeries: {
      series: [],
      xAxis: {},
      legend: {
        data: []
      }
    },
    bedSum: {
      planBedSum: 0,
      tbPlanBedSum: 0
    },
    staffSum: {
      planStaffSum: 0,
      tbStaffSum: 0
    },
    ygSum: {
      planYgSum: 0,
      tbYgSum: 0,
    },
    meetSum: {
      planMeetSum: 0,
      tbMeetSum: 0
    },
    pYear: pYear
  }
  componentDidMount = () => {
    //校验权限以及安全性
    const { location, routeParams } = this.props;
    //this.getData(pYear);
    if (location.state && routeParams.id) {
      //todo  可能获取默认数据
      const pYear = location.state.pYear;
      this.setState({ pYear })
      this.getData(pYear)
    } else {
      //参数不齐全或者没访问权限跳转至上一页
      hashHistory.push({
        pathname: '/department/deptInfo'
      })
    }

  }
  getData = (value) => {
    const { routeParams } = this.props;
    const orgId = routeParams.id;
    const year = value || pYear;
    fetchData({
      url: api.GET_DEPT_INFO,
      body: querystring.stringify({orgId, pYear: year}),
      success: data => {
        if (data.status) {
          this.setState({
            bedSum: data.result.bedSum,
            staffSum: data.result.staffSum,
            ygSum: data.result.ygSum,
            meetSum: data.result.meetSum
          })
        }
      }
    })
    fetchData({
      url: api.GET_DEPT_AGE,
      body: querystring.stringify({orgId, pYear: year}),
      success: data => {
        if (data.status) {
          this.setState({
            pieSeries: data.result
          })
        }
      }
    })
    fetchData({
      url: api.GET_DEPT_EDUCATION,
      body: querystring.stringify({orgId, pYear: year}),
      success: data => {
        if (data.status) {
          this.setState({
            educationSeries: data.result
          })
        }
      }
    })
    fetchData({
      url: api.GET_DEPT_MAJOR,
      body: querystring.stringify({orgId, pYear: year}),
      success: data => {
        if (data.status) {
          this.setState({
            majorSeries: data.result
          })
        }
      }
    })
    this.refs.table.fetch({
      orgId, pYear: year
    })
  }
  search = (value) => {
    this.getData(value);
    this.setState({
      pYear: value
    })
  }
  render () {
    const { location } = this.props;
    const { pYear, bedSum, staffSum, ygSum, meetSum, pieSeries, educationSeries, majorSeries } = this.state;
    return (
      <Content style={{ padding: '0 20px' }} className='right_content'>
        <Breadcrumb style={{ margin: '12px 0', fontSize: '1.1em'}}>
          <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to='/department/deptInfo'>科室建设</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{ location.state ? location.state.deptName : null }</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{marginTop: 4}} className="ant-advanced-search-form">
          <Col span={24}>
            <Select style={{width: 300}} onChange={this.search} value={pYear.toString()}>
              {
                getLocalOption('pYear')
              }
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Card style={styles.card_green}>
              <CardContent 
                icon={{type: 'solution', color: '#3dbd7d'}}
                info={{title: '机构床位数', total: bedSum ? bedSum.planBedSum : 0, range: bedSum ? bedSum.tbPlanBedSum : 0}}
              />
            </Card>
          </Col>
          <Col span={5} push={1}>
            <Card style={styles.card_red}>
              <CardContent 
                icon={{type: 'bell', color: '#f79992'}}
                info={{title: '机构员工总数', total: staffSum ? staffSum.planStaffSum : 0, range: staffSum ? staffSum.tbStaffSum : 0}}
              />
            </Card>
          </Col>
          <Col span={5} push={2}>
            <Card style={styles.card_blue}>
              <CardContent 
                icon={{type: 'rocket', color: '#b3acf2'}}
                info={{title: '医工人员总数', total: ygSum ? ygSum.planYgSum : 0, range: ygSum ? ygSum.tbYgSum : 0}}
              />
            </Card>
          </Col>
          <Col span={5} push={3}>
            <Card style={styles.card_yellow}>
              <CardContent 
                icon={{type: 'like', color: '#7ec2f3'}}
                info={{title: '医工培训总数', total: meetSum ? meetSum.planMeetSum : 0, range: meetSum ? meetSum.tbMeetSum : 0}}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 10}}>
          <Col span={8}>
            <Card title="医工人员年龄情况">
              <Pie series={pieSeries}/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="医工人员专业情况" style={styles.card_left}>
              <Bar series={majorSeries.series} xAxis={majorSeries.xAxis} legend={majorSeries.legend}/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="医工人员学历情况" style={styles.card_left}>
              <Pie series={educationSeries}/>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 10, position: 'relative'}}>
          <RemoteTable
            ref='table'
            url={api.GET_DEPT_USER_LIST}
            columns={columns}
            rowKey={'RN'}
            pageSize={5}
          />
          <div style={{position: 'absolute', right: 10, bottom: 20, fontSize: 30}}>
            <Settings/>
          </div>
        </Row>
      </Content>
    )
  }
}

export default DepartmentDetail;
