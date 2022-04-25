import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Header, Input, Select, Checkbox, Button } from 'semantic-ui-react';
import Axios from 'axios';

function EditTask(props) {
  let params = useParams();

  const severities = [
    {id:0,value:0,text:"Nem sürgős"},
    {id:1,value:1,text:"Alacsony"},
    {id:2,value:2,text:"Közepes"},
    {id:3,value:3,text:"Magas"},
    {id:4,value:4,text:"Nagyon magas"},
  ];

  const states = [
    {id:-1,value:-1,text:"Nincs ütemezve"},
    {id:0,value:0,text:"Ütemezve"},
    {id:1,value:1,text:"Visszautasítva"},
    {id:2,value:2,text:"Elfogadva"},
    {id:3,value:3,text:"Megkezdve"},
    {id:4,value:4,text:"Elvégezve"},
  ];

  const [categories, setCategories] = useState([{name:""}]);
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(2);
  const [category, setCategory] = useState();
  const [periodic, setPeriodic] = useState(false);
  const [state, setState] = useState(-1);
  const [id, setId] = useState(0);

  let navigate = useNavigate();


  async function fetchCategories(){
    const categoriesData = (await Axios.get("http://127.0.0.1:8000/taskcategories/")).data;
    setCategories(categoriesData);
  }

  async function fetchData() {
    const data = (await Axios.get("http://127.0.0.1:8000/tasks/"+params.taskId)).data;
    setName(data.name);
    setCategory(data.task_category);
    setSeverity(data.severity);
    setPeriodic(data.periodic);
    setId(data.id);
    setState(data.current_state);
  }
    

  useEffect(()=>{
    console.log("useEffect");

    fetchCategories();

    fetchData();
  },[]);

  async function save(){
    await Axios.put("http://127.0.0.1:8000/tasks/"+id+"/",{id:id, name:name,severity:severity,task_category:category,current_state:state,periodic:periodic});
    console.log("OK");
    navigate("/manage/operator");

  }

  

  return (
    <>
      <Header as='h2'>Szerkesztés: {name} ({category})</Header>
      <Table celled definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Név
            </Table.Cell>
            <Table.Cell>
              <Input placeholder="Név" onChange={e=>setName(e.target.value)} value={name}/>
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
              Állapot
            </Table.Cell>
            <Table.Cell>
              <Select
                options={states}
                onChange={(e,{value}) =>{setState(value)}}
                value={state}
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

export default EditTask;