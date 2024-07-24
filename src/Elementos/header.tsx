// src/components/Header.tsx
import React, { useState } from 'react';
import SignUp from './Signup';
import SignIn from './SignIn';

interface HeaderProps {
  projectName: string;
  onProjectNameChange: (newName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ projectName, onProjectNameChange }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleProjectNameClick = () => {
    const newName = prompt('Ingrese el nuevo nombre del proyecto:', projectName);
    if (newName && newName.trim() !== '') {
      onProjectNameChange(newName.trim());
    }
  };

  const closeForms = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
    <header>
      <div className="auth-buttons">
        <button onClick={() => { setShowSignUp(true); setShowSignIn(false); }}>Sign Up</button>
        <button onClick={() => { setShowSignIn(true); setShowSignUp(false); }}>Sign In</button>
      </div>
      <h1 className='titulo1' onClick={handleProjectNameClick}>
        {projectName}
      </h1>
      {showSignUp && <SignUp onClose={closeForms} />}
      {showSignIn && <SignIn onClose={closeForms} />}
    </header>
  );
};
//hola

export default Header;
