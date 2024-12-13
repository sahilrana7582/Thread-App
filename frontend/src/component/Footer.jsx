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
  Spinner,
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
import { useSelector } from 'react-redux';
import { useLogout } from '../../features/apis/auth/useLogin';
import { SearchIcon } from 'lucide-react';

const Footer = () => {
  const [newPost, setNewPost] = useState('false');
  const handleShowNewPost = () => {
    setNewPost(!newPost);
  };
  const user = useSelector((state) => state.user.user);
  const { logout, isLoading } = useLogout();
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
      <Link to="/search">
        <Center
          flex={1}
          rounded={'lg'}
          className="hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out"
        >
          <SearchIcon size={30} cursor="pointer" />
        </Center>
      </Link>{' '}
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
        className={
          'hover:bg-[#232222] transition-all duration-300 p-2 ease-in-out'
        }
      >
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name="Ryan Florence"
              src={user?.profilePic || 'https://bit.ly/ryan-florence'}
            />
          </MenuButton>
          <MenuList>
            <Link to={`${user?.username}/myProfile`}>
              <MenuItem gap={2} alignItems={'center'}>
                <FaUser />
                Profile
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem gap={2} alignItems={'center'} onClick={logout}>
              <IoLogOut />
              {isLoading ? <Spinner /> : 'Logout'}
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </Flex>
  );
};

export default Footer;
