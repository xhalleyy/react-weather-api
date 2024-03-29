import { Dispatch, SetStateAction, createContext } from "react"

type CityContextType = {
    city: string,
    setCity: Dispatch<SetStateAction<string>>
}

const CityContext = createContext<CityContextType>({city: "", setCity: () => {}});

export default CityContext