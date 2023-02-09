import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import React from "react";
import {useState}  from 'react';
import axios from "axios";
import { Card } from "antd";
import videoBg from '../images/login.mp4';
import Hope from './Hope';
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
//import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../style/login.css'
import img5 from '../images/logo.png'


const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [user, setEmpty] = useState("gedwjbf");
  const [un,setun]=useState("");
const handleLogin =() =>
{
  const data={
      UserName: user,
      EmailId : username,
      Password : pass
  };
  let uri='https://localhost:7122/api/Auth/login';
  axios.post(uri,data).then((result)=>{
     localStorage.setItem('token',result.data.token);
     localStorage.setItem('username',result.data.userName);
     localStorage.setItem('em',result.data.userEmailId);
     localStorage.setItem('id',result.data.userId);
     navigate('/home');
  }).catch((error)=>{
     alert(error);
  })
}
return(
<>
    <div className="right">
      <Card className="card" title={<div style={{color: 'orange', textAlign: 'center', fontSize: '25px'}}><u>RECIPE</u></div>}bordered={true}>
        <label  style={{letterSpacing:2, color: 'white',marginLeft:120, paddingTop:180, fontSize: '45px',fontFamily:"sans-serif",textUnderlineOffset:12}}>F<u style={{textDecorationThickness:1}}>OODWIS</u>E</label> <img style={{height:60, marginTop:-22,marginLeft:10}} src={img5}/>
        <div className="align">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              { type : 'email', message: "Please enter a valid email ID" }
            ]}
          >
            <label className="email">Email</label>
            <Input className="input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email-ID"
              onChange={(e) => setUser(e.target.value)}
             
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
             <label className="password">Password</label>
            <Input className="input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{color:"white"}} >Remember me</Checkbox>
            </Form.Item>

            
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape= "round"
              onClick={() => {handleLogin();}}
            >
             <span style={{fontSize:15}}>Login</span>
            </Button> 
            <label className="account" style={{margin:-80}}> Don't have an account?
            <a className="register"  href="Signup" >Sign up</a> </label>
          </Form.Item>
        </Form>
        </div>
      </Card>


 
      <div className="main">
        <video src={videoBg} autoPlay loop muted></video>
        
      </div>
     


    </div>

    </>
  );
};

export default Login;