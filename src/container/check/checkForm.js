/**
 * @file 审查表单
 * @summary 科室&质量 公用
 */
import React, { Component } from 'react';
import TableGrid  from 'component/tableGrid';
const { RemoteTable } = TableGrid;
const columns = [
  {
    title: '操作',
    dataIndex: 'constrDeptGuid',
    width: 100,
    fixed: 'left'
  },
  {
    title: '上报周期',
    dataIndex: 'pYear',
    width: 100
  },  {
    title: '医院名称',
    dataIndex: 'orgName',
    width: 200,
  },  {
    title: '科室名称',
    dataIndex: 'deptName',
    width: 100,
  },  {
    title: '联系人',
    dataIndex: 'lxr',
    width: 100,
  },  {
    title: '联系电话',
    dataIndex: 'lxdh',
    width: 100,
  },  {
    title: '状态',
    dataIndex: 'auditFstate',
    width: 100,
  },  {
    title: '完成度',
    dataIndex: 'schedule',
    width: 100
  }
]
class CheckForm extends Component {
  fetch = (values) => {
    this.refs.remote.fetch(values);
  }
  render () {
    return (
      <RemoteTable
        query={{fstate: '10'}}
        ref='remote'
        url={this.props.url}
        scroll={null}
        columns={columns}
        rowKey={'constrDeptGuid'}
      />
    )
  }
}
export default CheckForm;