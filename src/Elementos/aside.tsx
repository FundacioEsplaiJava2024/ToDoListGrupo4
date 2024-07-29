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
              <select value={currentProjectId} onChange={(e) => onLoadProject(e.target.value)} defaultValue="">
                <option value="" disabled>Seleccionar Proyecto</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
