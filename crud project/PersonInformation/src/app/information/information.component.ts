import { Component, OnInit } from '@angular/core';
import { person } from '../model/person';
import { InterfaceService } from '../interface.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  p= new person();
  s= new person();
  id;i;
  constructor(private ds:InterfaceService) { }
  Person;
  show:boolean
  ngOnInit() {
      this.ds.showPerson().subscribe( (data) =>{
        this.Person=data.docs;
      })
      if(this.i>0){
        this.show= true
      }
    }
  
  Submit(){
    this.ds.addPerson(this.p).subscribe( (data)=>{
      alert("details added");
      this.ds.showPerson().subscribe( (data) =>{
        this.Person=data.docs;
      })
    })
  }  

  Delete(p){
   // alert((p));

    this.ds.deletePerson(p).subscribe ( (data) =>{
      this.ds.showPerson().subscribe( (data) =>{
        this.Person=data.docs;
      })
    })
    if(this.i>0){
      this.show= true
    }
  }

   Edit(p){
     this.id=p._id;
     this.s.Name=p.Name;
     this.s.Age=p.Age;
     this.s.Gender=p.Gender;
     this.s.PhoneNumber=p.PhoneNumber
    
  }
  update(p){
   this.ds.updatePerson({id:this.id,personData:p}).subscribe( (data) =>{
    /// alert("hey");
    this.ds.showPerson().subscribe( (data) =>{
     // alert("hey")
      this.Person=data.docs;
    })
   })
  }
}
