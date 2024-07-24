import React, { useState } from 'react';
import SignUp from './Signup';
import SignIn from './SignIn';
import { useTaskManager } from '../hook/useTaskManager';

const Header: React.FC = () => {
  const {
    currentProject,
    updateProjectName,
  } = useTaskManager();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleProjectNameClick = () => {
    const newName = prompt('Ingrese el nuevo nombre del proyecto:', currentProject.name);
    if (newName && newName.trim() !== '') {
      updateProjectName(newName.trim());
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
        {currentProject.name}
      </h1>
      {showSignUp && <SignUp onClose={closeForms} />}
      {showSignIn && <SignIn onClose={closeForms} />}
    </header>
  );
};

export default Header;
