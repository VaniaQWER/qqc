/**
 * @file 湖北省医疗机构分布图
 */
import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';

//获取湖北省baidu json并注册
const hubeiData = require('../../assets/hubei.json');
echarts.registerMap('HuBei', hubeiData);

const RegionMap = ({ymd, level2, level3}) =>{
  return (
    <ReactEchartsCore
      echarts={echarts} 
      option={{
        title: {
          text: `湖北省医疗机构分布图 (2017)`,
          subtext: '包含二甲以及三甲医院',
          textStyle: {
            color: 'rgb(16, 142, 233)'
          }
        },
        series: [{
          name: '三级',
          type: 'map',
          map: 'HuBei',
          aspectScale: 1.3,
          zoom: 1.1,
          itemStyle:{
            normal:{label:{show:true}, areaColor: '#ffe9a7', borderColor: 'rgb(16, 142, 233)'},
            emphasis:{label:{show:true}}
          },
          data: level3.data || [],
        }, {
          name: '二级',
          type: 'map',
          map: 'HuBei',
          aspectScale: 1.3,
          zoom: 1.1,
          itemStyle:{
            normal:{label:{show:true}, areaColor: '#ffe9a7', borderColor: 'rgb(16, 142, 233)'},
            emphasis:{label:{show:true}}
          },
          
          data: level2.data || [],
        }],
        tooltip: {
          trigger: 'item',
          formatter: (result) => {
            return `<p>${result.name}:共${result.value || 0}家</p>
                    <p>三级:${result.data.value || 0}家</p>
                    <p>二级:${isNaN(result.value-result.data.value) ? 0 : result.value-result.data.value}家</p>`
          }
        }
      }} 
      style={{height: 350}}
      className='react_for_echarts' 
    />)
}


export default RegionMap;