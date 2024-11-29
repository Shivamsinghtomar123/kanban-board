import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Kanban Board</h1>
      </header>
      <main>
        <KanbanBoard />
      </main>
      <footer className="App-footer">
        <p>Designed by Shivam Singh Tomar</p>
      </footer>
    </div>
  );
}

export default App;
