import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import NavBar from "./componentes/NavBar/NavBar";
import { CarritoProvider } from "./context/CarritoContext";
import Cart from "./componentes/Cart/Cart";
import Checkout from "./componentes/Checkout/Checkout";
import UploadForm from "./componentes/UploadForm/UploadForm";
import OrderDetail from './componentes/OrderDetail/OrderDetail';
import Register from "./componentes/Register/Register";
import Login from "./componentes/Login/Login";
import Home from "./componentes/Home/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/productos" element={<ItemListContainer />} />
            <Route exact path="/categoria/:idCategoria" element={<ItemListContainer />} />
            <Route exact path="/item/:idItem" element={<ItemDetailContainer />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/upload" element={<UploadForm />} />
            <Route exact path="/order/:id" element={<OrderDetail />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/success" element={<SuccessPage />} />
            <Route exact path="/failure" element={<FailurePage />} />
            <Route exact path="/pending" element={<PendingPage />} />
            <Route exact path="*" element={<h2>Sitio en construcción</h2>} />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </div>
  )
}

// **** Pendiente reemplazar funciones por componentes  ****
function SuccessPage() {
  return <h1>Pago Exitoso</h1>;
}

function FailurePage() {
  return <h1>Pago Fallido</h1>;
}

function PendingPage() {
  return <h1>Pago Pendiente</h1>;
}

export default App
























