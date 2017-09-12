/**
 * @file 质量上报
 */
import React, { Component } from 'react';
import { Affix, Progress, BackTop } from 'antd';
import QualityForm from './qualityForm';

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
        <QualityForm setProgress={progress => this.setState({ progress })}/>
        <BackTop/>
      </div>
    )
  }
}
export default QualityReport;