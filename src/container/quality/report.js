/**
 * @file 质量上报
 */
import React, { Component } from 'react';
import { Affix, Progress } from 'antd';
import QualityForm from './qualityForm';
import { fetchData } from 'utils/tools';
import api from 'api';
import querystring from 'querystring';

const styles = {
  progress: {
    padding: 20
  },
  h3: {
    color: 'rgb(16, 142, 233)'
  }
}

class QualityReport extends Component {
  state = {
    progress: 0
  }
  componentDidMount = () => {
    fetchData({
      url: api.SELECT_FORMULA_DETAIL,
      body: querystring.stringify({
        orgId: 10002,
        pYear: 2016,
      }),
      success: data => {
        if (data.status) {
          console.log(data);
        }
      }
    })
  }
  render () {
    const { progress } = this.state;
    return (
      <div>
        <Affix offsetTop={-20}>
          <Progress 
            percent={progress} 
            style={styles.progress} 
            strokeWidth={15}
            format={percent => <h3 style={styles.h3}>{`${percent}%`}</h3>}
          />
        </Affix>
        <QualityForm/>
      </div>
    )
  }
}
export default QualityReport;