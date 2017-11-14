/**
 * @file 审查表单
 * @summary 科室&质量 公用
 */
import React, { Component } from 'react';
import TableGrid  from 'component/tableGrid';
import { getPrevHalfYear } from 'utils/common';
import { auditFstate } from 'constants';
import { Link } from 'react-router';
const { RemoteTable } = TableGrid;
const pYear = new Date().getFullYear() - 1;
class CheckForm extends Component {
  fetch = (values) => {
    this.refs.remote.fetch(values);
  }
  render () {
    const { type } = this.props;
    const year = type ? getPrevHalfYear() : pYear;
    const columns = [
      {
        title: '操作',
        dataIndex: 'orgId',
        width: 100,
        fixed: 'left',
        render: (value, record) => {
          const url = type ? `/check/qualityCheckList/${value}` :`/check/deptCheckList/${value}` ;
          return record.auditFstate === '10' ? 
                 <Link to={{pathname: url, state: {record: record}}}>详情</Link> :
                 null
        }
      },
      {
        title: '上报周期',
        dataIndex: type ? 'pYearText' : 'pYear',
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
        render: (value) => auditFstate[value]
      },  {
        title: '完成度',
        dataIndex: 'schedule',
        width: 100,
        render: value => (Number(value) * 100).toFixed(2) + '%'
      }
    ]
    return (
      <RemoteTable
        rowKey={'RN'}
        query={{fstate: '10', pYear: year}}
        ref='remote'
        url={this.props.url}
        scroll={null}
        columns={columns}
      />
    )
  }
}
export default CheckForm;