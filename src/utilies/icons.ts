const icons = (icon: string) => {
    switch (icon) {
        case '01d':
        case '01n': 
            return '/images/clearsky.png';
        case '02d':
        case '02n':
            return '/images/fewclouds.png';
        case '03d':
        case '03n':
            return '/images/scatteredclouds.png';
        case '04d':
        case '04n':
            return '/images/brokenclouds.png';
        case '09d':
        case '09n':
            return '/images/showerrain.png';
        case '10d':
        case '10n':
            return '/images/rainy.png';
        case '11d':
        case '11n':
            return '/images/thunderstorm.png';
        case '13d':
        case '13n':
            return '/images/snow.png';
        case '50d':
            return '/images/misty.png';
        default:
            return '/images/misty.png';
    }
}

export {icons}