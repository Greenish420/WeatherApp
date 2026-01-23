


function Item({title,info}){

    return(

        <div className=' hover:scale-105 transition-all flex flex-col justify-between items-center p-4 box-border bg-[#25253F] rounded-2xl w-40 h-32 border-2 border-[#353456] '>

          <h3>{title}</h3>

          <h2 className='text-4xl'>{info}</h2>

        </div>

    );

}



export default Item;