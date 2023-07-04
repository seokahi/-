const express = require("express");
const app = express();const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require('path');
const fs = require('fs');
// const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
// import { useCookies } from 'react-cookie';
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const port = process.env.PORT || 3001;
const uploadDirectory = path.join(__dirname, 'uploads');

// 디렉토리가 없으면 생성
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const fileid = uuidv4();
    const extension = file.originalname.split('.').pop();
    const filename = `${fileid}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

connection.connect();
// const sessionStore = new MySQLStore({}, connection);

// app.use(
//   session({
//     secret: "secret key",
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       domain: 'localhost',
//       path: '/',
//       maxAge: 24 * 6 * 60 * 10000,
//       sameSite: 'none',
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


app.post("/login", (req, res) => {
      const telephone = req.body.userPhone;
      const name = req.body.userName;
      
      connection.query(
        "select * from user where userPhone=? and userName=?",
        [telephone,name],
        function (err, rows, fields) {
          if (err) {
            return res.status(500).json({ error: "DB 조회 실패" });
          } else {
            if (rows.length === 0) {
              console.log("데이터가 없습니다.");
              return res.status(404).json({ error: "데이터가 없습니다." });
            } else {
              
              // req.session.telephone = telephone;
              // req.session.name = name;
              console.log("DB 조회 성공" );
              return res.status(200).json({ success: true, data: rows });
            }
          }
        }
      );
    });

app.post("/register", (req, res) => {
    const telephone = req.body.userPhone;
    const name = req.body.userName;
    connection.query(
        "select * from user where userPhone=? and userName=?",
        [telephone,name],
        function (err, rows, fields) {
        if (err) {
            return res.status(500).json({ error: "DB 조회 실패" });
        } else {
            if (rows.length === 0) {
                connection.query(
                    "INSERT INTO user (userPhone, userName) VALUES (?, ?)",
                    [telephone, name],
                    (err, rows) => {
                      if (err) {
                        console.error('DB 유저 생성 실패', insertError);
                        return;
                      }
            
                      console.log('DB 유저 생성 성공', rows);
                      return res.status(200).json({ success: true, data: rows });
                    }
                  );
            } else {
            console.log("DB 유저 존재");
            return res.status(500).json({ error: "DB 유저 생성 실패" });
            }
        }
        }
    );
    });

app.post("/post", upload.single('file'), (req, res) => {
  const telephone = req.query.telephone; 
  console.log("여기",telephone);
  const uploadtime = new Date().toISOString().slice(0, 19).replace("T", " ");
  
  // 업로드된 파일의 정보
  const filename = req.file.filename;
  const extension = filename.split('.').pop();

  // 새 파일 경로
  const newfilepath = path.join(uploadDirectory, filename);
  
  // 파일 저장
  fs.renameSync(req.file.path, newfilepath);

  // 데이터베이스에 URL 저장
  const imageUrl = `/uploads/${filename}`;
  connection.query(
    "INSERT INTO post (userPhone, postName, postTime, imageUrl) VALUES (?, ?, ?, ?)",
    [telephone, filename, uploadtime, imageUrl],
    function (err, rows, fields) {
      if (err) {
        console.error('post 등록 실패', err);
        return res.status(500).json({ error: "post 등록 실패" });
      } else {
        console.log('post 생성 성공', rows);
        return res.status(200).json({ success: true, data: rows });
      }
    }
  );
});

app.get("/timeline", (req, res) => {
  
  connection.query(
    "select * from post",
    function (err, rows, fields) {
      if (err) {
        return res.status(500).json({ error: "게시글 조회 실패" });
      } else {
        if (rows.length === 0) {
          console.log("데이터가 없습니다.");
          return res.status(404).json({ error: "데이터가 없습니다." });
        } else {
          
          console.log("게시글 조회 성공" );
          return res.status(200).json({ success: true, data: rows });
        }
      }
    }
  );
});



    
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
