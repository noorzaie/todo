import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EmptyFunctionType } from '../../types/types';

interface PropTypes {
  onNewItem: EmptyFunctionType;
}

const AppBarComponent: React.FC<PropTypes> = ({ onNewItem }) => {
  return <AppBar position="static">
    <Toolbar>
      <Box sx={{ ml: 'auto' }}>
        <IconButton
          size="large"
          onClick={onNewItem}
          color="inherit"
        >
          <AddIcon/>
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>;
};

export default AppBarComponent;
