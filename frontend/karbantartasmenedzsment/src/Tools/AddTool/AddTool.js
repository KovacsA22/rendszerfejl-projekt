import React from 'react'
import { Button, Form, TextArea, Header} from 'semantic-ui-react'
import axios from 'axios';
import ToolsTable from './ToolsTable';
import { useState, useEffect } from "react";


function AddTool() {
  const [name, setName] = useState("");
  const [task_category_id, setTaskCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [items, setItems] = React.useState([]);
  

  useEffect(() => {
    async function getCharacters() {
      const response = await axios.get("http://127.0.0.1:8000/taskcategories/");
      const data = response.data
      setItems(data.map(d => ({ key: d.name, value: d.id, text:d.name })));
    }   
    getCharacters();
  }, []);

  function addToolToDB() {
    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/devices/',
      data: {
        "name": name,
        "task_category_id":task_category_id,
        "description": description,
        "location":location
      }
    });
    console.log(name, task_category_id.toString(), description, location);
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
            <Form.Select options={items} placeholder='Kategória'  onChange={(e, { value }) => setTaskCategoryId(value)} />
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