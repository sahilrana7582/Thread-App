import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPost } from '../../features/apis/post/apiPost';
import { useEffect } from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import HomeSkelton from '../component/HomeSkelton';
import Userpost from '../component/Userpost';

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getPost,
  });
  return (
    <VStack maxH="4xl" overflow="auto">
      {isLoading && (
        <>
          {' '}
          <HomeSkelton />
          <HomeSkelton />
        </>
      )}
      {data?.post.map((e) => (
        <>
          <Userpost
            key={e?._id}
            likes={e?.likeCount}
            comments={e?.comments?.length}
            postTitle={e?.title}
            postImg={e?.media}
            posted={e?.posted}
          />
        </>
      ))}
    </VStack>
  );
};

export default Home;
