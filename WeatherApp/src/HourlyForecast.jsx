import { useState, useMemo } from "react";
import DropDown from "./DropDown";
import HForecastItem from "./HForecastItem";

function HourlyForecast({ hourlyForecastData, currentDay, weekDays, setCurrentDay, currentHour }) {
  const [isShowMore, setIsShowMore] = useState(false);

  const handleClick = () => setIsShowMore(!isShowMore);

  // find active hour index
  const activeIndex = useMemo(() => {
    return hourlyForecastData.findIndex(e => e.hour === currentHour);
  }, [hourlyForecastData, currentHour]);

  // calculate filtered array for "Show Less"
  const filteredData = useMemo(() => {
    if (activeIndex === -1) return []; // fallback
    const start = Math.max(0, activeIndex - 2);
    const end = Math.min(hourlyForecastData.length - 1, activeIndex + 4);
    return hourlyForecastData.slice(start, end + 1);
  }, [hourlyForecastData, activeIndex]);

  return (
    <div className="w-full min-[376px]:w-81.25 bg-[#25253F] rounded-2xl p-4 box-border flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Hourly forecast</h1>
        <DropDown
          text={currentDay}
          color="#3C3B5B"
          options={weekDays}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
        />
      </div>

      <div className="flex flex-col gap-4">
        {(hourlyForecastData.length > 0) &&
          (isShowMore
            ? hourlyForecastData.map(hourD => (
                <HForecastItem
                  key={hourD.hour}
                  hour={hourD.hour}
                  temp={Math.round(hourD.temperature)}
                  code={hourD.weatherCode}
                  currentHour={currentHour}
                />
              ))
            : filteredData.map(hourD => (
                <HForecastItem
                  key={hourD.hour}
                  hour={hourD.hour}
                  temp={Math.round(hourD.temperature)}
                  code={hourD.weatherCode}
                  currentHour={currentHour}
                />
              ))
          )
        }

        <div
          className="flex justify-center items-center flex-row w-full hover:cursor-pointer rounded-2xl gap-1"
          onClick={handleClick}
        >
          {isShowMore ? "Show Less" : "Show More"}
          <img
            src="/images/icon-dropdown.svg"
            alt="dropdown icon"
            className="transition-all"
            style={{ rotate: `${isShowMore ? "180deg" : "0deg"}` }}
          />
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
