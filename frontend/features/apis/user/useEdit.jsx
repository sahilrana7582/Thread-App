import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginReducer } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
const baseUrl = import.meta.env.VITE_API_URL;

export const useEdit = ({ setEditProfile }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    mutate: editProfile,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (formData) => {
      const resp = await fetch(`${baseUrl}/user/editProfile`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!resp.ok) {
        throw new Error('User Not Able To Edit');
      }

      const data = await resp.json();
      return data;
    },
    onSuccess: (data) => {
      const user = data?.user;
      toast({
        title: 'Profile Edited',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(loginReducer(user));
      queryClient.invalidateQueries(['loginProfile']);
      setEditProfile((prev) => !prev);
    },
    onError: () => {
      toast({
        title: 'Not Able to edit',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return { isPending, editProfile, error, data };
};

export const useSearch = (name) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      if (!name) {
        throw new Error('Name is required for searching');
      }

      const resp = await fetch(`${baseUrl}/user/search?name=${name}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await resp.json();
      return data?.users;
    },
    enabled: !!name,
  });

  return { data, error, isLoading };
};

export const useProfile = (username) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['loginProfile', username],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/user/${username}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await resp.json();
      return data;
    },
    onError: (err) => {
      console.error('Error fetching profile:', err);
    },
  });

  return { data, isLoading, error };
};

export const useFollow = (name) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    mutate: follow,
    data,
    isPending: followLoading,
  } = useMutation({
    mutationFn: async ({ byFollowId, toFollowId }) => {
      const resp = await fetch(
        `${baseUrl}/user/follow/${byFollowId}/${toFollowId}`,
        {
          method: 'PUT',
          credentials: 'include',
        }
      );
      if (!resp.ok) {
        throw new Error('Not Able To Follow');
      }

      const data = await resp.json();
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: `Followed`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(loginReducer(data?.user));
      queryClient.invalidateQueries([`${name}`]);
    },
    onError: () => {
      toast({
        title: `Something Went Wrong`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return { follow, followLoading, data };
};
