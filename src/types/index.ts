export interface User {
    id: string;
    name: string;
    email: string;
    role: 'buyer' | 'producer' | 'admin';
    phone?: string;
    address?: string;
    profileImage?: string;
    isBlocked?: boolean;
    createdAt: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string;
    category: string;
    producerId: string;
    producerName: string;
    stock: number;
    unit: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => Promise<boolean>;
    isLoading: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'buyer' | 'producer';
    phone?: string;
    address?: string;
}

export interface ProductFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    unit: string;
    image?: string;
}