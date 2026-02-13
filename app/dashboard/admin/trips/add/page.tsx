'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddTripPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Form state - Basic Info
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [region, setRegion] = useState('NORTH');
    const [destinations, setDestinations] = useState<string[]>([]);
    const [newDestination, setNewDestination] = useState('');
    const [duration, setDuration] = useState(3);
    const [nights, setNights] = useState(2);
    const [shortDesc, setShortDesc] = useState('');
    const [overview, setOverview] = useState('');
    const [highlights, setHighlights] = useState<string[]>([]);
    const [newHighlight, setNewHighlight] = useState('');

    // Itinerary state
    type ItineraryDay = {
        day: number;
        title: string;
        description: string;
        activities: string[];
        meals: string;
        accommodation: string;
    };
    const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
    const [currentDayActivity, setCurrentDayActivity] = useState('');

    // Pricing state
    type PricingTier = {
        minPax: number;
        maxPax: number | null;
        pricePerPerson: number;
    };
    const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);

    // Inclusions/Exclusions state
    const [inclusions, setInclusions] = useState<string[]>([]);
    const [newInclusion, setNewInclusion] = useState('');
    const [exclusions, setExclusions] = useState<string[]>([]);
    const [newExclusion, setNewExclusion] = useState('');

    // Initialize itinerary days when duration changes
    const initializeItinerary = () => {
        const days: ItineraryDay[] = [];
        for (let i = 1; i <= duration; i++) {
            days.push({
                day: i,
                title: '',
                description: '',
                activities: [],
                meals: '',
                accommodation: '',
            });
        }
        setItineraryDays(days);
    };

    const addDestination = () => {
        if (newDestination.trim()) {
            setDestinations([...destinations, newDestination.trim()]);
            setNewDestination('');
        }
    };

    const removeDestination = (index: number) => {
        setDestinations(destinations.filter((_, i) => i !== index));
    };

    const addHighlight = () => {
        if (newHighlight.trim()) {
            setHighlights([...highlights, newHighlight.trim()]);
            setNewHighlight('');
        }
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    const updateItineraryDay = (dayIndex: number, field: keyof ItineraryDay, value: any) => {
        const updated = [...itineraryDays];
        updated[dayIndex] = { ...updated[dayIndex], [field]: value };
        setItineraryDays(updated);
    };

    const addActivityToDay = (dayIndex: number) => {
        if (currentDayActivity.trim()) {
            const updated = [...itineraryDays];
            updated[dayIndex].activities.push(currentDayActivity.trim());
            setItineraryDays(updated);
            setCurrentDayActivity('');
        }
    };

    const removeActivityFromDay = (dayIndex: number, activityIndex: number) => {
        const updated = [...itineraryDays];
        updated[dayIndex].activities = updated[dayIndex].activities.filter((_, i) => i !== activityIndex);
        setItineraryDays(updated);
    };

    const addPricingTier = () => {
        setPricingTiers([...pricingTiers, { minPax: 1, maxPax: null, pricePerPerson: 0 }]);
    };

    const removePricingTier = (index: number) => {
        setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    };

    const updatePricingTier = (index: number, field: keyof PricingTier, value: any) => {
        const updated = [...pricingTiers];
        updated[index] = { ...updated[index], [field]: value };
        setPricingTiers(updated);
    };

    const addInclusion = () => {
        if (newInclusion.trim()) {
            setInclusions([...inclusions, newInclusion.trim()]);
            setNewInclusion('');
        }
    };

    const removeInclusion = (index: number) => {
        setInclusions(inclusions.filter((_, i) => i !== index));
    };

    const addExclusion = () => {
        if (newExclusion.trim()) {
            setExclusions([...exclusions, newExclusion.trim()]);
            setNewExclusion('');
        }
    };

    const removeExclusion = (index: number) => {
        setExclusions(exclusions.filter((_, i) => i !== index));
    };

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);

        const tripData = {
            code,
            title,
            region,
            destinations,
            duration,
            nights,
            shortDesc,
            overview,
            highlights,
            itineraryDays,
            pricingTiers,
            inclusions,
            exclusions,
        };

        try {
            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save trip');
            }

            alert(`✅ Trip ${code} saved successfully!\n\nTrip ID: ${data.trip.id}`);
            router.push('/dashboard/admin/trips');
        } catch (error: any) {
            console.error('Error saving trip:', error);
            alert(`❌ Error saving trip:\n\n${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <Link
                href="/dashboard/admin/trips"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 font-semibold transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Trips</span>
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Trip</h1>
                <p className="text-gray-600">Create a new B2B itinerary</p>
            </div>

            {/* Progress Steps */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                    {[
                        { num: 1, label: 'Basic Info' },
                        { num: 2, label: 'Itinerary' },
                        { num: 3, label: 'Pricing' },
                        { num: 4, label: 'Details' },
                    ].map((s, idx) => (
                        <div key={s.num} className="flex items-center flex-1">
                            <div className={`flex items-center space-x-3 ${step >= s.num ? 'text-emerald-600' : 'text-gray-400'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s.num ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {s.num}
                                </div>
                                <span className="font-semibold hidden md:block">{s.label}</span>
                            </div>
                            {idx < 3 && (
                                <div className={`flex-1 h-1 mx-4 ${step > s.num ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Trip Code *
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="e.g., FWN100"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Region *
                                </label>
                                <select
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                >
                                    <option value="NORTH">North India</option>
                                    <option value="RAJASTHAN">Rajasthan</option>
                                    <option value="MUMBAI">Mumbai</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Trip Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Golden Triangle with Kashmir"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Destinations *
                            </label>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    value={newDestination}
                                    onChange={(e) => setNewDestination(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDestination())}
                                    placeholder="Add destination (e.g., Agra)"
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={addDestination}
                                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {destinations.map((dest, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold flex items-center space-x-2">
                                        <span>{dest}</span>
                                        <button onClick={() => removeDestination(idx)} className="hover:text-emerald-900">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Days *
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    min="1"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nights *
                                </label>
                                <input
                                    type="number"
                                    value={nights}
                                    onChange={(e) => setNights(Number(e.target.value))}
                                    min="1"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Short Description
                            </label>
                            <textarea
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                                rows={2}
                                placeholder="Brief one-liner about the trip"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Overview
                            </label>
                            <textarea
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                rows={4}
                                placeholder="Detailed overview of the trip"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Highlights
                            </label>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    value={newHighlight}
                                    onChange={(e) => setNewHighlight(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                                    placeholder="Add highlight"
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={addHighlight}
                                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {highlights.map((h, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold flex items-center space-x-2">
                                        <span>{h}</span>
                                        <button onClick={() => removeHighlight(idx)} className="hover:text-green-900">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
                            {itineraryDays.length === 0 && (
                                <button
                                    onClick={initializeItinerary}
                                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Initialize {duration} Days</span>
                                </button>
                            )}
                        </div>

                        {itineraryDays.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-600 mb-4">Click "Initialize {duration} Days" to create the itinerary structure</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {itineraryDays.map((day, dayIdx) => (
                                    <div key={dayIdx} className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                                        <h3 className="text-lg font-bold text-emerald-600 mb-4">Day {day.day}</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Day Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={day.title}
                                                    onChange={(e) => updateItineraryDay(dayIdx, 'title', e.target.value)}
                                                    placeholder="e.g., Arrival in Delhi"
                                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={day.description}
                                                    onChange={(e) => updateItineraryDay(dayIdx, 'description', e.target.value)}
                                                    rows={2}
                                                    placeholder="Brief description of the day"
                                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Activities
                                                </label>
                                                <div className="flex space-x-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={currentDayActivity}
                                                        onChange={(e) => setCurrentDayActivity(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivityToDay(dayIdx))}
                                                        placeholder="Add activity"
                                                        className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => addActivityToDay(dayIdx)}
                                                        className="px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {day.activities.map((activity, actIdx) => (
                                                        <div key={actIdx} className="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg">
                                                            <span className="text-gray-700">{activity}</span>
                                                            <button
                                                                onClick={() => removeActivityFromDay(dayIdx, actIdx)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Meals
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={day.meals}
                                                        onChange={(e) => updateItineraryDay(dayIdx, 'meals', e.target.value)}
                                                        placeholder="e.g., Breakfast, Lunch, Dinner"
                                                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Accommodation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={day.accommodation}
                                                        onChange={(e) => updateItineraryDay(dayIdx, 'accommodation', e.target.value)}
                                                        placeholder="e.g., 4-star hotel in Delhi"
                                                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">PAX-Based Pricing</h2>
                            <button
                                onClick={addPricingTier}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Pricing Tier</span>
                            </button>
                        </div>

                        {pricingTiers.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-600 mb-4">Add pricing tiers for different PAX counts</p>
                                <p className="text-sm text-gray-500">Example: 1-2 pax = ₹50,000, 3-4 pax = ₹45,000</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pricingTiers.map((tier, idx) => (
                                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900">Tier {idx + 1}</h3>
                                            <button
                                                onClick={() => removePricingTier(idx)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Min PAX *
                                                </label>
                                                <input
                                                    type="number"
                                                    value={tier.minPax}
                                                    onChange={(e) => updatePricingTier(idx, 'minPax', Number(e.target.value))}
                                                    min="1"
                                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Max PAX
                                                </label>
                                                <input
                                                    type="number"
                                                    value={tier.maxPax || ''}
                                                    onChange={(e) => updatePricingTier(idx, 'maxPax', e.target.value ? Number(e.target.value) : null)}
                                                    placeholder="Leave empty for unlimited"
                                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Price Per Person (₹) *
                                                </label>
                                                <input
                                                    type="number"
                                                    value={tier.pricePerPerson}
                                                    onChange={(e) => updatePricingTier(idx, 'pricePerPerson', Number(e.target.value))}
                                                    min="0"
                                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 px-4 py-2 bg-emerald-50 rounded-lg">
                                            <p className="text-sm text-emerald-700 font-semibold">
                                                {tier.minPax} {tier.maxPax ? `- ${tier.maxPax}` : '+'} people: ₹{tier.pricePerPerson.toLocaleString()} per person
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900">Inclusions & Exclusions</h2>

                        {/* Inclusions */}
                        <div>
                            <h3 className="text-lg font-bold text-green-700 mb-4">What's Included</h3>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    value={newInclusion}
                                    onChange={(e) => setNewInclusion(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                                    placeholder="Add inclusion (e.g., Airport transfers)"
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={addInclusion}
                                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            {inclusions.length === 0 ? (
                                <div className="text-center py-8 bg-green-50 rounded-xl">
                                    <p className="text-gray-600">No inclusions added yet</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {inclusions.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                    <Plus className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                            <button
                                                onClick={() => removeInclusion(idx)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Exclusions */}
                        <div>
                            <h3 className="text-lg font-bold text-red-700 mb-4">What's Not Included</h3>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    value={newExclusion}
                                    onChange={(e) => setNewExclusion(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExclusion())}
                                    placeholder="Add exclusion (e.g., International flights)"
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={addExclusion}
                                    className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            {exclusions.length === 0 ? (
                                <div className="text-center py-8 bg-red-50 rounded-xl">
                                    <p className="text-gray-600">No exclusions added yet</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {exclusions.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-4 py-3 bg-red-50 border-2 border-red-200 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                                    <X className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                            <button
                                                onClick={() => removeExclusion(idx)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-200">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Previous
                    </button>

                    <div className="flex items-center space-x-3">
                        <Link
                            href="/dashboard/admin/trips"
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </Link>
                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="px-6 py-3 gradient-primary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-6 py-3 gradient-primary text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                <span>{isSaving ? 'Saving...' : 'Save Trip'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
