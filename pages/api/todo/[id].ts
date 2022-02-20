import { NextApiRequest, NextApiResponse } from 'next';
import { ToDoItemType } from '../../../types/types';
import { loadData, persistData } from '../../../lib/utils';

let toDoList = loadData();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  toDoList = loadData();
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case 'GET':
      get(id, res);
      break;
    case 'PATCH':
      patch(id, req.body, res);
      break;
    case 'DELETE':
      del(id, res);
      break;
  }
};

const get = (id: number, res: NextApiResponse) => {
  const item = toDoList.find(item => item.id === id);
  if (item) {
    res
      .status(200)
      .json({ data: item });
  } else {
    handleNotFound(res);
  }
};

const patch = (id: number, data: Partial<ToDoItemType>, res: NextApiResponse) => {
  const item = toDoList.find(item => item.id === id);
  if (item) {
    if (data.title?.trim()) {
      item.title = data.title;
    }
    item.description = data.description || '';
    persistData(toDoList);

    res
      .status(200)
      .json({ data: item });
  } else {
    handleNotFound(res);
  }
};

const del = (id: number, res: NextApiResponse) => {
  const index = toDoList.findIndex(item => item.id === id);
  if (index > -1) {
    toDoList.splice(index, 1);
    persistData(toDoList);

    res
      .status(200)
      .send({});
  } else {
    handleNotFound(res);
  }
};

const handleNotFound = (res: NextApiResponse) => {
  res
    .status(404)
    .send({});
};

export default handler;
