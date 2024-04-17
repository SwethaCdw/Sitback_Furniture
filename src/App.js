import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop/Shop';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import NotFound from './pages/NotFound/NotFound';


function App() {
  console.log('APP');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryId" element={<Shop />} />
          <Route path="/confirmOrder" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router> 
    </>
  );
}

export default App;
