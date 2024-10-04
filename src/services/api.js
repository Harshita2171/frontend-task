const API_URL = 'https://api.thedogapi.com/v1/breeds';

export const fetchDogBreeds = async () => {
    const response = await fetch(`${API_URL}`, {
        headers: {
            'x-api-key': 'live_FwlSh8aZoBL1pM9bAnZZAIDuU9jBzmiPmeptS6EMFrQnThJtUJ89q4wjHB4oWpJd'
        }
    });
    const data = await response.json();
    return data;
};

export const fetchDogBreedDetail = async (breed) => {
    const response = await fetch(`${API_URL}/search?q=${breed}`, {
        headers: {
            'x-api-key': 'live_FwlSh8aZoBL1pM9bAnZZAIDuU9jBzmiPmeptS6EMFrQnThJtUJ89q4wjHB4oWpJd'
        }
    });
    const data = await response.json();
    return data[0];
};
