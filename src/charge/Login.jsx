import { useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import { Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('로그인되었습니다.');
          // 로그인 성공 처리, 예: 액세스 토큰 저장, 리디렉션 등
          console.log(data.accessToken);
          document.cookie = `accessToken=${data.accessToken}; path=/;`;
        } else {
          alert(data.error || '로그인에 실패했습니다.');
        }
      };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="white"
    >
      <Text fontSize="36px"><span style={{ fontWeight: 'normal' }}>7team</span></Text>
      <br />
      <br />
      <VStack spacing={4} width="400px">
              <UserInput placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
              <PasswordInput placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button colorScheme="green" width="100%" onClick={handleLogin}>로그인</Button>
        <br />
        <Text mt={4}>우리와 함께 하세요!</Text>
        <Button as={Link} to="/join" colorScheme="blue" width="100%">회원가입</Button>
      </VStack>
    </Box>
  );
}

export default Login;