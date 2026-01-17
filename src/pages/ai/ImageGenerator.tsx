import { useState } from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { Message, ChatSession } from "@/types/chat";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

export default function ImageGenerator() {
    const { t } = useLanguage();

    // Sample conversation with Unsplash image
    const sampleMessages: Message[] = [
        {
            id: "1",
            role: "user",
            content: "Generate a minimalist workspace photo with plants and natural light",
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            status: "idle",
            type: "image",
        },
        {
            id: "2",
            role: "assistant",
            content: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
            timestamp: new Date(Date.now() - 7100000),
            status: "idle",
            type: "image",
        },
    ];

    const sampleSessions: ChatSession[] = [
        {
            id: "sample-1",
            title: "Minimalist Workspace",
            lastMessage: "Generate a minimalist workspace photo with plants and natural light",
            timestamp: new Date(Date.now() - 7200000),
            type: "image",
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
            type: 'image',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Generated image based on: "${content}"`,
                timestamp: new Date(),
                status: 'idle',
                type: 'image',
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 2000);
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
                title={t("aiAssistant.generators.image.title")}
                description={t("aiAssistant.generators.image.description")}
            />
            <div className="flex-1 overflow-hidden">
                <ChatLayout
                    type="image"
                    messages={messages}
                    sessions={sessions}
                    activeSessionId={activeSessionId}
                    isLoading={isLoading}
                    placeholder={t("aiAssistant.generators.image.placeholder")}
                    showAttachment={true}
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
