/**
 * @file 科室建设和质量上报 主页面公用查询表单
 * @summary 公用表单
 * @author Vania
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { getLocalOption } from '../../utils/common';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
class DeptSeach extends Component {
  submitHandle = (e) => {
    e.preventDefault();
    this.props.submit(this.props.form.getFieldsValue())
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.submitHandle} className="ant-advanced-search-form">
        <Row>
          <Col span={7}>
            <FormItem
              label='医院'
              {...formItemLayout}
            >
              {getFieldDecorator('searchName')(
                <Input placeholder="请输入医院" />
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem
              label='状态'
              {...formItemLayout}
            >
              {getFieldDecorator('fstate', {
                initialValue: ''
              })(
                <Select>
                  <Option value={''}>全部</Option>
                  <Option value={'10'}>已审核</Option>
                  <Option value={'20'}>待审核</Option>
                  <Option value={'30'}>待提交</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem
              label='时间'
              {...formItemLayout}
            >
              {getFieldDecorator('pYear')(
                <Select>
                  {
                    getLocalOption('pYear')
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={3}>
            <Button htmlType='submit'  type="primary" icon='search'>查询</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const DeptSearchForm = Form.create()(DeptSeach);

DeptSearchForm.propTypes = {
  submit: PropTypes.func.isRequired
}
export default DeptSearchForm;