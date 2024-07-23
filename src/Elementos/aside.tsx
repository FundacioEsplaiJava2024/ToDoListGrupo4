import React from 'react';

interface AsideProps {
  projects: { id: string; name: string }[];
  onCreateProject: () => void;
  onLoadProject: (projectId: string) => void;
}

const Aside: React.FC<AsideProps> = ({ projects, onCreateProject, onLoadProject }) => {
  return (
    <aside>
      <div className='container'>
        <h3>Utilidades</h3>
        <nav>
          <ul>
            <li><a href='#' onClick={onCreateProject}>Crear Proyecto</a></li>
            <li>
              <select onChange={(e) => onLoadProject(e.target.value)} defaultValue="">
                <option value="" disabled>Seleccionar Proyecto</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </li>
            <li><a href='#'>Quienes somos</a></li>
            <li><a href='#'>Utilidad de la app</a></li>
            <li><a href='#'>Proyectos</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
