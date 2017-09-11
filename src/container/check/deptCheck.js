/**
 * @file 审核主页面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import SiderMenu  from 'component/sider';
import DeptSearchForm from 'component/search'
import CheckForm from './checkForm';

class DeptCheck extends Component {
  getSiderMenu = () => {
    const { menus } = this.props.user;
    const { pathname } = this.props.location;
    const _menus = menus.filter(item => pathname.split('/')[1] === item.uri.split('/')[0]);
    if (pathname && _menus[0]) {
      return <SiderMenu menus={_menus[0].subMenu || []} current={pathname}/>
    } else {
      return null;
    }
  }
  render () {
    return (
      <Row style={{backgroundColor: '#fff'}}>
        <Col span={4}>
          { this.getSiderMenu() }
        </Col>
        <Col span={20}>
        { this.props.children || 
          <Row style={{padding: 8, minHeight: 480}} className={'right_content'}>
            <Col span={24} style={{ marginTop: 10}}>
              <DeptSearchForm submit={(values) => console.log('查询条件:', values)}/>
            </Col>
            <Col span={24} style={{ marginTop: 10}}>
              <CheckForm/>
            </Col>
          </Row>
        }
        </Col>
      </Row>
    )    
  } 
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DeptCheck);