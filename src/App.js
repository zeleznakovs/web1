import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Staff from "./components/Staff";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Calendar from "./components/Calendar"; // Додаємо імпорт компоненту календаря

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "Стілець сірий",
          img: "стулсайт.jpg",
          desc: "Lorem bla bla bla",
          category: "chairs",
          price: "49.99"
        },
        {
          id: 2,
          title: "Стіл",
          img: "стілсайт.jpg",
          desc: "Lorem bla bla bla",
          category: "tables",
          price: "149.99"
        },
        {
          id: 3,
          title: "Диван",
          img: "дивансайт.jpg",
          desc: "Lorem bla bla bla",
          category: "sofa",
          price: "249.99"
        },
        {
          id: 4,
          title: "Лампа",
          img: "лампасайт.jpg",
          desc: "Lorem bla bla bla",
          category: "light",
          price: "9.99"
        },
        {
          id: 5,
          title: "Тумба",
          img: "тумбасайт.jpg",
          desc: "Lorem bla bla bla",
          category: "nightstand",
          price: "29.99"
        },
        {
          id: 6,
          title: "Вішалка-стійка",
          img: "вішалка сайт.jpg",
          desc: "Lorem bla bla bla",
          category: "rack",
          price: "69.99"
        }
      ],
      showFullItem: false,
      fullItem: {}
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category)
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, item] });
  }

  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Categories chooseCategory={this.chooseCategory} />
        <Staff onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />
        {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem} />}
        <div className="map-container">
          <div className="calendar">
            <Calendar /> 
          </div>
          <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81463.60303179525!2d30.34094529969099!3d50.352799486089104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c8364212103d%3A0x172e18f44d64aa21!2z0J3QvtCy0LDRjyDQm9C40L3QuNGP!5e0!3m2!1sru!2sua!4v1714499738751!5m2!1sru!2sua" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <Footer />

      </div>
    );
  }
}

export default App;
