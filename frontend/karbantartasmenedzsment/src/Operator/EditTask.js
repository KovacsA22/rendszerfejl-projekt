import { useParams } from 'react-router-dom';

function EditTask(props) {
  
  let params = useParams();

  return (
    <>
      edit:{params.taskId}
    </>
  );
}


export default EditTask;