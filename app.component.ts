import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fidi-games';

  employee: any;
  employeeName: any;
  employeeAge: any;
  employeeAddress: any;
  message: any;


  constructor(public crudservice: CrudService) { }

  ngOnInit() {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      })
      console.log(this.employee);

    });
  }

  CreateRecord() {
  
    let Record = { 'name': this.employeeName, 'age': this.employeeAge, 'address': this.employeeAddress };

    this.crudservice.create_Newemployee(Record).then(res => {

      this.employeeName = "";
      this.employeeAge = undefined;
      this.employeeAddress = "";
      console.log(res);
      this.message = "Employee data save Done";
    }).catch(error => {
      console.log(error);
    });

  }

  EditRecord(Record: { isedit: boolean; editname: any; name: any; editage: any; age: any; editaddress: any; address: any; }) {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;

  }

  Updatarecord(recorddata: { editname: any; editage: any; editaddress: any; id: string; isedit: boolean; }) {
    let record = {};
    record['name'] = recorddata.editname;
    record['age'] = recorddata.editage;
    record['address'] = recorddata.editaddress;
    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id: string) {
    this.crudservice.delete_employee(record_id);
  }


}

