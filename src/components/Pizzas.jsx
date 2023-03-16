import React from "react";
import PizzasContext from '../Context';
import CarritoContext from '../ContextCarrito';
import TotalContext from '../ContextTotal';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';

export default function Pizzas() {

  const { pizzas, setPizzas } = useContext(PizzasContext)
  const {pizzasCarrito, setPizzasCarrito} = useContext(CarritoContext)
  const {totalPizzas, setTotalPizzas} = useContext(TotalContext)

  const navigate = useNavigate()

  const irDetallePizza = (id) => {
    navigate(`/pizza/${id}`)
  }

  const addPizzas = (id) => {

    //Añadimos la Pizza al Carrito
    const seleccionada = pizzas.findIndex((pizza) => pizza.id === id)
    const pizzaSeleccionada = pizzas[seleccionada]
    setPizzasCarrito([ ...pizzasCarrito, {...pizzaSeleccionada, cantidad: 1}])

    //Actualizamos el total del Carrito
    const sumaPrecios = totalPizzas + pizzas[seleccionada].total
    setTotalPizzas(sumaPrecios)
  }

  return (
    
    <div className="pizzas grid-columns-4 p-5 ">
            {pizzas.map((pizza) => (
              
                <Card className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" key={pizza.id} style={{ width: "20rem" }}>
                <Card.Img variant="top" src={pizza.img} />
                <Card.Body>
                <Card.Title><strong>{pizza.name}</strong></Card.Title>
                <Card.Text>
                <hr></hr>
                <strong>{"Ingredientes:"}</strong>
                <p></p>        
                <ul>      
                {pizza.ingredients.map((ingre) => (
                  <li key={ingre}>{ingre}</li>
                ))}
                </ul>
                <hr></hr>
                <p className="precio">${new Intl.NumberFormat().format(pizza.price)}</p>
                </Card.Text>
                </Card.Body>
                <div className="botones">
                <Button variant="info" onClick={() => irDetallePizza(pizza.id)}>Ver Mas 👀</Button>
                <Button variant="danger" onClick={() => addPizzas(pizza.id)}>Añadir 🛒</Button>
                </div>
                </Card>

               ))}
    </div>
    
    );
  }