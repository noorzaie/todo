import { Container } from '@mui/material';
import ToDoListContainer from '../components/toDo/list/ToDoListContainer';

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 2 }}
    >
      <ToDoListContainer />
    </Container>
  );
}
