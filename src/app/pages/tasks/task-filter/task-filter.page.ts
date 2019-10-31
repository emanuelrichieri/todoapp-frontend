import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { TaskFilterData } from 'src/app/model/task-filter-data';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.page.html',
  styleUrls: ['./task-filter.page.scss'],
})
export class TaskFilterPage implements OnInit {

  statusSelect: string;
  filters: TaskFilterData = {id: null, description: '', status: null};

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    let id = +this.navParams.get('id');
    if (id === undefined || id == 0) {
      id = null;
    }
    let description = this.navParams.get('description');
    if (description === undefined || description === null) {
      description = '';
    }
    let status = this.navParams.get('status');
    if (status === undefined) {
      status = null;
    }
    this.filters.id = id;
    this.filters.description = description;
    this.filters.status = status;
  }

  applyFilters() {
    this.dismiss(this.filters);
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  resetFilters() {
    this.filters = {id: null, description: '', status: null};
  }

}
