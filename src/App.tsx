import React from 'react';
import './App.css';
import './Elementos/fontAwesomeSetup';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Tablero />
      <Footer />
    </DndProvider>
  );
}

export default App;
