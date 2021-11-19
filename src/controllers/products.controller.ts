import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  /* 
    --- constructor (private <name>:<tipo>)--- 
    Define la injeccioón como atributo de la misma clase
    crea una instancia de  y se la pasa al controlador
  */
  constructor(private productsService: ProductsService) {}
  @Get('/')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 3,
    @Query('brand') brand: string,
  ) {
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
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    return this.productsService.findOne(+productId);
  }

  //Creacion de producto
  /* 
  Method:POST
  */
  @Post()
  create(@Body() payload: any) {
    /* return {
      mensaje: 'acction de crear',
      payload,
    }; */
    return this.productsService.create(payload);
  }

  //Update de un  producto
  @Put(':id')
  update(@Param() id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  //Delete  de un  producto
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      mensaje: 'Se elemino correctamente',
      id,
    };
  }

  /*  */
}
