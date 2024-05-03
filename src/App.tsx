import React from 'react';
import TodoList from './components/TodoList';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2" align='center' gutterBottom>Todo List</Typography>
      <TodoList />
    </Box>
  );
};

export default App;