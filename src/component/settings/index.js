import React, { Component } from 'react';
import { Popover, Icon } from 'antd';

class Settings extends Component {
  getActionList = () => (
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
        <a href={this.props.exportUrl || '#'}><Icon type="export" className='phxl_user_menu_icon'/>导出</a>
      </li>
    </ul>
  )   
  render () { 
    return (
      <Popover placement="leftTop" content={this.getActionList()} trigger="click">
        <Icon type="setting" />
      </Popover>
    )
  }
}
export default Settings;