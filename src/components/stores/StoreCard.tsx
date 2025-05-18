import React, { useState } from 'react';
import { Store, Pin, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { Store as StoreType } from '../../lib/types';
import useAuthStore from '../../store/authStore';
import { mockApi } from '../../lib/mock-data';

interface StoreCardProps {
  store: StoreType & { userRating?: number | null };
  onRatingUpdate?: () => void;
}

const StoreCard = ({ store, onRatingUpdate }: StoreCardProps) => {
  const { user } = useAuthStore();
  const [currentRating, setCurrentRating] = useState<number | null>(store.userRating || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRatingChange = (value: number) => {
    setCurrentRating(value);
  };

  const handleSubmitRating = async () => {
    if (!user || currentRating === null) return;

    setIsSubmitting(true);
    try {
      await mockApi.submitRating({
        storeId: store.id,
        userId: user.id,
        value: currentRating,
      });
      setIsEditing(false);
      if (onRatingUpdate) {
        onRatingUpdate();
      }
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2">{store.name}</CardTitle>
          <div className="p-2 bg-blue-100 rounded-full">
            <Store className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <Pin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="line-clamp-2">{store.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span>{store.email}</span>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Overall Rating</p>
                <div className="flex items-center gap-2">
                  <StarRating value={store.averageRating} readOnly />
                  <span className="text-sm font-medium">
                    {store.averageRating.toFixed(1)} ({store.totalRatings})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {user && user.role === 'user' && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500 mb-2">Your Rating</p>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <StarRating 
                      value={currentRating || 0} 
                      onChange={handleRatingChange} 
                      size="lg"
                    />
                    <span className="text-sm font-medium">
                      {currentRating ? `${currentRating} star${currentRating !== 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitRating}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      disabled={!currentRating}
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentRating(store.userRating || null);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentRating ? (
                      <>
                        <StarRating value={currentRating} readOnly />
                        <span className="text-sm font-medium">
                          {currentRating} star{currentRating !== 1 ? 's' : ''}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 italic">No rating yet</span>
                    )}
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    {currentRating ? 'Edit' : 'Rate'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;