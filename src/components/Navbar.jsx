import { NavLink } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useContext } from 'react';
import TotalContext from '../ContextTotal';

export default function Navegacion() {

const setActiveClass = ({isActive}) => (isActive ? "active" : "noActive")
const {totalPizzas, setTotalPizzas} = useContext(TotalContext)

return (

        <Navbar variant="dark">
        <Container>
            <Container className="icono">
                    <Navbar.Brand>
                    <NavLink className={ setActiveClass } to="/">
                    🍕 Pizzería Mamma Mia!
                    </NavLink>
                    </Navbar.Brand>
            </Container>
            <Container className="menu">
                <Container className="direcciones">
                <NavLink className={ setActiveClass } to="/carrito">
                <span>🛒${new Intl.NumberFormat().format(totalPizzas)}</span>
                </NavLink>
                </Container>
            </Container>
        </Container>
        </Navbar>

)
}