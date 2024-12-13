import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../features/apis/post/apiPost';
import { VStack } from '@chakra-ui/react';
import HomeSkelton from '../component/HomeSkelton';
import Userpost from '../component/Userpost';

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getPost,
  });
  return (
    <VStack maxH="4xl" overflow="auto">
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
