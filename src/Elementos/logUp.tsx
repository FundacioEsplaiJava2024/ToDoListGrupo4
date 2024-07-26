import React, { useEffect } from 'react';
import '../logUp.css';

const LogUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    // Añadir clase al body cuando el componente se monta
    document.body.classList.add('logUp-body');

    // Limpiar la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('logUp-body');
    };
  }, []);

  return (
    <section>
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
