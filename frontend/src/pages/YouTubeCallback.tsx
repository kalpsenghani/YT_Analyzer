import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { apiClient } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const YouTubeCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { handleYouTubeCallback } = useAppStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Debug: Log all URL parameters
        console.log('URL Search Params:', searchParams.toString());
        console.log('All URL parameters:', Object.fromEntries(searchParams.entries()));
        
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        console.log('Authorization code:', code);
        console.log('Error parameter:', error);

        if (error) {
          setStatus('error');
          setMessage('YouTube authorization was cancelled or failed.');
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received from YouTube.');
          return;
        }

        console.log('Sending code to backend:', code);

        // Check if user is authenticated
        const token = apiClient.getToken();
        console.log('Authentication token:', token ? 'Present' : 'Missing');

        // Send the code to our backend
        const response = await apiClient.handleYouTubeCallback(code);
        
        console.log('Backend response:', response);
        
        if (response.success) {
          setStatus('success');
          setMessage(`Successfully connected ${response.channels?.length || 0} YouTube channel(s)!`);
          
          // Redirect to analytics after a short delay
          setTimeout(() => {
            navigate('/analytics', { replace: true });
          }, 2000);
        } else {
          setStatus('error');
          setMessage(response.message || 'Failed to connect YouTube account.');
        }
      } catch (error: any) {
        console.error('YouTube callback error:', error);
        setStatus('error');
        setMessage(error.message || 'An unexpected error occurred.');
      }
    };

    handleCallback();
  }, [searchParams, navigate, handleYouTubeCallback]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'loading':
        return 'Connecting to YouTube...';
      case 'success':
        return 'YouTube Connected Successfully!';
      case 'error':
        return 'Connection Failed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-xl">{getStatusTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{message}</p>
          
          {status === 'loading' && (
            <p className="text-sm text-gray-500">
              Please wait while we connect your YouTube account...
            </p>
          )}
          
          {status === 'error' && (
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/analytics', { replace: true })}
                className="w-full"
              >
                Go to Analytics
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}
          
          {status === 'success' && (
            <p className="text-sm text-green-600">
              Successfully connected! Redirecting to Analytics page...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeCallback; 