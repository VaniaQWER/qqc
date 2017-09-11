import React, { Component } from 'react';
import { Row, Col, Input, Popconfirm, message } from 'antd';
import TableGrid from 'component/tableGrid';
import { fetchData } from 'utils/tools';
import querystring from 'querystring';
import { Link } from 'react-router';
import api from 'api';
const { RemoteTable } = TableGrid;
const Search = Input.Search;
//重置密码
const resetPsd = (userId) => {
  fetchData({
    url: api.RESET_PASSWORD,
    body: querystring.stringify({ userId }),
    success: data => {
      if (data.status) {
        message.success('重置成功')
      } else {
        message.error(data.msg);
      }
    }
  })
}
//审核用户
const checkUser = (user) => {
  fetchData({
    url: api.AUDITUSERINFO,
    body: querystring.stringify({ userId:user.userId,auditFstate:user.auditFstate }),
    success: data => {
      if (data.status) {
        message.success('审核成功')
      } else {
        message.error(data.msg);
      }
    }
  })
}

const columns = [
  {
    title: '操作',
    dataIndex: 'userId',
    width: 180,
    render: (userId, user) => (
      <span>
        <Popconfirm title="是否重置密码?" onConfirm={resetPsd.bind(null, userId)} okText="确定" cancelText="取消">
          <a>重置密码</a>
        </Popconfirm>
        {
          user.auditFstate === "20" ?
          <span>
          <span className="ant-divider" />
          <Popconfirm title="是否通过审核?" onConfirm={checkUser.bind(null, user)} okText="确定" cancelText="取消">
            <a>审核</a>
          </Popconfirm>
          </span>
          :
          null
        }
        <span className="ant-divider" />
        <Link to={{pathname: `/user/userInfo/${userId}`, state: {type: '编辑', user}}}>编辑</Link>
        <span className="ant-divider" />
        <Link to={{pathname: `/user/userInfo/${userId}`, state: {type: '详情', user}}}>详情</Link>
      </span>
    ),
    fixed: 'left',
  },
  {
    title: '账号',
    dataIndex: 'userNo',  
  },  {
    title: '联系人',
    dataIndex: 'userName'
  },  {
    title: '联系电话',
    dataIndex: 'mobilePhone'
  },  {
    title: '所属医院',
    dataIndex: 'orgName'
  },  {
    title: '联系地址',
    dataIndex: 'userAddress'
  },  {
    title: '状态',
    dataIndex: 'auditFstate',
    render: (value) => (
      value === '10' ? <span style={{color: '#ffce3d'}}>待审核</span> : <span style={{color: '#3dbd7d'}}>审核通过</span>
    )
  }
]

class UserInfo extends Component {
  render () {
    return (
      <Row style={{padding: 8, minHeight: 480}} span={6} className={'right_content'}>
        <Col span={24} className="ant-advanced-search-form">
          <Search
            placeholder="账号/联系人/机构名"
            style={{ width: 200 }}
            onSearch={value => this.refs.table.fetch({searchName: value})}
          />
        </Col>
        <Col span={24}>
          <RemoteTable
            ref='table'
            url={api.SEARCH_USER_LIST}
            columns={columns}
            rowKey={'userId'}
          />
        </Col>  
      </Row>
    )
  }
}

export default UserInfo;