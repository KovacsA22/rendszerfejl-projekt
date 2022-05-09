import React, { useState , useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';

const LoginForm = () => {

  let navigate = useNavigate();

  const [error, setError] = useState("");

  let username, password;

  const cookies = new Cookie();

  async function login(){
    setError("");
    try{
      const response = await Axios.post("http://127.0.0.1:8000/login/", {username:username, password:password}, {validateStatus:false});
      if(response.status === 200){
        //const response={data:{role:username}};
        cookies.set('username',username,{path:'/'});
        console.log(cookies.get('username'));
        switch(response.data.data.role){
          case 2:
            navigate('/manage/operator');
            break;
          case 1:
            navigate('/manage/tools');
            break;
          case 3:
            navigate('/manage/maintenance');
            break;
          case 0:
            window.location.assign('http://127.0.0.1:8000/admin/');
        }
      }else if(response.status === 418){
        setError("Érvénytelen felhasználónév vagy jelszó");
      }else{
        setError("Hiba: "+response.status);
      }
    }catch(e){
      setError(e.toString());
    }
  }

  useEffect(()=>{
    console.log("Username:"+cookies.get('username'));
  },[]);


  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(event)=>{username = event.target.value}} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(event)=>{password = event.target.value}} 
            />

            <Button color='teal' fluid size='large' onClick={()=>login()}>
              Login
            </Button>
            {error}
          </Segment>
        </Form>
        <Message>
          Go to <a href='http://localhost:8000/admin/'>Database Control Panel</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm
