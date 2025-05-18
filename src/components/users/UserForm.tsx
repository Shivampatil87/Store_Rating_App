import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon, Mail, Lock, MapPin } from 'lucide-react';
import { z } from 'zod';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card';
import { userSchema } from '../../lib/validation';
import { mockApi } from '../../lib/mock-data';
import { Store } from '../../lib/types';

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  stores?: Store[];
}

const UserForm = ({ onSuccess, onCancel, stores = [] }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: '',
      role: 'user',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: UserFormValues) => {
    try {
      await mockApi.createUser(data);
      onSuccess();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const roleOptions = [
    { value: 'user', label: 'Normal User' },
    { value: 'admin', label: 'System Administrator' },
    { value: 'store_owner', label: 'Store Owner' }
  ];

  const storeOptions = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  storeOptions.unshift({ value: '', label: 'Select a store' });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Add New User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            id="name"
            placeholder="Enter full name (min 20 characters)"
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Textarea
            label="Address"
            id="address"
            placeholder="Enter address (max 400 characters)"
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
          <Select
            label="Role"
            options={roleOptions}
            error={errors.role?.message}
            {...register('role')}
          />
          
          {selectedRole === 'store_owner' && (
            <Select
              label="Assign to Store"
              options={storeOptions}
              error={errors.storeId?.message}
              {...register('storeId')}
            />
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button
          type="submit"
          form="user-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          Create User
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserForm;