const getPredictedAge = async (name: string) => {
    const res = await fetch(`https://api.agify.io?name=${name}`);
    return res.json();
}


const getPredictedGender = async (name: string) => {
    const res = await fetch(`https://api.genderize.io?name=${name}`);
    return res.json();
}

const getPredictedCountry = async (name: string) => {
    const res = await fetch(`https://api.nationalize.io?name=${name}`);
    return res.json();
}

interface Params {
    params: { name: string };
}

export default async function Page({ params }: Params) {
    const ageData = getPredictedAge(params.name);
    const genderData = getPredictedGender(params.name);
    const countryData = getPredictedCountry(params.name);

    const [age, gender, country] = await Promise.all([ageData, genderData, countryData]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Prediction Results
                    </h1>
                    <p className="text-xl text-gray-600">
                        AI-powered insights for <span className="font-semibold text-indigo-600 capitalize">{params.name}</span>
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Age Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 ml-3">Predicted Age</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{age.age || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mt-2">years old</p>
                    </div>

                    {/* Gender Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <div className="bg-pink-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 ml-3">Predicted Gender</h3>
                        </div>
                        <p className="text-3xl font-bold text-pink-600 capitalize">{gender.gender || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {gender.probability ? `${(gender.probability * 100).toFixed(1)}% confidence` : ''}
                        </p>
                    </div>

                    {/* Country Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 ml-3">Predicted Country</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600 uppercase">
                            {country.country?.[0]?.country_id || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            {country.country?.[0]?.probability ? `${(country.country[0].probability * 100).toFixed(1)}% confidence` : ''}
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">About These Predictions</h3>
                    <p className="text-gray-600 leading-relaxed">
                        These predictions are generated using AI algorithms that analyze name patterns from various datasets.
                        The accuracy may vary and should be taken as entertainment rather than factual information.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Age Prediction</span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Gender Analysis</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Country Origin</span>
                    </div>
                </div>
            </div>
        </div>
    );
}