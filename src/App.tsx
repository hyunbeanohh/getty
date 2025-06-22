import MainPage from './pages/MainPage';
import RequestPage from './pages/requestPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
