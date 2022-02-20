import React from 'react';
import AppBarComponent from './AppBarComponent';
import { useToDoContext } from '../../context/useToDoContext';

interface PropTypes {
}

const AppBarContainer: React.FC<PropTypes> = () => {
  const { openDialog } = useToDoContext();

  const handleOpenDialog = () => {
    openDialog();
  };

  return <>
    <AppBarComponent onNewItem={handleOpenDialog}/>
  </>;
};

export default AppBarContainer;
