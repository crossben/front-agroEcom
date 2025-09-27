import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface ProductSearchProps {
    onSearch: (searchTerm: string) => void;
    onCategoryFilter: (category: string) => void;
    categories: string[];
    selectedCategory: string;
}

export function ProductSearch({ onSearch, onCategoryFilter, categories, selectedCategory }: ProductSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher des produits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filtres</span>
                </button>

                <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                    Rechercher
                </button>
            </form>

            {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => onCategoryFilter('')}
                            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === ''
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Toutes
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => onCategoryFilter(category)}
                                className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}