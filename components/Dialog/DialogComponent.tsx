import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { EmptyFunctionType } from '../../types/types';

interface PropTypes {
  isOpen: boolean;
  onClose: EmptyFunctionType;
  onSubmit: (title: string, description: string) => void;
}

const DialogComponent: React.FC<PropTypes> = ({ isOpen, onClose, onSubmit }) => {
  const titleInputRef = useRef<HTMLInputElement>();
  const descriptionInputRef = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    onSubmit(titleInputRef.current?.value as string, descriptionInputRef.current?.value as string);
  };

  return <Dialog
    open={isOpen}
    onClose={onClose}
  >
    <DialogTitle>New Task</DialogTitle>
    <DialogContent>
      <TextField
        inputRef={titleInputRef}
        margin="dense"
        id="title"
        label="Task title"
        type="text"
        autoFocus
        fullWidth
        variant="standard"
      />
      <TextField
        inputRef={descriptionInputRef}
        margin="dense"
        id="description"
        label="Task description"
        type="text"
        variant="standard"
        fullWidth
        multiline
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleSubmit}>Create</Button>
    </DialogActions>
  </Dialog>;
};

export default DialogComponent;
