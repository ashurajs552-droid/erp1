'use client';

import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function HomeworkHelp() {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [taskType, setTaskType] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickAction = async (actionType: string, actionData?: string) => {
    let prompt = '';
    
    if (actionData) {
      prompt = actionData;
    } else {
      switch (actionType) {
        case 'explain-concept':
          prompt = 'Explain this concept';
          break;
        case 'show-example':
          prompt = 'Show me an example';
          break;
        case 'break-down':
          prompt = 'Break it down simpler';
          break;
        case 'give-hint':
          prompt = 'Give me a hint';
          break;
        case 'next-step':
          prompt = 'Show next step';
          break;
        case 'check-work':
          prompt = 'Check my work';
          break;
        case 'practice-problem':
          prompt = 'Practice problem';
          break;
        case 'common-mistakes':
          prompt = 'Common mistakes';
          break;
        case 'study-tips':
          prompt = 'Study tips';
          break;
        default:
          prompt = question;
      }
    }

    if (!prompt) {
      setQuestion(prompt);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tools/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          toolId: 'homework-help',
          params: { 
            details: prompt,
            subject,
            gradeLevel,
            topic,
            taskType,
          } 
        }),
      });
      const data = await res.json();
      if (res.ok && data.result) {
        setResponse(data.result);
      } else {
        setResponse('Unable to generate response. Please try again.');
      }
    } catch (e) {
      setResponse('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subj: string) => {
    setSubject(subj);
    setQuestion(`Help me with ${subj.toLowerCase()} homework`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-2 flex items-center gap-3">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              AI Homework Helper
            </h1>
            <p className="text-gray-600 text-lg">Powered by advanced AI • Step-by-step guidance to help you learn.</p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                Step-by-Step Solutions
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Image & OCR Support
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                All Subjects
              </span>
            </div>
          </div>

          {/* Two-column content (main + aside) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Learning Assistant Card */}
              <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI Learning Assistant</h2>
                    <p className="text-gray-700 mb-4">Ask questions, upload homework images, or get step-by-step explanations.</p>
                  </div>
                </div>
              </div>

              {/* Ready to help section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to help you learn!</h2>
                <p className="text-gray-600 mb-6">I'm your AI tutor, here to guide you through homework with step-by-step explanations.</p>
                {/* Subject Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Math', icon: '🔢', color: 'blue' },
                    { name: 'Science', icon: '🧪', color: 'green' },
                    { name: 'English', icon: '📖', color: 'purple' },
                    { name: 'History', icon: '🕐', color: 'orange' },
                  ].map((subj) => (
                    <button
                      key={subj.name}
                      onClick={() => handleSubjectClick(subj.name)}
                      className={`p-6 bg-white border-2 rounded-xl hover:border-${subj.color}-300 transition-all ${subject === subj.name ? `border-${subj.color}-500` : 'border-gray-200'}`}
                    >
                      <div className="text-4xl mb-2">{subj.icon}</div>
                      <div className="font-semibold text-gray-900">{subj.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions + Input */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">QUICK ACTIONS</h2>
                <div className="flex gap-4 mb-4">
                  <button 
                    onClick={() => handleQuickAction('upload-image')}
                    className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition-all"
                  >
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold text-gray-900">Upload Image</span>
                    <span className="text-gray-600">Snap your homework</span>
                  </button>
                  
                  <button 
                    onClick={() => handleQuickAction('ask-question')}
                    className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-pink-200 rounded-xl p-4 hover:border-pink-400 transition-all"
                  >
                    <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">Ask Question</span>
                    <span className="text-gray-600">Type your question</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleQuickAction('ask-question', question);
                      }
                    }}
                    placeholder="Ask your homework question..."
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors text-lg"
                  />
                  <button
                    onClick={() => handleQuickAction('ask-question', question)}
                    disabled={loading || !question}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Response Display */}
              {loading && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-4 text-gray-600">Generating helpful response...</span>
                  </div>
                </div>
              )}

              {response && !loading && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Response</h2>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(response);
                        alert('Response copied to clipboard!');
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
                    {response}
                  </div>
                </div>
              )}

              {/* Learning Philosophy */}
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Learning Philosophy</h2>
                    <ul className="space-y-2">
                      {[
                        'I guide you through problems step-by-step',
                        'I help you understand, not just get answers',
                        'I encourage you to try and learn from mistakes',
                        'I adapt to your learning level and pace',
                      ].map((principle, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                          <span className="text-gray-700">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Aside column */}
            <div className="space-y-6">
              {/* Homework Context */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900">Homework Context</h2>
                </div>
                <p className="text-gray-600 mb-4">Help me provide better guidance</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select subject</option>
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Geography">Geography</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select grade</option>
                      {['Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Algebra, Photosynthesis"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
                    <select
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select type</option>
                      <option value="Homework">Homework</option>
                      <option value="Practice">Practice</option>
                      <option value="Review">Review</option>
                      <option value="Study Guide">Study Guide</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Help (aside) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3L4 14v7h6v-6h6v6h6V3l-8 10"/>
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900">Quick Help</h2>
                </div>
                <p className="text-gray-600 mb-4">Common requests</p>
                <div className="space-y-4">
                  {[
                    {
                      category: 'Understanding',
                      items: [
                        { id: 'explain-concept', icon: '💡', text: 'Explain this concept' },
                        { id: 'show-example', icon: '📄', text: 'Show me an example' },
                        { id: 'break-down', icon: '🔍', text: 'Break it down simpler' },
                      ]
                    },
                    {
                      category: 'Guidance',
                      items: [
                        { id: 'give-hint', icon: '🎯', text: 'Give me a hint' },
                        { id: 'next-step', icon: '➡️', text: 'Show next step' },
                        { id: 'check-work', icon: '✓', text: 'Check my work' },
                      ]
                    },
                    {
                      category: 'Practice',
                      items: [
                        { id: 'practice-problem', icon: '✏️', text: 'Practice problem' },
                        { id: 'common-mistakes', icon: '❗', text: 'Common mistakes' },
                        { id: 'study-tips', icon: '📚', text: 'Study tips' },
                      ]
                    },
                  ].map((cat) => (
                    <div key={cat.category}>
                      <h3 className="font-bold text-gray-900 mb-2">{cat.category}:</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleQuickAction(item.id)}
                            disabled={loading}
                            className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-sm font-medium text-gray-900">{item.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Learning Philosophy</h2>
                <ul className="space-y-2">
                  {[
                    'I guide you through problems step-by-step',
                    'I help you understand, not just get answers',
                    'I encourage you to try and learn from mistakes',
                    'I adapt to your learning level and pace',
                  ].map((principle, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <span className="text-gray-700">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Response Display */}
          {loading && (
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-4 text-gray-600">Generating helpful response...</span>
              </div>
            </div>
          )}

          {response && !loading && (
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Response</h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                    alert('Response copied to clipboard!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
                {response}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
