import * as fs from 'fs';
import { ToDoListType } from '../types/types';

export const persistData = (data: ToDoListType) => {
  return fs.writeFileSync('data/toDoList.json', JSON.stringify(data));
};

export const loadData = (): ToDoListType => {
  return JSON.parse(fs.readFileSync('data/toDoList.json', 'utf8')) as unknown as ToDoListType;
};
