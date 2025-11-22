import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Card from '../../components/Card';

const HealthCheck = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:3000'}/healthz`);
        const data = await response.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Activity className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-text">Health Check</h1>
          </div>

          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-text-light">Checking server health...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <XCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-2xl font-bold text-red-500">Server Offline</h2>
              <p className="text-text-light">{error}</p>
            </div>
          ) : health?.ok ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold text-green-500">Server Online</h2>
              <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                <pre className="text-text-light text-left">
                  {JSON.stringify(health, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8">
              <XCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-2xl font-bold text-red-500">Health Check Failed</h2>
              <p className="text-text-light">Unexpected response from server</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthCheck;
