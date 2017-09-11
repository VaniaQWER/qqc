/**
 * @file 常用业务代码
 * @summary 常用业务代码 (包括常用format等等)
 * @todo
 * @author Vania
 */
import * as constants from 'constants';
import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
 /**
 * @summary 状态返回 小于10 异常 100 成功  10-100进行中
 * @param {*} progress 
 */
export const renderStatus = progress => {
  if (progress < 10) {
    return 'exception';
  } else if (progress === 100) {
    return 'success';
  } else {
    return 'active';
  }
}

/**
 * 获取本地数据options
 * @param {*} key 
 */
export const getLocalOption = key => {
  const options = constants[key];
  let reactOptions = [];
  for (let k in options) {
    reactOptions.push(<Option key={k} value={k}>{options[k]}</Option>)
  }
  return reactOptions;
}

//获取当前是属于上半年还是下半年
export const getHalfYear = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mount = nowDate.getMonth();
  return mount > 5 ? `${year}2` : `${year}1`;
}