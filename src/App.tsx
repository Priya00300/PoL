import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePackagePage from './pages/CreatePackagePage';
import ScanVerifyPage from './pages/ScanVerifyPage';
import TrackLogisticsPage from './pages/TrackLogisticsPage';
import QualityCheckPage from './pages/QualityCheckPage';
import ManageKeysPage from './pages/ManageKeysPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePackagePage />} />
          <Route path="/scan" element={<ScanVerifyPage />} />
          <Route path="/track" element={<TrackLogisticsPage />} />
          <Route path="/quality" element={<QualityCheckPage />} />
          <Route path="/keys" element={<ManageKeysPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;