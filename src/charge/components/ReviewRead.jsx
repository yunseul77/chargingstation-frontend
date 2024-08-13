import { useState } from 'react';
import { Box, Flex, Text, VStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import ReviewCreate from './ReviewCreate';

// 더미 데이터
const dummyReviews = [
  {
    userId: 'user1',
    rating: 4,
    review: '좋아요',
  },
  {
    userId: 'user2',
    rating: 5,
    review: '매우 좋아요',
  },
];

const StarRating = ({ rating }) => {
  return (
    <Flex>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            key={index}
            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
          >
            <FaStar size={20} />
          </Box>
        );
      })}
    </Flex>
  );
};

const ReviewRead = ({ isLoggedIn }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const review = dummyReviews[currentIndex];
  const totalReviews = dummyReviews.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
  };

  return (
    <Box p={5} maxW="800px" mx="auto">
      <VStack spacing={4} align="start">
        <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
          <StarRating rating={review.rating} />
          <Text fontWeight="bold" mt={2}>{review.userId}</Text>
          <Text mt={2}>{review.review}</Text>
        </Box>

        <Flex mt={4} justify="space-between">
          <Button
            onClick={handlePrevious}
            disabled={totalReviews <= 1}
            variant="outline"
            leftIcon={<ArrowLeftIcon />}
            w="auto"
          />
          <Button
            onClick={handleNext}
            disabled={totalReviews <= 1}
            variant="outline"
            rightIcon={<ArrowRightIcon />}
            w="auto"
          />
        </Flex>
      </VStack>

      {isLoggedIn && (
        <Flex mt={4} justify="flex-end">
          <Button colorScheme="teal" onClick={onOpen}>
            리뷰 작성
          </Button>
        </Flex>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>리뷰 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewCreate />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// 테스트용 로그인 로그아웃 확인되면 지워주세요.
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
      <ReviewRead isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
