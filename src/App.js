import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import { Card, Column, Container, Button, Content, List, Footer } from "rbx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Sidebar from "react-sidebar";

const productStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20

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
    marginTop: 15
  },
  addToCart: {
    backgroundColor: '#d4d4d4',
    marginTop: -15
  },
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
    marginTop: 30,
    fontSize: 15
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
    width: '100%'
  }
}));

const handlePrices = (price) => {
  var formatted = price.toFixed(2);
  return formatted
}

const handleDescriptions = (description) => {
  if (description == "") {
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
    totalPrice += cartitems[i].price;
  }

  return totalPrice
}

const ShoppingCart = ({cartitems}) => {
  const classes = cartStyles();
  
  return(
    <div>
    <List>
      {cartitems.map(cartitem => 
        <List.Item key={cartitem.sku}>
          <img className={classes.image} src={`/data/products/${cartitem.sku}_1.jpg`} />
          <div className={classes.item}>
          <div className={classes.textBox}>
            <h5 className={classes.title}>{cartitem.title}<br/></h5>
            <h6 className={classes.description}>
              {handleDescriptions(cartitem.description)}<br/>
            </h6>
          </div>
            <h6 className={classes.price}>
              {`$${handlePrices(cartitem.price)}`}
            </h6>
          </div>
        </List.Item>
      )}
    </List>
      <Footer className={classes.total}>
      {`Total Price: $${handlePrices(calculateTotal(cartitems))}`}
      </Footer>
    </div>
  )
}

const ProductList = ({products, sidebar, incart}) => {
  const styles = productStyles();
  const sizes = ['S', 'M', 'L', 'XL']

  return(
    <Column.Group vcentered multiline className={styles.container}>
      {products.map(product => 
              <Column size="one-quarter" key={product.sku}>
                <Card className={styles.card}>
                  <Card.Image className={styles.image}><img src={`/data/products/${product.sku}_1.jpg`} alt={product.sku}/></Card.Image>
                  <Card.Content> 
                    <h5 className={styles.title}>
                      {product.title}
                      <p className={styles.description}>{handleDescriptions(product.description)}</p>
                    </h5>
                    {sizes.map(size => <Button className={styles.sizes}>{size}</Button>)}
                    <Divider variant="middle" className={styles.divider}/>
                    <h6 className={styles.price}>{`$${handlePrices(product.price)}`}</h6>
                  </Card.Content>
                  <Button className={styles.addToCart} 
                          onClick={() => {sidebar.setSidebar(true); incart.setSelected(incart.selected.concat(product))}}>
                          Add to cart
                  </Button>
                </Card>
              </Column>)}
    </Column.Group>
  );
}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [sidebar, setSidebar] = useState(false);
  const [selected, setSelected] = useState([]);

  const styles = productStyles();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);


  return (
    <div>
      <Sidebar open={sidebar}
             sidebar={<ShoppingCart cartitems={selected}/>}
             className={styles.shoppingCart}
             pullRight={true}
             onSetOpen={() => setSidebar(false)}
             styles={{ sidebar: { background: "white" } }}>
        <ProductList products={products} sidebar={{sidebar, setSidebar}} incart={{selected, setSelected}}/>
      </Sidebar>
    </div>
  );
};

export default App;
