import React,{Component} from 'react'
import { Form, Input,Button,Icon } from 'antd';
const FormItem = Form.Item;

function info(msg,color='red'){
  console.log('%c'+msg,'color:color')
}

class Form3 extends Component{

  componentWillReceiveProps(){
    info('Form3 will receive props')
  }

  componentWillMount(){
    info('Form3 will mount.')
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const {user} = this.props;
    return <Form onSubmit={this.handleSubmit} className="login-form">
      <FormItem>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue:user.userName
        })(
          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
          initialValue:user.password
        })(
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}  placeholder="Password" />
        )}
      </FormItem>
      <FormItem>
        <Button onClick={(e)=>{this.props.form.resetFields()}}>重置</Button>
      </FormItem>
    </Form>
  }
}

let MyForm = Form.create()(Form3)
let user1 = {
  id:1,
  userName:'Jerry',
  password:'abcdef'
}
let user2 = {
  id:2,
  userName:'tom',
  password:'hello'
}
export default  class Demo3 extends  Component{

  state = {
    user:{
      id:3,
      userName:'jack',
      password:'123456'
    }
  }
  render(){
    return (
      <div>
        <Button onClick={()=>{this.setState({user:user1})}}>Button 1</Button>
        <Button onClick={()=>{this.setState({user:user2})}}>Button 2</Button>
      <MyForm key={this.state.user.id.toString()}  user={this.state.user}/>
      </div>
    )
  }
}
