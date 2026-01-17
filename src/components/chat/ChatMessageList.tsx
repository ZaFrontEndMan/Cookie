import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/chat";
import { ChatMessageItem } from "./ChatMessageItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageSquare } from "lucide-react";

interface ChatMessageListProps {
    messages: Message[];
    onRetry?: (messageId: string) => void;
}

export const ChatMessageList = ({ messages, onRetry }: ChatMessageListProps) => {
    const { t } = useLanguage();

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-full bg-muted">
                            <MessageSquare className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{t("aiAssistant.emptyState.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("aiAssistant.emptyState.description")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1 px-4">
            <div className="max-w-4xl mx-auto py-4">
                {messages.map((message) => (
                    <ChatMessageItem
                        key={message.id}
                        message={message}
                        onRetry={onRetry ? () => onRetry(message.id) : undefined}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};
