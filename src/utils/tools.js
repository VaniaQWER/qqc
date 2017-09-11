/**
 * @file tools 
 * @desc 常用工具类
 * @author Vania
 */
import { message } from 'antd';
import { hashHistory } from 'react-router';

const _remote = 'http://192.168.0.91:8080';
// 外网测试环境 'http://120.26.128.15:8903';
// 冯辉测试环境 'http://192.168.0.91:8080';

 /**
  * @summary 原生fetch方法改造,常规获取json格式数据
  */
  export const fetchData = ({
    url, body, success, error, method, type
  }) => {
    const query = typeof body === 'object' ? JSON.stringify(body) : body;
    fetch(`${_remote}${url}`, {
      method: method || 'post',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': type || 'application/x-www-form-urlencoded'
      },
      body: query
    })
      .then(res => {
        switch (res.status) {
          case 997:
            hashHistory.push({pathname: '/login'});
            return message.warn('非法访问，请重新登录');
          case 998:
            hashHistory.push({pathname: '/login'});
            return message.warn('会话失效，请重新登录');
          case 999:
            hashHistory.push({pathname: '/login'});
            return message.warn('登录失效，请重新登录');
          default:
            return res.json();
        }
      })
      .then(data => {
        success(data)
      })
      .catch(e => {
        if (typeof error === 'function') {
          error();
        }
        message.error('存在异常' + e.message)
      });
  }

// const ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
// const 
//     push = ArrayProto.push,
//     slice = ArrayProto.slice,
//     toString = ObjProto.toString,
//     hasOwnProperty = ObjProto.hasOwnProperty;
// //ES5原生方法,如果浏览器支持则优先使用    
// const 
//     nativeIsArray = Array.isArray,
//     nativeKeys = Object.keys,
//     nativeBind = FuncProto.bind,
//     nativeCreate = Object.create;

/**
 * @summary 是否为数组
 */
//export const isArray = nativeIsArray //|| (arr) => (toString.call(obj))

/**
 * @summary 数组去重
 * @param {*} array 
 */
export const unique = array => {

}

/**
 * @summary 在数组中搜索指定值并返回索引
 */
export const inArray = () => {

}

/**
 * @summary 检测传入参数是不是数字
 */
export const inNumeric = () => {

}

/**
 * @summary 检测传入的参数是不是js函数对象
 */
export const isFunction = () => {

}

/**
 * @summary 获得json长度
 */
export const getJSONSize = json => {
  //todo 判断是否为object
}


