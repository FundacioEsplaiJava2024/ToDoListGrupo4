import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import './Elementos/fontAwesomeSetup';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import LogUp from './Elementos/logUp';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Content />
      </Router>
    </DndProvider>
  );
};

const Content: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Añadir o quitar clase según la ruta
  useEffect(() => {
    if (location.pathname === '/logup') {
      document.body.classList.add('logUp-body');
    } else {
      document.body.classList.remove('logUp-body');
    }
  }, [location.pathname]);

  const handleClose = () => {
    navigate('/'); // Redirecciona a la página principal
  };

  return (
    <>
      {location.pathname !== '/logup' && <Header />}
      <Routes>
        <Route path="/logup" element={<LogUp onClose={handleClose} />} />
        <Route path="/" element={<Tablero />} />
      </Routes>
      {location.pathname !== '/logup' && <Footer />}
    </>
  );
};

export default App;
