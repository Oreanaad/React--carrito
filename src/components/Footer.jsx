import './Footer.css'

import { useFilters } from '../hooks/UseFilters'
export function Footer() {
    const {filters} = useFilters()

    return(
        <footer className='footer'>	
        {JSON.stringify(filters, null, 2)}
        {
        /*
        <h4>Prueba tecnica de react <span>@Midudev</span></h4>
        <h5>Shopping cart con useContext y useReducer</h5>*/


        }
        </footer>
    )
}