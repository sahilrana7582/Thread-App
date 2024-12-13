import {
  Avatar,
  Box,
  CheckboxIcon,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { PiCheckCircleDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Actions from './Actions';
import { getTimeAgo } from '../../features/utils/getDate';

const Userpost = ({
  user,
  likes,
  comments,
  postTitle,
  postImg,
  posted,
  postId,
  likeArray,
}) => {
  return (
    <>
      <Flex gap={8} mb={4} py={6}>
        <Flex
          flexDirection="column"
          alignContent={'space-between'}
          alignItems="center"
        >
          <Avatar
            size="md"
            name="Segun Adebayo"
            src={user?.profilePic || 'https://bit.ly/sage-adebayo'}
          />

          <Box w="1px" h="full" bg="gray.light" my={4}></Box>

          <Box position={'relative'} w={'full'}>
            <Avatar
              size="xs"
              name="Segun Adebayo"
              left={0}
              bottom={0}
              position={'absolute'}
              src="https://bit.ly/prosper-baba"
            />{' '}
            <Avatar
              size="xs"
              name="Segun Adebayo"
              left={8}
              bottom={0}
              position={'absolute'}
              src="https://bit.ly/tioluwani-kolawole"
            />
            <Avatar
              size="xs"
              name="Segun Adebayo"
              left={4}
              bottom={-5}
              position={'absolute'}
              src="https://bit.ly/sage-adebayo"
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection="column" gap={2}>
          <Flex justifyContent="space-between" alignItems="center" w="full">
            <Flex alignItems={'center'} w="full" gap={1}>
              <Text fontSize="lg" fontWeight="bold">
                {user?.username}
              </Text>
              <PiCheckCircleDuotone />
            </Flex>

            <Flex alignItems="center" gap={2} flex={1}>
              <Text color="gray.500" fontSize={'sm'} w="fit-content">
                {getTimeAgo(posted)}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Link to={`/${user?.username}/post/${postId}`}>
            <Text>{postTitle}</Text>

            {postImg ? (
              <Box overflow="hidden">
                <Image
                  src={postImg}
                  alt="Thread Pic"
                  w="full"
                  borderRadius={'lg'}
                />
              </Box>
            ) : null}
          </Link>

          <Flex flexDirection={'column'} gap={2} p="2">
            <Actions
              likes={likes}
              comments={comments}
              postId={postId}
              likeArray={likeArray}
            />
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Userpost;
