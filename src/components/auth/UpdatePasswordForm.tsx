import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, AlertCircle, Check } from 'lucide-react';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { updatePasswordSchema } from '../../lib/validation';
import { delay } from '../../lib/utils';

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: UpdatePasswordFormValues) => {
    try {
      setError(null);
      setSuccess(false);
      
      // Simulate password update with mock API
      await delay(1000);
      
      // Reset form and show success message
      reset();
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Update Password</CardTitle>
        <CardDescription>Change your account password</CardDescription>
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
        
        {success && (
          <Alert variant="success" className="mb-4">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Password updated successfully!
            </div>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Current Password"
            id="currentPassword"
            type="password"
            placeholder="Enter your current password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />
          <Input
            label="New Password"
            id="newPassword"
            type="password"
            placeholder="8-16 characters, with uppercase and special character"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
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
            className="mt-6"
            isLoading={isSubmitting}
          >
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;