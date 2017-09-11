/**
 * @file card 组件内容信息
 * @summary 主页以及科室建设等页面Card组件内容信息
 * @author Vania
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';

const styles = {
  card: {
    color: 'rgba(0, 0, 0, 0.4)'
  },
  card_h1: {
    fontWeight: '900',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  card_h5: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  up: {
    color: '#f04134'
  },
  down: {
    color: '#00a854'
  }
}
//返回百分比
const getRange = (range) => (
  range * 100 + '%'
)
//Card内容组件
const CardContent = ({icon, info}) => (
  <Row style={styles.card}>
    <Col span={4} style={{marginTop: 10, textAlign: 'left'}}>
      <Icon type={icon.type} style={{ fontSize: 50, color: icon.color }}/>
    </Col>
    <Col span={20} style={{textAlign: 'center'}}>
      <h4 style={styles.card}> {info.title} </h4>
      <h1 style={styles.card_h1}> { info.total } </h1>
      {
        typeof info.range !== 'undefined'? 
        <h5>
          { info.range > 0 ? 
            <span style={styles.up}><Icon type='arrow-up'/>{ getRange(info.range) }</span>:
            <span style={styles.down}><Icon type='arrow-down'/> { getRange(info.range) }</span>
          } 
          <span style={styles.card_h5}>同比上年</span>
        </h5> : <br/>
      }

    </Col>
  </Row>
)

CardContent.propTypes = {
  icon: PropTypes.object.isRequired, 
  info: PropTypes.object.isRequired
}


export default CardContent;