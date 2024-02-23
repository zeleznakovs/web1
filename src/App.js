import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Staff from "./components/Staff"
import Categories from "./components/Categories"
import ShowFullItem from "./components/ShowFullItem"






class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      orders:[],
      currentItems: [],
      items:[
        {
        id: 1,
        title:'Стілець сірий',
        img:'стулсайт.jpg',
        desc:'Lorem bla bla bla',
        category:'chairs',
        price:'49.99'
      },
      {
        id: 2,
        title:'Стіл',
        img:'стілсайт.jpg',
        desc:'Lorem bla bla bla',
        category:'tables',
        price:'149.99'
      },
      {
        id: 3,
        title:'Диван',
        img:'дивансайт.jpg',
        desc:'Lorem bla bla bla',
        category:'sofa',
        price:'249.99'
      },
      {
        id: 4,
        title:'Лампа',
        img:'лампасайт.jpg',
        desc:'Lorem bla bla bla',
        category:'light',
        price:'9.99'
      },
      {
        id: 5,
        title:'Тумба',
        img:'тумбасайт.jpg',
        desc:'Lorem bla bla bla',
        category:'nightstand',
        price:'29.99'
      },
      {
        id: 6,
        title:'Вішалка-стійка',
        img:'вішалка сайт.jpg',
        desc:'Lorem bla bla bla',
        category:'rack',
        price:'69.99'
      }
      ],
      showFullItem: false,
      fullItem:{}
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render(){
  return (
    <div className="wrapper">
    <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
    <Categories chooseCategory={this.chooseCategory} />
    <Staff onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>

    {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item ={this.state.fullItem} />}
    <Footer />
    </div>
  );
}

onShowItem(item){
  this.setState({fullItem: item})
  this.setState({showFullItem: !this.state.showFullItem})
}


chooseCategory(category){
  if(category === 'all'){
    this.setState({currentItems: this.state.items})
    return
  }


  this.setState({
    currentItems: this.state.items.filter(el => el.category === category)
  })
}

deleteOrder(id){
  this.setState({orders: this.state.orders.filter(el => el.id !==id)})
}

addToOrder(item){
  let isInArray = false
  this.state.orders.forEach(el => {
    if(el.id === item.id)
      isInArray = true
  })
  if(!isInArray)
    this.setState({orders: [...this.state.orders, item]})
}

}

export default App;
