import React from 'react'
import axios from 'axios';
import { Button, Form, TextArea, Header } from 'semantic-ui-react'
import CategoryTable from './CategoryTable'
import { useState } from "react";
import Select from 'react-select'


class QualificationsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      id: "",
      name: ''
    }
  }
  async getOptions() {
    const res = await axios.get('http://127.0.0.1:8000/qualifications/')
    const data = res.data

    const options = data.map(d => ({
      "value": d.id,
      "label": d.name
    }))
    this.setState({ selectOptions: options })

  }
  componentDidMount() {
    this.getOptions()
  }
  handleChange(e) {
    this.setState({ id: e.value, name: e.label })
  }
  render() {
    return (
      <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    )
  }
}

function CategoryTab() {
  const [name, setName] = useState("");
  const [time_in_hours, setTime] = useState("");
  const [maintenance_period_in_months, setMaintenance] = useState("");
  const [instructions, setInstructions] = useState("");
  const [qualifications, setQualifications] = useState("");


  function addCategoryToDB() {

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
        <QualificationsList value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
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