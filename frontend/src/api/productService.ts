import type { Product } from "@/models/Products";

const API_BASE_URL = 'http://localhost:3000/api/v1/products';

export interface PaginatedProductsResponse {
    data: Product[];
    total: number;
    page: number;
    pageSize: number;
}

export async function fetchProducts(page: number, pageSize: number): Promise<PaginatedProductsResponse> {
    const url = `${API_BASE_URL}?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const data: PaginatedProductsResponse = await response.json();
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
        const errorData = await response.json().catch(() => ({}));
        const error: any = new Error(errorData.message || 'Erro ao criar produto');
        error.response = {
            status: response.status,
            data: errorData,
        };
        throw error;
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
        const errorData = await response.json().catch(() => ({}));
        const error: any = new Error(errorData.message || 'Erro ao atualizar produto');
        error.response = {
            status: response.status,
            data: errorData,
        };
        throw error;
    }
    return await response.json();
}

export async function deleteProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao deletar produto');
    }
}

export async function getProductById(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Produto não encontrado');
    }
    return await response.json();
}
