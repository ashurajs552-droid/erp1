export type ToolParams = Record<string, unknown>;

export type PromptSpec = {
  system: string;
  user: string;
  temperature?: number;
};

export function buildPrompt(toolId: string, params: ToolParams): PromptSpec {
  switch (toolId) {
    case 'worksheet-generator': {
      const subjectDetails = (params.subjectDetails as string) || '';
      const gradeLevel = (params.gradeLevel as string) || 'Grade 6';
      const subjectType = (params.subjectType as string) || 'Science';
      return {
        system:
          'You are an expert K-12 curriculum designer. Create clear, age-appropriate worksheets. Use mixed question types: multiple choice, short answer, fill-in-the-blank. Ensure accuracy and align to educational standards. Keep answers as keys inline where asked. Keep tone professional and student-friendly.',
        user: `Create a printable worksheet.
Topic/Details: ${subjectDetails}
Subject: ${subjectType}
Grade level: ${gradeLevel}

Constraints:
- 8 to 12 questions
- Vary difficulty (easy to challenging)
- Include at least 2 multiple-choice and 2 short-answer
- Show answer key inline when asked with **Answer:** _____, but do not reveal keys elsewhere
- Use simple markdown formatting suitable for print (no code fences)

Output format (exact):
Title
Brief one-sentence directions

1. Question
   a)
   b)
   c)
   d)
   **Answer:** _____

2. Question
   **Answer:** _____

(continue for all questions)
`,
        temperature: 0.2,
      };
    }

    case 'multiple-choice-quiz': {
      const topic = (params.details as string) || '';
      const num = Number(params.numQuestions ?? 10);
      return {
        system:
          'You are an expert quiz composer for middle/high school. Produce rigorously correct questions with plausible distractors and one unambiguous correct answer.',
        user: `Create a multiple-choice quiz on: ${topic}
Questions: ${num}
For each item, provide 4 options (a–d) and indicate the correct choice with **Answer:** x
Use compact markdown without extra commentary.`,
        temperature: 0.2,
      };
    }

    case 'math-problem-solver': {
      const problem = (params.details as string) || '';
      return {
        system:
          'You are a careful math tutor. Solve problems step-by-step with justification. Prefer exact forms when reasonable. Avoid arithmetic mistakes.',
        user: `Solve the following problem step-by-step and show final answer clearly labeled:\n${problem}`,
        temperature: 0.1,
      };
    }

    case 'flashcard-generator': {
      const topic = (params.details as string) || '';
      const count = Number(params.count ?? 20);
      return {
        system:
          'You create concise flashcards with a term and a brief, precise definition. Avoid fluff. Use widely accepted definitions only.',
        user: `Generate ${count} flashcards on: ${topic}
Format each as: Term — Definition`,
        temperature: 0.2,
      };
    }

    case 'homework-help': {
      const details = (params.details as string) || '';
      const subject = (params.subject as string) || '';
      const gradeLevel = (params.gradeLevel as string) || '';
      const topic = (params.topic as string) || '';
      const taskType = (params.taskType as string) || '';
      
      let context = '';
      if (subject || gradeLevel || topic || taskType) {
        context = `\nContext:\n${subject ? `- Subject: ${subject}\n` : ''}${gradeLevel ? `- Grade Level: ${gradeLevel}\n` : ''}${topic ? `- Topic: ${topic}\n` : ''}${taskType ? `- Task Type: ${taskType}\n` : ''}`;
      }
      
      return {
        system:
          'You are a patient, encouraging AI tutor helping students learn. You guide step-by-step, explain concepts clearly, encourage independent thinking, and adapt explanations to the student\'s level. You help them understand, not just get answers. Use simple language, examples, and analogies. When appropriate, provide hints before full solutions.',
        user: `Student question: ${details}${context}\n\nProvide a helpful, step-by-step response that guides the student to understand and learn.`,
        temperature: 0.3,
      };
    }

    default: {
      const details = (params.details as string) || '';
      return {
        system:
          'You are a precise educational assistant. Provide accurate, sourced information when helpful. Keep structure clean and actionable.',
        user: `Task: ${toolId}\nDetails: ${details}\nProvide a structured, accurate result suitable for students and educators.`,
        temperature: 0.2,
      };
    }
  }
}
