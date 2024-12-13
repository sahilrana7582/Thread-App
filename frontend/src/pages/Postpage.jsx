import {
  AspectRatio,
  Avatar,
  Divider,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsFillThreadsFill, BsThreeDots } from 'react-icons/bs';
import React from 'react';
import Actions from '../component/Actions';
import { PiCheckCircleDuotone } from 'react-icons/pi';
import Comment from '../component/Comment';
import { Link, useParams } from 'react-router-dom';
import { usePostInfo } from '../../features/apis/post/useImpression';

const Postpage = ({ username }) => {
  const { postId } = useParams();
  let args = username;
  if (!username) {
    args = postId;
  }
  const { data, isLoading } = usePostInfo(args);
  return (
    <VStack minH="2xl">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Flex w="full" justifyContent="space-between">
            <Flex gap={2}>
              <Link to={`/${data?.user?.username}`}>
                <Avatar name="Prosper Otemuyiwa" src={data?.user?.profilePic} />
              </Link>
              <Flex alignItems="center" gap={2}>
                <Text
                  fontSize="2xl"
                  alignItems="center"
                  fontWeight="normal"
                  alignSelf="center"
                  textTransform="lowercase"
                >
                  {data?.user?.username}
                </Text>
                <PiCheckCircleDuotone
                  size={20}
                  className="text-sky-300 items-center"
                />
              </Flex>
            </Flex>
            <Flex gap={2} alignItems="center">
              <Text color="gray.600">1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <>
            <Flex alignContent="start" w="full" flexDirection="column" gap={4}>
              <Stack>
                <Text justifySelf="start">{data?.title}</Text>
                <Image src={data?.media} rounded="lg" />
              </Stack>
              <Actions
                likes={data?.likeCount}
                comments={data?.comments.length}
                postId={data?._id}
                likeArray={data?.likes}
              />
            </Flex>
            <Divider />
            <>
              {data?.comments?.length === 0 ? (
                <h1 className="text-xl text-gray-500 text-center my-5 font-bold opacity-80">
                  No Comments Yet!
                </h1>
              ) : (
                data?.comments?.map((e) => (
                  <Comment
                    key={e?._id}
                    user={e?.user}
                    commentText={e.commentText}
                  />
                ))
              )}
            </>
          </>
        </>
      )}
    </VStack>
  );
};

export default Postpage;
