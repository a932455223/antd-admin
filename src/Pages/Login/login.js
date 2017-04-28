import React, { PropTypes } from 'react'
import { Form, Input, Button, Row, Col, Icon, notification, Card} from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import axios from 'axios';
import api from './../../../API'
const FormItem = Form.Item
import './login.less'

const propTypes = {
  user: PropTypes.object,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      captchaImg:"",
    }
  }
   componentWillMount(){
     this.getCaptcha();
   }
  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const isLoggingIn = nextProps.loggingIn;
    const user = nextProps.user

    this.setState({
      loading: false
    });

    if (error != this.props.loginErrors && error) {
      notification.error({
        message: 'Login Fail',
        description: error
      });
    }

    if (!isLoggingIn && !error && user)  {
      notification.success({
        message: 'Login Success',
        description: 'Welcome ' + user
      });
    }

    if (user) {
      this.context.router.replace('/home');
    }
  }
  getCaptcha=()=>{
    // axios.get(api.GET_CAPTCHA)
    // .then((data) => {
    //   if (data.status === 200 && data.statusText === 'OK' && data.data) {
    //     this.setState({
    //       captchaImg: data
    //     })
    //   }
    // })
    this.setState({
      captchaImg:<img src={[api.GET_CAPTCHA]} />
    })

  }
  handleSubmit (e) {
    e.preventDefault();
    // this.setState({
    //   loading: true
    // });
    // const data = this.props.form.getFieldsValue()
    
    // this.props.login(data.user, data.password)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(api.POST_LOGIN,values)
        .then((data)=>{
            console.log(data)
        })
      }
    });

  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      // <Row className="login-row" type="flex" jeustify="space-around" align="middle">
      //   <Col span="8">
      //     <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} className="login-form">
      //       <h2 className="logo"><span>logo</span></h2>
      //       <FormItem>
      //         {getFieldDecorator('user')(
      //           <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='admin' />
      //         )}
      //       </FormItem>
      //       <FormItem>
      //         {getFieldDecorator('password')(
      //           <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='123456' />
      //         )}
      //       </FormItem>
      //       <p>
      //         <Button className="btn-login" type='primary' size="large" icon="poweroff" loading={this.state.loading} htmlType='submit'>登陆</Button>
      //       </p>
      //     </Form>
      //   </Col>
      // </Row>

      <div className="loginpagebc">
        {this.state.captchaImg} 
        <div onClick={this.getCaptcha}>点击更换</div>
        <div className="loginpage">
        <div className="img"></div>
        <div className="loginbox">
          <h1>登陆精准营销系统</h1>
          <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
              <FormItem labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        label="用户名"
                        className="user">
                {getFieldDecorator('phone', {
                  onChange: this.dateChange
                })(
                  <Input  placeholder="请输入用户名" size="large"/>
                )}
              </FormItem>
              <FormItem labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        label="密码"
                        className="password">
                {getFieldDecorator('password', {
                  onChange: this.dateChange
                })(
                  <Input  placeholder="请输入密码" size="large"/>
                )}
              </FormItem>
              <FormItem labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        label="验证码"
                        className="yanzhengcode">
                <Row gutter={8}>
                  <Col span={14}>
                    {getFieldDecorator('captcha', {
                      rules: [{message: 'Please input the captcha you got!' }],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={10}>
                    <div></div>
                  </Col>
                </Row>
              </FormItem>
              <FormItem 
               className="button">
                <Button type="primary" htmlType="submit"  size="large">登陆</Button>
              </FormItem>
          </Form>
        </div>
        </div>
      </div>

    )
  }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
  const {auth} = state;
  if (auth.user) {
      return {user: auth.user, loggingIn: auth.loggingIn, loginErrors: ''};
  }

  return {user: null, loggingIn: auth.loggingIn, loginErrors: auth.loginErrors};
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
