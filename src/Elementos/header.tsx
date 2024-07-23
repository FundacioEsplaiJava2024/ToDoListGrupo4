import React from 'react';

interface HeaderProps {
  projectName: string;
  onProjectNameChange: (newName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ projectName, onProjectNameChange }) => {
  const handleProjectNameClick = () => {
    const newName = prompt('Ingrese el nuevo nombre del proyecto:', projectName);
    if (newName && newName.trim() !== '') {
      onProjectNameChange(newName.trim());
    }
  };

  return (
    <header>
      <h1 className='titulo1' onClick={handleProjectNameClick}>
        {projectName}
      </h1>
    </header>
  );
};

export default Header;
