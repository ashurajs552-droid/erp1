'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function TestPrepCoach() {
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const topics = gradeLevel ? ['SAT Prep', 'ACT Prep', 'AP Exams', 'Subject Tests', 'Finals Prep', 'Midterms Prep'] : [];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.push('/student/assistants')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Assistants
          </button>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-teal-600">Test Prep Coach</h1>
              <p className="text-gray-600">Prepare for standardized tests and major exams</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Topic</h2>
            <p className="text-gray-600 mb-6">Select what you need help with to get started with personalized assistance</p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Grade Level <span className="text-red-500">*</span></label>
              <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select your grade</option>
                {[...Array(12)].map((_, i) => (<option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>))}
                <option value="College">College</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">This helps the AI provide age-appropriate explanations and examples</p>
            </div>
            {!gradeLevel ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <p className="text-gray-500">Please select your grade level to see appropriate topics</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {topics.map((topic) => (
                  <button key={topic} onClick={() => setSelectedTopic(topic)} className={`p-4 border-2 rounded-lg text-left transition-all ${selectedTopic === topic ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <p className="font-medium text-gray-900">{topic}</p>
                  </button>
                ))}
              </div>
            )}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span className="text-xl">+</span>Other Topic
            </button>
            {selectedTopic && (
              <button onClick={() => router.push('/student/ai-tutor')} className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Start Session with {selectedTopic}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
