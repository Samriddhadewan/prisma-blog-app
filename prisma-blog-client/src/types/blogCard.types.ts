export interface BlogPost {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null;
    isFeatured : boolean;
    status: string;
    tags?: string[];
    views: number
    _count?: {
        comments: number;
    };
}