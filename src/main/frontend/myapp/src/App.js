import './App.css';
import LoginPage from './Page/Login/LoginPage';
import { Route, Routes,BrowserRouter } from 'react-router-dom'; // 추가
import TimelinePage from './Page/Timeline/TimelinePage';
import ImageInput from './Page/Upload/UploadPage';
import Comment from './Page/Comments/CommentPage';
import MyProfile from './MyProfile/MyProfilePage'
import Chat from './Page/ChatPage';
import Letter from './Page/LetterPage';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/post" element={<ImageInput />} />
          <Route path="/comments/:post_id" element={<Comment/>} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/letter" element={<Letter/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
