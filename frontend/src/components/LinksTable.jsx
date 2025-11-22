import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Trash2, ExternalLink, Calendar, MousePointerClick, BarChart3 } from 'lucide-react';
import Button from './Button';
import { useDeleteLinkMutation } from '../store/api/linksApi';
import toastService from '../utils/toast';

const LinksTable = ({ links, isLoading }) => {
  const navigate = useNavigate();
  const [deleteLink, { isLoading: isDeleting }] = useDeleteLinkMutation();
  const [deletingId, setDeletingId] = useState(null);

  const copyToClipboard = (code) => {
    const url = `${import.meta.env.VITE_API_SHORT_URL}/${code}`;
    navigator.clipboard.writeText(url);
    toastService.success('Link copied to clipboard!');
  };

  const viewStats = (code) => {
    navigate(`/stats/${code}`);
  };

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    setDeletingId(code);
    try {
      await deleteLink(code).unwrap();
      toastService.success('Link deleted successfully');
    } catch (error) {
      toastService.error(error.data?.message || 'Failed to delete link');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-border rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!links || links.length === 0) {
    return (
      <div className="text-center py-12">
        <ExternalLink className="w-16 h-16 text-text-light/30 mx-auto mb-4" />
        <p className="text-text-light text-lg">No links yet</p>
        <p className="text-text-light/70 text-sm mt-2">Create your first short link to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-4 px-4 text-sm font-semibold text-text">Short Code</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text">Target URL</th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-text">Clicks</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text">Last Clicked</th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-text">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-b border-border hover:bg-border/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <code className="bg-primary/10 text-primary px-3 py-1 rounded-md font-mono text-sm font-semibold">
                      {link.short_code}
                    </code>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light hover:text-primary transition-colors flex items-center gap-1 group"
                    title={link.url}
                  >
                    <span className="truncate max-w-md">{truncateUrl(link.url)}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MousePointerClick className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-text">{link.total_clicks}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-text-light text-sm">
                    <Calendar className="w-4 h-4" />
                    {formatDate(link.last_clicked)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => viewStats(link.short_code)}
                      title="View stats"
                      className="text-primary hover:bg-primary/10"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(link.short_code)}
                      title="Copy link"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(link.short_code)}
                      loading={deletingId === link.short_code}
                      disabled={isDeleting}
                      title="Delete link"
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {links.map((link) => (
          <div key={link.id} className="bg-background-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <code className="bg-primary/10 text-primary px-3 py-1 rounded-md font-mono text-sm font-semibold">
                {link.short_code}
              </code>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => viewStats(link.short_code)}
                  className="text-primary"
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(link.short_code)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(link.short_code)}
                  loading={deletingId === link.short_code}
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors text-sm block truncate"
            >
              {link.url}
            </a>
            
            <div className="flex items-center justify-between text-sm text-text-light pt-2 border-t border-border">
              <div className="flex items-center gap-1">
                <MousePointerClick className="w-4 h-4" />
                <span>{link.total_clicks} clicks</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(link.last_clicked)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksTable;
