import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Header, Select, Button } from 'semantic-ui-react';
import Axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EditTask(props) {
  
  let params = useParams();
  const [data, setData] = useState({});
  const [qualifiedUsers, setQualifiedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [busyDates, setBusyDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  let navigate = useNavigate();

  async function fetchUser(userId){
    const response = await Axios.get("http://127.0.0.1:8000/users/"+userId);
    return response.data;
  }

  async function fetchData() {
    const data = (await Axios.get("http://127.0.0.1:8000/tasks/"+params.taskId)).data;
    setData(data);
    const category = (await Axios.get("http://127.0.0.1:8000/taskcategories/"+data.task_category_id)).data;

    const qualifiedUserIDs = (await Axios.get("http://127.0.0.1:8000/repairmanqualifications/?q="+category.qualifications)).data;

    let qualifiedUserArray = [];
    for(const user of qualifiedUserIDs){
      qualifiedUserArray.push(await fetchUser(user.user_id));
    }
    console.log(qualifiedUserArray);
    setQualifiedUsers(qualifiedUserArray);

  }


  function filterDate(date){
    const date2 = new Date(date.getTime()-date.getTimezoneOffset()* 60000);
    const disable = busyDates.includes(date2.getTime());
    return disable;
  }

  async function save(){
    const date2 = new Date(selectedDate.getTime()-selectedDate.getTimezoneOffset()* 60000);
    data.scheduled_maintenance=date2.toISOString();
    data.user=selectedUser;
    await Axios.put("http://127.0.0.1:8000/tasks/"+data.id+"/",data);
    //await Axios.patch("http://127.0.0.1:8000/tasks/"+data.id+"/",{scheduled_maintenance:selectedDate.toISOString(),repairman:selectedUser.username});
    console.log("OK");
    console.log(data);
    navigate("/manage/operator");
  }

  async function fetchBusyDates(){
    console.log("fetching busy dates");
    const tasks = (await Axios.get("http://127.0.0.1:8000/tasks/?u="+selectedUser)).data;

    let busyDatesTmp = [];

    for(const task of tasks){
      const date = Date.parse(task.scheduled_maintenance)
      busyDatesTmp.push(new Date(date).getTime());
    }

    setBusyDates(busyDatesTmp);
    console.log(busyDatesTmp);
  }

  useEffect(()=>{
    console.log("useEffect");
    fetchData();

    if(selectedUser !== undefined){
      fetchBusyDates();
    }
  },[selectedUser]);


  return (
    <>
      <Header as='h2'>Ütemezés: {data.name} ({data.task_category})</Header>
      <Table celled definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Karbantartó
            </Table.Cell>
            <Table.Cell>
              <Select
                placeholder='Karbantartó választása'
                options={qualifiedUsers.map((user)=>({key:user.id,value:user.username,text:user.username}))}
                onChange={(e, { value }) => setSelectedUser(value)}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
                Időpont
            </Table.Cell>
            <Table.Cell>
              <Calendar
                tileDisabled={({activeStartDate, date, view }) => filterDate(date)}
                onClickDay={(value, event) => setSelectedDate(value)}/>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
                Műveletek
            </Table.Cell>
            <Table.Cell>
              <Button primary onClick={()=>save()}>Mentés</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}


export default EditTask;