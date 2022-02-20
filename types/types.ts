export interface ToDoItemType {
  id: number;
  title: string;
  description: string;
}

export type ToDoListType = ToDoItemType[];

export type EmptyFunctionType = () => void;
