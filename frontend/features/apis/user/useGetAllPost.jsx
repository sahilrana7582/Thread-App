import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_API_URL;

export const useGetAllPost = (userId) => {
  console.log(userId, '>>>>>>>>');
  const { data, isFetching } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/user/allPosts/${userId}`, {
        credentials: 'include',
        method: 'GET',
      });
      if (!resp.ok) {
        throw new Error('Not Get User Posts');
      }

      const data = await resp.json();

      return data?.posts;
    },
  });

  return { data, isFetching };
};
