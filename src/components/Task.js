import { useState } from 'react';
import { FaTimes, FaReact } from 'react-icons/fa';
import Modal from './Modal';

export function Task({ task, onDelete, onToggle }) {
  const [isOpen, setIsOpen] =  useState(false);

  return (
    <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToggle(task.id)} >
      <h3>
        {task.title}
        <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/>
        </h3>

      <p>{task.day}</p>
      <FaReact style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsOpen(true)}/>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {task.title}
      </Modal>
    </div>
  )
}
