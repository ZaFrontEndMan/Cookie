import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot, AlertCircle } from "lucide-react";
import { Message } from "@/types/chat";
import { MessageActions } from "./MessageActions";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
    message: Message;
    onRetry?: () => void;
}

export const ChatMessageItem = ({ message, onRetry }: ChatMessageItemProps) => {
    const isUser = message.role === 'user';
    const isError = message.status === 'error';
    const isSending = message.status === 'sending';

    return (
        <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
            <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
            </Avatar>

            <div className={cn("flex-1 max-w-[80%]", isUser && "flex flex-col items-end")}>
                <Card className={cn(
                    "p-3",
                    isUser ? "bg-primary text-primary-foreground" : "bg-muted",
                    isError && "border-red-500"
                )}>
                    {isError && (
                        <div className="flex items-center gap-2 text-red-600 mb-2 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>Failed to send</span>
                        </div>
                    )}

                    {message.type === 'code' && !isUser ? (
                        <div className="space-y-2">
                            <CodeBlock code={message.content} language="jsx" />
                        </div>
                    ) : message.type === 'image' && !isUser ? (
                        <div className="space-y-2">
                            <img
                                src={message.content}
                                alt="Generated image"
                                className="w-full max-w-md rounded-lg"
                                loading="lazy"
                            />
                            <p className="text-xs text-muted-foreground">
                                Photo from Unsplash
                            </p>
                        </div>
                    ) : message.type === 'video' && !isUser ? (
                        <div className="space-y-2">
                            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
                                <iframe
                                    src={message.content}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Generated video"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Video preview
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}

                    {isSending && (
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </Card>

                <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {!isUser && message.status === 'idle' && (
                        <MessageActions
                            content={message.content}
                            type={message.type || 'text'}
                            onRetry={onRetry}
                            showRetry={isError}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
