'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const assignments = [
  {
    id: 1,
    title: 'Algebra Problem Set',
    description: 'Complete this mathematics assignment by Feb 15, 2025',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Feb 15, 2025',
    points: '100 pts',
    daysLeft: -257,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Essay on Climate Change',
    description: 'Complete this science assignment by Feb 18, 2025',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Feb 18, 2025',
    points: '150 pts',
    daysLeft: -254,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Geometry Proofs',
    description: 'Complete this mathematics assignment by Feb 14, 2025',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Feb 14, 2025',
    points: '75 pts',
    daysLeft: -258,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Lab Report: Chemical Reactions',
    description: 'Complete this science assignment by Feb 22, 2025',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Feb 22, 2025',
    points: '100 pts',
    daysLeft: -250,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Calculus Derivatives',
    description: 'Complete this mathematics assignment by Oct 28, 2025',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Oct 28, 2025',
    points: '120 pts',
    daysLeft: -2,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Persuasive Essay',
    description: 'Complete this english assignment by Feb 17, 2025',
    subject: 'English',
    teacher: 'Mrs. Davis',
    dueDate: 'Feb 17, 2025',
    points: '150 pts',
    daysLeft: -255,
    iconBg: 'bg-purple-100',
    status: 'pending',
  },
  {
    id: 7,
    title: 'Current Events Report',
    description: 'Complete this social studies assignment by Jan 15, 2025',
    subject: 'Social Studies',
    teacher: 'Mr. Wilson',
    dueDate: 'Jan 15, 2025',
    points: '50 pts',
    daysLeft: -288,
    iconBg: 'bg-amber-100',
    status: 'pending',
  },
  {
    id: 8,
    title: 'Physics Problem Set',
    description: 'Complete this science assignment by Jan 5, 2025',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Jan 5, 2025',
    points: '100 pts',
    daysLeft: -298,
    iconBg: 'bg-blue-100',
    status: 'pending',
  },
  {
    id: 9,
    title: 'Reading Comprehension Quiz',
    description: 'Your submission is being reviewed by your teacher',
    subject: 'English',
    teacher: 'Mrs. Davis',
    dueDate: 'Oct 20, 2025',
    points: '50 pts',
    daysLeft: 0,
    iconBg: 'bg-blue-100',
    status: 'submitted',
  },
  {
    id: 10,
    title: 'Civil War Timeline',
    description: 'Your submission is being reviewed by your teacher',
    subject: 'History',
    teacher: 'Dr. Brown',
    dueDate: 'Oct 15, 2025',
    points: '100 pts',
    daysLeft: 0,
    iconBg: 'bg-blue-100',
    status: 'submitted',
  },
  {
    id: 11,
    title: 'History Essay',
    description: 'Completed with a score of 95/100 points',
    subject: 'History',
    teacher: 'Dr. Brown',
    dueDate: 'Oct 10, 2025',
    points: '100 pts',
    grade: '95/100 points',
    daysLeft: 0,
    iconBg: 'bg-blue-100',
    status: 'completed',
  },
];

export default function Assignments() {
  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'completed'>('pending');

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.status === activeTab
  );

  const pendingCount = assignments.filter((a) => a.status === 'pending').length;
  const submittedCount = assignments.filter((a) => a.status === 'submitted').length;
  const completedCount = assignments.filter((a) => a.status === 'completed').length;
  const activeCount = assignments.filter((a) => a.status === 'pending').length;

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return (
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'Science':
        return (
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'English':
        return (
          <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'Social Studies':
      case 'History':
        return (
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Assignments</h1>
              <p className="text-gray-600 mt-1">Track your progress and complete assignments on time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium text-gray-700">{activeCount} Active</span>
              </div>
              <Link
                href="/student/assignments/generate"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Create AI Practice
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'pending'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'submitted'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Submitted ({submittedCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'completed'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${assignment.iconBg} rounded-xl flex items-center justify-center`}>
                    {getSubjectIcon(assignment.subject)}
                  </div>
                  {assignment.status === 'pending' && (
                    <span className="px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
                      Active
                    </span>
                  )}
                  {assignment.status === 'submitted' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Submitted
                    </span>
                  )}
                  {assignment.status === 'completed' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {assignment.description}
                </p>

                {/* Details List */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="mr-2">•</span>
                    <span><strong>Subject:</strong> {assignment.subject}</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="mr-2">•</span>
                    <span><strong>Teacher:</strong> {assignment.teacher}</span>
                  </li>
                  {assignment.status === 'pending' && (
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="mr-2">•</span>
                      <span><strong>Due in {assignment.daysLeft} days (Urgent!)</strong></span>
                    </li>
                  )}
                  {assignment.status === 'submitted' && (
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="mr-2">•</span>
                      <span><strong>Awaiting grade</strong></span>
                    </li>
                  )}
                  {assignment.status === 'completed' && assignment.grade && (
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="mr-2">•</span>
                      <span><strong>Graded: {assignment.grade}</strong></span>
                    </li>
                  )}
                </ul>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  <Link
                    href={`/student/assignments/${assignment.id}`}
                    className="flex-1 text-center bg-white text-gray-700 px-4 py-2.5 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/student/assignments/${assignment.id}`}
                    className="flex-1 text-center bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    {assignment.status === 'pending' ? 'Start Now' : assignment.status === 'completed' ? 'Review' : 'View'}
                  </Link>
                </div>

                {/* Due Soon Warning */}
                {assignment.status === 'pending' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-red-600">
                      Due soon - Complete now!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
              <p className="text-gray-500">No assignments in this category</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
