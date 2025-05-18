import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { loginSchema } from '../../lib/validation';
import useAuthStore from '../../store/authStore';
import { DEMO_CREDENTIALS } from '../../lib/mock-data';

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      const user = await login(data.email, data.password);
      
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
          navigate('/stores');
          break;
        case 'store_owner':
          navigate('/store-owner');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const loginWithCredentials = (credentialType: 'admin' | 'user' | 'storeOwner') => {
    const credentials = DEMO_CREDENTIALS[credentialType];
    login(credentials.email, credentials.password)
      .then((user) => {
        // Redirect based on user role
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'user':
            navigate('/stores');
            break;
          case 'store_owner':
            navigate('/store-owner');
            break;
          default:
            navigate('/');
        }
      })
      .catch(() => {
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Log in to your account</CardTitle>
        <CardDescription>Enter your email and password to access the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="error" className="mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.password?.message}
            {...register('password')}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
          >
            Log in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </div>
        <div className="w-full border-t border-gray-200 pt-4">
          <p className="text-xs text-center text-gray-500 mb-2">Demo Accounts (Quick Login):</p>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => loginWithCredentials('admin')}
              className="text-xs"
            >
              Admin
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => loginWithCredentials('user')}
              className="text-xs"
            >
              User
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => loginWithCredentials('storeOwner')}
              className="text-xs"
            >
              Store Owner
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;