import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { Task } from '../model/task';
import { TaskResponse, TasksResponse } from '../model/task-response';
import { TaskFilterData } from '../model/task-filter-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  private _tasksUrl = `${environment.apiUrl}/tasks`;

  
  /**
   * Get tasks list
   * @param filterData {id: number, description: string, status: string} 
   * @returns Observable<TasksResponse> with tasks list that matches filters
   */
  getTasks(filterData: TaskFilterData): Observable<TasksResponse> {
    let queryParameters = this.buildQueryParameters(filterData);    
    return this.http.get<TasksResponse>(`${this._tasksUrl}${queryParameters}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let tasksResponse: TasksResponse  = {
          success: false,
          statusCode: error.status,
          message: error.error.message,
          tasks: []
        }
        return of(tasksResponse);
      })
    );
  }

  /**
   * Build query parameters with the given filterData
   * @param filterData 
   */
  private buildQueryParameters(filterData: TaskFilterData): string {
    let queryParameters = "?";
    if (filterData.id != null && filterData.id > 0) {
      queryParameters += `&id=${filterData.id}`;
    }
    if (filterData.description != null && filterData.description != '') {
      queryParameters += `&description=${filterData.description}`;
    }
    if (filterData.status != null && filterData.status != '') {
      queryParameters += `&status=${filterData.status}`;
    }
    return queryParameters;
  }

  /**
   * Get a task by id
   * @param taskId 
   * @returns Observable<TaskResponse>
   */
  getTask(taskId: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this._tasksUrl}/${taskId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * Save an existing or a new task
   * @param task 
   * @return Observable<TaskResponse> (with the saved task it was successful) 
   */
  saveTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this._tasksUrl, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * Set a task as resolved by id.
   * @param taskId 
   * @returns Observable<TaskResponse> (with the updated task if it was successful)
   */
  setResolved(taskId: number): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this._tasksUrl}/${taskId}/resolved`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    )
  }

  /**
   * Handle an error and returns a properly TaskResponse 
   * @param error 
   * @returns Observable<TaskResponse> with error details
   */
  handleError(error: HttpErrorResponse): Observable<TaskResponse>  {
    let taskResponse: TaskResponse = {
      success: false,
      statusCode: error.status,
      message: error.error.message,
      task: null
    }
    return of(taskResponse);
  }

}
