import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatComposerProps {
    onSend: (message: string) => void;
    placeholder?: string;
    isLoading?: boolean;
    showAttachment?: boolean;
}

export const ChatComposer = ({
    onSend,
    placeholder,
    isLoading = false,
    showAttachment = false
}: ChatComposerProps) => {
    const [message, setMessage] = useState("");
    const { t } = useLanguage();

    const handleSend = () => {
        if (message.trim() && !isLoading) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-3">
            <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder || t("aiAssistant.composer.placeholder")}
                        className="min-h-[80px] max-h-[200px] resize-none pr-10"
                        disabled={isLoading}
                    />
                    {showAttachment && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-2 right-2 h-7 w-7"
                            disabled={isLoading}
                        >
                            <Paperclip className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
                <Button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    className="h-[80px] px-4"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
