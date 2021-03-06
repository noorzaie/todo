import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import { Identifier, XYCoord } from 'dnd-core';
import ToDoItemComponent from './ToDoItemComponent';
import { ToDoItemType } from '../../../types/types';
import { useToDoContext } from '../../../context/useToDoContext';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface PropTypes {
  index: number;
  id: ToDoItemType['id'];
  title: ToDoItemType['title'];
  description: ToDoItemType['description'];
}

const DRAG_ITEM_TYPE = 'card';

const ToDoItemContainer: React.FC<PropTypes> = ({ index, id, title, description }) => {
  const [ editing, setEditing ] = useState<boolean>(false);
  const { editItem, deleteItem } = useToDoContext();
  const ref = useRef<HTMLDivElement>(null);
  const { changePriority } = useToDoContext();

  const [ { handlerId }, drop ] = useDrop<DragItem,
    void,
    { handlerId: Identifier | null }>({
    accept: DRAG_ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      changePriority(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [ { isDragging }, drag ] = useDrag({
    type: DRAG_ITEM_TYPE,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleEnableEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    deleteItem(id);
  };

  const handleEdit = (editedTitle: string, editedDescription: string) => {
    editItem(id, editedTitle, editedDescription);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  drag(drop(ref));

  return <Box
    ref={ref}
    data-handler-id={handlerId}
  >
    <ToDoItemComponent
      title={title}
      description={description}
      editing={editing}
      onEnableEdit={handleEnableEdit}
      onDelete={handleDelete}
      onCancelEdit={handleCancelEdit}
      onEdit={handleEdit}
    />
  </Box>;
};

export default ToDoItemContainer;
