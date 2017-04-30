import React,{Component} from 'react'
import { Form, Input,Button } from 'antd';
const FormItem = Form.Item;


class LoginForm extends Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="password"
          hasFeedback
        >
          {
            getFieldDecorator('password',{
              rules:[{required:true,message:'password is required'}]
            })(
            <Input />
          )}
        </FormItem>
      </Form>
    )
  }
}
const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log('map triggered.')
    return {
      username: {
        ...props.username
      },
      password:{
        ...props.password
      }
    };
  },
  onValuesChange(_, values) {
  },
})(LoginForm);

class Demo extends Component {
  state = {
    fields: {
      username: {
        value: 'benjycui',
      },
      password:{
        value:''
      }
    },
  };
  handleFormChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    });
  }
  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
        <Button onClick={(e)=>{this.setState({
          fields:{
            username:{
              value:'hello'
            }
          }
        })}}>this is a button.</Button>
      </div>
    );
  }
}

export default Demo
