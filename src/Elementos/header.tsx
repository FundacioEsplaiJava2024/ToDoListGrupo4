import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaskManager } from '../hook/useTaskManager';

const Header: React.FC = () => {
  const { currentProject, updateProjectName } = useTaskManager();

  const handleProjectNameClick = () => {
    const newName = prompt('Ingrese el nuevo nombre del proyecto:', currentProject.name);
    if (newName && newName.trim() !== '') {
      updateProjectName(newName.trim());
    }
  };

  return (
    <header>
      <div className="auth-buttons">
        <Link to="/logup">
          <button className='logUp'>Inicio/Registro</button>
        </Link>
      </div>
      <h1 className='titulo1' onClick={handleProjectNameClick}>
        {currentProject.name}
      </h1>
    </header>
  );
};

export default Header;
