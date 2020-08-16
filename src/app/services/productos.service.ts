import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
/*import { resolve } from 'dns';
import { rejects } from 'assert';*/

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos : Producto[]= [];
  productosFiltrado : Producto[]= [];

  constructor( private http: HttpClient) { 
  
  this.cargarProductos();

}

private cargarProductos(){

  return new Promise( ( resolve, rejects )=>{

  this.http.get('https://portfolio-html-780c3.firebaseio.com/productos_idx.json')
  .subscribe( (resp: Producto []) =>{

    //console.log(resp);
    this.productos = resp;
   // setTimeout(() => {
      this.cargando = false;
   // }, 2000);
    this.cargando = false;
    resolve();
    });

});
    
  }
  getProducto( id: string){
    return this.http.get(`https://portfolio-html-780c3.firebaseio.com/productos/${ id }.json`);
  }
  buscarProducto( termino : string) {

    if (this.productos.length ===0) {
      //Cargar producto
      this.cargarProductos().then (() =>{
        //Esuecutar despued de tener los productos 
        //Aplicar filtro 
        this.filtrarProductos(termino );
      })
    }else{
      //Aplicar filtro
      this.filtrarProductos(termino );
    }

    
   
  }

  private filtrarProductos( termino: string){
    //console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf ( termino) >=0){
        this.productosFiltrado.push( prod );
      }
    });

  }
}
