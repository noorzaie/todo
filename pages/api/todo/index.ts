import { NextApiRequest, NextApiResponse } from 'next';
import { ToDoItemType } from '../../../types/types';
import { loadData, persistData } from '../../../lib/utils';

let toDoList = loadData();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  toDoList = loadData();
  switch (req.method) {
    case 'GET':
      get(res);
      break;
    case 'POST':
      post(req.body, res);
      break;
    case 'PATCH':
      changePriority(req.body.from, req.body.to, res);
      break;
  }
};

const get = (res: NextApiResponse) => {
  res
    .status(200)
    .json({ data: toDoList });
};

const post = (data: Omit<ToDoItemType, 'id'>, res: NextApiResponse) => {
  const item = {
    ...data,
    id: getNewId()
  };
  toDoList.push(item);
  persistData(toDoList);

  res
    .status(200)
    .json({ data: item });
};

const changePriority = (from: number, to: number, res: NextApiResponse) => {
  const [ fromIndex, toIndex ] = [ Math.min(from, to), Math.max(from, to) ];
  persistData([
    ...toDoList.slice(0, fromIndex),
    toDoList[toIndex],
    ...toDoList.slice(fromIndex + 1, toIndex - fromIndex - 1),
    toDoList[fromIndex],
    ...toDoList.slice(toIndex + 1)
  ]);

  res
    .status(200)
    .json({ data: loadData() });
};

const getNewId = () => {
  return toDoList.reduce((maxId, item) => item.id > maxId ? item.id : maxId, 0) + 1;
};

export default handler;
