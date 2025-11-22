import React, { useState } from 'react';
import { Plus, Search, Link2 } from 'lucide-react';
import { useGetAllLinksQuery } from '../../store/api/linksApi';
import AddLinkForm from '../../components/AddLinkForm';
import LinksTable from '../../components/LinksTable';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useGetAllLinksQuery();

  const links = data?.data || [];

  // Filter links based on search
  const filteredLinks = links.filter(link =>
    link.short_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-text">TinyLink Dashboard</h1>
          </div>
          <p className="text-text-light">Manage your shortened links</p>
        </div>

        {/* Add Link Form */}
        {showAddForm && (
          <div className="mb-6">
            <AddLinkForm
              onClose={() => setShowAddForm(false)}
              onSuccess={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Actions Bar */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by code or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-border bg-background text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-text-light/50"
              />
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add New Link
            </Button>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-light text-sm mb-1">Total Links</p>
                <p className="text-3xl font-bold text-text">{links.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-light text-sm mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-text">
                  {links.reduce((sum, link) => sum + link.total_clicks, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-light text-sm mb-1">Active Links</p>
                <p className="text-3xl font-bold text-text">
                  {links.filter(link => link.total_clicks > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Links Table */}
        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-text">Your Links</h2>
            <p className="text-text-light text-sm">
              {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} found
            </p>
          </div>

          {isLoading ? (
            <Loader size="lg" text="Loading links..." />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load links</p>
              <p className="text-text-light text-sm mt-2">{error.data?.message || 'Please try again'}</p>
            </div>
          ) : (
            <LinksTable links={filteredLinks} isLoading={isLoading} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;