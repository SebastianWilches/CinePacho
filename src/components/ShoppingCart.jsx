import React, { useContext } from 'react'
import { Button, Card, Drawer } from '@rewind-ui/core';
import { CineContext } from '../context/CineContext';

export default function ShoppingCart() {
  const { openShoppingCart, setOpenShoppingCart } = useContext(CineContext);
  
  return (
    <>
      <Drawer open={openShoppingCart} onClose={() => setOpenShoppingCart(false)}>
        <Card className="w-full" bordered={false}>
          <Card.Header className="bg-slate-50">
            <h3 className="text-lg text-slate-800 font-medium">Carrito de compras</h3>

            <Button variant="secondary" size="sm" onClick={() => setOpenShoppingCart(false)} icon>
              <p>X</p>
            </Button>
          </Card.Header>

          <Card.Body>
            <p>ITEMS</p>
          </Card.Body>

          <Card.Footer>
            <div className="flex w-full space-x-2">
              <Button className="w-full" color="green" onClick={() => setOpenShoppingCart(false)}>
                Comprar
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Drawer>
    </>
  )
}
