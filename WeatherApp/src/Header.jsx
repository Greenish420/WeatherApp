import DropDown from "./DropDown";

function Header() {


    return (
        <div className='w-full min-[769px]:w-[80%] flex justify-between items-center'>
            <img src="images/logo.svg" alt="pic of a logo" />
            <DropDown text={"Units"} img={"images/icon-units.svg"} color={"#25253F"} />
        </div>
    );
}


export default Header;