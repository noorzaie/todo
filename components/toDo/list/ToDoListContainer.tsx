import React from 'react';
import ToDoListComponent from './ToDoListComponent';
import { useToDoContext } from '../../../context/useToDoContext';

interface PropTypes {
}

const ToDoListContainer: React.FC<PropTypes> = () => {
  const { toDoList } = useToDoContext();

  return <ToDoListComponent
    items={toDoList}
  />;
};

export default ToDoListContainer;
