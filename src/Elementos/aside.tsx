import React from 'react';

interface AsideProps {
  projects: { id: string; name: string }[];
  onCreateProject: () => void;
  currentProjectId: string;
  onLoadProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

const Aside: React.FC<AsideProps> = ({ projects, onCreateProject, onLoadProject, onDeleteProject, currentProjectId }) => {
  return (
    <aside>
      <div className='container'>
        <h3>Utilidades</h3>
        <nav>
          <ul>
            <li><a href='#' onClick={onCreateProject}>Crear Proyecto</a></li>
            <li>
              <select value={currentProjectId} onChange={(e) => onLoadProject(e.target.value)} defaultValue="">
                <option value="" disabled>Seleccionar Proyecto</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </li>
            {projects.length > 0 && (
              <li>
                <button onClick={() => onDeleteProject(currentProjectId)}>Eliminar Proyecto Actual</button>
              </li>
            )}
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
