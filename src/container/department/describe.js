import React, { Component } from 'react';

import { Row} from 'antd';

class DeptInfo extends Component {
  render () {
    return(
      <div style={{padding: 25, minHeight: 480}} span={6} className={'right_content'}>

        <h1 style={{textAlign:'center'}}> 湖北省医疗机构医学工程基线调查表</h1>
        <Row span={24} style={{ marginTop: 10,fontSize:16}}>
        医学工程是应用工程理论和技术，用医学与工程结合的方法研究解决医院中有关医疗设备、医用耗材、医用器具、应用软件和体外试剂等的技术管理与工程技术支持的问题，是与临床共同开展应用研究的交叉学科。
        </Row>
        <Row span={24} style={{ marginTop: 10,fontSize:16}}>
        本次调查所涉及的项目用来反映您所在单位2017年度医学工程部门的现状，部分项目可能要参照多年度的相关状态与数据。调查湖北省医疗机构医学工程的基础数据有利于掌握湖北省医学工程部门与学科的现状和基本情况，对于有针对性的开展湖北省医学工程部门与学科规范化建设有重要意义。
        </Row>
        <Row span={24} style={{ marginTop: 10,fontSize:16}}>
        请您认真阅读填写调查表，以保证数据的正确性。非常感谢您抽出宝贵的时间参与我们的调查，您的参与给予了我们莫大的动力，我们将以更大的热情来努力为推动湖北省医院医学工程规范化管理贡献更大的力量。
        </Row>
        <Row style={{marginTop: 10,color:'red'}}>
        （注：本表格可能涉及医疗机构多个职能部门的业务，需多个部门工作人员联合填写）
        </Row>
      </div>
    )
  }
}

export default DeptInfo;