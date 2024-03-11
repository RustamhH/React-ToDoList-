import React, { useState } from "react";
import "./Style.scss"

const ToDoList =()=> {


  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [nameEdit, setNameEdit] = useState('');
  const [desEdit, setDescriptionEdit] = useState('');

  const [editableList, setEditableList] = useState([]);



  const AddNewTask = () => {
    if(name && description) {
      setTasks([...tasks, { name: name, description: description }]);
      setName('');
      setDescription('');
      setEditableList([...editableList, false]);
    }
    else {
      alert("Fill All Inputs")
    }
  };

  const EditTask = (index) => {
    const updatedEditableList = [...editableList];
    updatedEditableList[index] = !updatedEditableList[index];
    setEditableList(updatedEditableList);
    setNameEdit(tasks[index].name);
    setDescriptionEdit(tasks[index].description);
    
  };

  const ApplyChanges = (index) => {
    if(nameEdit && desEdit) {
      const updatedTasks = [...tasks];
      updatedTasks[index].name = nameEdit;
      updatedTasks[index].description = desEdit;
      setTasks(updatedTasks);
      const updatedEditableList = [...editableList];
      updatedEditableList[index] = !updatedEditableList[index];
      setEditableList(updatedEditableList);
    }
    else {
      alert("Fill All Inputs")
    }
    
  };


  const CancelEdit=(index)=> {
    setNameEdit(tasks[index])
    setDescriptionEdit(tasks[index])
    setTasks(tasks)
    const updatedEditableList = [...editableList];
    updatedEditableList[index] = !updatedEditableList[index];
    setEditableList(updatedEditableList);
  }

  const DeleteTask = (index) => {
    const updatedTasks=[...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
    const updatedEditableList=[...editableList];
    updatedEditableList.splice(index,1);
    setEditableList(updatedEditableList);
  };




  return (
    <div className="main-body">
      <div className="headermain">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button class="button-31" role="button" onClick={AddNewTask}>Add Task</button>
      </div>
      

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-item" key={index}>
          <input
            type="text"
            value={editableList[index] ?nameEdit:task.name}
            readOnly={!editableList[index]}
            onChange={(e) => setNameEdit(e.target.value)}
          />
          <input
            type="text"
            value={editableList[index]?desEdit:task.description}
            readOnly={!editableList[index]}
            onChange={(e) => setDescriptionEdit(e.target.value)}
          />
          {editableList[index] ? (
            <div className="applycancel">
              <button  class="button-31" role="button"  onClick={() => ApplyChanges(index)}>Apply</button>
              <button  class="button-31" role="button"  onClick={() => CancelEdit(index)}>Cancel</button>
            </div>
          ) : (
            <button class="button-31" role="button" onClick={() => EditTask(index)}>Edit</button>
          )}
          <button class="button-31" role="button" onClick={() => DeleteTask(index)}>Delete</button>
        </div>
        ))}
      </div>
    </div>
  );



}

export default ToDoList;