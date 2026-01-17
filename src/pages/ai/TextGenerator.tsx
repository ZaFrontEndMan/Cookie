import { useState } from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { Message, ChatSession } from "@/types/chat";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

export default function TextGenerator() {
    const { t } = useLanguage();

    // Sample conversation
    const sampleMessages: Message[] = [
        {
            id: "1",
            role: "user",
            content: "Write a professional bio for a tech entrepreneur",
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            status: "idle",
            type: "text",
        },
        {
            id: "2",
            role: "assistant",
            content: `**Sarah Chen** is a visionary technology entrepreneur and the founder of NexGen Solutions, a pioneering AI-driven analytics platform that has transformed how enterprises leverage data intelligence.

With over 15 years of experience in the tech industry, Sarah has:

• Led three successful startups from concept to acquisition
• Raised over $50M in venture capital funding
• Built and scaled engineering teams across 4 continents
• Spoken at major tech conferences including TechCrunch Disrupt and Web Summit

Her expertise spans artificial intelligence, cloud architecture, and product strategy. Sarah holds a Master's degree in Computer Science from Stanford University and has been recognized as one of Forbes' "30 Under 30" in Technology.

When she's not revolutionizing the tech landscape, Sarah mentors aspiring entrepreneurs and advocates for diversity in STEM fields.`,
            timestamp: new Date(Date.now() - 3500000),
            status: "idle",
            type: "text",
        },
    ];

    const sampleSessions: ChatSession[] = [
        {
            id: "sample-1",
            title: "Professional Bio",
            lastMessage: "Write a professional bio for a tech entrepreneur",
            timestamp: new Date(Date.now() - 3600000),
            type: "text",
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
            type: 'text',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `This is a simulated response to: "${content}". In a real implementation, this would connect to an AI text generation API.`,
                timestamp: new Date(),
                status: 'idle',
                type: 'text',
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
                title={t("aiAssistant.generators.text.title")}
                description={t("aiAssistant.generators.text.description")}
            />
            <div className="flex-1 overflow-hidden">
                <ChatLayout
                    type="text"
                    messages={messages}
                    sessions={sessions}
                    activeSessionId={activeSessionId}
                    isLoading={isLoading}
                    placeholder={t("aiAssistant.generators.text.placeholder")}
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
