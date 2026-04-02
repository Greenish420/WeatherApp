

function Card({ day, max, min, code }) {

  function getWeatherImage(c) {
    if (c === 0) return "sunny";
    if (c === 1 || c === 2) return "partly-cloudy";
    if (c === 3) return "overcast";
    if (c === 45 || c === 48) return "fog";
    if (c >= 51 && c <= 57) return "drizzle";
    if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return "rain";
    if ((c >= 71 && c <= 77) || (c >= 85 && c <= 86)) return "snow";
    if (c >= 95 && c <= 99) return "storm";
    return "sunny"; // fallback
  }

  return (

    <div className='hover:scale-105 transition-all flex flex-col justify-evenly items-center  p-3  bg-[#25253F] rounded-2xl border-2 border-[#353456] w-28 h-40'>
      <p>{day}</p>
      <img src={`images/icon-${getWeatherImage(code)}.webp`} className="w-16 h-16" alt="" />
      <div className='w-full flex justify-between items-center' >
        <h5>{Math.round(max)}°</h5>
        <h5>{Math.round(min)}°</h5>
      </div>
    </div>

  );


}


export default Card;