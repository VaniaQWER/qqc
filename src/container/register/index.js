/**
 * @file 注册
 * @summary 注册页面
 * @author Vania
 */
import React, { Component } from 'react';
import { Row, Col,Alert } from 'antd';
import { Link } from 'react-router';

class Register extends Component {
  render () {
    return (
      <div>
          <Row>
            <Col span={12} offset={6}>
              <div style={{paddingTop:"10%"}}>
                <Alert message="请选择对应的机构类型，并按需求填写相关信息，信息不正确将会导致信息审核不通过!" type="warning" showIcon />
                <h5>请选择账户类型</h5>
                <Row >
                  <Col span={12} style={{textAlign:'center'}}>
                  <Link  to='/hospital'>
                    <div className="hosiptalIcon"></div>
                    <h5>医疗机构</h5>
                  </Link>
                  </Col>
                  <Col span={12} style={{textAlign:'center'}}>
                    <Link>
                      <div className="serviceIcon"></div>
                      <h5>服务机构</h5>
                    </Link>
                   
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
      </div>
    )
  }
}

export default Register;