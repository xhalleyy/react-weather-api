export {apiKey} from '@/hidekey';

const currentWeatherApi = async (lat: number, lon: number, apiKey: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

const forecastApi = async (lat: number, lon: number, apiKey: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

const searchApi= async (city: string, apiKey: string) => {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

export {currentWeatherApi, forecastApi, searchApi}