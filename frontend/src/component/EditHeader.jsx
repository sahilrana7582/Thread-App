import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Center,
  Divider,
  Flex,
  Image,
  Spinner,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEdit } from '../../features/apis/user/useEdit';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const EditHeader = ({ setEditProfile, user }) => {
  const [profilePreview, setProfilePreview] = useState();
  const { register, setValue, handleSubmit } = useForm();
  const { editProfile, isPending } = useEdit({ setEditProfile });
  console.log(user, '<<<<<<<<');

  const onSubmit = async (data) => {
    console.log(data, 'data<<<<<<<<<<<<<<<');
    console.log(data, 'data<<<<<<<<<<<<<<<');

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('bio', data.bio);

    formData.append('profilePic', data.profilePic);
    formData.append('userId', user?._id);

    await editProfile(formData);
  };

  return (
    <VStack w="full" p="2">
      <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent="space-between" w="full" gap={2}>
          <Flex flexDirection="column" gap={4}>
            <Flex gap={2}>
              <Input
                placeholder="First Name"
                defaultValue={user?.firstName}
                {...register('firstName')}
              />
              <Input
                placeholder="Last Name"
                defaultValue={user?.lastName}
                {...register('lastName')}
              />
            </Flex>
            <Input
              placeholder="Username"
              defaultValue={user?.username}
              {...register('username')}
            />
            <Textarea
              placeholder="Bio"
              defaultValue={user?.bio}
              {...register('bio')}
            />
          </Flex>
          <Flex
            flexDirection={'column'}
            gap={2}
            maxW="56"
            alignItems={'center'}
          >
            {profilePreview && <Image src={profilePreview} borderRadius="md" />}
            <Divider />
            <Center>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                className=" text-center"
              >
                <Input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  tabIndex={'1'}
                  onChange={(e) => {
                    const file = e?.target?.files[0];
                    if (file && file?.type?.startsWith('image/')) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setProfilePreview(reader.result);
                        setValue('profilePic', file);
                      };

                      reader.readAsDataURL(file);
                    } else {
                      toast('Please Select Valid Image');
                    }
                  }}
                  multiple
                />
              </Button>
            </Center>
          </Flex>
        </Flex>
        <Divider />
        <Flex justifyContent="space-evenly" gap={6}>
          <Button
            variant="destructive"
            onClick={() => setEditProfile((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? <Spinner /> : 'Edit Profile'}
          </Button>
        </Flex>
      </form>
    </VStack>
  );
};

export default EditHeader;
