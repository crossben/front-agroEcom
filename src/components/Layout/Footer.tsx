export function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AE</span>
                            </div>
                            <span className="text-xl font-bold">AgriEcom</span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            La plateforme qui connecte producteurs agricoles, éleveurs et consommateurs
                            pour une agriculture locale et durable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li><a href="/products" className="text-gray-300 hover:text-white transition-colors">Produits</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
                            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Aide</a></li>
                            <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">CGU</a></li>
                            <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Confidentialité</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 AgriEcom. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}