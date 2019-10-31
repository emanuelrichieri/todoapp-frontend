import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';
import { TaskFilterPage } from './task-filter/task-filter.page';
import { TaskDetailPage } from './task-detail/task-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: ':id',
    component: TaskDetailPage
  },
  {
    path: 'task/new',
    component: TaskDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TasksPage, TaskFilterPage, TaskDetailPage],
  entryComponents: [TaskFilterPage]
})
export class TasksPageModule {}
