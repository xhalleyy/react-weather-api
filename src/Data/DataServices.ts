import { ICities, ICurrentWeather, IForecast } from '@/interfaces/interface';

// export {apiKey} from '@/app/hidekey';

const apiKey: string | undefined = process.env.NEXT_PUBLIC_ACCESS_apiKey;

const currentWeatherApi = async (lat: number, lon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const data: ICurrentWeather = await promise.json();
    // console.log(data);
    return data;
}

const forecastApi = async (lat: number, lon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const data: IForecast = await promise.json();
    // console.log(data);
    return data;
}

const searchApi= async (city: string) => {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`);
    const data: ICities[] = await promise.json();
    // console.log(data);
    return data;
}

export {currentWeatherApi, forecastApi, searchApi, apiKey}