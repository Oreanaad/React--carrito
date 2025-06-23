import {ClearCartIcon, RemoveFromCartIcon, CartIcon} from './Icons.jsx';
import './Cart.css';
import {useCart} from '../hooks/UseCart';
// import {AddToCartIcon} from './Icons.jsx';
import {useId} from 'react';


 function CartItem ({image, price, title, quantity, addToCart, takeFromCart}) {
    return(
        <li>
            <img
            src= {image}
            alt={title}>
            </img>
            <div>
                <strong>{title}</strong>-$ {price}
            </div>
            <footer>
                <small >
                  Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
                 <button onClick={takeFromCart}>-</button>
            </footer>
        </li>
    )
}



export function Cart() {
    const cartCheckboxId = useId()
    const{cart, clearCart, addToCart, takeFromCart} = useCart()

    
    return(

        <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon/>
        </label>
        <input id={cartCheckboxId} type='checkbox' />

        <aside className='cart'>
            <ul>
                {cart.map(product =>(
                    <CartItem 
                    key = {product.id}
                    addToCart={() => addToCart(product)}
                    takeFromCart={() => takeFromCart(product)}
                     {...product}/>
                ))}
       
            </ul>
            <button onClick={clearCart}>
                <ClearCartIcon/>
            </button>
</aside>
        </>
    )}