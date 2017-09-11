import React from 'react';
import PropTypes from 'prop-types';
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

const Pie = ({series}) => (
  <ReactEchartsCore 
    echarts={echarts}
    option={{
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
        {
            name: series.name,
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: series.data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
      ]
    }} 
    style={{height: 250}}
    className='react_for_echarts' 
  />
)

Pie.propTypes = {
  series: PropTypes.object.isRequired
}

export default Pie;
