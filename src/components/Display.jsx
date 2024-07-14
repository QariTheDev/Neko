import React, { useState, useEffect } from 'react';

export default function DynamicGallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('futa');

    const types = [
        "hentai", "ass", "pgif", "thigh", "hass", "boobs", "hboobs", "pussy",
        "paizuri", "pantsu", "lewdneko", "feet", "hyuri", "hthigh", "hmidriff", "anal", "nakadashi",
        "blowjob", "gonewild", "hkitsune", "tentacle", "4k", "kanna", "hentai_anal", "food", "neko",
        "holo", "kemonomimi", "coffee", "yaoi", "futa", "gah"
    ].sort();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                await fetchNewImage(selectedType);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [selectedType]);

    const fetchNewImage = async (type) => {
        try {
            setLoading(true);
            const response = await fetch(`https://nekobot.xyz/api/image?type=${type}`);
            const result = await response.json();
            setImages((prevImages) => [...prevImages, result.message]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='flex flex-col md:flex-row justify-center items-center md:space-x-3 space-y-3 mb-4'>
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setImages([]);
                                setSelectedType(e.target.value);
                            }}
                            className='p-2 border rounded-lg'
                        >
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => fetchNewImage(selectedType)}
                            className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Load More
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Random ${index}`}
                                className='object-cover w-full h-64 rounded-lg shadow-md'
                            />
                        ))}
                    </div>
                </>
            )}
            {error && <p className="text-red-500 mt-4">Error: {error}</p>}
        </section>
    );
}
