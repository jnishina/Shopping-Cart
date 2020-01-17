import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import { Card, Column, Container } from "rbx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const productStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20
  },
  card: {
    height: 450,
    textAlign: 'center'
  },
  image: {
    paddingTop: 10, 
    paddingBottom: -20
  },
  divider: {
    position: 'static',
    bottom: -20
  },
  title: {
    marginTop: -10, 
    height: 60
  },
  price: {
    marginTop: 5
  }
}));

const ProductList = ({products}) => {
  const styles = productStyles();

  return(
    <Column.Group vcentered multiline className={styles.container}>
      {products.map(product => 
              <Column size="one-quarter">
                <Card className={styles.card}>
                  <Card.Image className={styles.image}><img src={`/data/products/${product.sku}_1.jpg`} alt={product.sku}/></Card.Image>
                  <Card.Content key={product.sku}> 
                    <h4 className={styles.title}>{product.title}</h4>
                    <Divider variant="middle" className={styles.divider}/>
                    <h6 className={styles.price}>{`$${product.price}`}</h6>
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
