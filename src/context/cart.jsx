import { createContext, useReducer } from "react";

// El estado inicial debe leerse una sola vez.
// Si lo lees dentro del reducer, se leería en cada dispatch, lo cual no es lo que quieres.
// initialState ya es una constante global.
const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];


// Create the context
export const CartContext = createContext();

// Función auxiliar para actualizar el localStorage
// La sacamos fuera del reducer para que no se redefina en cada llamada
const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state));
};

// Reducer: calcula el estado a través de una acción y devuelve un nuevo estado
const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    let newState; // Declaramos newState aquí para que sea accesible en todo el switch

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload; // Corregido: actionPayload

            const productInCartIndex = state.findIndex(item => item.id === id);

            if (productInCartIndex >= 0) {
                // Producto ya está en el carrito, incrementa cantidad
                newState = structuredClone(state); // Clona el estado actual
                newState[productInCartIndex].quantity += 1;
            } else {
                // Producto no está en el carrito, añade como nuevo
                newState = [
                    ...state,
                    {
                        ...actionPayload, // Aquí actionPayload es el producto completo
                        quantity: 1
                    }
                ];
            }
            // Después de calcular el nuevo estado, lo guardamos en localStorage y lo retornamos
            updateLocalStorage(newState);
            return newState;
        }

        case "REMOVE_FROM_CART": {
            const { id } = actionPayload; // Suponemos que payload es el producto o al menos su id
            // Filtra para eliminar el producto con ese ID
            newState = state.filter(item => item.id !== id);
            updateLocalStorage(newState);
            return newState;
        }
        
        // --- OPCIONAL: Restar cantidad en lugar de eliminar completamente ---
        // Si quisieras una función que baje la cantidad y elimine si llega a 0
        // case "DECREASE_QUANTITY": {
        //     const { id } = actionPayload;
        //     const productInCartIndex = state.findIndex(item => item.id === id);

        //     if (productInCartIndex < 0) {
        //         return state; // No está en el carrito, no hacer nada
        //     }

        //     newState = structuredClone(state);
        //     newState[productInCartIndex].quantity -= 1;

        //     if (newState[productInCartIndex].quantity <= 0) {
        //         // Si la cantidad llega a 0, eliminar el producto
        //         newState = newState.filter(item => item.id !== id);
        //     }
        //     updateLocalStorage(newState);
        //     return newState;
        // }


        case "CLEAR_CART": {
            newState = []; // El nuevo estado es un carrito vacío
            updateLocalStorage(newState); // Guardamos un carrito vacío en localStorage
            return newState; // Retornamos el estado vacío
        }

        default: // Siempre es bueno tener un caso por defecto para acciones no reconocidas
            return state;
    }
};

// Create the provider to provide the context
export function CartProvider({ children }) {
    // Usamos cartInitialState como estado inicial del reducer
    const [state, dispatch] = useReducer(reducer, cartInitialState);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = product => dispatch({
        // Si 'REMOVE_FROM_CART' debe eliminar el producto completamente, como en tu código original
        // usa el id del producto para filtrar.
        type: 'REMOVE_FROM_CART',
        payload: product // payload debe contener el ID del producto a eliminar
    });

    // Si quieres una función para DECREMENTAR la cantidad (como la que te hice antes)
    // const decreaseQuantity = product => dispatch({
    //     type: 'DECREASE_QUANTITY',
    //     payload: product
    // });

    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    });

    return (
        <CartContext.Provider value={{
            cart: state, // cart: state es la forma correcta
            addToCart,
            clearCart,
            removeFromCart, // Asegurarse de que esta función hace lo que esperas (eliminar vs. decrementar)
            // decreaseQuantity // Si agregas la función para decrementar
        }}>
            {children}
        </CartContext.Provider>
    );
}