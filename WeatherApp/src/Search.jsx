import { useState } from "react";




function Search({ query, setQuery, suggestions,setRegion }) {

  const [isOpen, setIsOpen] = useState(false);


  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleSelect(index){
    setRegion([suggestions[index].toponymName,suggestions[index].countryName])
    setIsOpen(!isOpen);
    setQuery(suggestions[index].toponymName);
  }

  function handleButton(){
    if(!suggestions) return;
    setRegion([suggestions[0].toponymName,suggestions[0].countryName])
    setIsOpen(!isOpen);
    setQuery(suggestions[0].toponymName);
  }


  return (

    <div className='w-full flex flex-col min-[426px]:flex-row min-[426px]:justify-center min-[426px]:w-fit min-[426px]:gap-0 gap-2 text-center justify-center items-center'>

      <div className='w-full relative'>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onClick={handleOpen}  className='hover:scale-105 transition-all w-full min-[426px]:w-106.25 h-12 bg-[#25253F] flex justify-center items-center text-center rounded-xl color placeholder:text-white' placeholder='Search for a place...' />
        <img src="images/icon-search.svg" className='absolute left-4 top-3.75 hover:cursor-pointer' alt="" />
        {
          isOpen && <div className="w-full min-[426px]:w-106.25  box-border gap-1 bg-[#25253F] flex flex-col justify-center items-center text-center rounded-xl absolute z-10">
            {suggestions.map((sug,i) => { 
              return <div key ={i} onClick={() => handleSelect(i)} className="w-full min-[426px]:w-106.25 h-12 hover:bg-[#363655] flex justify-center items-center text-center rounded-[3px] mt-1">{sug.toponymName}</div>;
            })}
          </div>
        }
      </div>
      <button onClick={() => handleButton()} className='hover:scale-105 transition-all w-full min-[426px]:w-31.25 h-12 rounded-xl bg-[#4c5ddf] hover:cursor-pointer'>Search</button>

    </div>

  );


}


export default Search;