/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {
 Icon,
 Button,
 Upload,
 message
} from "antd";
const Dragger = Upload.Dragger;

import "./less/indexStyle.less";

export default class ImportCustomers extends Component {

  state = {};

  componentWillMount() {}

  saveEditInfo = () => {
    this.props.closeDock();
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="importCustomers" id="importCustomers">
        <header className="title">
          <p>导入客户</p>
          <Icon
            className="close"
            onClick={this.saveEditInfo}
            type="close"
          />
        </header>

        <div className="importCustomersContent">
          <p>1.下载客户导入模版，批量填写客户信息<Button>下载</Button></p>
          <p>2.导入填写好的客户信息表</p>

          <Dragger className="dragger" {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">请将文件拖拽到此区域</p>
          {/*<p className="ant-upload-hint"></p>*/}
          </Dragger>
        </div>
      </div>
    )
  }
}
