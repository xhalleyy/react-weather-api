interface ICurrentWeather {
    base: string
    clouds: {
        all: number
    }
    cod: number
    coord: {
        lon: number
        lat: number
    }
    dt: number
    id: number
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    name: string
    sys: {
        country: string
        id: number
        sunrise: number
        sunset: number
        type: number
    }
    timezone: number
    visibility: number
    weather: [{
        description: string
        icon: string
        id: number
        main: string
    }]
    wind: {
        deg: number
        gust: number
        speed: number
    }   
}

interface IForecast {
    city: {
        coord: {
            lat: number
            long: number
        }
        country: string
        id: number
        name: string
        population: number
        sunrise: number
        sunset: number
        timezone: number
    }
    cnt: number
    cod: string
    list: [{
        clouds: {
            all: number
        }
        dt: number
        dt_txt: string
        main: {
            feels_like: number
            grnd_level: number
            humidity: number
            pressure: number
            sea_level: number
            temp: number
            temp_kf: number
            temp_max: number
            temp_min: number
        }
        pop: number
        sys: {
            pod: string
        }
        visibility: number
        weather: [{
            description: string
            icon: string
            id: number
            main: string
        }]
        wind: {
            speed: number
            deg: number
            gust: number
        }
    }]
    message: number
}

interface ICities {
    country: string
    lat: number
    local_names?: {}
    lon: number
    name: string
    state: string
}