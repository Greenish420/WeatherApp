import { useState } from "react";




function DropDown({ text, img, options = [], color, setCurrentDay, currentDay }) {

    const [isOpen, setIsOpen] = useState(false);

    let handleOpen = () => {
        setIsOpen(!isOpen);
    }

    let handleSelect = (option) => {


        setCurrentDay(option.dayName);
        setIsOpen(!isOpen);

    }

    return (

        <div onClick={handleOpen}>
            <div className='flex gap-1 justify-evenly items-center w-fit p-1.5 rounded-[5px] cursor-pointer hover:scale-105 transition-all ' style={{ backgroundColor: color }}>
                {(img !== "" || img === null || img === undefined) && <img src={img} />}
                <p>{text}</p>
                <img src="/images/icon-dropdown.svg" alt="a dropdown icon" style={{rotate : `${isOpen ? "180deg" : "0deg"}`}} className="transition-all"/>
            </div>
            {
                isOpen && (
                    <div className="absolute mt-1 bg-[#3C3B5B] text-white rounded shadow-lg z-10">
                        {options.map((option, index) => (
                            <div key={index} style={{ backgroundColor: `${currentDay === option.dayName ? "#565576" : "#3C3B5B"}` }} className="px-4 py-2 hover:bg-[#49486a] cursor-pointer" onClick={() => handleSelect(option)}>
                                {option.dayName}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );

}

export default DropDown;