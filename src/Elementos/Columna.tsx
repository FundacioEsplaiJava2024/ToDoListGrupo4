import { Elemento } from './Elemento';
import { Task } from '../domain/Task';

export interface ColumnaProps {
  titulo: string,
  agregarElemento: ()=>void,
  elementos: Task[]
}

function Columna({titulo, agregarElemento, elementos} : ColumnaProps) {
    
    return (
      <div className="columna">
        <h1>{titulo}</h1>
        <button onClick={agregarElemento}>Añadir Elemento</button>
        <ul>
          {elementos.map((elemento, index) => (
            <li key={index}>
              <Elemento title={elemento.title}/>
            </li>
          ))}
        </ul>
      </div>
    );
}
