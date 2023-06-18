import './App.css';
import LoginPage from './Page/Login/LoginPage';
import { Route, Routes,BrowserRouter } from 'react-router-dom'; // 추가
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
