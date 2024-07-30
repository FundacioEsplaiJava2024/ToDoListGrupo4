import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../logUp.css';
import { Service } from '../hook/Service'; // Asegúrate de que la ruta es correcta

const LogUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate(); // Usar useNavigate para redireccionar
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await Service.login(loginData.username, loginData.password);
      console.log('Login successful:', response);
      // Manejar redirección o almacenamiento de tokens aquí
      onClose();
    } catch (error) {
      console.error('Error during login:', error);
      // Manejar error de inicio de sesión
    }
  };

  const handleRegister = async () => {
    try {
      const response = await Service.register(registerData.username, registerData.password);
      console.log('Registration successful:', response);
      // Manejar redirección o almacenamiento de tokens aquí
      onClose();
    } catch (error) {
      console.error('Error during registration:', error);
      // Manejar error de registro
    }
  };

  return (
    <section>
      <span onClick={handleBackClick} className="back-arrow">←</span>
      <form className='logIn' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h2>Inicio</h2>
        <div className="inputbox">
          <input type='text' name="username" required onChange={handleLoginChange} />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="inputbox">
          <input type="password" name="password" required onChange={handleLoginChange} />
          <label htmlFor="">Contraseña</label>
        </div>
        <button type="submit">Iniciar</button>
      </form>
      <form className='register' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <h2>Registro</h2>
        <div className="inputbox">
          <input type='text' name="username" required onChange={handleRegisterChange} />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="inputbox">
          <input type="password" name="password" required onChange={handleRegisterChange} />
          <label htmlFor="">Contraseña</label>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </section>
  );
};

export default LogUp;
