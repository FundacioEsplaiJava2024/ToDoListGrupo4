import React, { useState, useEffect } from 'react';
import { registerUser, loginUser } from '../hook/services';
import '../logUp.css';

const LogUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Añadir clase al body cuando el componente se monta
    document.body.classList.add('logUp-body');

    // Limpiar la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('logUp-body');
    };
  }, []);

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      setMessage('User registered successfully');
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response) {
        setMessage('Logged in successfully');
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <section>
      <form className='logIn' onSubmit={e => e.preventDefault()}>
        <h2>Inicio</h2>
        <div className="inputbox">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <label>Usuario</label>
        </div>
        <div className="inputbox">
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <label>Contraseña</label>
        </div>
        <button type="button" onClick={handleLogin}>Iniciar</button>
        <p>{message}</p>
      </form>
      <form className='register' onSubmit={e => e.preventDefault()}>
        <h2>Registro</h2>
        <div className="inputbox">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <label>Usuario</label>
        </div>
        <div className="inputbox">
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <label>Contraseña</label>
        </div>
        <button type="button" onClick={handleRegister}>Registrar</button>
        <p>{message}</p>
      </form>
    </section>
  );
};

export default LogUp;
