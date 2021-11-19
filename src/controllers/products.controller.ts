import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  /*   ParseIntPipe, */
  /*   Res, */
} from '@nestjs/common';
/* import { Response } from 'express'; */
import { ProductsService } from 'src/services/products.service';
//Importación de pipe personalizado
import { ParseIntPipe } from '../common/parse-int.pipe';
//Importación de dto products
import { CreateProductDto } from 'src/dtos/products.dto';
//Importacion de dto update products
import { UpdateProductDto } from 'src/dtos/products.dto';
@Controller('products')
export class ProductsController {
  /* 
    --- constructor (private <name>:<tipo>)--- 
    Define la injeccioón como atributo de la misma clase
    crea una instancia de  y se la pasa al controlador
  */
  constructor(private productsService: ProductsService) {}
  @Get('/')
  getProducts() {
    //return `products: Limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      name: 'Biquin',
      categoria: [
        {
          nombre: 'Lenceria',
        },
      ],
    };
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  //Creacion de producto
  /* 
  Method:POST
  */
  @Post()
  create(@Body() payload: CreateProductDto) {
    /* return {
      mensaje: 'acction de crear',
      payload,
    }; */
    const products = this.productsService.create(payload);
    return {
      mensaje: 'Se agrego correctamente el producto',
      products,
    };
  }

  //Update de un  producto
  @Put(':id')
  update(@Param() id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  //Delete  de un  producto
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
