import { useState, useEffect } from 'react';
import {
  Table,
  Icon,
  Button,
  Pagination
} from 'semantic-ui-react';
import Axios from 'axios';
import TaskRow from './TaskRow';
import Cookies from 'universal-cookie';

function Maintenance() {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await Axios.get("http://127.0.0.1:8000/tasks/");
    setData(response.data);

  }

  const cookies = new Cookies();
  const username = cookies.get('username');


  useEffect(() => {
    fetchData();
    console.log("useEffect");
  }, []);

  return (
    <>
      <Table celled singleLine selectable padded>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Hozzáadva</Table.HeaderCell>
            <Table.HeaderCell>Súlyosság</Table.HeaderCell>
            <Table.HeaderCell>Név</Table.HeaderCell>
            <Table.HeaderCell>Kategória</Table.HeaderCell>
            <Table.HeaderCell>Állapot</Table.HeaderCell>
            <Table.HeaderCell>Tervezett ütemezés</Table.HeaderCell>
            <Table.HeaderCell>Karbantartó</Table.HeaderCell>
            <Table.HeaderCell>Időszakos</Table.HeaderCell>
            <Table.HeaderCell>Műveletek</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(task => task.user !== username ? null : <TaskRow {...task} key={task.id} />)}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

export default Maintenance;