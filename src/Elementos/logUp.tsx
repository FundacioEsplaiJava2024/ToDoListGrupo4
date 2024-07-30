import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../logUp.css';

const LogUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate(); // Usar useNavigate para redireccionar

  useEffect(() => {
    // Añadir clase al body cuando el componente se monta
    document.body.classList.add('logUp-body');

    // Limpiar la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('logUp-body');
    };
  }, []);

  const handleBackClick = () => {
    navigate('/'); // Redirecciona a la página principal
  };

  return (
    <section>
      <span onClick={handleBackClick} className="back-arrow">←</span> 
      <form className='logIn'>
        <h2>Inicio</h2>
        <div className="inputbox">
          <input type="email" required />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="inputbox">
          <input type="password" required />
          <label htmlFor="">Contraseña</label>
        </div>
        <button type="button" onClick={onClose}>Iniciar</button>
      </form>
      <form className='register'>
        <h2>Registro</h2>
        <div className="inputbox">
          <input type="email" required />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="inputbox">
          <input type="password" required />
          <label htmlFor="">Contraseña</label>
        </div>
        <button type="button" onClick={onClose}>Registrar</button>
      </form>
    </section>
  );
};

export default LogUp;
