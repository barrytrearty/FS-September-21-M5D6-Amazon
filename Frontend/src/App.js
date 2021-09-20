import React from "react";
import NavBar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import Product from "./components/Product";
// import NewProduct from "./components/NewProduct";
// import NewAuthor from "./components/newAuthor";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" exact component={Product} />
      {/* <Route path="/newproduct" exact component={NewProduct} /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
