
import React from 'react';
const { Header, Footer, Content } = Layout;
import { Input, Space, Layout,Card,Button, Modal,Select,Tooltip} from 'antd';
const { Search } = Input;
import axios from "axios";
import Recipe from './Recipe';
import '../style/hope.css'
const { Meta } = Card;
import img1 from '../images/Chicken-Biryani.jpg'
import img4 from '../images/pro.jpg'
import img5 from '../images/logo.png'
import { FacebookFilled, InstagramFilled ,SearchOutlined, BookFilled, BookOutlined} from '@ant-design/icons'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const warn=()=>{
  Modal.error({
  title: 'Sorry! NO RECIPIES FOUND'
  })
};

const Hope = (props) => {
  const navigate= useNavigate();
  const [modal, setModal]=useState(false);
  const[search,setSearch]=useState("");
  const[len,setLen]=useState("");
  const[Mymeal,setMeal]=useState();
  const [ing, setIng]= useState("");
  const [hover, setHover]= useState(false);
  
  const { Option } = Select;
  const children = [];
  const arr=search.split(',');
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      setTimeout(()=>{
        navigate('/login');
      },7000)
    }
  },[])
  const handleChange = (value) => {
    console.log(` ${value}`);
    setIng(value);
  };

  const onSearch = () => {
      let url="https://localhost:7122/api/Quantities/"+ing;
      axios.get(url).then(function (response){
        const obj1=response.data.g;
        const obj2=response.data.usedIng;
        let obj3 = [];
        for (let i in obj1) {
          let timeIndex = i ;
          let startTime = obj2[timeIndex];
            obj3.push( [obj1[i], startTime] );
        }
        console.log(obj3)
        setMeal(obj3);
        setLen(ing.length);
        setSearch(" ");
     }).catch((error)=>{
        warn();
     })
  }
return(
    <>
    <Layout className='layout-section'>
      <Header style={{height:70}}>
      <div style={{color:'white',textAlign:'left',fontSize:50,fontWeight:'lighter', marginTop:-4 }}>FOODWISE <img style={{width:43,height:55, marginTop:-12}} src={img5}/>
      <li> <a ><img onClick={()=>{setModal(true)}}  style={{width:39,height:40,float:'right', borderRadius:20,marginTop:-50}} src={img4} /></a></li>
      <Modal title="Your Profile" visible={modal} okText="Sign Out" okButtonProps={{danger:true, type:"dashed"}} onOk={()=>
        {localStorage.clear();
        navigate('/login');}} onCancel={()=>setModal(false)} maskClosable={true} style={{top:20, left:600}} width={300} > 
      <label>Name: {localStorage.getItem('username')}</label> <br/>
      <label>Email: {localStorage.getItem('em')}</label></Modal>
      </div>
      </Header>
      <Content style={{backgroundColor:'white'}}>
        <div className='hpimg'>
          <div className='in'> 
            <Space direction="vertical"/>
            <h1 style={{ textAlign:'center', fontSize:80,color:'black'}}>Find a Recipe</h1>
            <Select  className="searchBar" mode="tags" style={{ width: "100%",height:100}} onChange ={handleChange}showSearch={true} tokenSeparators={[","]}>
                {children}
                <Option value="rice">rice</Option>
                <Option value="curd">curd</Option>
                <Option value="carrot">carrot</Option>
                <Option value="wheat">wheat</Option>
                <Option value="milk">milk</Option>
                <Option value="potato">potato</Option>
                <Option value="sugar">sugar</Option>
                <Option value="salt">salt</Option>
                <Option value="butter">butter</Option>
                <Option value="cheese">cheese</Option>
                <Option value="tomato">tomato</Option>
                <Option value="chilli">chilli</Option>
                <Option value="chicken">chicken</Option>
                <Option value="fish">fish</Option>
                <Option value="egg">egg</Option>
                <Option value="grapefruit">Grapefruit</Option>
                <Option value="lime">Lime</Option>
                <Option selected value="coconut">Coconut</Option>
                <Option value="mango">Mango</Option>
               </Select>
               <Tooltip title="search">
      <Button className='searchbutton'
      onClick={()=>{
        onSearch();
        console.log(ing);
      }}  shape="round" icon={<SearchOutlined />} />
    </Tooltip>  
          </div>
        </div>
        <p className='yu' style={{color:'black'}}>{Mymeal && <h1 className='r' style={{color:'black'}}>Recipes:</h1>}</p>
      <div className="wrapper">
      { Mymeal?.map((res,index)=>{return(<Recipe key={index} data={res} amt={len} />)} ) }
      </div>
      <h1 className='r' style={{color:'black'}}>Top Recommendations</h1>
      <div className="wrapper">
      <Card className='dishes' hoverable style={{ width: 300,}} cover={<a><img src={img1}/></a>}>
        <Meta title="Chicken Biryani" description="A traditional Indian rice dish with tender chicken in a spicy, creamy sauce." />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://fandbrecipes.com/wp-content/uploads/2022/03/Chicken-Manchurian-Recipe_.png"/></a>}>
        <Meta title="Chicken-Manchurian" description="The Chicken Manchurian recipe is a simple yet delectable Chinese recipe." />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5506686.jpg&w=595&h=595&c=sc&poi=face&q=60&orient=true"/></a>}>
        <Meta title="Strawberry-Mango Ice Cream" description="Inspired by The Mastercard (a frozen strawberry-mango concoction " />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg"/></a>}>
        <Meta title="Pancakes" description="This is so refreshing. Cool, smooth summer drink. Delicious " />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://www.tasteofhome.com/wp-content/uploads/2018/01/exps21444_TH132767B05_02_1b_WEB-9.jpg?w=1200"/></a>}>
        <Meta title="Favorite Chicken Potpie" description="This is the best chicken potpie recipe! Chock-full of chicken, potatoes, peas and corn" />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://leitesculinaria.com/wp-content/uploads/fly-images/346503/butter-chicken-1200x1200-c.jpg"/></a>}>
        <Meta title="Butter Chicken" description="It is a type of curry made from chicken with a spiced tomato and butter sauce. " />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://static.toiimg.com/photo/84784534.cms"/></a>}>
        <Meta title="Pasta" description="Craving some authentic Italian-style pasta? No need to order it from the market when you can make it ..." />
      </Card>
      <Card className='dishes' hoverable style={{ width: 300,}}cover={<a><img src="https://www.cookingclassy.com/wp-content/uploads/2014/10/vegetable-soup-7.jpg"/></a>}>
        <Meta title="Vegetable Soup" description="This Vegetable Soup has become one of my most popular soup recipes and for good reason! " />
      </Card>
      </div>
      </Content>
      <Footer>
        <div className="line-5" />
          <div className="sm">
            <div style={{fontWeight:'bold', marginLeft: '-15px',fontSize:'25px',fontFamily:'inter' }}>Site map</div>
              <div className="ul" style={{ marginLeft: '20px' }}></div>
                <div style={{fontWeight: 400, fontFamily: 'sans',fontSize:20}}>Recipe</div>
                <div style={{fontWeight: 450, fontFamily: 'sans',fontSize:20}}>About Us</div>
            </div>
          <div className="vl" style={{left: "33.33%"}} />
          <div className="vl" style={{left: "66.66%"}} />
          <div className="cu" >
            <h2 style={{ fontWeight: 900, fontStyle: 'bold', fontFamily: 'Inter' }}>Contact Us</h2>
            <div className="q" style={{ marginRight: '0%' }}>
              <h4>+91 1234567890</h4>
              <h3 style={{ marginRight: '15px' }}>Goa,India</h3>
              </div>
            </div>
            <div className='social'>
              <h2  style={{fontFamily: 'Inter'}}>Lets Be friends!</h2>
                <FacebookFilled style={{ fontSize: 32, padding: '0 20px', }} />
                <InstagramFilled style={{ fontSize: 32 }} />
              </div> 
          </Footer>
    </Layout>
  </>
);
};
  export default Hope;
