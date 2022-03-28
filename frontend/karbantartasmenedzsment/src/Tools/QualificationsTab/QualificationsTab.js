import React from 'react'
import { Button, Form, Header} from 'semantic-ui-react'
import axios from 'axios';
import { useState } from "react";
import QualificationsTable from './QualificationsTable';

function QualificationsTab() {
  const [name, setName] = useState("");

  function addQualificationToDB() {    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/qualifications/',
      data: {
        "name":name     
      }
    });    
    console.log(name);
   
  }
  return (   
    <>
        <Form>
          <Header as='h2'>Végzettség hozzáadása</Header>
          <Form.Field>
            <label>Megnevezés</label>
            <input placeholder='Név' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Field>
          <Button type='submit' onClick={addQualificationToDB}>OK</Button>
        </Form>  
      <div style={{ marginTop: '2em' }}>
        <Header as='h2'>Végzettségek</Header> 
        <QualificationsTable />     
      </div>
    </>
  )
}

export default QualificationsTab;