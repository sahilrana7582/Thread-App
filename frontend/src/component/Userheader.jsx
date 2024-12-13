import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Text,
  Toast,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProfile } from '../../features/apis/user/useEdit';
import React from 'react';
import { BsFillThreadsFill, BsInstagram } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { PiDotsThreeCircle } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const Userheader = ({ setEditProfile, user, isLoading, toggle, setToggle }) => {
  const toast = useToast();

  const onCopyLinkClick = () => {
    toast({
      title: 'Link Copied',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const { colorMode } = useColorMode();

  const handleToggle = () => {
    setToggle((prev) => {
      if (prev === 'threads') {
        return 'replies';
      } else {
        return 'threads';
      }
    });
  };

  return (
    <VStack gap={4} alignItems={'start'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
              <Text fontSize="4xl" fontWeight={'bold'}>
                {user?.firstName || 'First Name'}{' '}
                {user?.lastName || 'Last Name'}
              </Text>
              <Flex gap={2} alignItems={'center'}>
                <Text fontSize="xl">{user?.username}</Text>
                <Text>
                  <BsFillThreadsFill size={25} />
                </Text>
              </Flex>
            </Box>
            <Spacer />
            <Box
              alignItems={'center'}
              border={'red'}
              className="border border-red-50"
            >
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src={user?.profilePic || 'https://bit.ly/sage-adebayo'}
              />
            </Box>
          </Flex>
          <Text fontSize="xl">{user?.bio || 'Bio....'}</Text>

          <Flex justifyContent={'space-between'} w="full">
            <Flex gap={2}>
              <Text color={'gray.600'}>
                {user?.followers?.length} Follower ||{' '}
              </Text>
              <Text
                color={'gray.600'}
                cursor={'pointer'}
                className="hover:underline"
              >
                instagram.com
              </Text>
            </Flex>
            <Flex gap={2}>
              <Center>
                <FaInstagram
                  size={30}
                  cursor="pointer"
                  className="hover:bg-gray-700 rounded-full p-1 duration-300 ease-in-out"
                />
              </Center>

              <Center>
                <Menu>
                  <MenuButton>
                    <PiDotsThreeCircle
                      size={30}
                      cursor={'pointer'}
                      className="hover:bg-gray-700 rounded-full p-1 duration-300 ease-in-out"
                    />
                  </MenuButton>
                  <MenuList p={2} borderRadius={10}>
                    <MenuItem
                      p={2}
                      borderRadius={10}
                      onClick={() => setEditProfile((prev) => !prev)}
                    >
                      Edit Profile
                    </MenuItem>
                    <MenuItem p={2} borderRadius={10} onClick={onCopyLinkClick}>
                      Copy Link
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Center>
            </Flex>
          </Flex>

          <Flex w="full">
            <Flex
              flex={1}
              borderBottom={
                colorMode === 'dark'
                  ? `1.5px solid ${toggle === 'threads' ? 'white' : 'gray'}`
                  : `1.5px solid ${toggle === 'threads' ? 'black' : 'white'}`
              }
              justifyContent={'center'}
              cursor={'pointer'}
              onClick={handleToggle}
            >
              <Text p={2} fontWeight={'bold'}>
                Threads
              </Text>
            </Flex>
            <Flex
              flex={1}
              justifyContent={'center'}
              cursor={'pointer'}
              onClick={handleToggle}
              borderBottom={
                colorMode === 'dark'
                  ? `1.5px solid ${toggle === 'replies' ? 'white' : 'gray'}`
                  : `1.5px solid ${toggle === 'replies' ? 'black' : 'white'}`
              }
            >
              <Text p={2} fontWeight={'bold'}>
                Replies
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default Userheader;
