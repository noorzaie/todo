import { useContext } from 'react';
import { ToDoContext } from './ToDoContext';

export const useToDoContext = () => {
  const context = useContext(ToDoContext);

  if (context === null) {
    throw new Error(
      `useToDoContext can only be used inside components wrapped by 'ToDoProvider'`
    );
  }

  return context;
};
