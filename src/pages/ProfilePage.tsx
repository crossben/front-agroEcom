import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { UserIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const success = await updateProfile(formData);
        if (success) {
            setIsEditing(false);
        }
        setIsLoading(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            address: user?.address || ''
        });
        setIsEditing(false);
    };

    const getRoleName = (role: string) => {
        switch (role) {
            case 'buyer':
                return 'Acheteur';
            case 'producer':
                return 'Producteur';
            case 'admin':
                return 'Administrateur';
            default:
                return role;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <UserIcon className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-white">
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <p className="text-green-100">{getRoleName(user.role)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Informations du profil</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                    <span>Modifier</span>
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom complet
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2">{user.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <p className="text-gray-900 py-2">{user.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Téléphone
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2">{user.phone || 'Non renseigné'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rôle
                                    </label>
                                    <p className="text-gray-900 py-2">{getRoleName(user.role)}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                                    />
                                ) : (
                                    <p className="text-gray-900 py-2">{user.address || 'Non renseignée'}</p>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex justify-end space-x-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                        <span>Annuler</span>
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <LoadingSpinner size="sm" />
                                        ) : (
                                            <CheckIcon className="w-4 h-4" />
                                        )}
                                        <span>Enregistrer</span>
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Membre depuis le {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}