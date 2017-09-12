/**
 * @file 圆形进度条  
 * @summary 科室建设以及质量上报公用
 * @author Vania
 */
import React from 'react';
import PropTypes from 'prop-types'

/**
 * @param {string} percent 百分比 
 * @param {title} 返回标题
 */
const CircleProgress = ({percent, title}) => (
  <div style={{cursor: 'pointer'}}>
    <p style={{color: '#108ee9', fontSize: 14}}>{`${percent.toFixed(2)}%`}</p>
    <p style={{color: 'rgba(0, 0, 0, 0.5)', fontSize: 10}}>{title}</p>
  </div>
)

CircleProgress.propTypes = {
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default CircleProgress;