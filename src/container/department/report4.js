import React, { Component } from 'react';
import PersonInfoForm from 'container/department/personInfoForm';
/**
 * @file 科室上报
 * @summary 有数据时为修改, 无数据时为新增
 */
 
class Report extends Component {
  render () {
    return (
        <PersonInfoForm />
    )
  }
}

export default Report;