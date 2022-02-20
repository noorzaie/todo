import React, { useRef } from 'react';
import { Box, Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { EmptyFunctionType, ToDoItemType } from '../../../types/types';

interface PropTypes {
  title: ToDoItemType['title'];
  description: ToDoItemType['description'];
  editing: boolean;
  onEnableEdit: EmptyFunctionType;
  onDelete: EmptyFunctionType;
  onCancelEdit: EmptyFunctionType;
  onEdit: (title: string, description: string) => void;
}

const ToDoItemComponent: React.FC<PropTypes> = (
  {
    title,
    description,
    editing,
    onEnableEdit,
    onDelete,
    onCancelEdit,
    onEdit
  }
) => {
  const titleInputRef = useRef<HTMLInputElement>();
  const descriptionInputRef = useRef<HTMLInputElement>();

  const handleEdit = () => {
    onEdit(titleInputRef.current?.value as string, descriptionInputRef.current?.value as string);
  };

  return <Box sx={{ mb: 2 }}>
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          {
            editing &&
            <TextField
              inputRef={titleInputRef}
              label="Title"
              variant="standard"
              defaultValue={title}
              autoFocus
            />
          }
          {
            !editing &&
            <Typography
              variant="h6"
              color="text.primary"
            >
              {title}
            </Typography>
          }
        </Box>
        {
          editing &&
          <Box>
            <TextField
              inputRef={descriptionInputRef}
              label="Description"
              variant="standard"
              defaultValue={description}
              multiline
            />
          </Box>
        }
        {
          !editing &&
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        }
      </CardContent>
      <CardActions disableSpacing>
        {
          !editing &&
          <IconButton
            size="small"
            onClick={onDelete}
          >
            <DeleteIcon
              color="error"
              fontSize="inherit"
            />
          </IconButton>
        }
        {
          editing &&
          <>
            <IconButton
              size="small"
              onClick={onCancelEdit}
            >
              <CloseIcon
                color="error"
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleEdit}
            >
              <CheckIcon
                color="success"
                fontSize="inherit"
              />
            </IconButton>
          </>
        }
        {
          !editing &&
          <IconButton
            size="small"
            onClick={onEnableEdit}
          >
            <EditIcon
              color="info"
              fontSize="inherit"
            />
          </IconButton>
        }
      </CardActions>
    </Card>
  </Box>;
};

export default ToDoItemComponent;
