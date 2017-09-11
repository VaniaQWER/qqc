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

const RegionMap = () => (
  <ReactEchartsCore
    echarts={echarts} 
    option={{
      title: {
        text: '湖北省医疗机构分布图 (2017)',
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
        data:[
          {name: '十堰市', value: 1000},
          {name: '襄阳市', value: 15477.48},
          {name: '随州市', value: 31686.1},
          {name: '孝感市', value: 6992.6},
          {name: '黄冈市', value: 44045.49},
          {name: '武汉市', value: 40689.64},
          {name: '鄂州市', value: 37659.78},
          {name: '黄石市', value: 45180.97},
          {name: '咸宁市', value: 55204.26},
          {name: '荆州市', value: 21900.9},
          {name: '仙桃市', value: 4918.26},
          {name: '天门市', value: 5881.84},
          {name: '潜江市', value: 4178.01},
          {name: '荆门市', value: 2227.92},
          {name: '宜昌市', value: 2180.98},
          {name: '神农架林区', value: 9172.94},
          {name: '恩施土家族苗族自治州', value: 3368}
        ],
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
        data:[
          {name: '十堰市', value: 1000},
          {name: '襄阳市', value: 15477.48},
          {name: '随州市', value: 31686.1},
          {name: '孝感市', value: 6992.6},
          {name: '黄冈市', value: 998},
          {name: '武汉市', value: 40689.64},
          {name: '鄂州市', value: 37659.78},
          {name: '黄石市', value: 45180.97},
          {name: '咸宁市', value: 55204.26},
          {name: '荆州市', value: 21900.9},
          {name: '仙桃市', value: 4918.26},
          {name: '天门市', value: 5881.84},
          {name: '潜江市', value: 4178.01},
          {name: '荆门市', value: 2227.92},
          {name: '宜昌市', value: 2180.98},
          {name: '神农架林区', value: 9172.94},
          {name: '恩施土家族苗族自治州', value: 3368}
        ],
      }],
      tooltip: {
        trigger: 'item',
        formatter: (result) => {
          return `<p>${result.name}:共${result.value}家</p>
                  <p>三级:${result.data.value}家</p>
                  <p>二级:${result.value-result.data.value}家</p>`
        }
      }
    }} 
    style={{height: 350}}
    className='react_for_echarts' 
  />
)

export default RegionMap;