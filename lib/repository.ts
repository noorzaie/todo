import axios from 'axios';
import { ToDoItemType, ToDoListType } from '../types/types';

export const getToDoList = (): Promise<ToDoListType> => {
  return axios
    .get('/api/todo')
    .then(data => data.data.data);
};

export const newToDoItem = (item: Omit<ToDoItemType, 'id'>): Promise<ToDoItemType> => {
  return axios
    .post('/api/todo', item)
    .then(data => data.data.data);
};

export const editToDoItem = ({ id, title, description }: ToDoItemType): Promise<ToDoItemType> => {
  return axios
    .patch(`/api/todo/${id}`, { title, description })
    .then(data => data.data.data);
};

export const deleteToDoItem = (id: number): Promise<number> => {
  return axios
    .delete(`/api/todo/${id}`)
    .then(() => id);
};

export const changeItemsPriority = ({ from, to }: { from: number, to: number }): Promise<ToDoListType> => {
  return axios
    .patch('/api/todo', { from, to })
    .then(data => data.data.data);
};
