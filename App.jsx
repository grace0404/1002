import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const App = () => {
  const [signupData, setSignupData] = useState({ userId: '', password: '', email: '' });
  const [loginData, setLoginData] = useState({ userId: '', password: '' });

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'signup') {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openAlertWindow = (message) => {
    // 새로운 창을 띄우고 메시지를 표시합니다.
    const alertWindow = window.open('', '', 'width=400,height=200');
    alertWindow.document.write(`
      <html>
        <head>
          <title>알림</title>
        </head>
        <body>
          <h3>${message}</h3>
          <button onclick="window.close()">닫기</button>
        </body>
      </html>
    `);
    alertWindow.document.close();
  };

  const signupUser = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/signup`, signupData);
      if (response.status === 200) {
        openAlertWindow('회원가입이 완료되었습니다.');
      }
    } catch (error) {
      const errorMessage = error.response && error.response.status === 401
        ? '이미 사용 중인 아이디입니다.'
        : '회원가입 실패: ' + (error.response ? error.response.data : error.message);
      openAlertWindow(errorMessage);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/login`, loginData);
      if (response.status === 200) {
        openAlertWindow(`로그인되었습니다`);
      }
    } catch (error) {
      openAlertWindow('로그인 실패: ' + (error.response ? error.response.data : error.message));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupUser();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={signupData.userId}
          onChange={(e) => handleInputChange(e, 'signup')}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={signupData.password}
          onChange={(e) => handleInputChange(e, 'signup')}
          autoComplete="new-password"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={signupData.email}
          onChange={(e) => handleInputChange(e, 'signup')}
          required
        />
        <button type="submit" className="submit-btn">회원가입 완료</button>
      </form>

      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={loginData.userId}
          onChange={(e) => handleInputChange(e, 'login')}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={(e) => handleInputChange(e, 'login')}
          autoComplete="current-password"
          required
        />
        <button type="submit" className="submit-btn">로그인 완료</button>
      </form>
    </div>
  );
};

export default App;