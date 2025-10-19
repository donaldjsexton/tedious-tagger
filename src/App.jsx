import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
