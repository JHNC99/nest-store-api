import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  /* Incrementa el id */
  private conunterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];
  /* METODOS DE BUSQUEDA*/

  //Muestra  todos los datos
  findAll() {
    return this.products;
  }

  //Muestra un dato por su id
  findOne(id) {
    const product = this.products.filter((product) => product.id == id);
    //Manejo de erreores con thrwo y notFoundException
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  /* Crea datos para el arreglo products 
    private products: Product[] = [{}}] 
  */
  create(payload: any) {
    //Incrementa el id
    this.conunterId += 1;
    //Agrega un nuevo producto
    const newProduct = {
      id: this.conunterId,
      ...payload,
    };
    //Push para agregar el producto
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    /* 
      Si el producto con id  retorna verdadero
      actualiza el producto
    */
    if (product) {
      const index = this.products.findIndex((item) => item.id == id);
      this.products[index] = {
        ...Product,
        ...payload,
      };

      return this.products[index];
    }
    return null;
  }

  /* Borrar producto por su id */
  delete(id: number) {
    return (this.products = this.products.filter(
      (product) => product.id !== id,
    ));
  }
}

/* return this.products.splice(0, id); */
