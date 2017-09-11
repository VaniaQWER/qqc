import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Popover, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userAction } from 'action';

import './style.css';

//样式列表
const styles = {
  avatar: {
    height: 80,
    lineHeight: '100px',
    padding: 0
  }
}

const editPassword = () => {

}

const menus = [
  <Link to='/user'><Icon type="user" className='phxl_user_menu_icon'/>用户信息</Link>,
  <a onClick={editPassword}><Icon type="edit" className='phxl_user_menu_icon'/>修改密码</a>,
  <Link to='/message'><Icon type="message" className='phxl_user_menu_icon'/>我的消息</Link>,
  <Link to='/user'><Icon type="logout" className='phxl_user_menu_icon'/>退出</Link>
]

const UserMenu = () => (
  <ul className='phxl_user_menu'>
    {
      menus.map((item, index) => 
        <li key={index}>{item}</li>
      )
    }
  </ul>
)

const User = (user) => {
  const { users } = user;
  return (
      <div style={styles.avatar}>
        <Popover content={UserMenu()} title={'用户:' + users.name} placement="bottomLeft">
          <Avatar style={{ backgroundColor: '#108ee9' }} icon="user"></Avatar>
        </Popover>
      </div>
  )
}


User.propTypes = {
  user: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (data) => {
      dispatch(userAction.fetchUser(data));
    }
  }
};

export default connect(null, mapDispatchToProps)(User);