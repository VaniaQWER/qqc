/**
 * @file 左侧菜单
 * @summary 渲染左侧菜单栏
 * @author Vania
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu } from 'antd';
class SiderMenu extends Component {
  state = {
    current: ''
  }
  render () {
    const { menus, current } = this.props;
    const currentArr = current.split('/');
    const selectedKey = `/${currentArr[1]}/${currentArr[2]}`;
    return (
      <Menu 
        mode='inline'
        selectedKeys={[selectedKey]}
        onSelect={item => this.setState({current: item.key})}
      >
        {
          menus.map((item, index) => {
            return <Menu.Item key={`/${item.uri}`}><Link to={`/${item.uri}`}>{ item.text }</Link></Menu.Item>
          })
        }
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired
}


export default SiderMenu;