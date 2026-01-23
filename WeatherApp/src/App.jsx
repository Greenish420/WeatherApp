import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Search from './Search'
import Item from './Item'
import Card from './Card'
import DropDown from './DropDown'
import HForecastItem from './HForecastItem'
import axios from 'axios'
import HourlyForcast from './HourlyForecast'


function App() {

  const [data, setData] = useState([]);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentDay, setCurrentDay] = useState(getCurrentDay(new Date().getDay()));
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [region, setRegion] = useState(["Amman", "Jordan"]);



  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=Greenish420&featureClass=P`
        );
        setSuggestions(response.data.geonames || []);
      } catch (err) {
        console.error(err);
      }
    };


    const timeout = setTimeout(fetchSuggestions, 100);
    return () => clearTimeout(timeout);
  }, [query]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // const WeatherData_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';
  // const CityInfo_API_URL = 'https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count={NUMBER_OF_RESULTS}';
  // const SearchingCities_ApI_Url = 'https://secure.geonames.org/searchJSON?q=par&maxRows=5&username=Greenish420&featureClass=P';



  let fetchWeatherData = async (latitude, longitude) => {

    const respond = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode`);


    return respond.data;

  }


  let fetchCityInfo = async (cityName, numberOfResults) => {

    const respond = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=${numberOfResults}`);

    return respond.data;
  }


  let getWeatherDataByName = async (cityName) => {
    const cityInfo = await fetchCityInfo(cityName, 1);
    const longitude = cityInfo.results[0].longitude;
    const latitude = cityInfo.results[0].latitude;
    const weatherData = await fetchWeatherData(latitude, longitude);
    // console.log(weatherData);
    setData(weatherData);


  }

  useEffect(() => {
    getWeatherDataByName(region[0]);
  }, [region]);





  function getNext7Days() {
    const days = [];
    const today = new Date().getDay();

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < 7; i++) {
      days.push({
        dayName: dayNames[((today + i) > 6) ? today + i - 7 : today + i]
      });
    }

    return days;
  }

  const weekDays = getNext7Days();

  function getCurrentDay(dayNumber) {
    switch (dayNumber) {
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
      default: return "";
    }
  };

  useEffect(() => {
    // console.log(data);
    console.log(data.hourly);
    setHourlyForecastData(data.hourly
      ? data.hourly.time.map((timeStr, index) => {
        const date = new Date(timeStr);
        return {
          dateStr: timeStr.split("T")[0],
          hour: date.getHours(),
          temperature: data.hourly.temperature_2m[index],
          weatherCode: data.hourly.weathercode[index],
        };
      }).filter((obj) => obj.dateStr === getNearestDateForDay(currentDay)) : []);



  }, [currentDay, data]);

  function getNearestDateForDay(dayName) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const targetDayIndex = days.indexOf(dayName);
    if (targetDayIndex === -1) return null;

    const today = new Date();
    const todayIndex = today.getDay();

    let diff = targetDayIndex - todayIndex;
    if (diff < 0) diff += 7;

    const result = new Date(today);
    result.setDate(today.getDate() + diff);

    return result.toISOString().split("T")[0];
  }

  function getWeatherImage(code) {
    if (code === 0) return "sunny";
    if (code === 1 || code === 2) return "partly-cloudy";
    if (code === 3) return "overcast";
    if (code === 45 || code === 48) return "fog";
    if (code >= 51 && code <= 57) return "drizzle";
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snow";
    if (code >= 95 && code <= 99) return "storm";
    return "sunny"; // fallback
  }

  return (
    <div className='flex flex-col items-center text-center gap-8 w-full h-full  overflow-x-hidden justify-center box-border max-w-[100vw]'>
      <Header />

      <h1 className='w-2xs text-center items-center text-4xl'>How's the sky looking today?</h1>

      <Search query={query} setQuery={setQuery} suggestions={suggestions} setRegion={setRegion} />

      <div className='flex flex-col w-full min-[426px]:flex-row min-[426px]:gap-8 min-[426px]:items-start justify-center items-center gap-4'>
        <div>
          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-4 min-[426px]:gap-10'>


              <div className='relative flex justify-center items-center'>
                <img src="images/bg-today-small.svg" alt="" className='block min-[769px]:hidden' />
                <img src="images/bg-today-large.svg" alt="" className='hidden min-[769px]:block' />
                <div className='absolute top-12 flex flex-col min-[769px]:flex-row min-[769px]:gap-30 justify-center items-center gap-4'>
                  <div className='flex justify-center items-center gap-4 flex-col'>
                    <h1 className='text-4xl'>{`${region[0]} ,${region[1]}`}</h1>
                    <p>{`${getCurrentDay(new Date().getDay())} , ${new Date().toISOString().split("T")[0]}`}</p>
                  </div>
                  <div className='flex justify-center items-center gap-4 h-fit'>
                    {data.hourly &&
                      <>
                        <img src={`/images/icon-${getWeatherImage(data.hourly.weathercode[new Date().getHours()])}.webp`} alt="" className='inline w-30 h-30 min-[769px]:w-35 min-[769px]:h-35' />
                        <h1 className='text-8xl'>{`${Math.round(data.hourly.temperature_2m[new Date().getHours()])}°`}</h1>
                      </>
                    }
                  </div>
                </div>

              </div>



              <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 min-[769px]:gap-1 justify-items-center items-center'>
                {
                  data.hourly &&
                  <>
                    <Item title={"Feels like"} info={`${Math.round(data.hourly.apparent_temperature[new Date().getHours()])}°`} />
                    <Item title={"Humidity"} info={data.hourly.relativehumidity_2m[new Date().getHours()]} />
                    <Item title={"Wind"} info={`${data.hourly.windspeed_10m[new Date().getHours()]} Km/H`} />
                    <Item title={"Precepitation"} info={`${data.hourly.precipitation[new Date().getHours()]} mm`} />
                  </>
                }

              </div>
            </div>

          </div>

          <div>
            <div className='text-left w-full p-2 box-border mt-4 mb-2'>
              <h1 className='text-3xl text-left '>Daily forcast</h1>
            </div>



            <div className='grid grid-cols-[repeat(auto-fit,minmax(105px,1fr))] gap-2 items-center justify-items-center'>
              {
                data.daily &&
                data.daily.weathercode.map((wc, index) => {

                  return <Card key={index} code={wc} day={getNext7Days()[index].dayName} max={data.daily.temperature_2m_max[index]} min={data.daily.temperature_2m_min[index]} />;

                })
              }

            </div>
          </div>


        </div>

        <HourlyForcast hourlyForecastData={hourlyForecastData} currentDay={currentDay} weekDays={weekDays} setCurrentDay={setCurrentDay} currentHour={currentHour} />

      </div>


    </div>
  )
}

export default App
