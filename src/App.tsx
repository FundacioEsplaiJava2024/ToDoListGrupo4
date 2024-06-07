import './App.css'

function App() {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = "move";
  }

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    event.currentTarget.appendChild(document.getElementById(id)!);
    console.log(`Somebody dropped an element with id: ${id}`);
  }

  return (
    <>
      <div className="parametros" onDragOver={enableDropping} onDrop={handleDrop}>
        <h2>Todo</h2>
      <div className="parametros" id="d1" draggable="true" onDragStart={handleDragStart}><h2>Idea</h2></div>
      <div className="parametros" id="d2" draggable="true" onDragStart={handleDragStart}><h2>Iniciando</h2></div>
      <div className="parametros" id="d3" draggable="true" onDragStart={handleDragStart}><h2>Finalizado</h2></div>
      </div>
      <div className="parametros" onDragOver={enableDropping} onDrop={handleDrop}><h2>En Progreso</h2></div>
      <div className="parametros" onDragOver={enableDropping} onDrop={handleDrop}><h2>Terminado</h2></div>
    </>
  );
}

export default App
