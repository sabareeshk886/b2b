'use client';

import { useState } from 'react';

export default function SeedPage() {
    const [status, setStatus] = useState('Ready to seed database...');
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        setStatus('Seeding in progress...');
        
        try {
            const response = await fetch('/api/seed', { method: 'POST' });
            const data = await response.json();
            
            if (response.ok) {
                setStatus(`✅ Success: ${data.message}`);
            } else {
                setStatus(`❌ Error: ${data.error}`);
            }
        } catch (err: any) {
            setStatus(`❌ System Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
            <p className="mb-6 text-gray-600">This will populate your Trip Catalog with sample itineraries.</p>
            <button 
                onClick={handleSeed}
                disabled={loading}
                className="px-6 py-3 bg-[#006A4E] text-white rounded-xl font-bold disabled:opacity-50 hover:bg-[#005a42] transition-colors cursor-pointer active:scale-95 shadow-lg relative z-50"
            >
                {loading ? 'Seeding...' : 'Seed Sample Trips'}
            </button>
            <div className="mt-8 p-4 bg-gray-50 border rounded-xl font-mono text-sm">
                {status}
            </div>
        </div>
    );
}
