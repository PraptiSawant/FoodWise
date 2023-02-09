import React, {useState}  from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Modal } from "antd";
import '../style/signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
        const navigate= useNavigate();
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [name, setName] = useState("");
        const [pass, setPass] = useState("");
        const [email, setEmail] = useState("");
        const [cpass, setcPass] = useState("");
        const handleSave =() =>
        {
            const data={
                UserName : name,
                EmailId : email,
                Password : pass
            };
            let url='https://localhost:7122/api/Auth/register';
            axios.post(url,data).then((result)=>{
                setIsModalVisible(true);
            }).catch((error)=>{
               alert("Email ID is already taken....!!");
            })
        }
    return (
        <>
        <div className='bgimg' >
            
            
            <Card className="card1" title={<div style={{ color: 'orange', fontSize: '35px', textAlign: "center" }}>SignUp</div>}
               
                bordered={true}>
                    <h1 style={{paddingLeft:50,color:'white',fontSize:'40px'}}>Ac<u style={{textUnderlineOffset:14,textDecorationThickness:1}}>count Deta</u>ils</h1>

                <Form className='signup-form' labelCol={{ span: 10}} wrapperCol={{ span: 14 }}>
                    <Form.Item name="FullName" label={<label style={{  color: "white",fontSize:"19px" }}>Full Name:</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name!'
                            },
                            { whitespace: true },
                            { min: 3 }
                        ]}
                        hasFeedback
                    >
                        <Input autoComplete='off' onChange={(e) => setName(e.target.value)} placeholder="Type your name" />
                    </Form.Item>

                    <Form.Item className='email' name="Email" label={<label style={{  color: "white",fontSize:"19px" }}>Email ID:</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            },
                            { type: 'email', message: "Please enter a valid email ID" }
                        ]} hasFeedback>
                        <Input autoComplete='off' onChange={(e) => setEmail(e.target.value)} placeholder="Type your email" />
                    </Form.Item>

                    <Form.Item name="Password" label={<label style={{  color: "white",fontSize:"19px" }}>Password:</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Required*'
                            },
                            { min: 8 },
                        ]}
                        hasFeedback
                    >
                        <Input.Password onChange={(e) => setPass(e.target.value)} placeholder="Type your password" />
                    </Form.Item>

                    <Form.Item name="ConfPassword" label={<label className='pass' style={{ color: "white",fontSize:"19px" }}>Confirm Password:</label>}
                        dependencies={["Password"]}
                        rules={[
                            {
                                required: true,
                                message: 'Required*'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('Password') == value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject("Passwords do not match");
                                },
                            }),
                            
                        ]}
                        hasFeedback>


           
                        <Input.Password onChange={(e) => setcPass(e.target.value)} placeholder="Re-enter your password" />
                        
                    </Form.Item> 

                    <Form.Item>
                        <Button disabled={!name || !pass || !email || !cpass} type="primary"  htmlType="submit" shape="round" size="large" className='signup-form-button' onClick={() => {handleSave();}}>
                            Sign Up     </Button>

                           
                     <Modal 
                            visible={isModalVisible}
                            onOk={() => {
                                navigate(-1);
                            }}
                            okText= "Go to Login"
                            onCancel={()=>{
                                setIsModalVisible(false);
                            }}>

                            <p>Registration successful!!</p>
                        
                            </Modal>

                            
                    </Form.Item>
                    <label className="account">Already have an account?
            <a className="register"  href="/login">Login</a> </label>

                </Form>
            
            </Card>
        </div>
       
        </>
    )
}


