import Header from '../src/components/Header/Header';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop/Shop';


function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryId" element={<Shop />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </Router> 
    </>
  );
}

export default App;
