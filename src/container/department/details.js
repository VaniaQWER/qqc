/**
 * @file 科室建设明细
 * @summary 科室建设明细展示(包含数据卡, 图标, 表格)
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Icon, Popover } from 'antd';
import Pie from 'component/pie';
import Bar from 'component/bar';
import CardContent from 'component/card';
import TableGrid from 'component/tableGrid';
import { hashHistory, Link } from 'react-router';
import querystring from 'querystring';
const { RemoteTable } = TableGrid;
const { Content } = Layout;

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

const ActionList =  (
  <ul className='phxl_user_menu'>
    <li>
      <a><Icon type="printer" className='phxl_user_menu_icon'/>打印</a>
    </li>
    <li>
      <a><Icon type='cloud-download' className='phxl_user_menu_icon'/>下载</a>
    </li>
    <li>
      <a><Icon type="copy" className='phxl_user_menu_icon'/>导入</a>
    </li>
    <li>
      <a><Icon type="export" className='phxl_user_menu_icon'/>导出</a>
    </li>
  </ul>
)

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
  dataIndex: 'postAge'
}, {
  title: '岗位工龄',
  dataIndex: 'age'
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
    pieSeries: {
      data: [
        { value: '9', name: '≥50岁' },
        { value: '55', name: '40~49岁' },
        { value: '30', name: '＜30岁' },
        { value: '128', name: '30~39岁' },
      ],
      name: '年龄'
    },
    educationSeries: {
      data: [
        { value: '4', name: '博士及以上' },
        { value: '30', name: '硕士' },
        { value: '321', name: '本科' },
        { value: '88', name: '专科' },
        { value: '4', name: '高中及以下' },
      ],
      name: '学历'
    },
    majorSeries: {
      series: [
        { 
          name: '专业',
          type: 'bar',
          data: ['3', '8', '9', '18', '31', '1', '15']
        },
        { 
          name: '测试',
          type: 'line',
          data: ['1', '4', '8', '18', '14', '1', '3']
        }
      ],
      xAxis: {
        data: ['专业1', '专业2', '专业3', '专业4', '专业5', '专业6', '专业7']
      },
      legend: {
        data: ['专业', '测试']
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
    }
  }
  componentWillMount = () => {
    //校验权限以及安全性
    const { location, routeParams } = this.props;
    console.log(location, routeParams)
    if (location.state && routeParams.id) {
      fetch(`${window._uri}/deptInfoController/getDeptUserAge`,{
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          constrDeptGuid: '1',
          orgId: '10002',
          pYear: '2016'
        })
      }).then(res => res.json())
        .then(data => {
          //console.log(data.result.data);
          this.setState({
            pieSeries: {
              data: data.result.data,
              name: '年龄'
            }
          })
        })
      //加载
    } else {
      //参数不齐全或者没访问权限跳转至上一页
      hashHistory.push({
        pathname: '/department/deptInfo'
      })
    }
  }
  render () {
    const { location } = this.props;
    const { bedSum, staffSum, ygSum, meetSum, pieSeries, educationSeries, majorSeries } = this.state;
    return (
      <Content style={{ padding: '0 20px' }} className={'right_content'}>
        <Breadcrumb style={{ margin: '12px 0', fontSize: '1.1em'}}>
          <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to='/department/deptInfo'>科室建设</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{ location.state.deptName }</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{ padding: 10}}>
          <Col span={5} push={1}>
            <Card style={styles.card_green}>
              <CardContent 
                icon={{type: 'solution', color: '#3dbd7d'}}
                info={{title: '机构床位数', total: bedSum.planBedSum, range: bedSum.tbPlanBedSum}}
              />
            </Card>
          </Col>
          <Col span={5} push={2}>
            <Card style={styles.card_red}>
              <CardContent 
                icon={{type: 'bell', color: '#f79992'}}
                info={{title: '机构员工总数', total: staffSum.planStaffSum, range: staffSum.tbStaffSum}}
              />
            </Card>
          </Col>
          <Col span={5} push={3}>
            <Card style={styles.card_blue}>
              <CardContent 
                icon={{type: 'rocket', color: '#b3acf2'}}
                info={{title: '医工人员总数', total: ygSum.planYgSum, range: ygSum.tbYgSum}}
              />
            </Card>
          </Col>
          <Col span={5} push={4}>
            <Card style={styles.card_yellow}>
              <CardContent 
                icon={{type: 'like', color: '#7ec2f3'}}
                info={{title: '医工培训总数', total: meetSum.planMeetSum, range: meetSum.tbMeetSum}}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ padding: 20}}>
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
        <Row style={{ padding: 20, position: 'relative'}}>
          <RemoteTable
            url={''}
            columns={columns}
            rowKey={'constrDeptGuid'}
          />
          <div style={{position: 'absolute', right: 10, bottom: 20, fontSize: 30}}>
            <Popover placement="leftTop" content={ActionList} trigger="click">
              <Icon type="setting" />
            </Popover>
          </div>
        </Row>
      </Content>
    )
  }
}

export default DepartmentDetail;
