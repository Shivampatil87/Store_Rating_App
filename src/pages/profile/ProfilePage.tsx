import React from 'react';
import { User, Mail, MapPin } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import UpdatePasswordForm from '../../components/auth/UpdatePasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';
import { formatDate } from '../../lib/utils';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <p>You need to be logged in to view this page.</p>
        </div>
      </Layout>
    );
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'store_owner':
        return 'secondary';
      case 'user':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'store_owner':
        return 'Store Owner';
      case 'user':
        return 'Normal User';
      default:
        return role;
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {getRoleDisplayName(user.role)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-36 text-gray-500">Email</div>
                <div className="flex-1 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-36 text-gray-500">Address</div>
                <div className="flex-1 flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{user.address}</span>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-36 text-gray-500">Member Since</div>
                <div>{formatDate(user.createdAt)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <UpdatePasswordForm />
      </div>
    </Layout>
  );
};

export default ProfilePage;