import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import {
    Bars3Icon,
    XMarkIcon,
    ShoppingCartIcon,
    UserIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export function Header() {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AE</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">AgriEcom</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                        >
                            Produits
                        </Link>
                        {user?.role === 'producer' && (
                            <Link
                                to="/producer/products"
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                            >
                                Mes Produits
                            </Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                            >
                                Administration
                            </Link>
                        )}
                    </nav>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    to="/cart"
                                    className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <ShoppingCartIcon className="w-6 h-6" />
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    <span className="font-medium">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                                    title="Se déconnecter"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1"
                                onClick={closeMobileMenu}
                            >
                                Produits
                            </Link>
                            {user?.role === 'producer' && (
                                <Link
                                    to="/producer/products"
                                    className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1"
                                    onClick={closeMobileMenu}
                                >
                                    Mes Produits
                                </Link>
                            )}
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1"
                                    onClick={closeMobileMenu}
                                >
                                    Administration
                                </Link>
                            )}

                            {user ? (
                                <>
                                    <div className="border-t border-gray-200 pt-4">
                                        <Link
                                            to="/cart"
                                            className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors px-2 py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            <ShoppingCartIcon className="w-5 h-5" />
                                            <span>Panier ({getTotalItems()})</span>
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors px-2 py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            <span>{user.name}</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors px-2 py-1 w-full text-left"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                            <span>Se déconnecter</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1"
                                        onClick={closeMobileMenu}
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                                        onClick={closeMobileMenu}
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}