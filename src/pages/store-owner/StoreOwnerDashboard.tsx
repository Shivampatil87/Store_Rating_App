import React, { useState, useEffect } from 'react';
import { Store, Users, Star, TrendingUp, BarChart2 } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Layout from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatsGrid, StatCard } from '../../components/ui/Stats';
import Table from '../../components/ui/Table';
import StarRating from '../../components/ui/StarRating';
import { StoreOwnerStats, RatingWithUser } from '../../lib/types';
import { mockApi } from '../../lib/mock-data';
import useAuthStore from '../../store/authStore';
import { formatDate } from '../../lib/utils';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const StoreOwnerDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<StoreOwnerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const statsData = await mockApi.getStoreOwnerStats(user.id);
          setStats(statsData);
        } catch (error) {
          console.error('Failed to load stats:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadStats();
  }, [user]);

  const getChartData = () => {
    // Ratings distribution (1-5 stars)
    const ratingCounts = [0, 0, 0, 0, 0]; // Counts for 1-5 stars
    
    if (stats && stats.recentRatings) {
      stats.recentRatings.forEach(rating => {
        if (rating.value >= 1 && rating.value <= 5) {
          ratingCounts[rating.value - 1]++;
        }
      });
    }
    
    const pieData = {
      labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
      datasets: [
        {
          data: ratingCounts,
          backgroundColor: [
            '#f87171', // red
            '#fb923c', // orange
            '#facc15', // yellow
            '#a3e635', // light green
            '#4ade80', // green
          ],
          borderWidth: 1,
        },
      ],
    };
    
    // Monthly rating trend (just a placeholder with dummy data)
    const barData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Average Rating',
          data: [4.2, 4.1, 3.8, 4.0, 4.3, stats?.averageRating || 0],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
    
    return { pieData, barData };
  };

  const { pieData, barData } = getChartData();

  const columns = [
    {
      key: 'user',
      header: 'User',
      cell: (rating: RatingWithUser) => (
        <div>
          <p className="font-medium text-gray-900">{rating.user.name}</p>
          <p className="text-sm text-gray-500">{rating.user.email}</p>
        </div>
      ),
      sortable: false,
    },
    {
      key: 'rating',
      header: 'Rating',
      cell: (rating: RatingWithUser) => (
        <div className="flex items-center gap-2">
          <StarRating value={rating.value} readOnly />
          <span>{rating.value}/5</span>
        </div>
      ),
      sortable: false,
    },
    {
      key: 'date',
      header: 'Date',
      cell: (rating: RatingWithUser) => formatDate(rating.createdAt),
      sortable: false,
    },
  ];

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
          <h1 className="text-2xl font-bold mb-2">Store Owner Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's an overview of your store's performance.
          </p>
        </div>

        {stats && (
          <>
            <StatsGrid columns={3} className="mb-8">
              <StatCard
                title="Average Rating"
                value={stats.averageRating.toFixed(1)}
                icon={<Star className="h-6 w-6" />}
                description={`Based on ${stats.totalRatings} ratings`}
              />
              <StatCard
                title="Total Ratings"
                value={stats.totalRatings}
                icon={<Users className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
              />
              <StatCard
                title="Monthly Change"
                value="+0.2"
                icon={<TrendingUp className="h-6 w-6" />}
                description="Rating improved compared to last month"
                trend={{ value: 8, isPositive: true }}
              />
            </StatsGrid>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Rating Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Rating Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Bar 
                      data={barData} 
                      options={{ 
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            min: 0,
                            max: 5,
                            ticks: {
                              stepSize: 1
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Ratings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table
                  data={stats.recentRatings}
                  columns={columns}
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default StoreOwnerDashboard;