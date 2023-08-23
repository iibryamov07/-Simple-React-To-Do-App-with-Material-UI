import React, { useState, useEffect } from 'react'
import Task from './Task'
import { Modal } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const Main = () => {
  const initialData = JSON.parse(localStorage.getItem('taskData')) || [
    'Workout for 30 seconds',
    'Drink a protein shake',
    'Take a cold shower',
  ];
  const [taskData, setTaskData] = useState(initialData);
  const [inputData, setInputData] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);


  const handleChange = (event) => {
    setInputData(event.target.value);
  }

  const handleSubmit = (event) => {
  if(inputData!==''){
    event.preventDefault();
  setTaskData(current => [...current, inputData]);
  setInputData('');
  }
  }

  const handleDelete = (index) => {
  const updatedTaskData = [...taskData];
  updatedTaskData.splice(index,1);
  setTaskData(updatedTaskData);
  }

  const handleEdit = (index) => {
    if(editedTask !== ''){
      const updatedTaskData = [...taskData];
    updatedTaskData.splice(index,1,editedTask)
    setTaskData(updatedTaskData);
    }
    setEditedTask('');
    }

  const toggleEdit = (index) => {
  setEditModal(true);
  setEditIndex(index);
  }

  const handleEditChange = (event) => {
  setEditedTask(event.target.value);
  }

  useEffect(()=>{
    localStorage.setItem('taskData', JSON.stringify(taskData))
    
  },[taskData])

  return (
    <div className='main'>
        <form className='main__form'>
            <input className='form__input' placeholder='Example: "Work out for 30 minutes' onChange={handleChange} maxLength={50}/>
            <button type='submit' className='form__button' onClick={handleSubmit}><CheckRoundedIcon/></button>
        </form>
        <ul className='tasks'>
        {taskData.map((task,index)=>
        <li key={index}> <Task description={task} onDelete={()=>handleDelete(index)} onEdit={()=>handleEdit(index)} onToggle={()=>toggleEdit(index)} /> </li>
        )}
      <Modal className='modal' open={editModal}>
        <div className='modal-container'>
          <input className='modal__input' onChange={handleEditChange}/>
          <button className='modal__button modal__button--submit' onClick={()=>handleEdit(editIndex)}><CheckRoundedIcon/></button>
          <button className='modal__button modal__button--back' onClick={()=>setEditModal(false)}><ArrowBackRoundedIcon/></button>
        </div>
        </Modal>
        </ul>
    </div>
  )
}

export default Main