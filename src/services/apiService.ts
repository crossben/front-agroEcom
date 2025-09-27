import type { User, Product, RegisterData, ProductFormData } from '@/types/index';
import api from './api';

let mockUsers: User[] = [];

let mockProducts: Product[] = [];
class ApiService {
    // Authentication
    async login(email: string, password: string): Promise<User | null> {
        const respose = await api.post('/login', { email, password });
        if (respose.data.token) {
            localStorage.setItem('auth_token', respose.data.token);
            localStorage.setItem('user', JSON.stringify(respose.data.user));
            return respose.data.user;
        }
        return null;
    }

    async register(userData: RegisterData): Promise<User | null> {
        const response = await api.post('/register', userData);
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
            return response.data.user;
        }
        return null;
    }

    async getCurrentUser(): Promise<User | null> {
        const response = await api.get('/profile');
        return response.data.user || null;
    }

    async logout(): Promise<void> {
        const response = await api.post('/logout');
        if (response.data.message === 'Logged out successfully') {
            localStorage.clear();
        }
    }

    // Users
    async getUsers(): Promise<User[]> {
        const response = await api.get('/all');
        mockUsers = response.data || [];
        return response.data || [];
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
        const response = await api.put(`/users/${userId}`, userData);
        return response.data || null;
    }

    async toggleUserBlock(userId: string): Promise<boolean> {
        const response = await api.put(`/toggle-block-user/${userId}`);
        if (response.data) {
            this.getUsers();
        }
        return false;
    }

    // Products
    async getProducts(): Promise<Product[]> {
        const response = await api.get('/products');
        mockProducts = response.data || [];
        return response.data || [];
    }

    async getProduct(id: string): Promise<Product | null> {
        const response = await api.get(`/products/${id}`);
        return response.data || null;
    }

    async createProduct(productData: ProductFormData): Promise<Product | null> {
        const user = JSON.parse(localStorage.getItem('user') || '{}') as User;

        if (!user) return null;

        const newProduct: Product = {
            id: Date.now().toString(),
            ...productData,
            producerId: user.id,
            producerName: user.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const response = await api.post('/products', newProduct);
        if (response.data) {
            mockProducts = [...mockProducts, newProduct];
        }
        return newProduct;
    }

    async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<Product | null> {
        const productIndex = mockProducts.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            mockProducts[productIndex] = {
                ...mockProducts[productIndex],
                ...productData,
                updatedAt: new Date().toISOString()
            };
            return mockProducts[productIndex];
        }
        return null;
    }

    async deleteProduct(id: string): Promise<boolean> {
        const productIndex = mockProducts.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            mockProducts.splice(productIndex, 1);
            return true;
        }
        return false;
    }
}

export const apiService = new ApiService();