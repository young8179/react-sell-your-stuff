# Tap-Bid(Buy, Sell, and Trade)
<br>


## :book: About the project
This is my second solo React-fullstack project. 
This website offers people a community to buy, sell, and trade items. 
Users cam upload products with pictures and select buy, sell, or trade category. 
The main Product page displays all products, click on the Detail button to see the full product information with the options of commenting on the post and emailing the product owner. 
Under My Profuct page, users are able to see products they have posted with the functions to edit, delete, or mark the posts as complete.  
The LiveChat tab that offers three chatrooms under Buy, Sell, and Trade where users are able to connect and communicate with other users. 
<br>


## :hammer_and_wrench: Used Technologies
Ract, Express, nodeJS, Socket IO, Sequelize, AWS-s3
<br>


## :clipboard: Preview
#### :point_down: Main
![Screen Shot 2020-11-21 at 10 51 40 AM](https://user-images.githubusercontent.com/69357145/99881591-9f4d9180-2be8-11eb-9767-c608f5655471.png)
<br /> 
#### :point_down: Upload product
![Screen Shot 2020-11-21 at 10 52 21 AM](https://user-images.githubusercontent.com/69357145/99881619-cb691280-2be8-11eb-8ed5-44e4cdf93ec4.png)
<br /> 
#### :point_down: My product
![Screen Shot 2020-11-21 at 10 52 34 AM](https://user-images.githubusercontent.com/69357145/99881634-e20f6980-2be8-11eb-9f12-bdc668248854.png)
<br /> 
#### :point_down: Live Chat
![Screen Shot 2020-11-21 at 10 53 39 AM](https://user-images.githubusercontent.com/69357145/99881685-2bf84f80-2be9-11eb-9c7b-63379194d9ba.png)

<br /> 





## 💻Usage
```js
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
```
<br>


## 📔 License
This project is under MIT license. See the [license](https://opensource.org/licenses/MIT) for more information.
<br /> 
<br /> 




