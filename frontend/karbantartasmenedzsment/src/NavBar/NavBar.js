//import '../../App.css';
//import 'semantic-ui-css/semantic.min.css'

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import Cookies from 'universal-cookie';

function NavBar(){
  const cookies = new Cookies();
  let navigate = useNavigate();
  console.log("Username:"+cookies.get('username'));
  return (
    <>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
              <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
              Karbantartásmenedzsment
            </Menu.Item>
            <Menu.Item as='a' onClick={()=>{cookies.remove('username',{path:"/"}); navigate("/")}}>Kijelentkezés</Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default NavBar;