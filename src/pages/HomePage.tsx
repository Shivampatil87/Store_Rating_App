import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Store, Users, BarChart3 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useAuthStore from '../store/authStore';

const HomePage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      switch (user?.role) {
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
          navigate('/login');
      }
    } else {
      navigate('/signup');
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-8 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find and Rate the Best Stores
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover new stores, share your experiences, and help others find quality services with our platform.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="px-8">
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="inline-flex p-4 rounded-full bg-blue-100 mb-4">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Stores</h3>
              <p className="text-gray-600">
                Explore a variety of stores and businesses across different categories.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="inline-flex p-4 rounded-full bg-amber-100 mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rate and Review</h3>
              <p className="text-gray-600">
                Share your experiences by rating stores from 1 to 5 stars.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="inline-flex p-4 rounded-full bg-teal-100 mb-4">
                <BarChart3 className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Performance</h3>
              <p className="text-gray-600">
                Store owners can monitor ratings and feedback to improve services.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-medium text-sm mr-3 mt-0.5">1</span>
                  <span className="text-gray-700">Create an account to get started with our platform.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-medium text-sm mr-3 mt-0.5">2</span>
                  <span className="text-gray-700">Browse through the list of registered stores.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-medium text-sm mr-3 mt-0.5">3</span>
                  <span className="text-gray-700">Submit ratings (1-5 stars) for the stores you've visited.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-medium text-sm mr-3 mt-0.5">4</span>
                  <span className="text-gray-700">Store owners can track their performance and feedback.</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Coffee Shop Example</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <Star className="h-5 w-5 text-gray-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">123 Coffee Street, City, Country</p>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">4.0 average rating</p>
                    <p>Based on 24 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our platform today and help create a community of trusted reviews.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/signup')} size="lg" variant="primary">
              Sign Up Now
            </Button>
            <Button onClick={() => navigate('/login')} size="lg" variant="outline">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;