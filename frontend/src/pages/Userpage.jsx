import React, { useState } from 'react';
import Userheader from '../component/Userheader';
import Userpost from '../component/Userpost';
import EditHeader from '@/component/EditHeader';
import { Divider, VStack } from '@chakra-ui/react';

const Userpage = () => {
  const [editProfile, setEditProfile] = useState(false);

  return (
    <>
      {editProfile ? (
        <EditHeader setEditProfile={setEditProfile} />
      ) : (
        <Userheader setEditProfile={setEditProfile} />
      )}
      <Divider />
      <VStack w="full" h="2xl"></VStack>
    </>
  );
};

export default Userpage;
