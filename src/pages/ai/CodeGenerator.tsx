import { useState } from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { Message, ChatSession } from "@/types/chat";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

export default function CodeGenerator() {
    const { t } = useLanguage();

    // Sample conversation with React form code
    const sampleCode = `import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === '') {
      setError('');
      setIsValid(false);
    } else if (!validateEmail(value)) {
      setError('Please enter a valid email address');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log('Email submitted:', email);
      // Handle form submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={\`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }\`}
          placeholder="Enter your email"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {isValid && (
          <p className="mt-1 text-sm text-green-600">✓ Valid email</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};

export default EmailForm;`;

    const sampleMessages: Message[] = [
        {
            id: "1",
            role: "user",
            content: "Create a React form component with email validation",
            timestamp: new Date(Date.now() - 3600000),
            status: "idle",
            type: "code",
        },
        {
            id: "2",
            role: "assistant",
            content: sampleCode,
            timestamp: new Date(Date.now() - 3500000),
            status: "idle",
            type: "code",
        },
    ];

    const sampleSessions: ChatSession[] = [
        {
            id: "sample-1",
            title: "Email Form Component",
            lastMessage: "Create a React form component with email validation",
            timestamp: new Date(Date.now() - 3600000),
            type: "code",
        },
    ];

    const [messages, setMessages] = useState<Message[]>(sampleMessages);
    const [sessions, setSessions] = useState<ChatSession[]>(sampleSessions);
    const [activeSessionId, setActiveSessionId] = useState<string>("sample-1");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
            status: 'idle',
            type: 'code',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `// Generated code example\nfunction example() {\n  console.log("This is a simulated code response");\n  return true;\n}\n\nexample();`,
                timestamp: new Date(),
                status: 'idle',
                type: 'code',
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleNewChat = () => {
        setMessages([]);
        setActiveSessionId(undefined);
    };

    const handleSelectSession = (sessionId: string) => {
        setActiveSessionId(sessionId);
        if (sessionId === "sample-1") {
            setMessages(sampleMessages);
        }
    };

    const handleClearChat = () => {
        setMessages([]);
    };

    const handleRetry = (messageId: string) => {
        console.log('Retry message:', messageId);
    };

    return (
        <div className="h-full flex flex-col">
            <PageHeader
                title={t("aiAssistant.generators.code.title")}
                description={t("aiAssistant.generators.code.description")}
            />
            <div className="flex-1 overflow-hidden">
                <ChatLayout
                    type="code"
                    messages={messages}
                    sessions={sessions}
                    activeSessionId={activeSessionId}
                    isLoading={isLoading}
                    placeholder={t("aiAssistant.generators.code.placeholder")}
                    onSendMessage={handleSendMessage}
                    onNewChat={handleNewChat}
                    onSelectSession={handleSelectSession}
                    onClearChat={handleClearChat}
                    onRetry={handleRetry}
                />
            </div>
        </div>
    );
}
