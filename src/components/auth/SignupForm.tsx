import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, MapPin, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { signupSchema } from '../../lib/validation';
import useAuthStore from '../../store/authStore';

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setError(null);
      const { confirmPassword, ...userData } = data;
      await signup(userData);
      navigate('/stores');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to sign up for the platform</CardDescription>
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
            label="Full Name"
            id="name"
            placeholder="Enter your full name (min 20 characters)"
            icon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Textarea
            label="Address"
            id="address"
            placeholder="Enter your address (max 400 characters)"
            error={errors.address?.message}
            {...register('address')}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="8-16 characters, with uppercase and special character"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <div className="text-xs text-gray-500 mt-2">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside mt-1">
              <li>8-16 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one special character</li>
            </ul>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-6"
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-500 text-center w-full">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;