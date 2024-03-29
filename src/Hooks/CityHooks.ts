import { useState } from "react"

const CityHooks = () => {
    const [city, setCity] = useState<string>("")

    return {city, setCity}
}

export default CityHooks