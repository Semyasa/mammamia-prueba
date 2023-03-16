import React from "react";
import { useContext } from "react";
import CarritoContext from '../ContextCarrito';
import TotalContext from '../ContextTotal';
import Button from 'react-bootstrap/Button';

export default function Carrito() {

  const {pizzasCarrito, setPizzasCarrito} = useContext(CarritoContext)
  const {totalPizzas, setTotalPizzas} = useContext(TotalContext)

  //Añadimos cada Pizza Sumada al pedido
  const addPizza = (id) => {
    const seleccionada = pizzasCarrito.findIndex((pizza) => pizza.id === id)
    pizzasCarrito[seleccionada].cantidad = pizzasCarrito[seleccionada].cantidad+1
    pizzasCarrito[seleccionada].total = Number(pizzasCarrito[seleccionada].price)*Number(pizzasCarrito[seleccionada].cantidad)
    setPizzasCarrito(pizzasCarrito)

    //Actualizamos el total del Carrito
    const sumaPrecios = totalPizzas + pizzasCarrito[seleccionada].price
    setTotalPizzas(sumaPrecios)
  }

  //Restamos cada Pizza Sumada al pedido
  const restPizza = (id) => {
    const seleccionada = pizzasCarrito.findIndex((pizza) => pizza.id === id)
    pizzasCarrito[seleccionada].cantidad = pizzasCarrito[seleccionada].cantidad-1
    pizzasCarrito[seleccionada].total = Number(pizzasCarrito[seleccionada].price)*Number(pizzasCarrito[seleccionada].cantidad)
    setPizzasCarrito(pizzasCarrito)

    //Actualizamos el total del Carrito
    const sumaPrecios = totalPizzas - pizzasCarrito[seleccionada].price
    setTotalPizzas(sumaPrecios)
  }

    return (
      <div className="contenedorgeneralcarrito">
        <div className="contenedorcarrito">
          <span className="titulocarrito"><h5><strong>Detalles del pedido:</strong></h5></span>
          <div className="carritogeneral">
            <div className="carrito">
              {pizzasCarrito.map((pizza) => (
              <div>
              <div className="productoscarrito">
                <div className="descripcionproducto">
                  <img src={pizza.img} style={{width:"45px", height:"30px"}}/>
                  <span><strong>{pizza.name}</strong></span>
                </div>
                <div className="botonesproductos">
                  <h6>${new Intl.NumberFormat().format(pizza.total)}</h6>
                  <Button variant="danger" onClick={() => restPizza(pizza.id)}>-</Button>
                  <span className="cantidadpizza">{pizza.cantidad}</span>
                  <Button variant="primary" onClick={() => addPizza(pizza.id)}>+</Button>
                </div>
                
              </div>
              <hr></hr>
              </div>
              ))}

              <div className="totalbotoncarrito">
                <h4>Total: ${new Intl.NumberFormat().format(totalPizzas)}</h4>
                <Button variant="success">Ir a Pagar</Button>
              </div>
            </div>
          </div>
        </div>          
      </div>
    );
  }