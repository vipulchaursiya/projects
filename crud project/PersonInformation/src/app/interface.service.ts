import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private http:HttpClient) { }
  ///// add person to database
  addPerson(p){
   return this.http.post('http://localhost:3001/Person',p);
  }
  ////show person a
  showPerson():any{
    return this.http.get('http://localhost:3001/Person');
  }
  ///delete person 
  deletePerson(p):any{    
    
    return this.http.delete('http://localhost:3001/PersonDelete/'+p);
  }

  updatePerson(p){
    //alert(p);
    return this.http.put('http://localhost:3001/Person',p)
  }
}
 