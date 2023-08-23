import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@mui/material';

const Task = (props) => {
  
  return (
    <div className='task'>
        <h3 className='task__description'>{props.description}</h3>
        <div className='task__buttons'>
            <button className='buttons__button buttons__button--edit' onClick={props.onToggle}><EditIcon fontSize='small'/></button>
            <button className='buttons__button buttons__button--delete' onClick={props.onDelete}><DeleteIcon fontSize='small'/></button>
        </div>
    </div>
  )
}

export default Task