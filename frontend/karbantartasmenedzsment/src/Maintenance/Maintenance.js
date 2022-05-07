import { useState, useEffect } from 'react';
import {
  Table,
  Icon,
  Button,
  Pagination
} from 'semantic-ui-react';
import Axios from 'axios';
import TaskRow from './TaskRow';

function Maintenance() {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await Axios.get("http://127.0.0.1:8000/tasks/");
    setData(response.data);
    /*setData([
      {
        id: 0,
        createdAt: "2022.01.02 15:50:50",
        state: 4,
        name: "Biztosítékok",
        location: "Pláza",
        category: "Villamosszekrény",
        severity: 1,
        scheduledTo: "2022.01.05 13:00:00",
        isPeriodic: true,
      }
    ]);*/
  }
  const userID='repairman1';

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
        {data.map(task =>task.user !==userID? null: <TaskRow {...task} key={task.id} />)}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={9}>
              {/*<Pagination defaultActivePage={1} totalPages={10} />*/}
              <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
                href="/manage/operator/new"
              >
                <Icon name='wrench' /> Új karbantartás
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

export default Maintenance;