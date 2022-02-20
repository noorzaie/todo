import React, { useEffect, useState } from 'react';
import { EmptyFunctionType, ToDoListType } from '../types/types';
import { changeItemsPriority, deleteToDoItem, editToDoItem, getToDoList, newToDoItem } from '../lib/repository';
import { useMutation, useQuery } from 'react-query';

export interface ToDoContextType {
  toDoList: ToDoListType;
  newItem: (title: string, description: string) => void;
  editItem: (id: number, title: string, description: string) => void;
  deleteItem: (id: number) => void;
  changePriority: (from: number, to: number) => void;
  isDialogOpen: boolean;
  openDialog: EmptyFunctionType;
  closeDialog: EmptyFunctionType;
}

export const ToDoContext = React.createContext<ToDoContextType | null>(null);

const QUERY_KEY = 'todos';

// TODO: handle error, loading, ... for query and mutations
const ToDoProvider: React.FC = ({ children }) => {
  const [ toDoList, setToDoList ] = useState<ToDoListType>([]);
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const { data } = useQuery<ToDoListType>(QUERY_KEY, getToDoList, { cacheTime: 0 });

  const newItemMutation = useMutation(newToDoItem, {
    onSuccess: item => {
      console.log('item', item);
      setToDoList([
        ...toDoList,
        item
      ]);
    }
  });

  const editItemMutation = useMutation(editToDoItem, {
    onSuccess: editedItem => {
      const index = toDoList.findIndex(item => item.id === editedItem.id);
      setToDoList([
        ...toDoList.slice(0, index),
        editedItem,
        ...toDoList.slice(index + 1)
      ]);
    }
  });

  const deleteItemMutation = useMutation(deleteToDoItem, {
    onSuccess: id => {
      const index = toDoList.findIndex(item => item.id === id);
      setToDoList([
        ...toDoList.slice(0, index),
        ...toDoList.slice(index + 1)
      ]);
    }
  });

  const changeItemPriorityMutation = useMutation(changeItemsPriority, {
    onSuccess: setToDoList
  });

  useEffect(() => {
    setToDoList(data || []);
  }, [ data ]);

  const newItem = (title: string, description: string) => {
    newItemMutation.mutate({ title, description });
  };

  const editItem = (id: number, title: string, description: string) => {
    editItemMutation.mutate({ id, title, description });
  };

  const deleteItem = (id: number) => {
    deleteItemMutation.mutate(id);
  };


  const changePriority = (from: number, to: number) => {
    changeItemPriorityMutation.mutate({ from, to })
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const getValue = (): ToDoContextType => ({
    toDoList,
    newItem,
    editItem,
    deleteItem,
    changePriority,
    isDialogOpen,
    openDialog,
    closeDialog
  });

  return <ToDoContext.Provider value={getValue()}>
    {children}
  </ToDoContext.Provider>;
};

export default ToDoProvider;
