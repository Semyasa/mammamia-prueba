import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import PizzasContext from '../Context';
import CarritoContext from '../ContextCarrito';
import TotalContext from '../ContextTotal';
import Button from 'react-bootstrap/Button';

export default function DetallePizzas() {

  const { id } = useParams();
  const { pizzas, setPizzas } = useContext(PizzasContext);
  const {pizzasCarrito, setPizzasCarrito} = useContext(CarritoContext)
  const {totalPizzas, setTotalPizzas} = useContext(TotalContext)

  const addPizzas = (id) => {

    const seleccionada = pizzas.findIndex((pizza) => pizza.id === id)
    const pizzaSeleccionada = pizzas[seleccionada]
    setPizzasCarrito([ ...pizzasCarrito, {...pizzaSeleccionada, cantidad: 1, total: pizzas[seleccionada].price}])

    //Actualizamos el total del Carrito
    const sumaPrecios = totalPizzas + pizzas[seleccionada].total
    setTotalPizzas(sumaPrecios)
}
  
    return (
      <div className="contenedorpizza">
        {pizzas.filter((pizza) => pizza.id === id).map((piz) => (
        <div className="pizza">
          <div className="fotopizza">
            <img src={piz.img} style={{width:"426px", height:"426px"}}/>
          </div>
        <div className="descripcionpizza">
              <h2>{piz.name}</h2>
              <hr></hr>
              <span>{piz.desc}</span>
            
            <div className="ingredientes">
              <strong>{"Ingredientes:"}</strong>
              <p></p>
                <ul>
                {piz.ingredients.map(ingrediente => <li key={ingrediente}>{ingrediente}</li>)}
                </ul>
            </div>
            <div className="precioanadir">
            <h2><strong>Precio: ${new Intl.NumberFormat().format(piz.price)}</strong></h2>
            <Button variant="danger" onClick={() => addPizzas(piz.id)}>Añadir 🛒</Button>
            </div>
        </div>
      </div>
        
        ))}

      </div>
    );
  }