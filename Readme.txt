 App de Gestión de Tareas - React Native Expo

Alumno
Lucio Aranda



 Opción elegida

Aplicación mobile de gestión de tareas desarrollada con React Native y Expo.

La aplicación permite:
- Registro de usuarios
- Inicio de sesión
- Gestión de tareas
- Eliminación de tareas
- Recordatorios mediante notificaciones locales



 Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- AsyncStorage
- Expo Notifications
- React Navigation



 Funcionalidades implementadas

Autenticación
- Registro de usuario
- Inicio de sesión validando datos almacenados localmente

 Gestión de tareas
- Crear tareas
- Agregar fecha o recordatorio
- Visualizar lista de tareas
- Eliminar tareas

Persistencia de datos
- Uso de AsyncStorage para guardar:
  - Usuario
  - Lista de tareas

 Notificaciones
- Implementación de notificaciones locales utilizando expo-notifications
- Recordatorio automático al guardar una tarea

 Navegación
- Navegación entre pantallas mediante React Navigation
- Menú de usuario con opción Log out


Cómo ejecutar la app

 1. Clonar el repositorio
bash
git clone https://github.com/lucioaranda/TP

Instalar dependencias

npm install

Ejecutar aplicacion

npx expo run:android