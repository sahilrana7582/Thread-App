import { useToast } from '@chakra-ui/react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { loginReducer } from '../../slices/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
const baseUrl = import.meta.env.VITE_API_URL;

export const useEdit = ({ setEditProfile }) => {
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
    queryKey: ['registeredUser', name],
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
