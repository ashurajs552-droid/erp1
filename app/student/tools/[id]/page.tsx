'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { getToolById } from '@/lib/tools-data';

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

export default function ToolDetail() {
  const params = useParams();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 6');
  const [subjectType, setSubjectType] = useState('Science');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const toolId = params.id as string;
  const tool = getToolById(toolId);

  if (!tool) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xl text-gray-600">Tool not found</p>
          </div>
        </main>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter your input before generating.');
      return;
    }
    
    setLoading(true);

    const params: Record<string, unknown> = { details: input };
    if (toolId === 'worksheet-generator') {
      params.subjectDetails = input;
      params.gradeLevel = gradeLevel;
      params.subjectType = subjectType;
    }

    try {
      const res = await fetch('/api/tools/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, params }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Generation failed');
      setResult(data.result as string);
    } catch (e: unknown) {
      setResult('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/student/tools')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className={`${getIconBgColor(tool.color)} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl flex-shrink-0`}>
              {tool.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600">{tool.description}</p>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tool.categories.map((cat) => (
                  <span 
                    key={cat}
                    className="px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
              
              {/* Instructions */}
              {tool.instruction && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                  <p className="text-gray-700 bg-purple-50 p-4 rounded-lg">
                    {tool.instruction}
                  </p>
                </div>
              )}

              {/* Examples */}
              {tool.examples && tool.examples.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Examples:</h3>
                  <ul className="space-y-2">
                    {tool.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              {toolId === 'worksheet-generator' ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="ws-details" className="block font-medium text-gray-900 mb-2">
                      Subject & Details *
                    </label>
                    <textarea
                      id="ws-details"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="e.g., The sun and the solar system"
                      className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Describe the topic and what you want to focus on</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-900 mb-2">Grade Level *</label>
                      <select
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {['Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-900 mb-2">Subject Type</label>
                      <select
                        value={subjectType}
                        onChange={(e) => setSubjectType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {['Science','Math','English','History','Geography','Computer Science'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="input" className="block font-medium text-gray-900 mb-2">
                    Enter your {tool.name.toLowerCase()} request:
                  </label>
                  <textarea
                    id="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your request here..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Result</h2>
              
              <div className="min-h-[400px]">
                {result ? (
                  <div className="bg-purple-50 p-4 rounded-lg whitespace-pre-wrap text-gray-800">
                    {result}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg">Generated results will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Copy Button */}
              {result && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    alert('Result copied to clipboard!');
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Result
                </button>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">School Ready</h3>
                  <p className="text-gray-600 text-sm">Made specifically for teachers and schools. Aligned with educational standards.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Limitations</h3>
                  <p className="text-gray-600 text-sm">AI may make mistakes. Review content before sharing. Provide clear prompts for best results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

