import './App.css'

function App() {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
  }

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    console.log(`Somebody dropped an element with id: ${id}`);
  }

  return (
    <>
      <div className="parametros" id="d1" draggable="true" onDragStart={handleDragStart}><h2>Idea</h2></div>
      <div className="parametros" id="d2" draggable="true" onDragStart={handleDragStart}><h2>Iniciando</h2></div>
      <div className="parametros" id="d3" draggable="true" onDragStart={handleDragStart}><h2>Finalizado</h2></div>
      <div onDragOver={enableDropping} onDrop={handleDrop}><h2>Drop Area</h2></div>
    </>
  );
}

export default App
