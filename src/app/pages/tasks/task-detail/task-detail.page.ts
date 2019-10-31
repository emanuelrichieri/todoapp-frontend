import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/providers/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskResponse } from 'src/app/model/task-response';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UtilsService } from 'src/app/providers/utils.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  taskForm: FormGroup;
  task: Task = new Task('');
  file: File = null;
  fileBlob: Blob = null;

  constructor(private taskService: TaskService,
            private formBuilder: FormBuilder,
            private router: Router,
            private location: Location,
            private route: ActivatedRoute,
            private toastController: ToastController,
            private utilsService: UtilsService) {
    this.taskForm = this.formBuilder.group({
      description: ["", Validators.required],
      status: ["", Validators.required]
    }); 
  }

  ngOnInit() {
    let taskId = this.route.snapshot.paramMap.get('id');
    if (taskId != null) {
      this.taskService.getTask(+taskId).subscribe(
        (response: TaskResponse) => {
          if (response.success) {
            this.task = response.task;
            if (this.task.attachedFile != null) {
              this.fileBlob = this.utilsService.base64toBlob(this.task.attachedFile);
            }
          } else {
            this.task = null;
          }
          if (this.task == null || this.task.id == null) {
            this.presentToast('No existe tarea con el id especificado.', 'danger');
            this.router.navigate(['/tasks']);
          }
        }
      )
    }
  }


  /**
   * Button Aceptar click event
   */
  onAccept() {
    if (this.taskForm.valid) {
      this.taskService.saveTask(this.task).subscribe(
        response => {
          let toastColor = 'success';
          let toastMessage = 'Tarea guardada exitosamente.';
          if (response.success == false) {
            toastColor = 'danger';
            toastMessage = 'Ocurrió un error al guardar la tarea.';
          } 
          this.presentToast(toastMessage, toastColor);
          this.router.navigate(['/tasks']);        
        }
      ); 
    } else {
      this.presentToast('Complete los campos faltantes. ', 'warning');
    }
  }

  /**
   * Button Cancelar click event
   */
  onCancel() {
    this.location.back();
  }

  /**
   * Present a toast with a message
   * @param message 
   * @param color 
   */
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 3000
    });

    toast.present();
  }

  /**
   * Download current selected file
   */
  downloadCurrentFile() {
    if (this.fileBlob != null) {
      const url= window.URL.createObjectURL(this.fileBlob);
      var anchor = document.createElement("a");
      anchor.download = this.task.filename;
      anchor.href = url;
      anchor.click();
    }
  }

  /**
   * File input change event
   */
  changeListener($event) : void {
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      let binaryString = myReader.result.toString();
      let encodedBinaryString = btoa(binaryString);
      this.fileBlob = this.utilsService.base64toBlob(encodedBinaryString)
      this.task.attachedFile = encodedBinaryString;
      this.task.filename = file.name;
    }
    myReader.readAsBinaryString(file);
  }
}
