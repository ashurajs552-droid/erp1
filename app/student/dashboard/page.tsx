import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Sidebar from '@/components/Sidebar';

export default function StudentDashboard() {
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/auth/login');
      }
    };
    void check();
  }, [router]);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your AI-powered learning overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Assignments Due</h3>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-900">3</p>
              <p className="text-sm text-gray-500 mt-1">This week</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Average Grade</h3>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-900">92%</p>
              <p className="text-sm text-gray-500 mt-1">+2% from last month</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-green-600">95%</p>
              <p className="text-sm text-gray-500 mt-1">On-time submissions</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Study Streak</h3>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-900">7 days</p>
              <p className="text-sm text-gray-500 mt-1">Keep it up!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Assignments</h2>
                  <p className="text-gray-600">Your next deadlines</p>
                </div>
                <Link
                  href="/student/assignments"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                <Link href="/student/assignments/1" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Algebra Problem Set</h3>
                      <p className="text-sm text-gray-600 mb-2">Mathematics</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Due: Feb 15, 2025
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">100 pts</span>
                  </div>
                </Link>

                <Link href="/student/assignments/2" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Essay on Climate Change</h3>
                      <p className="text-sm text-gray-600 mb-2">Science</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Due: Feb 18, 2025
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">150 pts</span>
                  </div>
                </Link>

                <Link href="/student/assignments/3" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Reading Comprehension Quiz</h3>
                      <p className="text-sm text-gray-600 mb-2">English</p>
                    </div>
                    <span className="text-blue-600 font-medium">50 pts</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Grades</h2>
                  <p className="text-gray-600">Your latest scores</p>
                </div>
                <Link
                  href="/student/grades"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">History Essay</h3>
                      <p className="text-sm text-gray-600">History</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">92/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">92%</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Physics Lab Report</h3>
                      <p className="text-sm text-gray-600">Science</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">88/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">88%</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Spanish Vocabulary Test</h3>
                      <p className="text-sm text-gray-600">Spanish</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">95/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">95%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Learning Assistants */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <span className="mr-2">✨</span> AI Learning Assistants
              </h2>
              <p className="text-gray-600 mb-6">Get personalized help with your studies</p>
              
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/student/ai-tutor"
                  className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                >
                  <svg className="w-8 h-8 text-purple-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">AI Tutor</span>
                </Link>

                <Link
                  href="/student/homework-help"
                  className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                >
                  <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Quiz Helper</span>
                </Link>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Progress</h2>
              <p className="text-gray-600 mb-6">Your learning journey</p>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Mathematics</span>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
