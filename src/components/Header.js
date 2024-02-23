import React, { useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import Order from './Order';

const showOders = (props) =>{
  let suma = 0
  props.orders.forEach(el => suma += Number.parseFloat(el.price))
  return(<div>{props.orders.map(el => (
    <Order onDelete={props.onDelete} key={el.id} item={el} />
    ))}

    <p className='suma'>Сума: {new Intl.NumberFormat().format(suma)}$</p>
    </div>)
}

const showNothing = () => {
  return(<div className='empty'>
      <h2>Товарів не обрано</h2>
  </div>)
}


export default function Header(props) {
  let[cartOpen, setCartOpen] = useState(false)



  return (
   <header>
    <div>
        <span className='logo'>House Staff</span>
        <ul className='nav'>
            <li>Про нас</li>
            <li>|</li>
            <li>Контакти</li>
            <li>|</li>
            <li>Особистий кабінет</li>
        </ul>
        <FaCartPlus onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`}/>

        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ?
              showOders(props) : showNothing()}
          </div>
        )}

    </div>
    <div className='presentation'></div>
   </header>
  )
}

