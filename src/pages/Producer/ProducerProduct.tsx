import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Product, ProductFormData } from '../../types';
import { apiService } from '../../services/apiService';
import { ProductCard } from '../../components/Products/ProductCard';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function ProducerProductsPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        title: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        unit: '',
        image: ''
    });

    const categories = [
        'Légumes',
        'Fruits',
        'Produits Laitiers & Œufs',
        'Viandes',
        'Céréales',
        'Produits Transformés'
    ];

    useEffect(() => {
        if (user?.role === 'producer') {
            loadProducts();
        }
    }, [user]);

    const loadProducts = async () => {
        try {
            const allProducts = await apiService.getProducts();
            const userProducts = allProducts.filter(product => product.producerId === user?.id);
            setProducts(userProducts);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            if (editingProduct) {
                await apiService.updateProduct(editingProduct.id, formData);
            } else {
                await apiService.createProduct(formData);
            }

            resetForm();
            loadProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            unit: product.unit,
            image: product.image || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await apiService.deleteProduct(productId);
                loadProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            unit: '',
            image: ''
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    if (user?.role !== 'producer') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
                    <p className="text-gray-600">Cette page est réservée aux producteurs.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Chargement de vos produits...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Produits</h1>
                        <p className="text-gray-600">Gérez votre catalogue de produits</p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Ajouter un produit</span>
                    </button>
                </div>

                {/* Product Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Titre *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        placeholder="Nom du produit"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                                        placeholder="Description détaillée du produit"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prix (€) *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Unité *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.unit}
                                            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                            placeholder="kg, litre, pièce..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Stock *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.stock}
                                            onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catégorie *
                                        </label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        >
                                            <option value="">Sélectionner une catégorie</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL de l'image
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        placeholder="https://exemple.com/image.jpg"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {editingProduct ? 'Modifier' : 'Ajouter'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Vous n'avez pas encore de produits.</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Ajouter votre premier produit
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                showActions={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}