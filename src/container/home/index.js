import React, { Component } from 'react';
import TopMenu from 'component/topMenu';
import User from 'component/user';
import Logo from 'component/logo';
import Dashboard from 'container/dashboard';
// import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { userAction } from 'action';

const { Header, Footer, Content } = Layout;

const styles = {
  header: {
    fontSize: '1.2em',
    height: 80,
    backgroundColor: '#ffffff'
  },
  content: {
    padding: '20px 40px',
    minHeight: 600
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#ffffff'
  }
}

class Home extends Component {
  state = {

  }
  //第一次加载 渲染全局数据
  componentDidMount = () => {
    //const { user } = this.props;
    //const { state } = this.props.location
    //console.log(user)
    // if (state && state.user) {
    //   login(state.user);
    // } else {
    //   message.warn('无用户信息!');
    //   hashHistory.push({
    //     pathname: '/login'
    //   })
    // }
  }
  render () {
    const { user, location } = this.props;
    const current = location.pathname;
    return (
      <Layout>
        <Header style={
          styles.header
        }>
          <Row>
            <Col span={4}>
              <Logo/>
            </Col>
            <Col span={16} push={2}>
              <TopMenu
                menus={user.menus}
                target={current}
              />
            </Col>
            <Col span={2} push={1}>
              <User 
                users={user.user}
              />
            </Col>
          </Row>
        </Header>
        <Content style={styles.content}>
          {
            this.props.children || <Dashboard/>
          }
        </Content>
        <Footer style={styles.footer}>
          Copyright©2017 普华信联科技有限公司
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(userAction.fetchUser(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);