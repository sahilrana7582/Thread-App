import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiHome } from 'react-icons/hi2';
import { CiSearch, CiUser } from 'react-icons/ci';
import { CiSquarePlus } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import NewPost from './NewPost';

const Footer = () => {
  const [newPost, setNewPost] = useState('false');
  const handleShowNewPost = () => {
    setNewPost(!newPost);
  };
  return (
    <Flex p={2} alignItems="center">
      <Center
        flex={1}
        rounded={'lg'}
        className="hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out"
      >
        <Link to="/">
          {' '}
          <HiHome size={30} cursor="pointer" />
        </Link>
      </Center>
      <Center
        flex={1}
        rounded={'lg'}
        className="hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out"
      >
        <CiSearch size={30} cursor="pointer" />
      </Center>{' '}
      <Center
        flex={1}
        rounded={'lg'}
        className="hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out"
      >
        <Link to="/username/newpost">
          <CiSquarePlus
            size={30}
            cursor="pointer"
            onClick={handleShowNewPost}
          />
        </Link>
      </Center>{' '}
      <Center
        flex={1}
        rounded={'lg'}
        className="hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out"
      >
        <FaHeart size={30} cursor="pointer" />
      </Center>
      <Center
        flex={1}
        rounded={'lg'}
        className={
          'hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out'
        }
      >
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
            />
          </MenuButton>
          <MenuList>
            <MenuItem gap={2} alignItems={'center'}>
              <FaUser />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem gap={2} alignItems={'center'}>
              <IoLogOut />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </Flex>
  );
};

export default Footer;
