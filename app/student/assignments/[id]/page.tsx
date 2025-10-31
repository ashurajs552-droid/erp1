'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

// Sample assignment data (in real app, this would come from API/database)
const assignmentData: Record<string, any> = {
  '1': {
    title: 'Algebra Problem Set',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Feb 15, 2025',
    points: 100,
    instructions: 'Solve each problem step by step. Show your work for partial credit. You can either type your answers or upload a photo of your handwritten work.',
    questions: [
      { id: 1, text: 'Solve for x: 2x + 5 = 15', points: 25 },
      { id: 2, text: 'Simplify: (3x² + 2x - 1) - (x² - 4x + 3)', points: 25 },
      { id: 3, text: 'Factor: x² - 9', points: 25 },
      { id: 4, text: 'Solve the system: x + y = 10, 2x - y = 5', points: 25 },
    ],
  },
  '2': {
    title: 'Essay on Climate Change',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Feb 18, 2025',
    points: 150,
    instructions: 'Write a comprehensive essay about climate change. Include causes, effects, and potential solutions. Minimum 500 words.',
    questions: [
      { id: 1, text: 'What are the main causes of climate change?', points: 50 },
      { id: 2, text: 'Describe the environmental impacts of climate change', points: 50 },
      { id: 3, text: 'Propose solutions to mitigate climate change', points: 50 },
    ],
  },
  '3': {
    title: 'Geometry Proofs',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Feb 14, 2025',
    points: 75,
    instructions: 'Complete the geometric proofs using proper theorem citations and logical reasoning.',
    questions: [
      { id: 1, text: 'Prove that the angles in a triangle sum to 180°', points: 25 },
      { id: 2, text: 'Prove the Pythagorean theorem', points: 25 },
      { id: 3, text: 'Prove that vertical angles are congruent', points: 25 },
    ],
  },
  '4': {
    title: 'Lab Report: Chemical Reactions',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Feb 22, 2025',
    points: 100,
    instructions: 'Document your lab experiment observations and conclusions. Include hypothesis, procedure, results, and analysis.',
    questions: [
      { id: 1, text: 'State your hypothesis', points: 20 },
      { id: 2, text: 'Describe the experimental procedure', points: 30 },
      { id: 3, text: 'Record your observations and data', points: 30 },
      { id: 4, text: 'Analyze results and draw conclusions', points: 20 },
    ],
  },
  '5': {
    title: 'Calculus Derivatives',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    dueDate: 'Oct 28, 2025',
    points: 120,
    instructions: 'Find the derivatives of the given functions. Show all steps clearly.',
    questions: [
      { id: 1, text: 'Find dy/dx for y = 3x² + 2x - 5', points: 30 },
      { id: 2, text: 'Find dy/dx for y = sin(x) + cos(x)', points: 30 },
      { id: 3, text: 'Find dy/dx for y = e^x · ln(x)', points: 30 },
      { id: 4, text: 'Find the derivative using chain rule: y = (x² + 1)³', points: 30 },
    ],
  },
  '6': {
    title: 'Persuasive Essay',
    subject: 'English',
    teacher: 'Mrs. Davis',
    dueDate: 'Feb 17, 2025',
    points: 150,
    instructions: 'Write a persuasive essay on a topic of your choice. Use proper structure with introduction, body paragraphs, and conclusion.',
    questions: [
      { id: 1, text: 'Introduction with clear thesis statement', points: 50 },
      { id: 2, text: 'Body paragraphs with supporting evidence', points: 70 },
      { id: 3, text: 'Conclusion that reinforces your argument', points: 30 },
    ],
  },
  '7': {
    title: 'Current Events Report',
    subject: 'Social Studies',
    teacher: 'Mr. Wilson',
    dueDate: 'Jan 15, 2025',
    points: 50,
    instructions: 'Research and report on a current event. Include summary, analysis, and your perspective.',
    questions: [
      { id: 1, text: 'Summarize the current event', points: 15 },
      { id: 2, text: 'Analyze the implications and importance', points: 20 },
      { id: 3, text: 'Share your perspective and conclusion', points: 15 },
    ],
  },
  '8': {
    title: 'Physics Problem Set',
    subject: 'Science',
    teacher: 'Mr. Smith',
    dueDate: 'Jan 5, 2025',
    points: 100,
    instructions: 'Solve the physics problems showing all calculations and units.',
    questions: [
      { id: 1, text: 'Calculate velocity: v = d/t, where d = 100m, t = 5s', points: 25 },
      { id: 2, text: 'Find acceleration: a = (vf - vi)/t, where vf = 20m/s, vi = 5m/s, t = 3s', points: 25 },
      { id: 3, text: 'Calculate force: F = ma, where m = 10kg, a = 5m/s²', points: 25 },
      { id: 4, text: 'Find kinetic energy: KE = ½mv², where m = 2kg, v = 10m/s', points: 25 },
    ],
  },
  '9': {
    title: 'Reading Comprehension Quiz',
    subject: 'English',
    teacher: 'Mrs. Davis',
    dueDate: 'Feb 20, 2025',
    points: 50,
    instructions: 'Read the passage provided and answer the following questions based on your understanding.',
    questions: [
      { id: 1, text: 'What is the main theme of the passage?', points: 10 },
      { id: 2, text: "Identify the protagonist's motivation", points: 15 },
      { id: 3, text: 'What literary device is used in paragraph 3?', points: 10 },
      { id: 4, text: 'Summarize the passage in 2-3 sentences', points: 15 },
    ],
  },
  '10': {
    title: 'Civil War Timeline',
    subject: 'History',
    teacher: 'Dr. Brown',
    dueDate: 'Oct 15, 2025',
    points: 100,
    instructions: 'Create a detailed timeline of major events during the Civil War. Include dates, key figures, and significance of each event.',
    questions: [
      { id: 1, text: 'List 5 major battles with dates and outcomes', points: 30 },
      { id: 2, text: 'Identify key political figures and their roles', points: 25 },
      { id: 3, text: 'Describe turning points in the war', points: 25 },
      { id: 4, text: 'Explain the impact of the Emancipation Proclamation', points: 20 },
    ],
  },
  '11': {
    title: 'History Essay',
    subject: 'History',
    teacher: 'Dr. Brown',
    dueDate: 'Oct 10, 2025',
    points: 100,
    grade: '95/100 points',
    instructions: 'Write a comprehensive essay about a significant historical event. Include causes, key figures, and lasting impact.',
    questions: [
      { id: 1, text: 'Describe the causes leading to the event', points: 25 },
      { id: 2, text: 'Identify key figures and their roles', points: 25 },
      { id: 3, text: 'Analyze the immediate outcomes', points: 25 },
      { id: 4, text: 'Discuss the long-term historical impact', points: 25 },
    ],
  },
};

export default function AssignmentDetail() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'type' | 'upload'>('type');
  const [answers, setAnswers] = useState('');

  const assignmentId = params.id as string;
  const assignment = assignmentData[assignmentId];

  if (!assignment) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <p>Assignment not found</p>
          </div>
        </main>
      </div>
    );
  }

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    if (!answers.trim()) {
      alert('Please enter your answers before submitting.');
      return;
    }
    alert('Assignment submitted successfully!');
    router.push('/student/assignments');
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
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {assignment.title}
              </h1>
              <p className="text-lg text-gray-600">{assignment.subject}</p>
              <p className="text-sm text-gray-500">Assigned by: {assignment.teacher}</p>
            </div>
            <div className="text-right">
              <div className="text-blue-600 font-semibold text-lg">{assignment.points} points</div>
              <div className="text-gray-600 text-sm">Due: {assignment.dueDate}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assignment Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assignment Details</h2>
              
              {/* Instructions */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {assignment.instructions}
                </p>
              </div>

              {/* Questions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Questions:</h3>
                <div className="space-y-3">
                  {assignment.questions.map((question: any, index: number) => (
                    <div
                      key={question.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">
                          {index + 1}. {question.text}
                        </span>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full flex-shrink-0">
                        {question.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Your Work */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Work</h2>

              {/* Tab Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setActiveTab('type')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
                    activeTab === 'type'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Type Answers
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Photo
                </button>
              </div>

              {/* Content Area */}
              {activeTab === 'type' ? (
                <textarea
                  value={answers}
                  onChange={(e) => setAnswers(e.target.value)}
                  placeholder="Type your answers here... (e.g., Question 1: x = 5, Question 2: ...)"
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              ) : (
                <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm">PNG, JPG or PDF (max. 10MB)</p>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Choose File
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
