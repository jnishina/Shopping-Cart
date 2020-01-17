import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import { Card, Column, Container, Button } from "rbx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const productStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20
  },
  card: {
    height: 500,
    width: 250,
    textAlign: 'center'
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

const ProductList = ({products}) => {
  const styles = productStyles();
  const sizes = ['S', 'M', 'L', 'XL']

  return(
    <Column.Group vcentered multiline className={styles.container}>
      {products.map(product => 
              <Column size="one-quarter">
                <Card className={styles.card}>
                  <Card.Image className={styles.image}><img src={`/data/products/${product.sku}_1.jpg`} alt={product.sku}/></Card.Image>
                  <Card.Content key={product.sku}> 
                    <h5 className={styles.title}>
                      {product.title}
                      <p className={styles.description}>{handleDescriptions(product.description)}</p>
                    </h5>
                    {/* <p className={styles.description}>{handleDescriptions(product.description)}</p> */}
                    {sizes.map(size => <Button className={styles.sizes}>{size}</Button>)}
                    <Divider variant="middle" className={styles.divider}/>
                    <h6 className={styles.price}>{`$${handlePrices(product.price)}`}</h6>
                  </Card.Content>
                </Card>
              </Column>)}
    </Column.Group>
  );
}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);


  return (
    <Container>
      <ProductList products={products}/>
    </Container>
  );
};

export default App;
