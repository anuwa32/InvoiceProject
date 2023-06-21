import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Products from "./components/Products";
import Sidebar from './components/Sidebar';
import Invoice from './components/Invoice';
import Report from './components/Report';
import Sales from './components/Sales'

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/product" exact element={<Products />} />
          <Route path="/sidebar" exact element={<Sidebar />} />
          <Route path="/" exact element={<Invoice />} />
          <Route path="/report" exact element={<Report />} />
          <Route path="/sales" exact element={<Sales />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
