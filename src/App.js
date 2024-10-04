import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import List from './components/List';
import Detail from './components/Detail';
import './index.css'

const App = () => {
  return (
    <Router>
      <Container>
        <Typography variant="h3" gutterBottom align="center">
          Dog Breeds
        </Typography>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/breed/:breed" element={<Detail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
