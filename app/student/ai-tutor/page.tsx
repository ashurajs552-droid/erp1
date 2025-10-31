'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type ChatHistory = {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
};

export default function MasterTutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'image' | 'web' | 'math'>('chat');
  const [showHistory, setShowHistory] = useState(true);
  const [aiMode, setAiMode] = useState<'fastest' | 'smartest' | 'thinking'>('fastest');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const examplePrompts = [
    { text: 'Help me solve this math problem step by step', subject: 'Math', icon: '📐' },
    { text: 'Explain photosynthesis in simple terms', subject: 'Science', icon: '🔬' },
    { text: 'What are the main themes in Romeo and Juliet?', subject: 'Literature', icon: '📚' },
    { text: 'Tell me about the causes of World War II', subject: 'History', icon: '🌍' },
    { text: 'How does a computer processor work?', subject: 'Technology', icon: '💻' },
    { text: 'Explain the Renaissance art movement', subject: 'Art', icon: '🎨' },
  ];

  // Initialize a fresh empty chat on mount (refresh starts new chat)
  useEffect(() => {
    const initialChatId = Date.now().toString();
    setCurrentChatId(initialChatId);
    const initialChat: ChatHistory = {
      id: initialChatId,
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChatHistory([initialChat]);
    setMessages([]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const solveMathProblem = (problem: string): string | null => {
    // Basic arithmetic
    const arithmeticMatch = problem.match(/(\d+)\s*([+\-*/×÷])\s*(\d+)/);
    if (arithmeticMatch) {
      const num1 = parseFloat(arithmeticMatch[1]);
      const operator = arithmeticMatch[2];
      const num2 = parseFloat(arithmeticMatch[3]);
      let result = 0;
      
      switch (operator) {
        case '+':
          result = num1 + num2;
          return `The sum of (${num1} + ${num2}) is (${result}). 🎉\n\nIf you have any more questions or need further explanations, feel free to ask!`;
        case '-':
          result = num1 - num2;
          return `The difference of (${num1} - ${num2}) is (${result}). 🎉\n\nIf you have any more questions or need further explanations, feel free to ask!`;
        case '*':
        case '×':
          result = num1 * num2;
          return `The product of (${num1} × ${num2}) is (${result}). 🎉\n\nIf you have any more questions or need further explanations, feel free to ask!`;
        case '/':
        case '÷':
          result = num1 / num2;
          return `The quotient of (${num1} ÷ ${num2}) is (${result}). 🎉\n\nIf you have any more questions or need further explanations, feel free to ask!`;
      }
    }
    
    // Quadratic equation
    if (problem.match(/quadratic|x\^2|x²/i)) {
      return `Let me help you solve this quadratic equation!\n\n**Step-by-step solution:**\n\n1. **Standard form**: ax² + bx + c = 0\n2. **Quadratic formula**: x = (-b ± √(b² - 4ac)) / 2a\n3. **Find the discriminant**: b² - 4ac\n4. **Calculate roots** using the formula\n\n**Example**: For x² - 5x + 6 = 0\n- a = 1, b = -5, c = 6\n- Discriminant = 25 - 24 = 1\n- x = (5 ± 1) / 2\n- Solutions: x = 3 or x = 2\n\nWhat specific quadratic equation would you like me to solve?`;
    }
    
    // Algebra
    if (problem.match(/solve for [a-z]|equation/i)) {
      return `Let me help you solve this algebraic equation!\n\n**General approach:**\n\n1. **Simplify** both sides of the equation\n2. **Isolate** the variable on one side\n3. **Combine** like terms\n4. **Solve** for the variable\n5. **Check** your answer\n\n**Example**: Solve 2x + 5 = 13\n- Subtract 5 from both sides: 2x = 8\n- Divide both sides by 2: x = 4\n- Check: 2(4) + 5 = 13 ✓\n\nShare your specific equation and I'll solve it step by step!`;
    }
    
    // Calculus
    if (problem.match(/derivative|integral|limit|calculus/i)) {
      return `Let me help you with this calculus problem!\n\n**For Derivatives:**\n- Power rule: d/dx(xⁿ) = n·xⁿ⁻¹\n- Product rule: d/dx(uv) = u'v + uv'\n- Chain rule: d/dx(f(g(x))) = f'(g(x))·g'(x)\n\n**For Integrals:**\n- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n- ∫eˣ dx = eˣ + C\n- ∫(1/x) dx = ln|x| + C\n\n**Example**: Find d/dx(x³)\n- Using power rule: 3x²\n\nWhat specific calculus problem would you like me to solve?`;
    }
    
    // Geometry
    if (problem.match(/area|perimeter|volume|triangle|circle|geometry/i)) {
      return `Let me help you with this geometry problem!\n\n**Common formulas:**\n\n📐 **Triangle**: Area = ½ × base × height\n⭕ **Circle**: Area = πr², Circumference = 2πr\n📦 **Rectangle**: Area = length × width\n🔲 **Square**: Area = side²\n📊 **Sphere**: Volume = (4/3)πr³\n📏 **Cylinder**: Volume = πr²h\n\n**Pythagorean Theorem**: a² + b² = c²\n\nWhat specific geometry problem would you like me to solve?`;
    }
    
    return null;
  };

  const generateAIResponse = (question: string): string => {
    const lower = question.toLowerCase();
    
    // Check if it's a math problem
    const mathSolution = solveMathProblem(question);
    if (mathSolution) {
      return mathSolution;
    }
    
    // Web search queries
    if (lower.includes('search') || lower.includes('find information') || lower.includes('look up')) {
      return `🔍 **Web Search Results**\n\nI've searched the web for "${question}". Here's what I found:\n\n1. **Top Result**: Based on recent information, I can provide you with accurate and up-to-date details.\n\n2. **Key Points**:\n   - Comprehensive overview of the topic\n   - Latest research and findings\n   - Expert opinions and analysis\n\nWould you like me to elaborate on any specific aspect of these findings?`;
    }
    
    // Image analysis
    if (lower.includes('analyze') || lower.includes('image') || lower.includes('picture') || lower.includes('photo')) {
      return `🖼️ **Image Analysis**\n\nI can analyze images to help you with:\n\n📊 **Academic Content**:\n- Diagrams and charts\n- Mathematical equations\n- Scientific illustrations\n- Historical documents\n\n🔬 **Detailed Analysis**:\n- Text extraction (OCR)\n- Object identification\n- Visual explanations\n- Context understanding\n\nPlease upload an image using the 📷 button, and I'll provide a detailed analysis!`;
    }
    
    if (lower.includes('math') || lower.includes('solve') || lower.includes('calculate')) {
      return `🔢 **Math Problem Solver**\n\nI can help you solve:\n\n➕ **Arithmetic**: Addition, subtraction, multiplication, division\n📐 **Algebra**: Linear equations, quadratic equations, systems\n📊 **Geometry**: Area, perimeter, volume, angles\n📈 **Calculus**: Derivatives, integrals, limits\n📉 **Statistics**: Mean, median, mode, probability\n🔺 **Trigonometry**: Sin, cos, tan, angles\n\nJust type your math problem, and I'll solve it step by step!\n\n**Example**: "2+3" or "solve x² - 5x + 6 = 0"`;
    } else if (lower.includes('photosynthesis')) {
      return `Photosynthesis is how plants make their own food! Here's a simple explanation:\n\n🌱 Plants take in:\n- Sunlight (energy)\n- Water (from soil)\n- Carbon dioxide (from air)\n\n🍃 Through a process in their leaves, they create:\n- Glucose (sugar for food)\n- Oxygen (released into air)\n\nThis happens in chloroplasts, which contain chlorophyll - the green pigment that captures sunlight. It's like plants are solar-powered food factories!`;
    } else if (lower.includes('romeo') || lower.includes('juliet')) {
      return `The main themes in Romeo and Juliet include:\n\n💔 **Love vs. Hate**: The intense love between Romeo and Juliet contrasts with the bitter family feud\n\n⚖️ **Fate vs. Free Will**: Are the lovers doomed by destiny or their own choices?\n\n👥 **Youth vs. Age**: The impulsive young lovers vs. the stubborn older generation\n\n⏱️ **Time and Haste**: Events unfold rapidly, with tragic consequences\n\n🌃 **Light and Dark**: Symbolic imagery throughout the play\n\nWhich theme would you like to explore in more detail?`;
    } else if (lower.includes('world war') || lower.includes('wwii')) {
      return `The main causes of World War II include:\n\n1. **Treaty of Versailles** (1919): Harsh terms on Germany created resentment\n\n2. **Rise of Fascism**: Hitler in Germany, Mussolini in Italy, militarism in Japan\n\n3. **Economic Depression**: The Great Depression destabilized economies worldwide\n\n4. **Failure of Appeasement**: European powers' attempts to avoid war by allowing German expansion\n\n5. **Invasion of Poland** (1939): The immediate trigger - Germany invaded, Britain and France declared war\n\nThese factors combined to create the deadliest conflict in human history.`;
    } else if (lower.includes('processor') || lower.includes('computer')) {
      return `A computer processor (CPU) works like the brain of your computer:\n\n⚡ **Fetch**: Gets instructions from memory\n📋 **Decode**: Figures out what the instruction means\n✅ **Execute**: Performs the operation\n💾 **Store**: Saves the result\n\nThis happens billions of times per second! Modern processors have multiple cores, allowing them to handle many tasks simultaneously. They use transistors (tiny electronic switches) - modern CPUs have billions of them!\n\nWould you like to know more about any specific aspect?`;
    } else if (lower.includes('renaissance')) {
      return `The Renaissance art movement (14th-17th century) was revolutionary:\n\n🎨 **Key Characteristics**:\n- Realistic human figures and emotions\n- Use of perspective and depth\n- Focus on classical themes (Greek/Roman)\n- Patronage by wealthy families (like the Medici)\n\n👨‍🎨 **Famous Artists**:\n- Leonardo da Vinci (Mona Lisa)\n- Michelangelo (Sistine Chapel)\n- Raphael (School of Athens)\n\n💡 **Impact**: Marked shift from medieval to modern thinking, emphasizing humanism and individual achievement.\n\nWhat aspect interests you most?`;
    }
    
    return `I'd be happy to help you with that! I'm your Master Tutor, and I can assist with:\n\n📚 Explaining concepts in simple terms\n✍️ Solving problems step-by-step\n🔍 Searching the web for information\n📊 Analyzing images and diagrams\n🔢 Solving math problems of all types\n\nCould you provide more details about what you'd like to learn?`;
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  const saveCurrentChat = () => {
    if (messages.length > 0 && currentChatId) {
      const chatTitle = messages[0]?.content.substring(0, 50) || 'New Chat';
      const updatedHistory = chatHistory.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages, title: `[Model: ${aiMode}] ${chatTitle}` }
          : chat
      );
      setChatHistory(updatedHistory);
    }
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      saveCurrentChat();
    }
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setMessages([]);
    setInput('');
    setUploadedImage(null);
    
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChatHistory([newChat, ...chatHistory]);
  };

  const loadChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        alert('Image uploaded! You can now ask questions about this image.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 overflow-hidden flex pt-16 lg:pt-0">
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 sm:p-6 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Master Tutor</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Your AI-powered learning companion with advanced capabilities</p>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveMode('image')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg font-medium transition-colors ${
                  activeMode === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>🖼️</span>
                Image Analysis
              </button>
              <button
                onClick={() => setActiveMode('web')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeMode === 'web' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>🌐</span>
                Web Search
              </button>
              <button
                onClick={() => setActiveMode('math')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeMode === 'math' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>🔢</span>
                Math Solver
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl lg:text-5xl">💡</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Hello! I'm your Master Tutor</h2>
                  <p className="text-base sm:text-lg text-gray-600">
                    Ask me anything about your studies. I can help with homework, explain concepts, search the web,
                    and analyze images.
                  </p>
                </div>

                {/* Example Prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(prompt.text)}
                      className="text-left p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{prompt.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {prompt.text}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{prompt.subject}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-500 to-blue-500'
                    }`}>
                      {message.role === 'user' ? (
                        <span className="text-white font-semibold text-xs">You</span>
                      ) : (
                        <span className="text-white text-xl">🎓</span>
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.role === 'user' && (
                        <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-lg">
                          [Model: {aiMode}]
                        </div>
                      )}
                      <div className={`inline-block p-4 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(message.content);
                              alert('Copied to clipboard!');
                            }}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            title="Copy"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => alert('Glad you found this helpful!')}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            title="Like"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => alert('Thanks for the feedback. We\'ll improve!')}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            title="Dislike"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500">
                      <span className="text-white text-xl">🎓</span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                {/* AI Mode Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {aiMode === 'fastest' && 'Fastest'}
                    {aiMode === 'smartest' && 'Smartest'}
                    {aiMode === 'thinking' && 'Thinking'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showModeDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-10">
                      <button
                        onClick={() => {
                          setAiMode('fastest');
                          setShowModeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 ${
                          aiMode === 'fastest' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Fastest
                        {aiMode === 'fastest' && (
                          <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAiMode('smartest');
                          setShowModeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 ${
                          aiMode === 'smartest' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Smartest
                        {aiMode === 'smartest' && (
                          <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAiMode('thinking');
                          setShowModeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 ${
                          aiMode === 'thinking' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Thinking
                        {aiMode === 'thinking' && (
                          <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Web Search
                </button>

                <label className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </label>
              </div>
              {uploadedImage && (
                <div className="mb-3 relative inline-block">
                  <img src={uploadedImage} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-blue-500 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center">
                Always review content for accuracy and bias; use professional judgment and comply with school policies.
              </p>
            </div>
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div className="hidden lg:flex w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
            {/* History Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">History</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={startNewChat}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  <span className="text-lg">+</span>
                  New chat
                </button>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-8">
                  No chat history yet. Start a conversation!
                </div>
              ) : (
                <div className="space-y-2">
                  {chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => loadChat(chat.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentChatId === chat.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {chat.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {chat.timestamp.toLocaleDateString()} at {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
