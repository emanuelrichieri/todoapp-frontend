# ToDo App

 - Aplicación para gestionar listado de tareas por realizar (ToDo).
Proyecto realizado en el marco de una prueba técnica.


## Pre-requisitos
- Tener instalado NodeJS > 12
- Tener instalado Ionic-CLI > 4
- Tener instalado Angular CLI 8, o la version mas reciente cercana a la misma.
- Tener corriendo el backend https://github.com/emanuelrichieri/todoapp-backend en un servidor local o remoto.

## Instalación
- Descargar el zip (y descomprimir) o clonar el repositorio
- Abrir una consola de comandos en el directorio raíz del proyecto 
- Ejecutar 
```
npm install
```
- Asegurar que la apiUrl del archivo src/environments/environment está correctamente configurada de acuerdo al servidor donde corre el backend.
- Ejecutar
```
ionic serve
```

## Guía de usuario
- Para filtrar las tareas por id, descripcin y/o estado, presionar el botón de filtros en la esquina superior derecha.
- Para agregar una nueva tarea, presionar el botón "+" en la esquina inferior derecha
- Para modificar una tarea existente, presionar el lápiz en la tarea correspondiente en el listado.
- Para marcar una tarea como resuelta deslizar sobre la misma en el listado hacia la izquierda.


### Autor

Emanuel Richieri <emanuel.richieri@gmail.com>
