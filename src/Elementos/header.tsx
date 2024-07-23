import React from 'react';
import { useTaskManager } from '../hook/useTaskManager';

const Header: React.FC = () => {
  const { projectName } = useTaskManager();
  
  return (
    <header>
      <h1 className='titulo1'>{projectName}</h1>
    </header>
  );
};

export default Header;
