'use client';

import { useState, useEffect } from 'react';
import { Building2, User, Bell, Lock, CreditCard, Globe, Camera, Trash2, Loader2 } from 'lucide-react';
import { getCompanyDetails, updateCompanyDetails } from '../../actions/team';

export default function SettingsPage() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState('g holidays');
    const [companyEmail, setCompanyEmail] = useState('admin@gmail.com');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [address, setAddress] = useState('123 Travel Street, Mumbai, India');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState<any>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        if (!isEditing) return;
        setLogoPreview(null);
    };

    const handleEdit = () => {
        setOriginalData({ companyName, companyEmail, phone, address, logoPreview });
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (originalData) {
            setCompanyName(originalData.companyName);
            setCompanyEmail(originalData.companyEmail);
            setPhone(originalData.phone);
            setAddress(originalData.address);
            setLogoPreview(originalData.logoPreview);
        }
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!companyId) return;

        setIsSaving(true);
        try {
            const result = await updateCompanyDetails({
                id: companyId,
                name: companyName,
                email: companyEmail,
                phone: phone,
                address: address,
                logoUrl: logoPreview
            });

            if (result.success) {
                // Update local storage for immediate header update if name changed
                localStorage.setItem('companyName', companyName);
                localStorage.setItem('companyEmail', companyEmail);
                setCompanyEmail(companyEmail);
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert(result.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('An error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        async function fetchDetails() {
            const storedCompany = localStorage.getItem('companyName') || 'g holidays';
            const details = await getCompanyDetails(storedCompany);
            
            if (details) {
                setCompanyId(details.id);
                setCompanyName(details.name);
                setCompanyEmail(details.email);
                setPhone(details.phone);
                setAddress(details.address || '');
                setLogoPreview(details.logoUrl || null);
            }
            setIsInitialLoading(false);
        }

        fetchDetails();
    }, []);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-[#222222] mb-1">Profile</h1>
                <p className="text-[#717171] font-medium">Manage your agency profile, team access, and billing</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Company Profile */}
                <div className="lg:col-span-2 bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-[#EBEBEB]">
                            <Building2 className="w-6 h-6 text-[#222222]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#222222]">Agency Profile</h2>
                            <p className="text-sm text-[#717171] font-medium">Update your public business information</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Logo Upload Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b border-[#EBEBEB]">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-[#EBEBEB] flex items-center justify-center overflow-hidden transition-all hover:border-[#222222]">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <Globe className="w-8 h-8 text-gray-300" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                                    {isEditing && (
                                        <>
                                            <label className="w-8 h-8 bg-[#222222] text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white">
                                                <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                                                <Camera className="w-4 h-4" />
                                            </label>
                                            {logoPreview && (
                                                <button 
                                                    onClick={handleRemoveLogo}
                                                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-[#222222] uppercase tracking-tight mb-1">Agency Logo</h3>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-xs text-[#717171] font-medium leading-relaxed max-w-sm">
                                        Please upload your agency logo with the <span className="font-bold text-[#222222]">background removed (transparent PNG)</span> for best results on brochures and quotes.
                                    </p>
                                    {isEditing && logoPreview && (
                                        <div className="flex space-x-4">
                                            <label className="text-xs font-bold text-[#222222] cursor-pointer hover:underline">
                                                <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                                                Change Logo
                                            </label>
                                            <button onClick={handleRemoveLogo} className="text-xs font-bold text-red-500 hover:underline">
                                                Remove Logo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 pt-2">
                            <div>
                                <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Agency Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    readOnly={!isEditing}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className={`w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none transition-colors font-medium text-[#222222] ${!isEditing ? 'bg-gray-50 border-transparent cursor-not-allowed' : 'focus:border-[#222222]'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Email Address</label>
                                <input
                                    type="email"
                                    value={companyEmail}
                                    readOnly={!isEditing}
                                    onChange={(e) => setCompanyEmail(e.target.value)}
                                    className={`w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none transition-colors font-medium text-[#222222] ${!isEditing ? 'bg-gray-50 border-transparent cursor-not-allowed' : 'focus:border-[#222222]'}`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                readOnly={!isEditing}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none transition-colors font-medium text-[#222222] ${!isEditing ? 'bg-gray-50 border-transparent cursor-not-allowed' : 'focus:border-[#222222]'}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Business Address</label>
                            <textarea
                                rows={3}
                                value={address}
                                readOnly={!isEditing}
                                onChange={(e) => setAddress(e.target.value)}
                                className={`w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none transition-colors font-medium text-[#222222] resize-none ${!isEditing ? 'bg-gray-50 border-transparent cursor-not-allowed' : 'focus:border-[#222222]'}`}
                            />
                        </div>
                        <div className="pt-4 flex flex-wrap gap-4">
                            {!isEditing ? (
                                <button 
                                    onClick={handleEdit}
                                    disabled={isInitialLoading}
                                    className="px-10 py-3.5 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-10 py-3.5 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : 'Save Changes'}
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="px-10 py-3.5 bg-white border border-[#EBEBEB] text-[#222222] rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Settings */}
                <div className="space-y-6">
                    {/* Billing */}
                    <div className="bg-[#222222] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <CreditCard className="w-5 h-5 text-emerald-400" />
                                <h3 className="font-bold uppercase tracking-widest text-xs">Current Plan</h3>
                            </div>
                            <p className="text-3xl font-bold mb-2">PREMIUM</p>
                            <p className="text-sm text-gray-400 font-medium mb-6">Enjoy 25% flat discount on all wholesale itineraries.</p>
                            <button className="text-sm font-black text-white hover:underline flex items-center">
                                Manage Subscription <Globe className="w-3 h-3 ml-2" />
                            </button>
                        </div>
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                    </div>

                    {[
                        { label: 'Security', icon: Lock, desc: 'Passwords and 2FA', color: 'text-orange-600 bg-orange-50' },
                        { label: 'Notifications', icon: Bell, desc: 'Email and alerts', color: 'text-blue-600 bg-blue-50' },
                        { label: 'Personal Access', icon: User, desc: 'Member permissions', color: 'text-purple-600 bg-purple-50' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all cursor-pointer group">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#222222]">{item.label}</h3>
                                    <p className="text-xs text-[#717171] font-medium">{item.desc}</p>
                                </div>
                                <button className="text-xs font-bold text-[#222222] group-hover:underline">Manage</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

