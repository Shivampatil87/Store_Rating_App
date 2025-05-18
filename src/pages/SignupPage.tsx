import React from 'react';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;