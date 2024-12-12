import {
  Avatar,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSearch } from '../../features/apis/user/useEdit';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [name, setName] = useState();
  const { data, error, isLoading } = useSearch(name);

  return (
    <VStack h="2xl">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </InputGroup>
      <Divider m="2" />
      <VStack className="space-y-6" w="full">
        {data?.map((user) => (
          <>
            <Flex w="full" gap={4}>
              <Avatar
                name="Prosper Otemuyiwa"
                src={user?.profilePic || 'https://bit.ly/prosper-baba'}
              />
              <Flex flex={1} justifyContent={'space-between'}>
                <Center flexDirection="column" alignItems="start">
                  <Text>{user?.username}</Text>
                  <Text>{user?.firstName}</Text>
                </Center>
                <Center>
                  <Button>Follow</Button>
                </Center>
              </Flex>
            </Flex>
            <Divider />
          </>
        ))}
      </VStack>
    </VStack>
  );
};

export default Search;
