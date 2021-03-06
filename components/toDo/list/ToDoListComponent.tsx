import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { ToDoListType } from '../../../types/types';
import ToDoItemContainer from '../item/ToDoItemContainer';

interface PropTypes {
  items: ToDoListType;
}

const ToDoListComponent: React.FC<PropTypes> = ({ items }) => {
  return <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
    {
      items.map(
        ({ id, title, description }, index) =>
          <ToDoItemContainer
            key={id}
            id={id}
            index={index}
            title={title}
            description={description}
          />
      )
    }
  </DndProvider>;
};

export default ToDoListComponent;
