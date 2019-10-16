import { ClassNoteDetailPage } from './../class-note-detail/class-note-detail';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'page-class-note',
  templateUrl: 'class-note.html',
})
export class ClassNotePage {

  items: any;
  filterItems: any;
  student_idpass: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public loading: LoadingController) {
    this.student_idpass = window.localStorage.getItem('student_id');
  }

  ngOnInit() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    let data = {
      student_id: this.student_idpass
    }

    let loader = this.loading.create({
      content: 'Getting all notes please wait…',
    });

    loader.present().then(() => {
      this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/note_basic.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss()
          this.items = res.server_response;
          this.filterItems = this.items;

        });
    });
  }

  note_detail(course_id: any) {
    this.navCtrl.push(ClassNoteDetailPage, {
      data: course_id
    });
  }
}
