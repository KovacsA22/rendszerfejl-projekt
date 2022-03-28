import AddTool from './AddTool/AddTool';
import { Tab } from 'semantic-ui-react'
import CategoryTab from './CategoryTab';
import QualificationsTab from './QualificationsTab';

const panes = [
  { menuItem: 'Eszközök', render: () => <Tab.Pane> <AddTool/></Tab.Pane> },
  { menuItem: 'Kategóriák', render: () => <Tab.Pane><CategoryTab/></Tab.Pane> },
  { menuItem: 'Végzettségek', render: () => <Tab.Pane><QualificationsTab/></Tab.Pane> },
]

function Tools() {
  return (
    <>
      <Tab panes={panes} />
    </>
  );
}


export default Tools;