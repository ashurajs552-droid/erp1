'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function Assistants() {
  const router = useRouter();

  const handleAssistantClick = (assistantName: string) => {
    // Navigate to specific assistant page
    const routeMap: { [key: string]: string } = {
      'Math Tutor': '/student/assistants/math-tutor',
      'Science Helper': '/student/assistants/science-helper',
      'Writing Coach': '/student/assistants/writing-coach',
      'History Guide': '/student/assistants/history-guide',
      'Language Tutor': '/student/assistants/language-tutor',
      'Coding Mentor': '/student/assistants/coding-mentor',
      'Test Prep Coach': '/student/assistants/test-prep-coach',
      'Homework Helper': '/student/assistants/homework-helper',
    };
    router.push(routeMap[assistantName] || '/student/ai-tutor');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">AI Assistants</h1>
            <p className="text-gray-600">Choose a specialized AI tutor to help you with your studies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Math Tutor */}
            <div 
              onClick={() => handleAssistantClick('Math Tutor')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Math Tutor</h3>
              <p className="text-gray-600 text-sm mb-4">Expert help with algebra, geometry, calculus and...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Algebra</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Geometry</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Calculus</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">+1</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Step-by-step solutions</p>
                  <p className="text-xs text-gray-600">✓ Practice problems</p>
                </div>
              </div>
            </div>

            {/* Science Helper */}
            <div 
              onClick={() => handleAssistantClick('Science Helper')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Science Helper</h3>
              <p className="text-gray-600 text-sm mb-4">Assistance with biology, chemistry, physics, and...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Biology</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Chemistry</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Physics</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">+1</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Concept explanations</p>
                  <p className="text-xs text-gray-600">✓ Lab report help</p>
                </div>
              </div>
            </div>

            {/* Writing Coach */}
            <div 
              onClick={() => handleAssistantClick('Writing Coach')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Writing Coach</h3>
              <p className="text-gray-600 text-sm mb-4">Improve your essays, reports, and creative...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● English</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Literature</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Creative Writing</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Essay feedback</p>
                  <p className="text-xs text-gray-600">✓ Grammar help</p>
                </div>
              </div>
            </div>

            {/* History Guide */}
            <div 
              onClick={() => handleAssistantClick('History Guide')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">History Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Explore world history, US history, and social stud...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● World History</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● US History</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Government</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Timeline creation</p>
                  <p className="text-xs text-gray-600">✓ Event analysis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Additional Assistants */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Language Tutor */}
            <div 
              onClick={() => handleAssistantClick('Language Tutor')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Language Tutor</h3>
              <p className="text-gray-600 text-sm mb-4">Learn Spanish, French, German, and other...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Spanish</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● French</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● German</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">+1</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Vocabulary building</p>
                  <p className="text-xs text-gray-600">✓ Conversation practice</p>
                </div>
              </div>
            </div>

            {/* Coding Mentor */}
            <div 
              onClick={() => handleAssistantClick('Coding Mentor')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coding Mentor</h3>
              <p className="text-gray-600 text-sm mb-4">Learn programming, web development, and...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Python</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● JavaScript</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Web Dev</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">+1</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Code debugging</p>
                  <p className="text-xs text-gray-600">✓ Project guidance</p>
                </div>
              </div>
            </div>

            {/* Test Prep Coach */}
            <div 
              onClick={() => handleAssistantClick('Test Prep Coach')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Test Prep Coach</h3>
              <p className="text-gray-600 text-sm mb-4">Prepare for standardized tests and major exams</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● SAT</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● ACT</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● AP Exams</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">+1</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Practice questions</p>
                  <p className="text-xs text-gray-600">✓ Strategy coaching</p>
                </div>
              </div>
            </div>

            {/* Homework Helper */}
            <div 
              onClick={() => handleAssistantClick('Homework Helper')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Homework Helper</h3>
              <p className="text-gray-600 text-sm mb-4">General homework assistance across all...</p>
              
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● All Subjects</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Study Skills</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">● Organization</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Capabilities:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">✓ Multi-subject help</p>
                  <p className="text-xs text-gray-600">✓ Assignment planning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
