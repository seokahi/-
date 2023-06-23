import './App.css';
import LoginPage from './Page/Login/LoginPage';
import { Route, Routes,BrowserRouter } from 'react-router-dom'; // 추가
import TimelinePage from './Page/Timeline/TimelinePage';
import ImageInput from './Page/Post/PostPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/post" element={<ImageInput />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
