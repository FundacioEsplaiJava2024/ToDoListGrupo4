// src/components/SignUp.tsx
import React, { useState } from 'react';

const SignUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign Up:', { username, password });
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  }; 

  return (
    <div>
      <h2>Crear cuenta </h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Crear cuenta</button>
    </div>
  );
};

export default SignUp;
