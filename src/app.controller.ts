import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nuevo') // 👈 Without slashes
  newEndpoint() {
    return 'yo soy nuevo';
  }
}

/* Nota1
Resonsabilidas=>single responsibility
Esta sola tiene una responsabilidad,
cada metodo deve tener una unica responsabilidad.

No esta mal que tenga varios metodos, lo malo es que atiende muchos
endpoints con responsabildades diferentes 
esta deve tener una calse para cada una de ellas 

//Creación de controladores dentro de una carpeta
nest g cor controllers/categories --flat

Nota2
Codigo de esatdo:

*/
