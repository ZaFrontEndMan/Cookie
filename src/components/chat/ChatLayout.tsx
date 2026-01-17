import { Button } from "@/components/ui/button";
import { Trash2, History } from "lucide-react";
import { Message, ChatSession, GeneratorType } from "@/types/chat";
import { ChatHistory } from "./ChatHistory";
import { ChatMessageList } from "./ChatMessageList";
import { ChatComposer } from "./ChatComposer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ChatLayoutProps {
    type: GeneratorType;
    messages: Message[];
    sessions: ChatSession[];
    activeSessionId?: string;
    isLoading: boolean;
    placeholder?: string;
    showAttachment?: boolean;
    onSendMessage: (message: string) => void;
    onNewChat: () => void;
    onSelectSession: (sessionId: string) => void;
    onClearChat: () => void;
    onRetry?: (messageId: string) => void;
}

export const ChatLayout = ({
    type,
    messages,
    sessions,
    activeSessionId,
    isLoading,
    placeholder,
    showAttachment = false,
    onSendMessage,
    onNewChat,
    onSelectSession,
    onClearChat,
    onRetry,
}: ChatLayoutProps) => {
    const { t, language } = useLanguage();
    const isMobile = useIsMobile();
    const isRTL = language === 'ar';

    const [historyOpen, setHistoryOpen] = useState(false);

    const historyContent = (
        <ChatHistory
            sessions={sessions}
            activeSessionId={activeSessionId}
            onNewChat={() => {
                onNewChat();
                setHistoryOpen(false);
            }}
            onSelectSession={(id) => {
                onSelectSession(id);
                setHistoryOpen(false);
            }}
        />
    );

    return (
        <div className="flex h-full relative">
            {/* Main Chat Panel */}
            <div className="flex-1 flex flex-col border-r min-w-0">
                {/* Chat ToolBar */}
                <div className="border-b px-4 py-3 flex justify-between items-center bg-background">
                    <div className="flex items-center gap-2">
                        {isMobile && (
                            <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <History className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-80">
                                    {historyContent}
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>

                    {messages.length > 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8">
                                    <Trash2 className="h-4 w-4 me-2" />
                                    <span className="hidden sm:inline">{t("aiAssistant.actions.clear")}</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t("aiAssistant.clearConfirm.title")}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t("aiAssistant.clearConfirm.description")}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                                    <AlertDialogAction onClick={onClearChat}>
                                        {t("aiAssistant.actions.clear")}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>

                {/* Messages Area - Scrollable */}
                <div className="flex-1 overflow-hidden">
                    <ChatMessageList messages={messages} onRetry={onRetry} />
                </div>

                {/* Composer - Fixed at Bottom */}
                <div className="border-t bg-background">
                    <ChatComposer
                        onSend={onSendMessage}
                        placeholder={placeholder}
                        isLoading={isLoading}
                        showAttachment={showAttachment}
                    />
                </div>
            </div>

            {/* History Sidebar - Only for Desktop */}
            {!isMobile && (
                <div className="w-80 flex-shrink-0">
                    {historyContent}
                </div>
            )}
        </div>
    );
};
