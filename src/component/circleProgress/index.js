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
    <h5 style={{color: '#108ee9'}}>{`${percent}%`}</h5>
    <h4 style={{color: 'rgba(0, 0, 0, 0.5)'}}>{title}</h4>
  </div>
)

CircleProgress.propTypes = {
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default CircleProgress;