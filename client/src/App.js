import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import BaseLayout from './components/baseLayout/BaseLayout';
import Login from './components/loginAndRegister/Login';
import Register from './components/loginAndRegister/Register';
import Main from './components/page/Main';
import AddProduct from './components/page/AddProduct';
import MyProduct from './components/page/MyProduct';
import ProductDetail from './components/productDetail/ProductDetail';
import LoginContextProvider from './components/loginAndRegister/LoginContextProvider';
import Chat from './components/page/Chat';
import Store from "./components/chatStore/Store"

function App() {
  return (
    <LoginContextProvider>
      <Store>
        <BaseLayout>
          <Switch>
            <Route component = {Login}  path="/" exact/>
            <Route component = {Register} path="/register" exact/>
            <Route component = {Main} path="/main" exact/>
            <Route component = {Chat} path="/chat" exact/>
            <Route component = {ProductDetail} path="/main/:productId" />
            <Route component = {AddProduct} path="/add-product" exact/>
            <Route component = {MyProduct} path="/My-product/:userID" exact/>
          </Switch>
        </BaseLayout> 
      </Store>
    </LoginContextProvider>


  ); 
}

export default App;
