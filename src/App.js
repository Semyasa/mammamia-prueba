import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PizzasContext from './Context';
import CarritoContext from './ContextCarrito';
import TotalContext from './ContextTotal';

//Componentes y Vistas
import Navbar from './components/Navbar';
import DetallePizza from './components/DetallePizza';
import Home from './views/Home';
import Carrito from './views/Carrito';

function App() {

const [pizzas, setPizzas] = useState([])
const pizzasCompartidas = {pizzas, setPizzas}

const [pizzasCarrito, setPizzasCarrito] = useState([])
const pizzasCompartidasCarrito = {pizzasCarrito, setPizzasCarrito}

const [totalPizzas, setTotalPizzas] = useState(0)
const totalPizzasCompartidas = {totalPizzas, setTotalPizzas}

useEffect(() => {
  consultarPizzas()
}, [])

// Traemos los datos de las Pizzas
const consultarPizzas = async () => {

  const endpoint = "/pizzas.json"
  const respuesta = await fetch(endpoint)
  const info = await respuesta.json()
  setPizzas(info)

}

  return (
  <div className="App">

    <PizzasContext.Provider value={pizzasCompartidas}>
    <CarritoContext.Provider value={pizzasCompartidasCarrito}>
    <TotalContext.Provider value={totalPizzasCompartidas}>
      <BrowserRouter>
      <Navbar />

      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pizza/:id" element={<DetallePizza />} />
            <Route path="/pizza" element={<DetallePizza />} />

      </Routes>
      </BrowserRouter>
    </TotalContext.Provider>
    </CarritoContext.Provider>
    </PizzasContext.Provider>


  </div>
  );
}

export default App;
