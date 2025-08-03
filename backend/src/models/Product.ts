export interface Product {
    id: string;
    name: string;
    description: string | null;
    category: string;
    price: number;
    created_at: Date;
}