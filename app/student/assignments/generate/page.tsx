'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function GeneratePractice() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'topic' | 'skill' | 'custom'>('topic');
  const [formData, setFormData] = useState({
    gradeLevel: '',
    subject: '',
    topic: '',
    difficulty: 'Medium',
    questions: 5,
    skill: '',
    practiceType: 'Progressive (Starts easy)',
    customDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gradeLevel || !formData.subject || !formData.topic) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Practice assignment generated! Redirecting to assignments...');
    router.push('/student/assignments');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/student/assignments')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Assignments
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h1 className="text-4xl font-bold text-gray-900">AI Practice Generator</h1>
            </div>
            <p className="text-gray-600">Create personalized practice assignments tailored to your learning needs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to practice?</h2>
              <p className="text-gray-600 mb-6">Choose how you'd like to generate your practice</p>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('topic')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'topic'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Topic
                </button>
                <button
                  onClick={() => setActiveTab('skill')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'skill'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Skill
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'custom'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Custom
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Grade Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Grade Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                {/* Topic Tab Content */}
                {activeTab === 'topic' && (
                  <>
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        required
                      >
                        <option value="">Select subject</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="history">History</option>
                        <option value="social-studies">Social Studies</option>
                      </select>
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        What topic do you want to practice? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        placeholder="e.g., Quadratic Equations, Photosynthesis"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Difficulty and Questions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={formData.difficulty}
                          onChange={(e) => handleInputChange('difficulty', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Questions
                        </label>
                        <input
                          type="number"
                          value={formData.questions}
                          onChange={(e) => handleInputChange('questions', parseInt(e.target.value))}
                          min="1"
                          max="20"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Skill Tab Content */}
                {activeTab === 'skill' && (
                  <>
                    {/* Skill Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        What skill do you want to improve? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.skill}
                        onChange={(e) => handleInputChange('skill', e.target.value)}
                        placeholder="e.g., Factoring polynomials"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Practice Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Practice Type
                      </label>
                      <select
                        value={formData.practiceType}
                        onChange={(e) => handleInputChange('practiceType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="Progressive (Starts easy)">Progressive (Starts easy)</option>
                        <option value="Mixed difficulty">Mixed difficulty</option>
                        <option value="Challenge mode">Challenge mode</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Custom Tab Content */}
                {activeTab === 'custom' && (
                  <>
                    {/* Custom Description */}
                    <div>
                      <label className="block text-lg font-medium text-gray-900 mb-2">
                        Describe what you want to learn
                      </label>
                      <textarea
                        value={formData.customDescription}
                        onChange={(e) => handleInputChange('customDescription', e.target.value)}
                        placeholder="e.g., I want to practice writing persuasive essays about environmental topics..."
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Generate Practice Assignment
                </button>
              </form>

              {/* How It Works Section */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Choose Your Focus</h4>
                      <p className="text-sm text-gray-600">Select a topic, skill, or describe what you want to learn</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">AI Creates Custom Practice</h4>
                      <p className="text-sm text-gray-600">AI generates personalized questions just for you</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Practice & Get Feedback</h4>
                      <p className="text-sm text-gray-600">Complete and receive instant AI feedback</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Practice Assignment</h2>
              <p className="text-gray-600 mb-8">Review your AI-generated practice</p>

              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Practice?</h3>
                <p className="text-gray-600 max-w-sm">
                  Fill in your preferences and generate a personalized practice assignment
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
