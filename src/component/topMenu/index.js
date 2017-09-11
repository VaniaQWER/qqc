import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userAction } from 'action';

//样式列表
const styles = {
  menu_item: {
    height: 80,
    lineHeight: '80px'
  }
}

//菜单 TODO   递归返回多级菜单
const menuRender = menus => (
  menus.map(item => (
      <Menu.Item key={item.uri.split('/')[0]} style={styles.menu_item}>
        <Link to={'/'+item.uri} key={'uri_'+item.uri}>
          <Icon type={item.icon} />{ item.text }
        </Link>  
      </Menu.Item>
  ))    
)

const TopMenu = ({onClick, menus, target}) => {
  return (
    <Menu
      selectedKeys={[target.split('/')[1]]}
      mode="horizontal"
      onClick={ e => {
        onClick({current: e.key})
      }}
    >
      {
        menuRender(menus)
      }
    </Menu>
  )
}


TopMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  target: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (data) => {
      dispatch(userAction.fetchUser(data));
    }
  }
};

export default connect(null, mapDispatchToProps)(TopMenu);