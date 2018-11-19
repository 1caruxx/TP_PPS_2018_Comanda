import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ElPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'elPipe',
})
export class ElPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let retorno="";
	   if(value=="1")
	   {
		   retorno="Horribles";
	   }
	   if(value=="2")
	   {
		   retorno="Feos";
	   }
	   if(value=="3")
	   {
		   retorno="Pasable";
	   }
	   if(value=="4")
	   {
		   retorno="Regular";
	   }
	   if(value=="5")
	   {
		   retorno="Buenos";
	   }
	   if(value=="6")
	   {
		   retorno="Ricos";
	   }
	   if(value=="7")
	   {
		   retorno="Muy ricos";
	   }
	   return retorno;
  }
}
