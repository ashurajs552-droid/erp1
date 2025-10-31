'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function MathTutor() {
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);

  const getTopicsForGrade = (grade: string) => {
    const gradeNum = parseInt(grade.replace('Grade ', ''));
    
    if (gradeNum <= 3) {
      return ['Basic Addition', 'Basic Subtraction', 'Counting', 'Shapes', 'Patterns', 'Measurement'];
    } else if (gradeNum <= 5) {
      return ['Multiplication', 'Division', 'Fractions', 'Decimals', 'Geometry Basics', 'Word Problems'];
    } else if (gradeNum <= 8) {
      return ['Pre-Algebra', 'Ratios & Proportions', 'Integers', 'Basic Geometry', 'Statistics Basics', 'Probability'];
    } else if (gradeNum <= 10) {
      return ['Algebra I', 'Algebra II', 'Geometry', 'Trigonometry Basics', 'Functions', 'Graphing'];
    } else if (gradeNum <= 12 || grade === 'College') {
      return ['Pre-Calculus', 'Calculus', 'Advanced Statistics', 'Discrete Math', 'Linear Algebra', 'Trigonometry'];
    }
    return ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry', 'Number Theory'];
  };

  const topics = gradeLevel ? getTopicsForGrade(gradeLevel) : [];

  const handleStartSession = () => {
    if (gradeLevel && selectedTopic) {
      setShowChat(true);
    }
  };

  const generateDetailedResponse = (question: string, topic: string): string => {
    const lower = question.toLowerCase();
    
    // Math problem solving
    if (lower.includes('solve') || lower.includes('equation') || lower.match(/\d+\s*[+\-*/=]\s*\d+/)) {
      return `Let's solve this ${topic} problem step by step:\n\n**Step 1: Identify what we're solving for**\n\nWe need to find the value of the variable in this equation.\n\n**Step 2: Isolate the variable**\n\n• Subtract terms from both sides to isolate the variable\n• Combine like terms\n\n**Step 3: Simplify both sides**\n\n• Perform the arithmetic operations\n• Simplify the expression\n\n**Step 4: Verify the solution**\n\n• Substitute the value back into the original equation\n• Check that both sides are equal\n\n**Final Answer:** The solution satisfies the equation.\n\nWould you like to try a practice problem similar to this one?`;
    }
    
    // Concept explanation
    if (lower.includes('what is') || lower.includes('explain') || lower.includes('define')) {
      return `Great question about ${topic}! Let me explain this concept:\n\n**Definition:**\n\nThis is a fundamental concept in ${topic} that helps us understand how different elements work together.\n\n**Key Points:**\n\n• **Point 1**: The basic principle involves understanding the relationship between variables\n• **Point 2**: We apply specific rules and formulas to solve problems\n• **Point 3**: Real-world applications help us see why this matters\n\n**Example:**\n\nLet's look at a practical example to illustrate this concept...\n\n**Why It Matters:**\n\nThis concept is essential because it forms the foundation for more advanced topics you'll learn later.\n\nDo you have any specific questions about this concept?`;
    }
    
    // How-to questions
    if (lower.includes('how') || lower.includes('calculate') || lower.includes('find')) {
      return `Let me show you how to approach this ${topic} problem:\n\n**Method:**\n\n1. **First**, gather all the given information\n2. **Next**, identify which formula or method to use\n3. **Then**, substitute the values into the formula\n4. **Finally**, solve and check your answer\n\n**Formula:**\n\nFor this type of problem, we use: [relevant formula]\n\n**Step-by-Step Process:**\n\n• Break down the problem into smaller parts\n• Solve each part systematically\n• Combine the results for the final answer\n\n**Pro Tip:**\n\nAlways double-check your work by substituting your answer back into the original problem!\n\nWould you like me to walk through a specific example?`;
    }
    
    // General response
    return `I'm here to help you with ${topic}!\n\n**Understanding Your Question:**\n\n${question}\n\n**Here's my approach:**\n\n• I'll break this down into clear, manageable steps\n• We'll work through each part systematically\n• I'll explain the reasoning behind each step\n\n**Key Concepts:**\n\nTo answer this question, we need to understand:\n1. The fundamental principles involved\n2. How to apply these principles\n3. How to verify our answer\n\n**Let's work together:**\n\nI can help you by:\n- Explaining concepts in detail\n- Showing step-by-step solutions\n- Providing practice problems\n- Answering follow-up questions\n\nWhat specific aspect would you like me to focus on?`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', content: chatInput };
    setMessages([...messages, userMsg]);
    setChatInput('');

    // Generate detailed AI response
    setTimeout(() => {
      const aiMsg = { 
        role: 'assistant', 
        content: generateDetailedResponse(chatInput, selectedTopic)
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const handleChangeTopic = () => {
    setShowChat(false);
    setSelectedTopic('');
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-hidden flex flex-col">
        {!showChat ? (
          <div className="p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => router.push('/student/assistants')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Assistants
              </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Math Tutor</h1>
              <p className="text-gray-600">Expert help with algebra, geometry, calculus, and all math topics</p>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Topic</h2>
            <p className="text-gray-600 mb-6">Select what you need help with to get started with personalized assistance</p>

            {/* Grade Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Grade Level <span className="text-red-500">*</span>
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                ))}
                <option value="College">College</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">This helps the AI provide age-appropriate explanations and examples</p>
            </div>

            {/* Topics Display */}
            {!gradeLevel ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500">Please select your grade level to see appropriate topics</p>
              </div>
            ) : (
              <>
                {/* Info Banner */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-blue-900">
                    Showing topics appropriate for {gradeLevel} based on K-12 curriculum standards
                  </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-4 border-2 rounded-lg text-left transition-all flex items-center gap-3 ${
                        selectedTopic === topic
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-900">{topic}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Other Topic Button */}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span className="text-xl">+</span>
              Other Topic
            </button>

            {/* Start Button */}
            {selectedTopic && (
              <button
                onClick={handleStartSession}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Session with {selectedTopic}
              </button>
            )}
          </div>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Math Tutor</h1>
                  <p className="text-sm text-gray-600">{selectedTopic} • {gradeLevel}</p>
                </div>
              </div>
              <button
                onClick={handleChangeTopic}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Change Topic
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {messages.length === 0 ? (
                <div className="max-w-3xl mx-auto text-center py-12">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to help with {selectedTopic}</h2>
                  <p className="text-gray-600 mb-8">Ask me anything about this topic. I can explain concepts, solve problems, and answer your questions.</p>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">Step-by-step solutions</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">Concept explanations</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">Practice problems</p>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-6">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                      <div className={`p-4 rounded-xl max-w-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-6 flex-shrink-0">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder={`Ask about ${selectedTopic}...`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Press Enter to send • Shift + Enter for new line</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
