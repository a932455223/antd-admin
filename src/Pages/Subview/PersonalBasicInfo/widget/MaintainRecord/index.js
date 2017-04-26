import React,{Component} from 'react'
import {Timeline,Button,Icon,Input} from 'antd'
export  default  class MaintainRecord extends Component {
  render() {
    return(
      <div className="maintainrecord">
        <Timeline>
          <Timeline.Item >
            <div className="timeline">
              <div className="time">
                <p>2015-09-01</p>
                <p>14:02:20</p>
              </div>


              <div className="timelinereacod">
                <div className="edit">
                  <span>
                    <span><Icon type="edit" />编辑</span>
                    <span><Icon type="delete" />删除</span>
                  </span>
                </div>

                <div className="record">
                  <div>张益达</div>
                  <span>【电话】</span>进行了
                  <span>1</span>次
                  <span>【产品到期提醒】</span>维护
                </div>

                <div className="text">
                  <Input  type='textarea'
                          rows={2}
                          value='介绍理财产品，制定理财计划书，客户下单'/>
                  <div className="footerr">
                    <span>取消</span>
                    <Button>保存</Button>
                  </div>
                </div>
              </div>
            </div>
          </Timeline.Item>
          <Timeline.Item >
            <div className="timeline">
              <div className="time">
                <p>2015-09-01</p>
                <p>14:02:20</p>
              </div>


              <div className="timelinereacod">
                <section className="edit">
                  <span>
                    <span><Icon type="edit" />编辑</span>
                    <span><Icon type="delete" />删除</span>
                  </span>
                </section>

                <section className="record">
                  <div>张益达</div>
                  <span>【电话】</span>进行了
                  <span>1</span>次
                  <span>【产品到期提醒】</span>维护
                </section>

                <section className="text">
                  <Input  placeholder='介绍理财产品，制定理财计划书，客户下单'/>
                </section>
              </div>
            </div>
          </Timeline.Item>
        </Timeline>

        <Button className="loadmore">加载更多<Icon type="down" /></Button>
      </div>
    )
  }
}
