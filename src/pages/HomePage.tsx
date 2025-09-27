import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    ShoppingCartIcon,
    UsersIcon,
    TruckIcon,
    ArrowRightIcon,
    StarIcon
} from '@heroicons/react/24/outline';

export function HomePage() {
    const { user } = useAuth();

    const features = [
        {
            icon: <UsersIcon className="w-8 h-8" />,
            title: 'Produits Locaux',
            description: 'Découvrez des produits frais directement de nos producteurs locaux'
        },
        {
            icon: <UsersIcon className="w-8 h-8" />,
            title: 'Communauté',
            description: 'Connectez-vous avec des producteurs passionnés de votre région'
        },
        {
            icon: <TruckIcon className="w-8 h-8" />,
            title: 'Livraison Rapide',
            description: 'Recevez vos commandes rapidement et en toute sécurité'
        },
        {
            icon: <StarIcon className="w-8 h-8" />,
            title: 'Qualité Garantie',
            description: 'Tous nos produits sont contrôlés et certifiés'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Connectons l'agriculture
                            <span className="block text-green-200">à votre table</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                            AgriEcom facilite la rencontre entre producteurs locaux et consommateurs
                            pour une alimentation plus fraîche, plus locale et plus durable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {!user && (
                                <>
                                    <Link
                                        to="/register"
                                        className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg flex items-center space-x-2"
                                    >
                                        <span>Commencer maintenant</span>
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to="/products"
                                        className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
                                    >
                                        Découvrir les produits
                                    </Link>
                                </>
                            )}
                            {user && (
                                <Link
                                    to="/products"
                                    className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg flex items-center space-x-2"
                                >
                                    <ShoppingCartIcon className="w-6 h-6" />
                                    <span>Découvrir les produits</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-gray-50">
                        <path d="M1200 120L0 0 0 120z" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Pourquoi choisir AgriEcom ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Une plateforme pensée pour faciliter les échanges entre producteurs et consommateurs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-green-600 mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
                            <div className="text-gray-600">Producteurs partenaires</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
                            <div className="text-gray-600">Commandes livrées</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                            <div className="text-gray-600">Clients satisfaits</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!user && (
                <section className="bg-green-600 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Prêt à rejoindre notre communauté ?
                        </h2>
                        <p className="text-xl mb-8 text-green-100">
                            Inscrivez-vous dès maintenant et découvrez le meilleur de l'agriculture locale
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg"
                        >
                            <span>S'inscrire gratuitement</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}