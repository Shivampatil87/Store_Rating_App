import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;