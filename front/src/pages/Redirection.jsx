import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

const Redirection = () => {
    const code = new URL(document.location.toString()).searchParams.get('code'); 
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log(code);

      if (code) {
        axios.post(`/auth/kakao/callback`, { code }) // POST 요청에 code 포함
          .then((response) => {
            console.log(response.data);
            
            // 예: 응답에서 토큰을 받아 localStorage에 저장
            // localStorage.setItem('access_token', response.data.access_token);

            navigate('/Map'); // 인증s 후 리다이렉트
          })
          .catch((error) => {
            console.error('Error during authentication:', error);
            alert('로그인에 실패했습니다.');
          });
      } else {
        alert('코드가 없습니다. 다시 로그인 시도해주세요.');
        navigate('/'); 
      }
    }, [code, navigate]); 

    return <div>로그인 중입니다...</div>;
};
  
  export default Redirection;