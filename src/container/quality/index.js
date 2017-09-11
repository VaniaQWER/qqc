import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import SiderMenu from 'component/sider';

class Quality extends Component {
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
        { this.props.children }
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

export default connect(mapStateToProps)(Quality);
