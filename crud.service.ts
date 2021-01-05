import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_Newemployee(Record: unknown)
  {
    return this.fireservices.collection('Employee').add(Record);
  }

  get_Allemployee()
  {
    return this.fireservices.collection('Employee').snapshotChanges();
  }

  update_employee(recordid: string, record: Partial<unknown>)
  {
    this.fireservices.doc('Employee/' + recordid).update(record);
  }

  delete_employee(record_id: string)
  {
    this.fireservices.doc('Employee/' + record_id).delete();
  }


}
