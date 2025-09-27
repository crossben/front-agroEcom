import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePurchase = () => {
        // Simulate purchase
        alert('Commande simulée avec succès ! Merci pour votre achat.');
        clearCart();
        navigate('/products');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Connectez-vous pour voir votre panier</h1>
                    <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                        Se connecter
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
                        <p className="text-gray-600 mb-6">Découvrez nos produits frais et locaux</p>
                        <Link
                            to="/products"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Continuer mes achats
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Panier</h1>
                    <p className="text-gray-600">{items.length} article{items.length > 1 ? 's' : ''} dans votre panier</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <div key={item.productId} className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Produit #{item.productId}
                                        </h3>
                                        <p className="text-green-600 font-semibold">
                                            {Number(item.price).toFixed(2)} Cfa / unité
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <MinusIcon className="w-4 h-4" />
                                            </button>
                                            <span className="px-4 py-2 border-x border-gray-300 font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="text-lg font-bold text-gray-900 min-w-[80px] text-right">
                                            {(item.price * item.quantity).toFixed(2)} €
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-semibold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-green-600">
                                {getTotalPrice().toFixed(2)} €
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/products"
                                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
                            >
                                Continuer mes achats
                            </Link>
                            <button
                                onClick={handlePurchase}
                                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Finaliser l'achat
                            </button>
                        </div>

                        <button
                            onClick={clearCart}
                            className="w-full mt-4 text-red-600 hover:text-red-700 font-medium"
                        >
                            Vider le panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}