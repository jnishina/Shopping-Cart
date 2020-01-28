import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import { Card, Column, Container, Button, Content, List, Footer } from "rbx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Sidebar from "react-sidebar";

const productStyles = makeStyles(theme => ({
  container: {
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20, 
    minWidth: 1000
  },
  card: {
    height: 590,
    textAlign: 'center',
    maxWidth: 250,
    minWidth: 250, 
  },
  column: {
    marginRight: 10
  },
  image: {
    paddingTop: 10, 
    paddingBottom: -20
  },
  divider: {
    marginTop: 10
  },
  title: {
    marginTop: -12, 
    height: 60,
    fontSize: 15
  },
  price: {
    marginTop: 10,
    fontSize: 15
  },
  description: {
    fontSize: 12,
    paddingBottom: 5
  },
  sizes: {
    fontSize: 10,
    width: 25,
    height: 25,
    marginRight: 5,
    marginTop: 5,
  },
  addToCart: {
    backgroundColor: '#d4d4d4',
    marginTop: -15
  },
  cart: {
    backgroundColor: '#d4d4d4',
    height: 45,
    borderRadius: '0px 0px 0px 6px',
    float: 'right',
    marginLeft: 20
  },
  cartIcon: {
    height: 30,
    width: 40,
  }
}));

const cartStyles = makeStyles(theme => ({
  image: {
    width: 65,
    height: 90,
    marginRight: 15
  },
  title: {
    color: '#4A4A4A',
    fontSize: 15,
  },
  description: {
    color: '#a6a6a6',
    fontSize: 15,
  },
  price: {
    marginLeft: 80,
    marginTop: 18,
    fontSize: 15,
    height: 15
  },
  textBox: {
    width: 200,
    paddingTop: 20
  },
  item: {
    float: 'right',
    display: 'flex',
    flexDirection: 'row'
  },
  total: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    height: 100,
    width: '100%'
  },
  emptyMessage: {
    width: 431,
    textAlign: 'center',
    marginTop: 20
  },
  x: {
    width: 13,
    height: 13,
    marginLeft: 107
  }
}));

const handlePrices = (price) => {
  var formatted = price.toFixed(2);
  return formatted
}

const handleDescriptions = (description) => {
  if (description === "") {
    return "No description"
  }
  else {
    return description
  }
}

const calculateTotal = (cartitems) => {
  var totalPrice = 0
  var i;
  for (i = 0; i < cartitems.length; i++) {
    totalPrice += cartitems[i].product.price;
  }

  return totalPrice
}

const ShoppingCart = ({cartitems, inventory}) => {
  const classes = cartStyles();

  if (cartitems.selected.length === 0) {
    return(
      <div className={classes.emptyMessage}>
        <h5>Add some items to your cart!</h5>
      </div>
    );
  }

  else {
    return(
      <div>
      <List>
        {cartitems.selected.map(cartitem => 
          <List.Item key={cartitem.product.sku}>
            <img className={classes.image} src={`/data/products/${cartitem.product.sku}_1.jpg`} />
            <div className={classes.item}>
            <div className={classes.textBox}>
              <h5 className={classes.title}>{cartitem.product.title}<br/></h5>
              <h6 className={classes.description}>
                {handleDescriptions(cartitem.product.description)}<br/>
                Size: {cartitem.size}
              </h6>
            </div>
            <div>
              <img src={`/data/x.png`} className={classes.x} onClick={() => removeItem(cartitems, cartitem.key, inventory)}/>
              <h6 className={classes.price}>
                {`$${handlePrices(cartitem.product.price)}`}
              </h6>
            </div>
            </div>
          </List.Item>
        )}
      </List>
        <Footer className={classes.total}>
        {`Total: $${handlePrices(calculateTotal(cartitems.selected))}`}
        </Footer>
      </div>
    );
  }
}


const selectSize = (size, selectedSize) => (
  selectedSize = size
);

const addItem = (incart, item, selectedSize, inventory) => {
  var updatedInventory = {...inventory.inventory};
  
  if (selectedSize === '') {
    alert('Please select a size');
  }
  else {
    incart.setSelected(incart.selected.concat(item));
    updatedInventory[item.product.sku][selectedSize] -= 1;
    inventory.setInventory(updatedInventory)
  }
}

function generateKey(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const removeItem = (incart, removal, inventory) => {
  var newCart = [...incart.selected];
  var i = 0;
  var removed = false;
  var updatedInventory = {...inventory.inventory};

  while (!removed) {
    if (incart.selected[i].key === removal) {
      var product = incart.selected[i].product.sku;
      var sizeOfProduct = incart.selected[i].size;
      
      updatedInventory[product][sizeOfProduct] += 1;
      inventory.setInventory(updatedInventory);
      newCart.splice(i, 1);
      
      removed = true;
    }
    else {
      i++;
    }
  }
  
  inventory.setInventory(updatedInventory);
  incart.setSelected(newCart);
}

const sizeAvailable = (product, inventory, size) => {
  console.log(inventory[product][size]);

  if (inventory[product][size] === 0) {
    alert("This size is out of stock");
  }
};

const Product = ({product, sidebar, inventory, incart}) => {
  const styles = productStyles();
  const sizes = ['S', 'M', 'L', 'XL'];
  var selectedSize = '';


  return(
    <Card className={styles.card}>
      <Card.Image className={styles.image}><img src={`/data/products/${product.sku}_1.jpg`} alt={product.sku}/></Card.Image>
      <Card.Content> 
        <h5 className={styles.title}>
          {product.title}
          <p className={styles.description}>{handleDescriptions(product.description)}</p>
        </h5>
        {sizes.map(size => <Button className={styles.sizes} onClick={() => {sizeAvailable(String(product.sku), inventory.inventory, size); selectedSize = size;}}>{size}</Button>)}
        <Divider variant="middle" className={styles.divider}/>
        <h6 className={styles.price}>{`$${handlePrices(product.price)}`}</h6>
      </Card.Content>
      <Button className={styles.addToCart} 
              onClick={() => {sidebar.setSidebar(true); 
                              addItem(incart, {product, size: selectedSize, key: generateKey(5)}, selectedSize, inventory);}}>
              Add to cart
      </Button>
    </Card>
  );
};

const ProductList = ({products, sidebar, incart, inventory}) => {
  const styles = productStyles();

  return(
    <Column.Group vcentered multiline className={styles.container}>
      {products.map(product => 
            <Column size="one-quarter" key={product.sku}>
              <Product product={product} sidebar={sidebar} inventory={inventory} incart={incart} />
            </Column>
      )}
    </Column.Group>
  );
};


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [sidebar, setSidebar] = useState(false);
  const [selected, setSelected] = useState([]);
  // const inventoryJSON = {
  //   "12064273040195392": {
  //     "S": 0,
  //     "M": 3,
  //     "L": 1,
  //     "XL": 2
  //   },
  //   "51498472915966370": {
  //     "S": 0,
  //     "M": 2,
  //     "L": 3,
  //     "XL": 2
  //   },
  //   "10686354557628304": {
  //     "S": 1,
  //     "M": 2,
  //     "L": 2,
  //     "XL": 1
  //   },
  //   "11033926921508488": {
  //     "S": 3,
  //     "M": 2,
  //     "L": 0,
  //     "XL": 1
  //   }};
  const [inventory, setInventory] = useState({});

  const styles = productStyles();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    }
    fetchInventory();
    fetchProducts();
  }, []);


  return (
    <div>
      <Sidebar open={sidebar}
             sidebar={<ShoppingCart cartitems={{selected, setSelected}} inventory={{inventory, setInventory}}/>}
             className={styles.shoppingCart}
             pullRight={true}
             onSetOpen={() => setSidebar(false)}
             styles={{ sidebar: { background: "white" } }}>
        <Button className={styles.cart} onClick={() => setSidebar(true)}>
          <img src={`/data/shopping-cart.png`} className={styles.cartIcon}/>
        </Button>
        <ProductList products={products} sidebar={{sidebar, setSidebar}} 
                     incart={{selected, setSelected}} inventory={{inventory, setInventory}} />
      </Sidebar>
    </div>
  );
};

export default App;
