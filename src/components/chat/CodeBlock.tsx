import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = "jsx", showLineNumbers = true }: CodeBlockProps) => {
    const lines = code.split('\n');

    const highlightCode = (line: string): JSX.Element => {
        // Simple syntax highlighting for JSX/JavaScript
        let highlighted = line;

        // Keywords
        const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'default', 'from', 'class', 'extends', 'new', 'this', 'super', 'async', 'await', 'try', 'catch'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="text-blue-600 dark:text-blue-400">$1</span>`);
        });

        // Strings
        highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-600 dark:text-green-400">$&</span>');

        // Comments
        highlighted = highlighted.replace(/(\/\/.*$)/g, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>');
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>');

        // JSX tags
        highlighted = highlighted.replace(/(&lt;\/?)([A-Z][a-zA-Z0-9]*)/g, '$1<span class="text-pink-600 dark:text-pink-400">$2</span>');
        highlighted = highlighted.replace(/(&lt;\/?)([a-z][a-zA-Z0-9]*)/g, '$1<span class="text-purple-600 dark:text-purple-400">$2</span>');

        // Numbers
        highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>');

        return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        <Card className="bg-[#1e1e1e] dark:bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
                <span className="text-xs text-gray-400 font-mono">{language}</span>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <pre className="p-4 font-mono text-sm leading-relaxed">
                    {lines.map((line, index) => (
                        <div key={index} className="flex">
                            {showLineNumbers && (
                                <span className="select-none text-gray-600 dark:text-gray-500 me-4 text-right" style={{ minWidth: '2rem' }}>
                                    {index + 1}
                                </span>
                            )}
                            <code className="flex-1">
                                {line.trim() === '' ? '\u00A0' : highlightCode(line)}
                            </code>
                        </div>
                    ))}
                </pre>
            </div>
        </Card>
    );
};
