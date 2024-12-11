import {
  AspectRatio,
  Avatar,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsFillThreadsFill, BsThreeDots } from 'react-icons/bs';
import React from 'react';
import Actions from '../component/Actions';
import { PiCheckCircleDuotone } from 'react-icons/pi';
import Comment from '../component/Comment';
import { Link } from 'react-router-dom';

const Postpage = () => {
  return (
    <VStack>
      <Flex w="full" justifyContent="space-between">
        <Flex gap={2}>
          <Link to="/ksksk">
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
          </Link>
          <Flex alignItems="center" gap={2}>
            <Text
              fontSize="2xl"
              alignItems="center"
              fontWeight="normal"
              alignSelf="center"
              textTransform="lowercase"
            >
              sahilrana112
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
      <Flex alignContent="start" w="full" flexDirection="column" gap={4}>
        <Stack>
          <Text justifySelf="start">Let's Talk About The Threads</Text>
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              rounded="lg"
            />
          </AspectRatio>
        </Stack>
        <Actions likes={100} comments={100} />
      </Flex>
      <Divider />
      {Array.from({ length: 10 })
        .fill(10)
        .map((e, ind) => (
          <Comment
            key={ind}
            likes={(Math.random() * 50).toFixed(1)}
            comments={(Math.random() * 10).toFixed(1)}
          />
        ))}
    </VStack>
  );
};

export default Postpage;
