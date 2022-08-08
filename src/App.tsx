import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Spinner from './components/common/Spinner';
const Restaurant = React.lazy(() => import('./pages/Restaurant'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Restaurant />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
