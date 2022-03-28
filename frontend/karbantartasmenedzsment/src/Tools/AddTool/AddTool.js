import React from 'react'
import { Button, Form, TextArea, Header} from 'semantic-ui-react'
import axios from 'axios';
import ToolsTable from './ToolsTable';
import { useState } from "react";


// Make a request for a user with a given ID
axios.get('http://127.0.0.1:8000/taskcategories/')
  .then(function (response) {
    // handle success
    //const categories = response.data;
    //this.setState({ categories });

    console.log(response);
  })



const options = [

  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
function AddTool() {
  const [name, setName] = useState("");
  const [task_category_id, setTaskCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  function addToolToDB() {
    
    /*axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/devices/',
      data: {
        "name": "car-02",
        "task_category_id": 4,
        "description": "It is a car",
        "location": "B building"
      }
    });*/
    console.log(name, task_category_id, description, location);
  }


  return (   
    <>     
     
     
        <Form>
          <Header as='h2'>Eszköz hozzáadása</Header>
          <Form.Field>
            <label>Név</label>
            <input placeholder='Név' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Field>
          <Form.Field >
            <label>Kategória</label>
            <Form.Select options={options} placeholder='Kategória' value={task_category_id} onChange={(e) => setTaskCategoryId(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Hely</label>
            <input placeholder='Hely' value={location} onChange={(e) => setLocation(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Leírás</label>
            <TextArea placeholder='' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Field>
          <Button type='submit' onClick={addToolToDB}>OK</Button>
        </Form>
  
      <div style={{ marginTop: '2em' }}>
        <Header as='h2'>Eszközök</Header>
        <ToolsTable />
      </div>
    </>
  )

}

export default AddTool;