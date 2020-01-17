import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import { Card, Column, Container } from "rbx";

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
    <Column.Group vcentered multiline>
      {products.map(product => 
              <Column size="one-quarter">
                <Card>
                  <Card.Content key={product.sku}> {product.title} </Card.Content>
                </Card>
              </Column>)}
    </Column.Group>
    </Container>
  );
};

export default App;
