import { Outlet } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";

function TaskRow(props){

  function getStateText(state){
    switch(state){
      case 0:return (<>Ütemezve</>);
      case 1:return (<><Icon name='exclamation'/>Visszautasítva</>);
      case 2:return (<>Elfogadva</>);
      case 3:return (<>Megkezdve</>);
      case 4:return (<><Icon name='check'/>Elvégezve</>);
    }
  }

  function getSeverityText(severity){
    switch(severity){
      case 0:return (<>Nem sürgős</>);
      case 1:return (<>Alacsony</>);
      case 2:return (<>Közepes</>);
      case 3:return (<>Magas</>);
      case 4:return (<>Nagyon magas</>);
    }
  }

  function getTimestamp(value){
    return value.split(".")[0].replace("T"," ").replace("Z","");
  }
  
  return (<>
    <Table.Row textAlign="center" negative={props.state==1} positive={props.state==4}>
      <Table.HeaderCell>{getTimestamp(props.created)}</Table.HeaderCell>
      <Table.HeaderCell>{getSeverityText(props.severity)}</Table.HeaderCell>
      <Table.HeaderCell>{props.name}</Table.HeaderCell>
      <Table.HeaderCell>{props.task_category}</Table.HeaderCell>
      <Table.HeaderCell>{getStateText(props.current_state)}</Table.HeaderCell>
      <Table.HeaderCell>{getTimestamp(props.scheduled_maintenance)}</Table.HeaderCell>
      <Table.HeaderCell>{props.user}</Table.HeaderCell>
      <Table.HeaderCell>{props.periodic?"Igen":"Nem"}</Table.HeaderCell>
      <Table.HeaderCell>
        <Button animated='vertical' style={{minWidth: 100}} href={"/manage/operator/schedule/"+props.id}>
          <Button.Content hidden>Ütemezés</Button.Content>
          <Button.Content visible>
            <Icon name='calendar' />
          </Button.Content>
        </Button>
        <Button animated='vertical' style={{minWidth: 100}} href={"/manage/operator/edit/"+props.id}>
          <Button.Content hidden>Szerkesztés</Button.Content>
          <Button.Content visible>
            <Icon name='pencil' />
          </Button.Content>
        </Button>
      </Table.HeaderCell>
    </Table.Row>
    </>
  );
}

export default TaskRow;