const handleResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res)
    }
}

export function getGeoData(input: string): Promise<any> {
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}`, {
        method: 'GET',
    })
        .then(res => handleResponse(res))
}

export function getWeather(latitude: number, longitude: number, timezone: string): Promise<any> {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(timezone)}`, {
        method: 'GET',
    })
        .then(res => handleResponse(res))
}