import type { Product } from "@/models/Products";

const API_BASE_URL = 'http://localhost:3000/api/v1/products';

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return await response.json();
}

export async function updateProduct(product: Omit<Product, 'created_at'>) {
    const response = await fetch(`${API_BASE_URL}/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
}

export async function deleteProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
}

export async function getProductById(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Product not found');
    }
    return await response.json();
}
