import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './Pages/Home';
import Connect from './Pages/Connect';
import CreateAccount from './Pages/CreateAccount';
import Document from './Pages/Document';

function App() {
  // État global pour le filtrage
  const [filter, setFilter] = useState(false);

  return (
    <BrowserRouter>
      {/* Header présent sur toutes les pages */}
      <Header filter={setFilter} />

      <Routes>
        <Route 
          path='/' 
          element={<Home filter={filter} setFilter={setFilter} />} 
        />
        <Route path='/connect' element={<Connect />} />
        <Route path='/createaccount' element={<CreateAccount />} />
        <Route path='/document' element={<Document />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
