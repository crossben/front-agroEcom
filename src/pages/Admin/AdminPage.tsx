import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { User, Product } from '../../types';
import { apiService } from '../../services/apiService';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import {
    UsersIcon,
    ShoppingBagIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export function AdminPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');

    useEffect(() => {
        if (user?.role === 'admin') {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        try {
            const [usersData, productsData] = await Promise.all([
                apiService.getUsers(),
                apiService.getProducts()
            ]);
            setUsers(usersData.filter(u => u.role !== 'admin'));
            setProducts(productsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleUserBlock = async (userId: string) => {
        try {
            await apiService.toggleUserBlock(userId);
            loadData();
        } catch (error) {
            console.error('Failed to toggle user block:', error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await apiService.deleteProduct(productId);
                loadData();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    const getRoleName = (role: string) => {
        switch (role) {
            case 'buyer':
                return 'Acheteur';
            case 'producer':
                return 'Producteur';
            default:
                return role;
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
                    <p className="text-gray-600">Cette page est réservée aux administrateurs.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Chargement des données...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
                    <p className="text-gray-600">Gestion des utilisateurs et des produits</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <UsersIcon className="w-8 h-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                                <p className="text-gray-600">Utilisateurs</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <ShoppingBagIcon className="w-8 h-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                                <p className="text-gray-600">Produits</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <ShieldExclamationIcon className="w-8 h-8 text-red-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.isBlocked).length}
                                </p>
                                <p className="text-gray-600">Utilisateurs bloqués</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`py-4 border-b-2 font-medium text-sm ${activeTab === 'users'
                                    ? 'border-green-600 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Utilisateurs ({users.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`py-4 border-b-2 font-medium text-sm ${activeTab === 'products'
                                    ? 'border-green-600 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Produits ({products.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'users' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion des utilisateurs</h2>

                                {users.length === 0 ? (
                                    <p className="text-gray-500">Aucun utilisateur trouvé.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 font-semibold text-gray-900">Nom</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Email</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Rôle</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Statut</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {users.map((user) => (
                                                    <tr key={user.id} className="hover:bg-gray-50">
                                                        <td className="py-4 font-medium text-gray-900">{user.name}</td>
                                                        <td className="py-4 text-gray-600">{user.email}</td>
                                                        <td className="py-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'producer'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-blue-100 text-blue-800'
                                                                }`}>
                                                                {getRoleName(user.role)}
                                                            </span>
                                                        </td>
                                                        <td className="py-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                {user.isBlocked ? 'Bloqué' : 'Actif'}
                                                            </span>
                                                        </td>
                                                        <td className="py-4">
                                                            <button
                                                                onClick={() => handleToggleUserBlock(user.id)}
                                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${user.isBlocked
                                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                                    : 'bg-red-600 text-white hover:bg-red-700'
                                                                    }`}
                                                            >
                                                                {user.isBlocked ? 'Débloquer' : 'Bloquer'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion des produits</h2>

                                {products.length === 0 ? (
                                    <p className="text-gray-500">Aucun produit trouvé.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 font-semibold text-gray-900">Produit</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Producteur</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Catégorie</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Prix</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Stock</th>
                                                    <th className="text-left py-3 font-semibold text-gray-900">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {products.map((product) => (
                                                    <tr key={product.id} className="hover:bg-gray-50">
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                {product.image && (
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.title}
                                                                        className="w-10 h-10 rounded-lg object-cover mr-3"
                                                                    />
                                                                )}
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{product.title}</p>
                                                                    <p className="text-sm text-gray-500 truncate max-w-xs">
                                                                        {product.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-gray-600">{product.producerName}</td>
                                                        <td className="py-4">
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 font-medium text-gray-900">
                                                            {product.price.toFixed(2)} € / {product.unit}
                                                        </td>
                                                        <td className="py-4 text-gray-600">{product.stock}</td>
                                                        <td className="py-4">
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                                className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}