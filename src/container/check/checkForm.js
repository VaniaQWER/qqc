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
    fixed: 'left',
    key: 'constrDeptGuid'
  },
  {
    title: '上报周期',
    dataIndex: 'pYear',
    width: 100,
    key: 'pYear'
  },  {
    title: '医院名称',
    dataIndex: 'orgName',
    width: 200,
    key: 'orgName'
  },  {
    title: '科室名称',
    dataIndex: 'deptName',
    width: 100,
    key: 'deptName'
  },  {
    title: '联系人',
    dataIndex: 'lxr',
    width: 100,
    key: 'lxr'
  },  {
    title: '联系电话',
    dataIndex: 'lxdh',
    width: 100,
    key: 'lxdh'
  },  {
    title: '状态',
    dataIndex: 'auditFstate',
    width: 100,
    key: 'auditFstate'
  },  {
    title: '完成度',
    dataIndex: 'schedule',
    width: 100,
    key: 'schedule'
  }
]
class CheckForm extends Component {
  render () {
    return (
      <RemoteTable
        ref='remote'
        url={''}
        scroll={null}
        columns={columns}
        rowKey={'constrDeptGuid'}
      />
    )
  }
}
export default CheckForm;