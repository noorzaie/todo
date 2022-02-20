import React from 'react';
import DialogComponent from './DialogComponent';
import { useToDoContext } from '../../context/useToDoContext';


interface PropTypes {
}

const DialogContainer: React.FC<PropTypes> = () => {
  const { isDialogOpen, closeDialog, newItem } = useToDoContext();

  const handleNewItem = (title: string, description: string) => {
    // TODO: Add form validation
    if (title?.trim()) {
      newItem(title, description);
      closeDialog();
    }
  };

  return <DialogComponent
    isOpen={isDialogOpen}
    onClose={closeDialog}
    onSubmit={handleNewItem}
  />;
};

export default DialogContainer;
