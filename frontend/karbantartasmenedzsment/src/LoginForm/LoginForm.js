import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate();

  let username, password;

  async function login(){
    //const response = await Axios.post("/login",{username:username, password:password});
    const response={data:{role:username}};
    switch(response.data.role){
      case "operator":
        navigate('/manage/operator');
        break;
      case "tools":
        navigate('/manage/tools');
        break;
      case "maintenance":
        navigate('/manage/maintenance');
        break;
    }

  }


  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(event)=>{username = event.target.value}} />
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
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm
