import React, {useEffect, useState} from 'react'
// import Post from './posts/Post'

import "./TimelinePage.css"
// import '../Common/Common.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { ToastNotification } from '../Toast/ToastNotification';

//우리가 만든 고유한 포스트
function TimelinePage()  {

    const navigate = useNavigate();
    const [toastState, setToastState] = useState(true);
    const [count, setCount] = useState(parseInt(localStorage.getItem('count')) || 0); // 초기값을 localStorage에서 가져오기
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      // count 값이 변경될 때마다 localStorage에 저장
      localStorage.setItem('count', count+1);
    }, [count]);

    useEffect(() => {
        axios.get("/api/timeline")
            .then(response => {
                const sortedPosts = response.data.sort((a, b) => b.post_id - a.post_id);
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);
  const hadlePostbutton =()=> {
    navigate('/post')
  }

  // const handleLetterbutoon =()=>{
  //   navigate('/letter')
  // }

  return (
    <div className="app">
    <div className='app-header'>
        <h1><a href="/timeline" style={{ color: '#000', textDecoration: 'none' }}>인스타그랜마</a></h1>
        <div className='header-icons'>
        <AccountCircleOutlinedIcon fontSize="large"
          onClick={() => window.location.href = "/myprofile"}/>
        <button className='header-button' ><AddPhotoAlternateOutlinedIcon fontSize='large' /></button>
        <LightbulbOutlinedIcon fontSize="large"/>
        <EmailOutlinedIcon fontSize="large"/> 
        </div>
    </div>
    {/* <div className="timeline">
      <div className="timeline_left">
        <div className="timeline_post">
          {posts.map(post =>(
            <Post
            post_id={post.post_id} // 프론트엔드와 백엔드 간의 고유한 식별자(ID)
            // userPhone={post.userPhone}
            userName={post.userName}
            postName={post.postName}
            // likes={post.likes}
            postTime={post.postTime}
            imageUrl={post.imageUrl}  //post id 추가전달
            posts={posts} />
          ))}
        </div>
      </div> */}
      {/* <div className='timeline_right'>
      </div>
      {toastState === true ? (<ToastNotification setToastState={setToastState} />) : null} */}
    </div>
    // </div>
  )
}

export default TimelinePage
