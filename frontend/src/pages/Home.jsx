import { Flex, Spinner, VStack } from '@chakra-ui/react';
import HomeSkelton from '../component/HomeSkelton';
import Userpost from '../component/Userpost';
import { usePost } from '../../features/apis/post/useImpression';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user.user);

  const search = user ? [...user.following, user._id] : [];
  const { data, isLoading } = usePost(search);

  if (!user) {
    return (
      <Flex w="full" justifyContent="center" minH="2xl">
        <Spinner />
      </Flex>
    );
  }
  return (
    <VStack maxH="4xl" overflow="auto" minH="2xl">
      {isLoading && (
        <>
          {' '}
          {Array.from({ length: 5 })
            .fill(Math.random())
            .map(() => (
              <HomeSkelton key={Math.random() * 10} />
            ))}
        </>
      )}
      {data?.post.map((e, ind) => (
        <>
          <Userpost
            key={ind}
            postId={e?._id}
            user={e?.user}
            likes={e?.likeCount}
            likeArray={e?.likes}
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
