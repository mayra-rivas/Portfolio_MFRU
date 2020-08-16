import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];


  constructor( private http: HttpClient) {
   // console.log('Servicio de pagina listo');
    this.cargarInfo();
    this.cargarEquipo();
 
   }
   private cargarInfo() {
       //Leer Json
       this.http.get('assets/data/data-pagina.json')
       .subscribe ((resp: InfoPagina) => {
         this.cargada = true;
         this.info = resp;
         // console.log(resp);
         // om jag vill bara linkedin:
         // console.log(resp['linkedin']);
       });
   }
   private cargarEquipo(){
      //Leer Json
      this.http.get('https://portfolio-html-780c3.firebaseio.com/equipo.json')
      .subscribe ((resp: any[]) => {
        this.equipo = resp;
       // console.log(resp);
        // om jag vill bara linkedin:
        //console.log(resp['linkedin']);
      });
   }
}
