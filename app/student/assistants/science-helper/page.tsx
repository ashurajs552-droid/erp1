'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function ScienceHelper() {
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);

  const getTopicsForGrade = (grade: string) => {
    const gradeNum = parseInt(grade.replace('Grade ', ''));
    
    if (gradeNum <= 3) {
      return ['Living Things', 'Weather', 'Plants & Animals', 'Simple Machines', 'Earth & Sky', 'Seasons'];
    } else if (gradeNum <= 5) {
      return ['Ecosystems', 'Water Cycle', 'Matter & Energy', 'Solar System', 'Human Body', 'Forces & Motion'];
    } else if (gradeNum <= 8) {
      return ['Life Science', 'Physical Science', 'Earth Science', 'Scientific Method', 'Cells & Organisms', 'Chemical Reactions'];
    } else if (gradeNum <= 10) {
      return ['Biology', 'Chemistry', 'Physics', 'Environmental Science', 'Genetics', 'Electricity'];
    } else if (gradeNum <= 12 || grade === 'College') {
      return ['Advanced Biology', 'Organic Chemistry', 'Physics II', 'Astronomy', 'Molecular Biology', 'Thermodynamics'];
    }
    return ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Astronomy', 'Environmental Science'];
  };

  const topics = gradeLevel ? getTopicsForGrade(gradeLevel) : [];

  const handleStartSession = () => {
    if (gradeLevel && selectedTopic) {
      setShowChat(true);
    }
  };

  const generateDetailedResponse = (question: string, topic: string): string => {
    const lower = question.toLowerCase();
    
    // Science problem solving
    if (lower.includes('solve') || lower.includes('experiment') || lower.includes('calculate')) {
      return `Let's solve this ${topic} problem step by step:\n\n**Step 1: Identify what we're solving for**\n\nWe need to understand the scientific principle involved in this question.\n\n**Step 2: Apply the relevant scientific concept**\n\n• Identify the key variables and their relationships\n• Recall the appropriate formula or law\n• Set up the problem correctly\n\n**Step 3: Perform calculations**\n\n• Substitute known values\n• Solve for the unknown\n• Include proper units\n\n**Step 4: Verify and interpret**\n\n• Check if the answer makes sense\n• Relate it back to the real-world context\n\n**Final Answer:** The result shows us that...\n\nWould you like to explore a related concept or try another problem?`;
    }
    
    // Concept explanation
    if (lower.includes('what is') || lower.includes('explain') || lower.includes('define')) {
      return `Great question about ${topic}! Let me explain this concept:\n\n**Definition:**\n\nThis is a fundamental concept in ${topic} that helps us understand how nature works.\n\n**Key Points:**\n\n• **Point 1**: The basic scientific principle behind this phenomenon\n• **Point 2**: How we observe and measure this in experiments\n• **Point 3**: Real-world applications and examples\n\n**Example:**\n\nLet's look at a practical example to illustrate this concept...\n\n**Why It Matters:**\n\nThis concept is essential for understanding more complex scientific topics and everyday phenomena.\n\nDo you have any specific questions about this concept?`;
    }
    
    // How-to questions
    if (lower.includes('how') || lower.includes('why') || lower.includes('process')) {
      return `Let me show you how this ${topic} concept works:\n\n**The Process:**\n\n1. **First**, let's understand the initial conditions\n2. **Next**, observe what happens during the process\n3. **Then**, identify the cause-and-effect relationships\n4. **Finally**, draw conclusions based on evidence\n\n**Scientific Explanation:**\n\nThe science behind this involves: [relevant principles]\n\n**Step-by-Step Breakdown:**\n\n• Stage 1: What starts the process\n• Stage 2: What happens during\n• Stage 3: What is the end result\n\n**Pro Tip:**\n\nRemember to always base your understanding on observations and evidence!\n\nWould you like me to explain any part in more detail?`;
    }
    
    // General response
    return `I'm here to help you with ${topic}!\n\n**Understanding Your Question:**\n\n${question}\n\n**Here's my approach:**\n\n• I'll break this down into clear, manageable steps\n• We'll work through each part systematically\n• I'll explain the scientific reasoning behind each step\n\n**Key Concepts:**\n\nTo answer this question, we need to understand:\n1. The fundamental scientific principles involved\n2. How to apply these principles\n3. How to interpret the results\n\n**Let's work together:**\n\nI can help you by:\n- Explaining concepts in detail\n- Showing step-by-step solutions\n- Providing examples and experiments\n- Answering follow-up questions\n\nWhat specific aspect would you like me to focus on?`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput };
    setMessages([...messages, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: generateDetailedResponse(chatInput, selectedTopic) }]);
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
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/student/assistants')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Assistants
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-600">Science Helper</h1>
              <p className="text-gray-600">Assistance with biology, chemistry, physics, and more</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Topic</h2>
            <p className="text-gray-600 mb-6">Select what you need help with to get started with personalized assistance</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Grade Level <span className="text-red-500">*</span>
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select your grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                ))}
                <option value="College">College</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">This helps the AI provide age-appropriate explanations and examples</p>
            </div>

            {!gradeLevel ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500">Please select your grade level to see appropriate topics</p>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-green-900">Showing topics appropriate for {gradeLevel} based on K-12 curriculum standards</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-4 border-2 rounded-lg text-left transition-all flex items-center gap-3 ${
                        selectedTopic === topic
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
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

            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span className="text-xl">+</span>
              Other Topic
            </button>

            {selectedTopic && (
              <button
                onClick={handleStartSession}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Session with {selectedTopic}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
