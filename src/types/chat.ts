export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    status: 'idle' | 'sending' | 'error';
    type?: 'text' | 'code' | 'image' | 'video';
}

export interface ChatSession {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: Date;
    type: 'text' | 'code' | 'image' | 'video';
}

export type GeneratorType = 'text' | 'code' | 'image' | 'video';
