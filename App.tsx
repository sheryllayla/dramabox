
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Watch from './pages/Watch';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:bookId" element={<Detail />} />
          <Route path="/watch/:bookId/:episode" element={<Watch />} />
          <Route path="/library" element={<div className="py-20 text-center text-zinc-500">Your library is currently empty.</div>} />
          <Route path="/profile" element={<div className="py-20 text-center text-zinc-500">Profile features coming soon.</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
