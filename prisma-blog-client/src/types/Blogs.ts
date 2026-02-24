export interface Blog {
    id : string;
    title : string;
    content : string;
    thumbnail ?: string | null;
    isFeatured : boolean;
    status : string;
    tags : string[];
    views : number;
    authorId : string;
    createdAt : string;
    updatedAt : string;
    comments : [];
    _count : {
        comments : number;
    }
}