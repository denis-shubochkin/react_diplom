import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Catalog from "./components/Catalog/Catalog";
import Contacts from "./components/Contacts/Contacts";
import MainPage from "./components/MainPage/MainPage";
import Page404 from "./components/Page404/Page404";
import ProductCard from "./components/ProductCard/ProductCard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/catalog.html" component={Catalog} exact></Route>
          <Route
            path="/catalog/:id.html"
            render={(props) => <ProductCard id={props.match.params.id} />}
          ></Route>
          <Route path="/about.html" component={About}></Route>
          <Route path="/contacts.html" component={Contacts}></Route>
          <Route path="/cart.html" component={Cart}></Route>
          <Route path="/" component={MainPage} exact></Route>
          <Route path="*" component={Page404}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
