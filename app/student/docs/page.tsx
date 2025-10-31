'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function MyNotes() {
  const [activeTab, setActiveTab] = useState<'organize' | 'scan' | 'tools'>('organize');
  const [noteData, setNoteData] = useState({
    title: 'Untitled Note',
    content: '',
    noteType: 'General',
    subject: '',
    teacher: '',
    tags: [] as string[],
    tagInput: '',
  });
  const [selectedScans, setSelectedScans] = useState<string[]>([]);
  const [textStyle, setTextStyle] = useState('Normal');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const MIN_CHAR_FOR_SCAN = 250;
  const [scanResults, setScanResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Rich text editing functions
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const formatText = (command: string) => {
    execCommand(command);
  };

  const insertList = (type: 'insertUnorderedList' | 'insertOrderedList') => {
    execCommand(type);
  };

  const alignText = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    const commands = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull',
    };
    execCommand(commands[alignment]);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const changeTextStyle = (style: string) => {
    setTextStyle(style);
    switch (style) {
      case 'Heading 1':
        execCommand('formatBlock', '<h1>');
        break;
      case 'Heading 2':
        execCommand('formatBlock', '<h2>');
        break;
      case 'Heading 3':
        execCommand('formatBlock', '<h3>');
        break;
      default:
        execCommand('formatBlock', '<p>');
    }
  };

  const handleSave = () => {
    const editor = document.querySelector('[contenteditable]') as HTMLElement;
    if (editor) {
      const content = editor.innerHTML;
      setNoteData({ ...noteData, content });
      alert('Note saved successfully!\n\nTitle: ' + noteData.title + '\nType: ' + noteData.noteType);
    }
  };

  const handleNewNote = () => {
    setNoteData({
      title: 'Untitled Note',
      content: '',
      noteType: 'General',
      subject: '',
      teacher: '',
      tags: [],
      tagInput: '',
    });
    setTextStyle('Normal');
    // Clear the contentEditable div
    const editor = document.querySelector('[contenteditable]');
    if (editor) {
      editor.innerHTML = '';
    }
  };

  const handleAddTag = () => {
    if (noteData.tagInput.trim()) {
      setNoteData({
        ...noteData,
        tags: [...noteData.tags, noteData.tagInput.trim()],
        tagInput: '',
      });
    }
  };

  const handleRemoveTag = (index: number) => {
    setNoteData({
      ...noteData,
      tags: noteData.tags.filter((_, i) => i !== index),
    });
  };

  const toggleScan = (scanName: string) => {
    if (selectedScans.includes(scanName)) {
      setSelectedScans(selectedScans.filter(s => s !== scanName));
    } else {
      setSelectedScans([...selectedScans, scanName]);
    }
  };

  const updateCounts = (text: string) => {
    // Remove HTML tags for accurate count
    const plainText = text.replace(/<[^>]*>/g, '').trim();
    setCharCount(plainText.length);
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleRunScan = () => {
    if (selectedScans.length === 0) {
      alert('Please select at least one scan type');
      return;
    }
    if (charCount < MIN_CHAR_FOR_SCAN) {
      alert(`Minimum ${MIN_CHAR_FOR_SCAN} characters required for scanning. Current: ${charCount} characters`);
      return;
    }
    
    // Simulate scan results (in a real app, this would call an API)
    const results = selectedScans.map(scanType => {
      if (scanType === 'Basic Scan') {
        return {
          type: 'Basic Scan',
          icon: '🔍',
          description: 'Grammar, spelling, and basic writing issues',
          feedback: `The provided text is a list of words, and upon reviewing it, I've identified several grammar, spelling, and basic writing issues. Here are some specific feedback points:

1. **Spelling errors**: There are several spelling mistakes in the list, including:
   * "absorbtion" (should be "absorption")
   * "acceptence" (should be "acceptance")
   * "advantge" (should be "advantage")
   * "embarass" (should be "embarrass")
   * "oppurtunity" (should be "opportunity")
   * "posses" (should be "possess")
   * "carefull" (should be "careful")
   * "increse" (should be "increase")
   * "employe" (should be "employee")

2. **Lack of punctuation**: The list is a single block of text without any punctuation. It would be helpful to separate the words with commas or use a different format to make the list easier to read.

3. **No clear purpose or context**: The list appears to be a collection of random words. It would be helpful to know the purpose or context of the list, as this could influence the type of feedback provided.

4. **No grammar issues**: Since the list is just a collection of words, there are no grammar issues to report.

5. **Basic writing issues**: The list could be improved by using a more organized format, such as alphabetical order, and by including definitions or explanations for each word.

To improve the list, I would suggest:

* Correcting the spelling errors
* Using a more organized format, such as alphabetical order
* Adding punctuation to separate the words
* Providing context or purpose for the list`
        };
      } else if (scanType === 'AI Vocabulary') {
        return {
          type: 'AI Vocabulary',
          icon: '📚',
          description: 'Word choice, vocabulary enhancement',
          feedback: `Vocabulary analysis complete. Your text shows good variety in word choice. Consider using more sophisticated synonyms for commonly repeated words to enhance readability and engagement.`
        };
      } else if (scanType === 'Plagiarism') {
        return {
          type: 'Plagiarism',
          icon: '🔒',
          description: 'Check for copied content',
          feedback: `Plagiarism check complete. No matches found with existing online sources. Your content appears to be original.`
        };
      } else if (scanType === 'Citation Check') {
        return {
          type: 'Citation Check',
          icon: '📝',
          description: 'Verify citations and references',
          feedback: `Citation analysis complete. No formal citations detected in your text. If you're referencing external sources, consider adding proper citations in APA, MLA, or Chicago format.`
        };
      } else if (scanType === 'Grammar Check') {
        return {
          type: 'Grammar Check',
          icon: '✏️',
          description: 'Advanced grammar analysis',
          feedback: `Advanced grammar check complete. Overall grammar structure is acceptable. Minor suggestions: Consider varying sentence length for better flow and check subject-verb agreement in complex sentences.`
        };
      } else if (scanType === 'Writing Feedback') {
        return {
          type: 'Writing Feedback',
          icon: '✍️',
          description: 'Comprehensive feedback',
          feedback: `Comprehensive writing analysis complete. Your writing demonstrates clarity and organization. Areas for improvement: Add transitional phrases between sections, develop paragraphs more fully, and consider your target audience when choosing vocabulary level.`
        };
      }
      return null;
    }).filter(r => r !== null);

    setScanResults(results);
    setShowResults(true);
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      const resultsSection = document.querySelector('[data-scan-results]');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-hidden">
        <div className="flex h-full">
          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col border-r border-gray-200 overflow-hidden">
            {/* Top Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  View All Notes
                </button>
                <input
                  type="text"
                  value={noteData.title}
                  onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                  className="text-xl font-semibold border-none focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Note
                </button>
                <button
                  onClick={handleNewNote}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="text-lg">+</span>
                  New Note
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-2 flex-shrink-0">
              {/* Undo/Redo */}
              <button onClick={() => execCommand('undo')} className="p-2 hover:bg-gray-100 rounded" title="Undo">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button onClick={() => execCommand('redo')} className="p-2 hover:bg-gray-100 rounded" title="Redo">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
                </svg>
              </button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Text Style */}
              <select 
                value={textStyle}
                onChange={(e) => changeTextStyle(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <option>Normal</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Format buttons */}
              <button onClick={() => formatText('bold')} className="p-2 hover:bg-gray-100 rounded font-bold" title="Bold">B</button>
              <button onClick={() => formatText('italic')} className="p-2 hover:bg-gray-100 rounded italic" title="Italic">I</button>
              <button onClick={() => formatText('underline')} className="p-2 hover:bg-gray-100 rounded underline" title="Underline">U</button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Lists */}
              <button onClick={() => insertList('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded" title="Bullet List">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button onClick={() => insertList('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded" title="Numbered List">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Alignment */}
              <button onClick={() => alignText('left')} className="p-2 hover:bg-gray-100 rounded" title="Align Left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button onClick={() => alignText('center')} className="p-2 hover:bg-gray-100 rounded" title="Align Center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button onClick={() => alignText('right')} className="p-2 hover:bg-gray-100 rounded" title="Align Right">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h11" />
                </svg>
              </button>
              <button onClick={() => alignText('justify')} className="p-2 hover:bg-gray-100 rounded" title="Justify">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                </svg>
              </button>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Link */}
              <button onClick={insertLink} className="p-2 hover:bg-gray-100 rounded" title="Insert Link">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>

              {/* Table */}
              <button onClick={() => alert('Table insertion coming soon')} className="p-2 hover:bg-gray-100 rounded" title="Insert Table">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="p-8">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const content = e.currentTarget.innerHTML;
                    setNoteData({ ...noteData, content });
                    updateCounts(content);
                  }}
                  className="w-full min-h-[300px] border-none focus:outline-none text-gray-900 mb-6"
                  style={{ whiteSpace: 'pre-wrap' }}
                  data-placeholder="Start typing your note..."
                >
                  {noteData.content === '' && (
                    <span className="text-gray-400 pointer-events-none">Start typing your note...</span>
                  )}
                </div>
                
                {/* Character Count */}
                <div className="border-t border-gray-200 pt-4 pb-6 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {charCount} characters · {wordCount} words
                  </span>
                  {charCount < MIN_CHAR_FOR_SCAN && charCount > 0 && (
                    <span className="text-red-600 font-medium">
                      Minimum {MIN_CHAR_FOR_SCAN} characters for scanning
                    </span>
                  )}
                </div>

                {/* Scan Results */}
                {showResults && scanResults && (
                  <div className="space-y-6 mt-6" data-scan-results>
                    {/* Clear Results Button */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Scan Results</h2>
                      <button
                        onClick={() => setShowResults(false)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear Results
                      </button>
                    </div>

                    {scanResults.map((result: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                        {/* Scan Type Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <span className="text-3xl">{result.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">{result.type}</h3>
                            <p className="text-sm text-gray-600">{result.description}</p>
                          </div>
                        </div>

                        {/* Feedback Content */}
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 whitespace-pre-wrap">{result.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 flex-shrink-0">
              <button
                onClick={() => setActiveTab('organize')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'organize'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Organize
              </button>
              <button
                onClick={() => setActiveTab('scan')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'scan'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Scan
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'tools'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tools
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {activeTab === 'organize' && (
                <>
                  {/* Note Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Note Type
                    </label>
                    <select
                      value={noteData.noteType}
                      onChange={(e) => setNoteData({ ...noteData, noteType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>General</option>
                      <option>Lecture</option>
                      <option>Group Discussion</option>
                      <option>Reading Summary</option>
                      <option>Homework</option>
                      <option>Study Notes</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={noteData.subject}
                      onChange={(e) => setNoteData({ ...noteData, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Teacher */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Teacher
                    </label>
                    <input
                      type="text"
                      value={noteData.teacher}
                      onChange={(e) => setNoteData({ ...noteData, teacher: e.target.value })}
                      placeholder="e.g., Mr. Smith"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={noteData.tagInput}
                        onChange={(e) => setNoteData({ ...noteData, tagInput: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddTag}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {noteData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'scan' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Scans</h3>
                  <div className="space-y-3">
                    {/* Basic Scan */}
                    <button
                      onClick={() => toggleScan('Basic Scan')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all relative ${
                        selectedScans.includes('Basic Scan')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔍</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">Basic Scan</div>
                          <div className="text-sm text-gray-600">Grammar, spelling, and basic writing issues</div>
                        </div>
                        {selectedScans.includes('Basic Scan') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* AI Vocabulary */}
                    <button
                      onClick={() => toggleScan('AI Vocabulary')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedScans.includes('AI Vocabulary')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📚</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">AI Vocabulary</div>
                          <div className="text-sm text-gray-600">Word choice, vocabulary enhancement</div>
                        </div>
                        {selectedScans.includes('AI Vocabulary') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Plagiarism */}
                    <button
                      onClick={() => toggleScan('Plagiarism')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedScans.includes('Plagiarism')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔒</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">Plagiarism</div>
                          <div className="text-sm text-gray-600">Check for copied content</div>
                        </div>
                        {selectedScans.includes('Plagiarism') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Citation Check */}
                    <button
                      onClick={() => toggleScan('Citation Check')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedScans.includes('Citation Check')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📝</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">Citation Check</div>
                          <div className="text-sm text-gray-600">Verify citations and references</div>
                        </div>
                        {selectedScans.includes('Citation Check') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Grammar Check */}
                    <button
                      onClick={() => toggleScan('Grammar Check')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedScans.includes('Grammar Check')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✏️</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">Grammar Check</div>
                          <div className="text-sm text-gray-600">Advanced grammar analysis</div>
                        </div>
                        {selectedScans.includes('Grammar Check') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Writing Feedback */}
                    <button
                      onClick={() => toggleScan('Writing Feedback')}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedScans.includes('Writing Feedback')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✍️</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">Writing Feedback</div>
                          <div className="text-sm text-gray-600">Comprehensive feedback</div>
                        </div>
                        {selectedScans.includes('Writing Feedback') && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Selected Count and Run Button */}
                  <div className="mt-6 space-y-3">
                    <p className="text-sm text-gray-600">
                      {selectedScans.length} scan(s) selected
                    </p>
                    <button
                      onClick={handleRunScan}
                      disabled={charCount < MIN_CHAR_FOR_SCAN || selectedScans.length === 0}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        charCount < MIN_CHAR_FOR_SCAN || selectedScans.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Run Scan
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'tools' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Study Tools</h3>
                  <div className="space-y-4">
                    {/* Generate Flashcards */}
                    <button
                      onClick={() => alert('Generating flashcards from your notes...')}
                      className="w-full bg-gradient-to-r from-purple-200 via-purple-100 to-cyan-100 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Generate Flashcards
                    </button>

                    {/* Create Practice Quiz */}
                    <button
                      onClick={() => alert('Creating practice quiz from your notes...')}
                      className="w-full bg-gradient-to-r from-purple-200 via-purple-100 to-cyan-100 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Create Practice Quiz
                    </button>

                    {/* Generate Summary */}
                    <button
                      onClick={() => alert('Generating summary from your notes...')}
                      className="w-full bg-gradient-to-r from-purple-200 via-purple-100 to-cyan-100 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Generate Summary
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
