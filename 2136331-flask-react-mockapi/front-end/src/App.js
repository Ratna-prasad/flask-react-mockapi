import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/Read';
import { Create } from './components/Create';
import Update from './components/Update';



function App() {
  return (
    <div className="Container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;