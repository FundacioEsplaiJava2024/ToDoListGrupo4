import React from 'react';

interface AsideProps {
  createProject: (projectName: string) => void;
}

const Aside: React.FC<AsideProps> = ({ createProject }) => {
  const handleNewProject = () => {
    const projectName = prompt('Ingrese el nombre del nuevo proyecto:');
    if (projectName) {
      createProject(projectName);
    }
  };

  return (
    <aside>
      <div className='container'>
        <h3>Utilidades</h3>
        <nav>
          <ul>
            <li>
              <ul>
                <h3>Proyectos:</h3>
                <li><span onClick={handleNewProject}>Nuevo proyecto</span></li>
                <li><span>Cargar proyectos</span></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
