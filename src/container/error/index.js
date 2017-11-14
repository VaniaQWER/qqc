import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

class Error extends Component {
  render () {
    return (
      <div className='not_found'>
        <Row style={{marginTop: 400}}>
          <Col push={10} span={8}>
            <Button 
              size={'large'} 
              icon={'rollback'}
              onClick={() => {
                window.history.go(-1);
              }}
            >上一页</Button>
            <Button 
              size={'large'} 
              style={{marginLeft: 30}} 
              icon={'home'}
              onClick={() => {
                window.location.href = 'http://118.31.237.150/';
              }}
            >返回首页</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Error;