import React, { Component } from 'react';
import { Row, Col, Card, Layout, Select } from 'antd';
import RegionMap from 'component/map';
import Pie from 'component/pie';
import Bar from 'component/bar';
import CardContent from 'component/card';
import { fetchData } from 'utils/tools';
import { getHalfYear } from 'utils/common';
import api from 'api';
import querystring from 'querystring';

const Option = Select.Option;

const styles = {
  dashboardMain: {
    padding: '10px 0px',
    backgroundColor: '#fff'
  },
  map: {
    marginTop: '10px'
  },
  card_blue: {
    backgroundColor: '#ecf6fd'
  },
  card_green: {
    backgroundColor: '#ebf8f2'
  },
  card_red: {
    backgroundColor: '#fef0ef'
  }
}

class Dashboard extends Component {
  state = {
    ymd: '',//默认年份
    orgInfo: {
      orgSum: {
        totalOrg: '',
        tbTotalOrg: '',
      },
      topThreeOrg: {
        totalLevel3: '',
        tbTotalLevel3: ''
      },
      topTwoOrg: {
        totalLevel2: '',
        toTotalLevel2: ''
      }
    }
  }
  //获取整个
  getDashboard = (ymd = this.state.ymd) => {
    fetchData({
      url: api.ORG_INFO,
      body: querystring.stringify({ ymd }),
      success: data => {
        if (data.status) {
          const orgInfo = data.result;
          this.setState({ orgInfo })
        }
      }
    })
    // fetchData({
    //   url: api.ORG_INFO,
    //   body: querystring.stringify({ ymd }),
    //   success: data => console.log(data)
    // })
    // fetchData({
    //   url: api.ORG_INFO,
    //   body: querystring.stringify({ ymd }),
    //   success: data => console.log(data)
    // })
    this.setState({ ymd })
  }
  componentDidMount = () => {
    const ymd = getHalfYear();
    this.getDashboard(ymd)
  }
  render () {
    const { ymd } = this.state;
    return (
      <Layout style={styles.dashboardMain}>
        <Row>
          <Col span={24} push={1}>
            <Select 
              style={{width: 400}} 
              placeholder='请选择年份' 
              value={ ymd }
              onChange={value => this.getDashboard(value)}
            >
              <Option value={'20151'}>2015上半年</Option>
              <Option value={'20152'}>2015下半年</Option>
              <Option value={'20161'}>2016上半年</Option>
              <Option value={'20162'}>2016下半年</Option>
              <Option value={'20171'}>2017上半年</Option>
              <Option value={'20172'}>2017下半年</Option>
              <Option value={'20181'}>2018上半年</Option>
              <Option value={'20182'}>2018下半年</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: 10}}>
          <Col span={6} push={1}>
            <Card style={styles.card_blue}>
              <CardContent 
                icon={{type: 'area-chart', color: '#08c'}}
                info={{title: '机构总数', total: '1,345', range: 0.1}}
              />
            </Card>
          </Col>
          <Col span={6} push={3}>
            <Card style={styles.card_green}>
              <CardContent 
                icon={{type: 'pie-chart', color: '#3dbd7d'}}
                info={{title: '三甲机构', total: '323', range: 0.12}}
              />
            </Card>
          </Col>
          <Col span={6} push={5}>
            <Card style={styles.card_red}>
              <CardContent 
                icon={{type: 'dot-chart', color: '#f04134'}}
                info={{title: '二甲机构', total: '1,022', range: -0.08}}
              />
            </Card>
          </Col>
        </Row>
        <Row style={styles.map}>
          <Col span={22} push={1}>
            <Card title="机构分布">
              <RegionMap/>
            </Card>
          </Col>
        </Row>
        <Row style={styles.map}>
          <Col span={12} push={1}>
            <Card title="医工人数">
              
            </Card>
          </Col>
          <Col span={9} push={2}>
            <Card title="医工人员学历情况">
              
            </Card>
           </Col>
        </Row>
        <Row style={styles.map}>
          <Col span={10} push={1}>
            <Card title="不良事件上报率">不良事件上报率</Card>
          </Col>
          <Col span={10} push={3}>
            <Card title="耗材追溯分析">耗材追溯分析</Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Dashboard;