import React, { Component } from 'react';
import { renderStatus } from 'utils/common';
import api from 'api';
import { Row, Col, Progress } from 'antd';
import { fetchData } from 'utils/tools';
import { Link } from 'react-router';
import DeptSearchForm from 'component/search';
import CircleProgress from 'component/circleProgress';
import LoadMore from 'component/loadMore';

class DeptInfo extends Component {
  state = {
    hospital: [],
    loadMore: true
  }
  componentDidMount = () => {
    fetchData({
      url: api.SELECT_SCOPE_LIST,
      success: data => {
        if (data.status) {
          const hospitalArr = data.result.rows;
          let hospital = [];
          hospitalArr.map(item => hospital.push(item))
          this.setState({hospital: hospitalArr});
        }
      }
    })
  }
  loadMore = () => {

  }
  render () {
    const { hospital } = this.state;
    return (
      <Row style={{padding: 8}} span={6} className={'right_content'}>
        <Col span={24} style={{ marginTop: 10}}>
          <DeptSearchForm submit={(values) => console.log('查询条件:', values)}/>
        </Col>
        {
          hospital.map(item => 
            <Col span={6} push={2} key={item.id} style={{marginTop: 10}}>
              <Link to={{pathname: `/department/deptInfo/${item.constrDeptGuid}`, state: {deptName: item.title}}}>
                <Progress 
                  width={150}
                  type="circle" 
                  percent={item.schedule} 
                  status={renderStatus.call(null, item.schedule)}
                  format={() => <CircleProgress percent={item.schedule} title={item.orgName}/>}
                />
              </Link>
            </Col>)
        }
        <Col span={24} style={{textAlign: 'center', marginTop: 40}}>
          <LoadMore ending={this.state.loadMore} onClick={this.loadMore}/>
        </Col>
      </Row>
    )
  }
}

export default DeptInfo;