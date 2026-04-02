function HForecastItem({ hour, temp, code, currentHour }) {

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

    function formatHour(hour24) {
        if (hour24 === 0) return '12 AM';
        if (hour24 === 12) return '12 PM';
        if (hour24 > 0 && hour24 < 12) return `${hour24} AM`;
        return `${hour24 - 12} PM`;
    }

    return (
        <div style={{ border: `2px solid ${currentHour === hour ? 'yellow' : '#3C3B57'} ` }} className=' hover:scale-105 transition-all flex justify-between items-center pt-3 pr-3 pb-3 pl-1 rounded-xl bg-[#2F2F49] box-border h-16 text-2xl border-2 border-[#3C3B57]'>
            <div className='flex justify-center items-center flex-row w-fit'>
                {/* FIXED: Removed leading / before images */}
                <img src={`images/icon-${getWeatherImage(code)}.webp`} className='w-16 h-16' alt="" />
                <h1>{formatHour(hour)}</h1>
            </div>

            <h1>{temp}°</h1>
        </div>
    );
}

export default HForecastItem;