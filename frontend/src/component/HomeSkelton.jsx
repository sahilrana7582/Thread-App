import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const HomeSkelton = () => {
  return (
    <Box w="full" gap={6} className="space-y-7" my="2">
      <SkeletonCircle size="20" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="4" />
      <Flex>
        <Skeleton w="full" h="xl">
          {' '}
        </Skeleton>
      </Flex>
    </Box>
  );
};

export default HomeSkelton;
