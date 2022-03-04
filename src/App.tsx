import React from 'react';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NewsDetail from './components/NewsDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news/:q" element={<NewsDetail />} />

      </Routes>
    </BrowserRouter>
  );

}


export default App;
