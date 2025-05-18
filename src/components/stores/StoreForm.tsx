import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store, Mail, MapPin } from 'lucide-react';
import { z } from 'zod';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card';
import { storeSchema } from '../../lib/validation';
import { mockApi } from '../../lib/mock-data';
import { User } from '../../lib/types';

type StoreFormValues = z.infer<typeof storeSchema>;

interface StoreFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  storeOwners: User[];
}

const StoreForm = ({ onSuccess, onCancel, storeOwners }: StoreFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      ownerId: '',
    },
  });

  const onSubmit = async (data: StoreFormValues) => {
    try {
      await mockApi.createStore(data);
      onSuccess();
    } catch (error) {
      console.error('Failed to create store:', error);
    }
  };

  const ownerOptions = storeOwners.map((owner) => ({
    value: owner.id,
    label: `${owner.name} (${owner.email})`,
  }));

  ownerOptions.unshift({ value: '', label: 'Select a store owner' });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Store className="h-5 w-5" />
          Add New Store
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="store-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Store Name"
            id="name"
            placeholder="Enter store name (min 20 characters)"
            icon={<Store className="h-5 w-5 text-gray-400" />}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter store email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Textarea
            label="Address"
            id="address"
            placeholder="Enter store address (max 400 characters)"
            error={errors.address?.message}
            {...register('address')}
          />
          <Select
            label="Store Owner"
            options={ownerOptions}
            error={errors.ownerId?.message}
            {...register('ownerId')}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button
          type="submit"
          form="store-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          Create Store
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreForm;