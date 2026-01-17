import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MessageActionsProps {
    content: string;
    type: 'text' | 'code' | 'image' | 'video';
    onRetry?: () => void;
    showRetry?: boolean;
}

export const MessageActions = ({ content, type, onRetry, showRetry }: MessageActionsProps) => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const showCopy = type === 'text' || type === 'code';
    const showDownload = type === 'image' || type === 'video';

    return (
        <div className="flex items-center gap-1">
            <TooltipProvider>
                {showCopy && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t("aiAssistant.actions.copy")}</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                {showDownload && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleDownload}
                            >
                                <Download className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t("aiAssistant.actions.download")}</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                {showRetry && onRetry && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={onRetry}
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t("aiAssistant.actions.retry")}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </TooltipProvider>
        </div>
    );
};
