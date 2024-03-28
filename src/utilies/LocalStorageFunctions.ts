export const saveToLocal = (city: string) => {
    let favorites: string[] = getLocal();

    if (!favorites.includes(city)){
        favorites.push(city)
    }

    localStorage.setItem("favorited", JSON.stringify(favorites))
}

export const getLocal = (): string[] => {
    let localStorageData: string | null = localStorage.getItem("favorited");

    if(localStorageData === null){
        return []
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocal = (city: string) => {
    let favorites: string[] = getLocal();
    let cityIndex: number = favorites.indexOf(city);
    favorites.splice(cityIndex,1);

    localStorage.setItem("favorited", JSON.stringify(favorites));
}