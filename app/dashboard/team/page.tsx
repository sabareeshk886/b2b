'use client';

import { Users, Mail, Phone, Shield, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getTeamMembers } from '../../actions/team';
import AddMemberModal from '../../../components/AddMemberModal';

export default function TeamPage() {
    const [adminName, setAdminName] = useState('Sabareesh');
    const [companyName, setCompanyName] = useState('g holidays');
    const [members, setMembers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadMembers = useCallback(async () => {
        setIsLoading(true);
        const data = await getTeamMembers(companyName);
        setMembers(data);
        setIsLoading(false);
    }, [companyName]);

    useEffect(() => {
        const storedUser = localStorage.getItem('userName');
        const storedCompany = localStorage.getItem('companyName');
        
        if (storedUser) setAdminName(storedUser);
        if (storedCompany) setCompanyName(storedCompany);
        
        loadMembers();
    }, [loadMembers]);

    const stats = [
        { label: 'Total Members', value: members.length.toString(), color: 'text-blue-600 bg-blue-50' },
        { label: 'Admins', value: members.filter(m => m.role === 'admin').length.toString(), color: 'text-[#006A4E] bg-emerald-50' },
        { label: 'Managers', value: members.filter(m => m.role === 'manager').length.toString(), color: 'text-orange-600 bg-orange-50' },
        { label: 'Agents', value: members.filter(m => m.role === 'user').length.toString(), color: 'text-purple-600 bg-purple-50' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#222222] mb-1">Team Members</h1>
                    <p className="text-[#717171] font-medium">Manage your team and their system access</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3.5 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5 font-bold" />
                    <span>Add Member</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                            <Users className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-[#717171] mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#222222]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Team List */}
            <div className="bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-[#222222]">System Users</h2>
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[#717171]" />}
                </div>
                
                <div className="grid gap-6">
                    {members.length === 0 && !isLoading ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No team members found.</p>
                        </div>
                    ) : (
                        members.map((member, idx) => (
                            <div key={member.id || idx} className="group border border-[#EBEBEB] p-6 rounded-2xl hover:border-[#222222] hover:shadow-airbnb transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                                <div className="flex items-center space-x-5">
                                    <div className="w-14 h-14 rounded-full bg-[#222222] flex items-center justify-center text-white font-bold text-xl ring-4 ring-gray-50 uppercase">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#006A4E] transition-colors">{member.name}</h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 text-sm text-[#717171] font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4" />
                                                <span>{member.email}</span>
                                            </div>
                                            {member.phone && (
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{member.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-[#EBEBEB]">
                                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full border border-[#EBEBEB]">
                                        <Shield className="w-4 h-4 text-[#006A4E]" />
                                        <span className="text-xs font-bold text-[#222222] uppercase tracking-wide">{member.role}</span>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                                        member.isActive ? 'bg-emerald-50 text-[#006A4E]' : 'bg-gray-100 text-[#717171]'
                                    }`}>
                                        {member.isActive ? 'active' : 'inactive'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <AddMemberModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                companyName={companyName}
                onSuccess={loadMembers}
            />
        </div>
    );
}

