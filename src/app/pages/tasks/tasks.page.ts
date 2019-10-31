import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/providers/task.service';
import { TasksResponse } from 'src/app/model/task-response';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TaskFilterPage } from './task-filter/task-filter.page';
import { TaskFilterData } from 'src/app/model/task-filter-data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];
  filterData: TaskFilterData = {id: null, description: '', status: null};

  constructor(private taskService: TaskService,
            private router: Router,
            private toastController: ToastController,
            private modalController: ModalController) { }

  ngOnInit() {
    this.router.events.subscribe(
      _ => {
        this.getTasks();
      }
    );
  }

  getTasks() {
    this.taskService.getTasks(this.filterData).subscribe(
      (response: TasksResponse) => {
        if (response.success == true) {
          this.tasks = response.tasks;
        } else {
          this.presentToast('Ocurrió un error al obtener las tareas', 'danger');
        }
      }
    )
  }


  addTask() {
    this.router.navigate(['/tasks/task/new']);
  }

  showTask(task: Task) {
    this.router.navigate([`/tasks/${task.id}`]);
  }

  setResolved(index: number) {
    let task: Task = this.tasks[index];
    if (task != undefined && task != null) {
      this.taskService.setResolved(task.id).subscribe(
        response => {
          if (response.success) {
            this.tasks[index] = response.task;
            this.presentToast('Tarea resuelta.', 'success');
          }
        }
      )
    }
  }

  async setFilters() {
    const modal = await this.modalController.create({
      component: TaskFilterPage,
      componentProps: this.filterData
    });
    await modal.present();

    const onWillDismiss = await modal.onWillDismiss();
    if (onWillDismiss) {
      this.filterData = onWillDismiss.data;
      this.getTasks();
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 3000
    });

    toast.present();
  }

}
