import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
const Bar = ({ series, xAxis, legend}) => (
  <ReactEchartsCore
    echarts={echarts}
    option={{
      color: ['#49a9ee', '#f46e65', '#3dbd7d', '#f7629e', '#f78e3d'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} "
      },
      legend: {
        data: legend ? legend.data : []
      },
      xAxis: {
        type: 'category',
        data: xAxis ? xAxis.data : [],
        axisLabel: {
          interval: 0,
          rotate: -30
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel : { 
          formatter : value => Number(value * 100).toFixed(2) + '%'
        }, 
        splitLine:{ 
          show:false 
        },
      },
      dataZoom: [{
        start: 0,
        end: 200,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
      }],
      series : series ? series : []
    }} 
    style={{height: 250}}
    className='react_for_echarts' 
  />
)

export default Bar;