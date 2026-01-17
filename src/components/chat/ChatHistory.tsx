import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Plus, Search, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatSession } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatHistoryProps {
    sessions: ChatSession[];
    activeSessionId?: string;
    onNewChat: () => void;
    onSelectSession: (sessionId: string) => void;
}

export const ChatHistory = ({
    sessions,
    activeSessionId,
    onNewChat,
    onSelectSession
}: ChatHistoryProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useLanguage();

    const filteredSessions = sessions.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todaySessions = filteredSessions.filter(s => new Date(s.timestamp) >= today);
    const yesterdaySessions = filteredSessions.filter(s => {
        const date = new Date(s.timestamp);
        return date >= yesterday && date < today;
    });

    const renderSessionGroup = (title: string, sessions: ChatSession[]) => {
        if (sessions.length === 0) return null;

        return (
            <div className="mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground mb-1.5 px-2">
                    {title}
                </h3>
                <div className="space-y-1">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            className={cn(
                                "w-full text-left p-2 rounded-md hover:bg-accent transition-colors",
                                activeSessionId === session.id && "bg-accent border-l-2 border-primary"
                            )}
                            onClick={() => onSelectSession(session.id)}
                        >
                            <div className="flex items-start gap-2">
                                <MessageSquare className="h-3.5 w-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{session.title}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {session.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-muted/30">
            {/* Header */}
            <div className="p-3 border-b space-y-2">
                <Button onClick={onNewChat} className="w-full h-9" size="sm">
                    <Plus className="h-4 w-4 me-2" />
                    {t("aiAssistant.newChat")}
                </Button>

                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("aiAssistant.search")}
                        className="pl-8 h-8 text-xs"
                    />
                </div>
            </div>

            {/* Sessions List */}
            <ScrollArea className="flex-1">
                <div className="p-3">
                    {renderSessionGroup(t("aiAssistant.history.today"), todaySessions)}
                    {renderSessionGroup(t("aiAssistant.history.yesterday"), yesterdaySessions)}

                    {filteredSessions.length === 0 && (
                        <div className="text-center py-8 text-xs text-muted-foreground">
                            {searchQuery ? t("aiAssistant.noResults") : t("aiAssistant.noChats")}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};
