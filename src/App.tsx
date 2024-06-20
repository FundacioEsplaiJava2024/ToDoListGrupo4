import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import './Elementos/fontAwesomeSetup';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Tablero />
      <Footer />
    </>
  );
}

export default App;
