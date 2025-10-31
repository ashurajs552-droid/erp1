'use client';

import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';

const categories = ['All Tools', 'Practice', 'Problem Solving', 'Study', 'Reading', 'Language', 'Writing', 'Learning', 'Creative', 'Favorites'];

const getIconBgColor = (color: string) => {
  const colorMap: { [key: string]: string } = {
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    pink: 'bg-pink-600',
    blue: 'bg-blue-600',
    orange: 'bg-orange-600',
    teal: 'bg-teal-600',
    red: 'bg-red-600',
  };
  return colorMap[color] || 'bg-purple-600';
};

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId) 
        : [...prev, toolId]
    );
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Tools' || 
                           tool.categories.includes(selectedCategory) ||
                           (selectedCategory === 'Favorites' && favorites.includes(tool.id));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Student Tools</h1>
            <p className="text-gray-600">Powerful AI tools to enhance your learning and productivity</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-700 font-medium">Filter:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? category === 'All Tools'
                        ? 'bg-blue-600 text-white'
                        : 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'Favorites' && (
                    <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/student/tools/${tool.id}`}
                className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all relative"
              >
                {/* Favorite Icon */}
                <button
                  onClick={(e) => toggleFavorite(tool.id, e)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 transition-colors z-10"
                >
                  <svg 
                    className={`w-5 h-5 ${favorites.includes(tool.id) ? 'fill-yellow-500 text-yellow-500' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>

                {/* Tool Icon */}
                <div className={`${getIconBgColor(tool.color)} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                  {tool.icon}
                </div>

                {/* Tool Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 pr-6">{tool.name}</h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                
                {/* Category Tag */}
                <div className="mb-4">
                  {tool.categories.length > 0 && (
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
                      {tool.categories[0]}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600">
                      <svg className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
