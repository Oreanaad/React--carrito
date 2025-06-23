import  './Filters.css';
import {  useId } from 'react';
import { useFilters } from '../hooks/UseFilters';

export function Filters(){
    const {filters, setFilters} =useFilters()
    
    const handleMinPriceId = useId(); //np funciona para maps el useid
    
    const handleCategoryId = useId();    
    const handleChangeMinPrice = (event) => {
       
        setFilters(prevState =>({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory=(event) =>{
          setFilters(prevState =>({
            ...prevState,
            category: event.target.value
        }))
    }
    return(
        <section className="filters">
            <div>
                <label htmlFor="price">Precio a partir de:</label>
                <input
                type ='range'
                id={handleMinPriceId}
                min= '0'
                max= '1000'
                onChange={handleChangeMinPrice}
                value={filters.minPrice}
                ></input>
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={handleCategoryId}>Categoria</label>
                <select id= {handleCategoryId} onChange={handleChangeCategory}>
                    <option value="all">Total</option>
                    <option value="women's clothing">Ropa de mujer</option>
                    <option value="electronics">Electronicos</option>
                    <option value="jewelery">Joyeria</option>  
                    </select>  
            </div>
            </section>
    )
}