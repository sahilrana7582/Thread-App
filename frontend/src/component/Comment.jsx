import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { BsThreeDots } from 'react-icons/bs';

const Comment = ({ commentText, user }) => {
  function formatDate(date) {
    return format(date, 'dd/MM/yyyy');
  }
  return (
    <>
      <Flex w="full" gap={4} alignItems="center">
        <Avatar
          name="Prosper Otemuyiwa"
          src={user?.profilePic || 'https://bit.ly/prosper-baba'}
        />
        <Flex w="full">
          <Flex flex={1} flexDirection="column" gap={2}>
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontWeight="semibold" fontSize="lg">
                  {user?.username}{' '}
                  <span className="text-xs text-gray-600">
                    {formatDate(new Date(Date.now()))}
                  </span>
                </Text>
                <div className="hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-full p-1 flex items-center justify-center">
                  <BsThreeDots
                    className="text-white text-xl"
                    cursor="pointer"
                  />
                </div>
              </Flex>
              <Text>{commentText}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comment;
