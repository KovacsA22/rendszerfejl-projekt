import React from 'react'
import axios from 'axios';
import { Button, Form, TextArea, Header } from 'semantic-ui-react'
import CategoryTable from './CategoryTable'
import { useState,useEffect } from "react";

function CategoryTab() {
  const [name, setName] = useState("");
  const [time_in_hours, setTime] = useState("");
  const [maintenance_period_in_months, setMaintenance] = useState("");
  const [instructions, setInstructions] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [items, setItems] = React.useState([]);
  

  useEffect(() => {
    async function getCharacters() {
      const response = await axios.get("http://127.0.0.1:8000/qualifications/");
      const data = response.data
      setItems(data.map(d => ({ key: d.name, value: d.id, text:d.name })));
    }   
    getCharacters();
  }, []);

  function addCategoryToDB() {

    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/taskcategories/',
      data: {
        "name": name,
        "time_in_hours": time_in_hours,
        "maintenance_period_in_months": maintenance_period_in_months,
        "instructions": instructions,
        "qualifications":qualifications
      }
    });
    
    console.log(name, time_in_hours, maintenance_period_in_months, instructions, qualifications);
  };


  return (
    <>
      <Form>
        <Header as='h2'>Kategória hozzáadása</Header>
        <Form.Field>
          <label>Név</label>
          <input placeholder='Név' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Group>
          <Form.Input label='Karbantartási idő (óra)' placeholder='Idő' value={time_in_hours} onChange={(e) => setTime(e.target.value)} />
          <Form.Input label='Karbantartás gyakorisága (hónap)' placeholder='Karbantartás gyakorisága' value={maintenance_period_in_months} onChange={(e) => setMaintenance(e.target.value)} />
          <Form.Field>
            <label>Végzettség</label>
            <Form.Select
              wrapSelection={false}
              options={items}
              placeholder='Válassz végzettséget'
              onChange={(e, { value }) => setQualifications(value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Leírás</label>
          <TextArea placeholder='Leírás' value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </Form.Field>
        <Button type='submit' onClick={addCategoryToDB}>OK</Button>
      </Form>
      <Header as='h2'>Kategóriák</Header>
      <CategoryTable />
    </>
  );
}

export default CategoryTab;