import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, MousePointerClick, Calendar, Link2, AlertCircle } from 'lucide-react';
import { useGetLinkStatsQuery } from '../../store/api/linksApi';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import toastService from '../../utils/toast';

const LinkStats = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useGetLinkStatsQuery(code);

  const link = data?.data;

  const copyToClipboard = () => {
    const url = `${import.meta.env.VITE_API_SHORT_URL}/${code}`;
    navigator.clipboard.writeText(url);
    toastService.success('Link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader size="lg" text="Loading link stats..." />
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <Card className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text mb-2">Link Not Found</h2>
            <p className="text-text-light mb-6">
              {error?.status === 404 
                ? 'This link does not exist or you do not have access to it.'
                : 'Failed to load link stats. Please try again.'}
            </p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-text">Link Statistics</h1>
          </div>
          <p className="text-text-light">Detailed analytics for your short link</p>
        </div>

        {/* Short Code Card */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-text-light text-sm mb-2">Short Code</p>
              <code className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-mono text-xl font-bold inline-block">
                {link.short_code}
              </code>
            </div>
            <Button variant="primary" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <MousePointerClick className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-text-light text-sm mb-1">Total Clicks</p>
                <p className="text-4xl font-bold text-text">{link.total_clicks}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-violet/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-violet" />
              </div>
              <div>
                <p className="text-text-light text-sm mb-1">Last Clicked</p>
                <p className="text-lg font-semibold text-text">
                  {link.last_clicked ? new Date(link.last_clicked).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Target URL Card */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">Target URL</h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors break-all group"
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <span className="group-hover:underline">{link.url}</span>
          </a>
        </Card>

        {/* Details Card */}
        <Card>
          <h3 className="text-lg font-semibold text-text mb-4">Link Details</h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between py-3 border-b border-border">
              <span className="text-text-light">Created At</span>
              <span className="text-text font-medium text-right">
                {formatDate(link.created_at)}
              </span>
            </div>
            
            <div className="flex items-start justify-between py-3 border-b border-border">
              <span className="text-text-light">Last Clicked</span>
              <span className="text-text font-medium text-right">
                {formatDate(link.last_clicked)}
              </span>
            </div>

            {link.username && (
              <div className="flex items-start justify-between py-3 border-b border-border">
                <span className="text-text-light">Created By</span>
                <span className="text-text font-medium">{link.username}</span>
              </div>
            )}

            <div className="flex items-start justify-between py-3">
              <span className="text-text-light">Link ID</span>
              <span className="text-text font-medium font-mono">#{link.id}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LinkStats;