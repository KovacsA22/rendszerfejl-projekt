import { Outlet } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";

function TaskRow(props){

  function getStateText(state){
    switch(state){
      case -1:return (<>Nincs ütemezve</>);
      case 0:return (<>Ütemezve</>);
      case 1:return (<><Icon name='exclamation'/>Visszautasítva</>);
      case 2:return (<>Elfogadva</>);
      case 3:return (<>Megkezdve</>);
      case 4:return (<><Icon name='check'/>Elvégezve</>);
    }
  }

  const severities = [
    {id:0,value:0,text:"Nem sürgős"},
    {id:1,value:1,text:"Alacsony"},
    {id:2,value:2,text:"Közepes"},
    {id:3,value:3,text:"Magas"},
    {id:4,value:4,text:"Nagyon magas"},
  ];

  function getSeverityText(severity){
    return severities[severity].text;
  }

  function getTimestamp(value){
    if(value===null){
      return "";
    }else{
      return value.split(".")[0].replace("T"," ").replace("Z","");
    }
  }

  function getDay(timestamp){
    return timestamp.split(" ")[0];
  }
  
  return (<>
    <Table.Row textAlign="center" negative={props.state==1} positive={props.state==4}>
      <Table.HeaderCell>{getTimestamp(props.created)}</Table.HeaderCell>
      <Table.HeaderCell>{getSeverityText(props.severity)}</Table.HeaderCell>
      <Table.HeaderCell>{props.name}</Table.HeaderCell>
      <Table.HeaderCell>{props.task_category}</Table.HeaderCell>
      <Table.HeaderCell>{getStateText(props.current_state)}</Table.HeaderCell>
      <Table.HeaderCell>{getDay(getTimestamp(props.scheduled_maintenance))}</Table.HeaderCell>
      <Table.HeaderCell>{props.user}</Table.HeaderCell>
      <Table.HeaderCell>{props.periodic?"Igen":"Nem"}</Table.HeaderCell>
      <Table.HeaderCell>       
        <Button animated='vertical' style={{minWidth: 100}} href={"/manage/maintenance/edit/"+props.id}>
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