import { fetchData } from "./fetchData";
import { Product } from "../models/product";

// search function
export async function searchFunction(query: string): Promise<Product[]> {
    const response = await fetchData(`/api/v1/products/query/${query}`);
    return response.json();
}

// fetching all products
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetchData(`/api/v1/products`);
    return response.json();
}

// fetching all categeries
export async function fetchCategories() {
    const response = await fetchData(`/api/v1/products/availableCategories`);
    return response.json();
}

// fetching a category
export async function fetchCategory(category: string, records?: number): Promise<Product[]> {
    let response;

    if (records){
        response = await fetchData(`/api/v1/products/category?category=${category}&records=${records}`);
    } else {
        response = await fetchData(`/api/v1/products/category?category=${category}`);
    }

    return response.json();
}

// streaming an image
export function imageStreamer(key: string) {
    const imageUrl = `/api/v1/products/image/${key}`;
    return imageUrl;
}

