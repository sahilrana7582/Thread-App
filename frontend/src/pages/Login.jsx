import { Flex, Spinner, VStack } from '@chakra-ui/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../../features/apis/auth/auth';
import { useLogin } from '../../features/apis/auth/useLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signup, isPending } = useSignUp();
  const { login, isPending: loginPending } = useLogin();

  const onSubmit = async (data, type) => {
    try {
      const action = type == 'login' ? login : signup;
      await action(data);
    } catch (e) {
      console.warn(e);
    } finally {
      reset();
    }
  };
  return (
    <VStack>
      <div>
        <h1 className="text-xl font-bold ">Demo Login</h1>
        <h1 className="text-xl font-bold ">Email:test1@gmail.com</h1>
        <h1 className="text-xl font-bold ">Pass: 1234</h1>
      </div>
      <Flex justifyContent="center" alignItems="center" minH="2xl">
        <Tabs defaultValue="account" className={`w-[400px]`}>
          <TabsList className={`grid w-full grid-cols-2`}>
            <TabsTrigger value="account">Sign Up</TabsTrigger>
            <TabsTrigger value="password">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <form onSubmit={handleSubmit((data) => onSubmit(data, 'signup'))}>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Make your new accout here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" {...register('username')} />
                    {errors.username && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address',
                        },
                      })}
                    />

                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      {...register('password', {
                        required: 'Password is required',
                        min: {
                          value: 4,
                          message: 'Password Should Atleast 4 Charactors',
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    {isPending ? <Spinner /> : 'Sign Up'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit((data) => onSubmit(data, 'login'))}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address',
                        },
                      })}
                    />

                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      {...register('password', {
                        required: 'Password is required',
                        min: {
                          value: 4,
                          message: 'Password Should Atleast 4 Charactors',
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    {loginPending ? <Spinner /> : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </Flex>
    </VStack>
  );
};

export default Login;
