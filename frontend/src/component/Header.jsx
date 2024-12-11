import { Flex, Image, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Userheader from './Userheader';
import { BsFillThreadsFill } from 'react-icons/bs';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={'center'} mt={6} mb={12}>
      <BsFillThreadsFill size={55} onClick={toggleColorMode} cursor="pointer" />
    </Flex>
  );
};

export default Header;
