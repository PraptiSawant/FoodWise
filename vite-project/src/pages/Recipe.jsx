import React from 'react';
import { useState } from 'react';
const { Header, Footer, Content } = Layout;
import { Input, Space, Layout,Card } from 'antd';
import '../style/home.css'
const { Meta } = Card;
import {BookFilled, BookOutlined} from "@ant-design/icons";
import axios from "axios";

export default function Recipe(props) {
 const [hover, setHover]= useState(false);

  return (
    <>
   <Card className='dishes' hoverable style={{ width: 300}}
    href={props.data[0][0]["recipeUrl"]} target="_blank"
    cover={<a  href={props.data[0][0]["recipeUrl"]} target="_blank"><img src={props.data[0][0]["recipeImgUrl"]}/></a>}>
    <Meta title={props.data[0][0]["recipeName"]} description={props.data[0][0]["recipeSubtitle"]} />
     <h3 style={{ marginLeft:'20px'}}>No Of Ingredients Used: {props.data[0].length}/{props.amt}</h3>
     <h3 style={{ marginLeft:'20px'}}>Used : {props.data[1].map((i)=>i["ingredientName"]+" \n ")}</h3>
     {/* <button onClick={()=>{
      const data={
        RecipeId : props.data[0][0]["recipeId"],
        UserId: localStorage.getItem('id')
    };
      let uri='https://localhost:7122/api/Auth/fav';
            axios.post(uri,data).then((result)=>{
                alert(result.data);
            }).catch((error)=>{
               alert("Email ID is already taken....!!");
            })
      }}>Hello</button> */}
  </Card>
  </>
  )
}
