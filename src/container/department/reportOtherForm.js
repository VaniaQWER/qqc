import React, { PureComponent } from 'react';
import { Card, Form, Input, Row } from 'antd';

const FormItem = Form.Item;
const styles = {
  row: {
    padding: 8
  },
  col: {
    marginTop: 10
  },
  card: {
    marginTop: 5
  },
  button: {
    marginRight: 20
  },
  tool: {
    marginTop: 10,
    textAlign: 'center'
  }
}

//一行一条样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
//一行多条样式
const formItemLayoutForMore = {
  labelCol: {
    sm: { span: 10 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

/**
 * @file 质控上报
 */

class ReportOtherForm extends PureComponent {
  getProgress = () => {

  }
  render() {
    const { form } = this.props;
    return (
      <Row style={styles.row} className='right_content'>
        <Card title="医学工程部门基本情况">
          <FormItem
            {...formItemLayout}
            label='是否建立独立、且业务完善的医学工程部门'
          >
            {form.getFieldDecorator('deptName', {
              rules: [{ required: true, message: '请输入部门名称' }],
              //initialValue: updateData.deptName
            })(
              <Input onBlur={this.getProgress}/>
            )}
          </FormItem> 
        </Card>   
      </Row>
    )
  }
}

export default Form.create()(ReportOtherForm);