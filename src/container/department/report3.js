import React, { Component } from 'react';
import ReportOtherForm from 'container/department/reportOtherForm';
import { Affix } from 'antd';
/**
 * @file 科室上报
 * @summary 有数据时为修改, 无数据时为新增
 */

// const styles = {
//   progress: {
//     padding: 20
//   },
//   h3: {
//     color: 'rgb(16, 142, 233)'
//   },
//   row: {
//     padding: 20
//   }
// }
 
class Report extends Component {
  state = {
    progress: 0
  }
  render () {
    // const { progress } = this.state;
    return (
      <div>
        <Affix offsetTop={-20}>
        </Affix>
        <ReportOtherForm setProgress={progress => this.setState({progress: progress})}/>
      </div>
    )
  }
}

export default Report;