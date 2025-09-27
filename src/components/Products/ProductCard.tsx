import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: string) => void;
    showActions?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, showActions = false }: ProductCardProps) {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = () => {
        if (user && user.role !== 'producer') {
            addToCart(product, 1);
        }
    };

    const canAddToCart = user && user.role === 'buyer' && product.stock > 0;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                    src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Rupture de stock</span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {product.title}
                    </h3>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                        {product.category}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-green-600">
                        {product.price} Fcfa
                        <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </div>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                    Par <span className="font-medium text-gray-700">{product.producerName}</span>
                </div>

                <div className="flex gap-2">
                    {canAddToCart && (
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                        >
                            <ShoppingCartIcon className="w-4 h-4" />
                            <span>Ajouter</span>
                        </button>
                    )}

                    {showActions && onEdit && (
                        <button
                            onClick={() => onEdit(product)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Modifier
                        </button>
                    )}

                    {showActions && onDelete && (
                        <button
                            onClick={() => onDelete(product.id)}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                            Supprimer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}