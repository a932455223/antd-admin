import React,{Component} from 'react'
import SelectStaff from '../../../../../components/SelectStaff'
import {
  Modal
} from 'antd';
export default class AddCrewModal extends Component {
  state = {
    confirmLoading: false,
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.props.hide();
      this.setState({
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.props.hide();
  };

  render() {
    const { visible } = this.props;
    return(
      <Modal  title="选择人员"
              width="600px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}>
        <SelectStaff />
      </Modal>
    )
  }
}
