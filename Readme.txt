# App de Gestión de Tareas - React Native Expo

Alumno
Lucio Aranda

## Opción elegida

Aplicación mobile de gestión de tareas desarrollada con React Native y Expo.

La aplicación permite:

- Registro de usuarios
- Inicio de sesión
- Creación y administración de tareas
- Selección de responsables desde contactos del dispositivo
- Asociación de imágenes mediante cámara o galería
- Asociación de ubicación geográfica
- Recordatorios mediante notificaciones locales
- Persistencia local de información
- Estado global mediante Zustand

## Tecnologías utilizadas

### Framework y Lenguaje

- React Native
- Expo
- TypeScript

### Navegación

- React Navigation
- Native Stack Navigator

### Persistencia

- AsyncStorage

### Estado Global

- Zustand

### Recursos del dispositivo

- Expo Notifications
- Expo Image Picker
- Expo Contacts
- Expo Location

### Testing

- Jest
- React Native Testing Library

## Funcionalidades implementadas

### Autenticación

- Registro de usuario
- Inicio de sesión
- Persistencia de sesión
- Cierre de sesión mediante menú de usuario

### Gestión de tareas

- Crear tareas
- Visualizar tareas
- Eliminar tareas
- Asociar fecha y hora de recordatorio
- Asociar imagen a una tarea
- Asociar responsable a una tarea
- Asociar ubicación a una tarea

### Gestión de contactos

- Solicitud de permisos
- Lectura de contactos del dispositivo
- Selección de responsable mediante modal
- Visualización de nombre, teléfono y correo electrónico

### Cámara y galería

- Captura de fotografías mediante cámara
- Selección de imágenes desde la galería
- Asociación de imágenes a las tareas

### Ubicación

- Solicitud de permisos de ubicación
- Obtención de coordenadas geográficas
- Asociación de ubicación a las tareas

### Persistencia de datos

Uso de AsyncStorage para almacenar:

- Usuarios registrados
- Sesión activa
- Lista de tareas

### Notificaciones

Implementación mediante Expo Notifications.

Características:

- Creación automática de canal de notificaciones
- Programación de recordatorios
- Cancelación automática al eliminar tareas

### Estado Global con Zustand

Se implementó un store global para administrar la lista de tareas.

Acciones disponibles:

- loadTasks()
- addTask()
- deleteTask()
- updateTaskImage()

Esto permite compartir información entre pantallas sin prop drilling.

### Componentes reutilizables

#### SimpleButton

Componente reutilizable utilizado en distintas pantallas para:

- Guardar tareas
- Agregar tareas
- Seleccionar responsables
- Agregar ubicación
- Cerrar modales

### Ayuda y soporte

La aplicación incorpora un botón de ayuda ubicado en el encabezado principal.

Funcionalidades:

- Apertura de modal informativo
- Información de contacto de soporte
- Cierre del modal mediante botón dedicado

## Testing

Se implementaron pruebas utilizando Jest y React Native Testing Library.

### Test de componente

- SimpleButton

### Test de lógica

- Validación de tareas

### Test de Componente reutilizavle

- Boton de ayuda

Ejecución:

npm test

## Pantallas de la aplicación

### Login

- Inicio de sesión
- Navegación al registro

### Registro

- Creación de usuarios

### Home

- Listado de tareas
- Eliminación de tareas
- Agregado de imágenes
- Menú de usuario
- Modal de ayuda

### Nueva tarea

- Título
- Fecha y hora
- Responsable
- Imagen
- Ubicación
- Guardado de tarea

## Cómo ejecutar la aplicación

### Clonar repositorio

git clone https://github.com/lucioaranda/TP.git

### Instalar dependencias

npm install

### Ejecutar aplicación

npx expo start

o

npx expo run:android

## Video demostrativo

https://www.youtube.com/shorts/P_Df3ECUpdI

## Estructura principal del proyecto

src
│
├── components
│   ├── SimpleButton.tsx
│   └── TaskItem.tsx
│   └──TestButton.tsx
│
├── screens
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   └── AddTaskScreen.tsx
│
├── store
│   └── taskStore.ts
│
├── utils
│   └── Permissions.tsx
│   └──taskValidations.ts
│
├── styles
│   └── styles.ts
│
└── test
    ├── TestButton.test.tsx
    ├── taskValidation.test.ts
    └── UseTaskCounter.test.ts

## Arquitectura general

La aplicación fue desarrollada siguiendo una arquitectura basada en componentes reutilizables y estado global.

- React Navigation administra el flujo entre pantallas.
- AsyncStorage persiste la información localmente.
- Zustand centraliza la gestión de tareas.
- Expo proporciona acceso a funcionalidades nativas del dispositivo.
- Los permisos se gestionan mediante un módulo reutilizable.
- Los componentes reutilizables permiten reducir duplicación de código.

## Recursos nativos utilizados

- Cámara
- Galería de imágenes
- Contactos
- Ubicación
- Notificaciones locales

Todos los recursos solicitan permisos al usuario antes de ser utilizados.