import React, { Component } from 'react';
import { Select} from 'antd';
import querystring from 'querystring';
import { fetchData } from 'utils/tools';
const Option = Select.Option;

let timeout;
let currentValue;

function fake(value, callback, url, query) {
  
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  fetchData({
    url: url + '?searchName=' + value + '&' + querystring.stringify(query),
    method: 'get',
    success: d => {
      if (currentValue === value) {
        let result = d;
        const data = [];
        result.forEach((r) => {
          data.push({
            value: r.value.toString(),
            text: r.text,
          });
        });
        callback(data);   
      }
    }
  })
}
class RemoteSelect extends Component {
  state = {
    data: [],
    value: '',
  }
  getValues = (value) => {
    this.props.cb(value);
  }
  handleChange = (value) => {
    this.setState({ value });
    fake(value, data => this.setState({ data }), this.props.url, this.props.query);
  }
  render() {
    const options = this.state.data.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>);
    return (
      <Select
        showSearch
        defaultValue={this.props.defaultValue}
        onSearch={this.handleChange}
        onChange={this.getValues}
        notFoundContent="暂无查询结果"
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        allowClear={this.props.allowClear}
        filterOption={false}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      >
        {options}
      </Select>
    );
  }
} 

export default RemoteSelect;