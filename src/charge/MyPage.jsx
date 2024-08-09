import { useState, useEffect } from 'react';
import { Box, Button, VStack, useToast,Flex } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';
import Header from './components/Header';

function MyPage() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      address: '',
      connectType: '',
    });
  
    const toast = useToast();
  
    // 회원 정보를 불러오는 부분 (가상의 API 호출)
    useEffect(() => {
      // 실제로는 API를 호출하여 데이터를 가져와야 합니다.
      // 아래는 예시 데이터입니다.
      const fetchUserData = async () => {
        const data = await fetch('/api/user-info').then((res) => res.json());
        setFormData(data);
      };
  
      fetchUserData();
    }, []);
  
    // 정보 수정 핸들러
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    // 회원 정보 수정 요청
    const handleSave = async () => {
      try {
        // API 요청
        const response = await fetch('/api/update-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('회원정보 수정 실패');
        }
  
        toast({
          title: '회원정보가 수정되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: '회원정보 수정 중 오류가 발생했습니다.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    // 회원 탈퇴 요청
    const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
  
      if (confirmDelete) {
        try {
          // API 요청
          const response = await fetch('/api/delete-user', {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('회원 탈퇴 실패');
          }
  
          toast({
            title: '회원탈퇴가 완료되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
  
          // 탈퇴 후 추가 작업 (예: 로그인 페이지로 이동)
        } catch (error) {
          toast({
            title: '회원탈퇴 중 오류가 발생했습니다.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }

    return (
        <Box minH="100vh">
            <Header />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minH="100vh"
                bg="white"
                p={2}
            >
            <VStack spacing={4} width="400px">
            <UserInput
            placeholder="아이디"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
            <UserInput
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
            <PasswordInput
            placeholder="비밀번호"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
            <PasswordInput
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            />
            <UserInput
            placeholder="주소입력"
            name="address"
            value={formData.address}
            onChange={handleChange}
            />
            <ConnectType
            placeholder="커넥트타입"
            name="connectType"
            value={formData.connectType}
            onChange={handleChange}
            />
            <br />
            <Button colorScheme="blue" width="100%" onClick={handleSave}>
            회원정보수정
            </Button>
            </VStack>
            <Flex width="400px" justifyContent="flex-end" mt={2}>
            <Button variant="ghost" color="red.500" onClick={handleDeleteAccount}>
            회원탈퇴
            </Button>
            </Flex>
            </Box>
        </Box>
    );
}

export default MyPage;
