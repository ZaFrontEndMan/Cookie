import { useState } from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { Message, ChatSession } from "@/types/chat";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

export default function VideoGenerator() {
    const { t } = useLanguage();

    // Sample conversation with video (Yesterday)
    const sampleMessages: Message[] = [
        {
            id: "1",
            role: "user",
            content: "Generate a cinematic video of ocean waves at sunset",
            timestamp: new Date(Date.now() - 86400000 - 3600000), // Yesterday, 1 hour before now
            status: "idle",
            type: "video",
        },
        {
            id: "2",
            role: "assistant",
            content: "https://www.youtube.com/embed/LL998ajnjN4", // Ocean sunset video
            timestamp: new Date(Date.now() - 86400000 - 3500000),
            status: "idle",
            type: "video",
        },
    ];

    const sampleSessions: ChatSession[] = [
        {
            id: "sample-1",
            title: "Ocean Sunset Video",
            lastMessage: "Generate a cinematic video of ocean waves at sunset",
            timestamp: new Date(Date.now() - 86400000 - 3600000),
            type: "video",
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
            type: 'video',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Generated video based on: "${content}"`,
                timestamp: new Date(),
                status: 'idle',
                type: 'video',
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 3000);
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
                title={t("aiAssistant.generators.video.title")}
                description={t("aiAssistant.generators.video.description")}
            />
            <div className="flex-1 overflow-hidden">
                <ChatLayout
                    type="video"
                    messages={messages}
                    sessions={sessions}
                    activeSessionId={activeSessionId}
                    isLoading={isLoading}
                    placeholder={t("aiAssistant.generators.video.placeholder")}
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
