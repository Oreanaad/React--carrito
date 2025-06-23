//PASO 1. Crear el contexto
import { createContext, useState } from "react";
//el que consumimos
export const FiltersContext = createContext()


//2 Crear el provider para proveer el contexto
//l que nos provee de acceso al contexto
export function FiltersProvider({children}){
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0,
    });
    return(
        <FiltersContext.Provider value={{
           filters, 
           setFilters
        }}
            >
            {children}
            </FiltersContext.Provider>
    )
}