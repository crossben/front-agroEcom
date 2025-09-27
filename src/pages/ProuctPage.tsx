import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { apiService } from '../services/apiService';
import { ProductCard } from '../components/Products/ProductCard';
import { ProductSearch } from '../components/Products/ProductSearch';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchTerm, selectedCategory]);

    const loadProducts = async () => {
        try {
            const data = await apiService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
    };

    const categories = Array.from(new Set(products.map(product => product.category)));

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Chargement des produits...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Nos Produits Locaux
                    </h1>
                    <p className="text-gray-600">
                        Découvrez une sélection de produits frais directement de nos producteurs partenaires
                    </p>
                </div>

                <ProductSearch
                    onSearch={handleSearch}
                    onCategoryFilter={handleCategoryFilter}
                    categories={categories}
                    selectedCategory={selectedCategory}
                />

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun produit trouvé.</p>
                        {(searchTerm || selectedCategory) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('');
                                }}
                                className="mt-4 text-green-600 hover:text-green-700 font-medium"
                            >
                                Afficher tous les produits
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}