import React, { useState, useEffect } from 'react';
import { Users, Store, Star, TrendingUp, ArrowUpRight } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { StatsGrid, StatCard } from '../../components/ui/Stats';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { mockApi } from '../../lib/mock-data';
import { formatNumber } from '../../lib/utils';
import { AdminStats } from '../../lib/types';

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const statsData = await mockApi.getAdminStats();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the system administrator dashboard.</p>
        </div>

        {stats && (
          <StatsGrid columns={3} className="mb-8">
            <StatCard
              title="Total Users"
              value={formatNumber(stats.totalUsers)}
              icon={<Users className="h-6 w-6" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Total Stores"
              value={formatNumber(stats.totalStores)}
              icon={<Store className="h-6 w-6" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Total Ratings"
              value={formatNumber(stats.totalRatings)}
              icon={<Star className="h-6 w-6" />}
              trend={{ value: 24, isPositive: true }}
            />
          </StatsGrid>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Active Users</span>
                  <div className="flex items-center">
                    <span className="font-medium">85%</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Average Ratings</span>
                  <div className="flex items-center">
                    <span className="font-medium">4.2/5</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">New Stores This Month</span>
                  <div className="flex items-center">
                    <span className="font-medium">12</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">New Users This Month</span>
                  <div className="flex items-center">
                    <span className="font-medium">24</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Top Rated Stores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium">Coffee Shop Example Name Here</span>
                    <div className="text-sm text-gray-500">24 ratings</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">4.7</span>
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium">Electronics Store Example</span>
                    <div className="text-sm text-gray-500">18 ratings</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">4.5</span>
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium">Bookstore Example Name</span>
                    <div className="text-sm text-gray-500">15 ratings</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">4.3</span>
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Clothing Store Example</span>
                    <div className="text-sm text-gray-500">10 ratings</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">4.1</span>
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 ml-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;