import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, RegisterData } from '../types';
import { apiService } from '../services/apiService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const currentUser = await apiService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const user = await apiService.login(email, password);
            if (user) {
                setUser(user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const user = await apiService.register(userData);
            if (user) {
                setUser(user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        apiService.logout();
        setUser(null);
    };

    const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
        if (!user) return false;

        try {
            const updatedUser = await apiService.updateUser(user.id, userData);
            if (updatedUser) {
                setUser(updatedUser);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Profile update failed:', error);
            return false;
        }
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}