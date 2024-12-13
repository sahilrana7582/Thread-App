import React, { useState } from 'react';
import Userheader from '../component/Userheader';
import Userpost from '../component/Userpost';
import EditHeader from '@/component/EditHeader';
import { Divider, VStack } from '@chakra-ui/react';
import { useProfile } from '../../features/apis/user/useEdit';
import { useSelector } from 'react-redux';
import Postpage from './Postpage';
import { useGetAllPost } from '../../features/apis/user/useGetAllPost';
import { useFetchUser } from './useFetchUser';

const Userpage = () => {
  const [editProfile, setEditProfile] = useState(false);
  const userData = useSelector((state) => state.user.user);
  useFetchUser();

  const url = window.location.href.split('/').pop();

  let searchName = url == 'myProfile' ? userData?.username : url;

  const { data, isLoading } = useProfile(searchName);
  const [toggle, setToggle] = useState('threads');

  const user = data?.user;
  const { data: userPosts, isFetching } = useGetAllPost(user?._id);
  console.log(userPosts);

  return (
    <>
      {editProfile ? (
        <EditHeader setEditProfile={setEditProfile} user={user} />
      ) : (
        <Userheader
          setEditProfile={setEditProfile}
          isLoading={isLoading}
          user={user}
          toggle={toggle}
          setToggle={setToggle}
        />
      )}
      <Divider />
      <VStack w="full" minH="2xl">
        {toggle === 'threads' ? (
          <>
            {userPosts?.length === 0 ? (
              <h1 className="text-xl text-gray-500 text-center my-5 font-bold opacity-80">
                No Threads Yet!
              </h1>
            ) : (
              userPosts?.map((e) => {
                return (
                  <Userpost
                    key={e._id}
                    postId={e?._id}
                    user={e?.user}
                    likes={e?.likeCount}
                    comments={e?.comments?.length}
                    postTitle={e?.title}
                    postImg={e?.media}
                    posted={e?.posted}
                    likeArray={e?.likes}
                  />
                );
              })
            )}
          </>
        ) : (
          <></>
        )}
      </VStack>
    </>
  );
};

export default Userpage;
