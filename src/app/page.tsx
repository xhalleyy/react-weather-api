import CurrentWeatherComponent from './components/CurrentWeatherComponent';
import SearchComponent from './components/SearchComponent';
import './weather.css';

export default function Home() {
  return (
    <div className="lightBG min-h-screen">
      <SearchComponent/>
      <CurrentWeatherComponent/>
    </div>
  );
}
