import React, { useState } from 'react';
import { useTaskManager } from '../hook/useTaskManager';
import AuthDialog from './AuthDialog';

const Header: React.FC = () => {
  const { currentProject, updateProjectName } = useTaskManager();

  const [dialogType, setDialogType] = useState<'signUp' | 'signIn' | null>(null);

  const handleProjectNameClick = () => {
    const newName = prompt('Ingrese el nuevo nombre del proyecto:', currentProject.name);
    if (newName && newName.trim() !== '') {
      updateProjectName(newName.trim());
    }
  };

  const openDialog = (type: 'signUp' | 'signIn') => {
    setDialogType(type);
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <header>
      <div className="auth-buttons">
        <button onClick={() => openDialog('signUp')}>Crear Cuenta</button>
        <button onClick={() => openDialog('signIn')}>Log In</button>
      </div>
      <h1 className='titulo1' onClick={handleProjectNameClick}>
        {currentProject.name}
      </h1>
      {dialogType && <AuthDialog type={dialogType} onClose={closeDialog} />}
    </header>
  );
};

export default Header;
