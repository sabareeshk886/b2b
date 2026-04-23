'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, User, Mail, Phone, Shield, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { addTeamMember } from '../app/actions/team';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyName: string;
    onSuccess: () => void;
}

export default function AddMemberModal({ isOpen, onClose, companyName, onSuccess }: AddMemberModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            role: formData.get('role') as 'admin' | 'manager' | 'user',
            companyName: companyName,
        };

        const result = await addTeamMember(data);

        if (result.success) {
            onSuccess();
            onClose();
        } else {
            setError(result.error || 'Something went wrong');
        }
        setIsLoading(false);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-50 animate-in zoom-in-95 fade-in duration-300 outline-none">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Dialog.Title className="text-2xl font-bold text-[#222222]">Add Team Member</Dialog.Title>
                            <Dialog.Description className="text-[#717171] font-medium mt-1">
                                Invite a new member to your team
                            </Dialog.Description>
                        </div>
                        <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                            <X className="w-6 h-6 text-[#717171]" />
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#222222] ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0B0B0]" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="e.g. John Smith"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-[#222222] focus:bg-white rounded-2xl transition-all outline-none text-[#222222] font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#222222] ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0B0B0]" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-[#222222] focus:bg-white rounded-2xl transition-all outline-none text-[#222222] font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#222222] ml-1">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0B0]" />
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="+91..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#222222] focus:bg-white rounded-2xl transition-all outline-none text-[#222222] font-medium text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#222222] ml-1">Role</label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0B0]" />
                                    <select
                                        name="role"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#222222] focus:bg-white rounded-2xl transition-all outline-none text-[#222222] font-medium text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="user">Agent</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-[#222222] font-bold rounded-2xl transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 py-4 px-6 bg-[#222222] hover:bg-black text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Add Member'
                                )}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
