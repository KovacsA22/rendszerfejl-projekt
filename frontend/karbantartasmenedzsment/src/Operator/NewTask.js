import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Header, Input, Select, Checkbox, Button } from "semantic-ui-react";
import Axios from 'axios';


function NewTask() {

  let navigate = useNavigate();

  const severities = [
    {id:0,value:0,text:"Nem sürgős"},
    {id:1,value:1,text:"Alacsony"},
    {id:2,value:2,text:"Közepes"},
    {id:3,value:3,text:"Magas"},
    {id:4,value:4,text:"Nagyon magas"},
  ];

  const [categories, setCategories] = useState([{name:""}]);
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(2);
  const [category, setCategory] = useState();
  const [periodic, setPeriodic] = useState(false);


  async function fetchCategories(){
    const data = (await Axios.get("http://127.0.0.1:8000/taskcategories/")).data;
    setCategories(data);
    setCategory(data[0].name);
  }

  useEffect(()=>{
    console.log("useEffect");
    fetchCategories();
  },[]);

  async function save(){
    await Axios.post("http://127.0.0.1:8000/tasks/",{name:name,severity:severity,task_category:category,periodic:periodic});
    navigate("/manage/operator");
  }

  

  return (
    <>
      <Header as="h2">Új karbantartás</Header>
      <Table celled definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Név
            </Table.Cell>
            <Table.Cell>
              <Input placeholder="Név" onChange={e=>setName(e.target.value)}/>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Súlyosság
            </Table.Cell>
            <Table.Cell>
              <Select
                options={severities}
                onChange={(e,{value}) =>{setSeverity(value)}}
                value={severity}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Kategória
            </Table.Cell>
            <Table.Cell>
              <Select
                options={categories.map((category)=>({id:category.id, value:category.name, text:category.name}))}
                onChange={(e,{value}) =>{setCategory(value)}}
                value={category}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Időszakos
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                onChange={e=>setPeriodic(e.target.value)}
                checked={periodic}/>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Műveletek
            </Table.Cell>
            <Table.Cell>
              <Button onClick={() => save()}>
                Mentés
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}


export default NewTask;