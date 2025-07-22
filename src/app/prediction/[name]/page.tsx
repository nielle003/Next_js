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
        <div>
            <div>
                <h1>Predicted Data for {params.name}</h1>
                <p>Predicted Age: {age.age}</p>
                <p>Predicted Gender: {gender.gender}</p>
                <p>Predicted Country: {country.country[0].country_id}</p>
            </div>
        </div>
    );
}