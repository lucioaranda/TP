# App de Gestión de Tareas - React Native Expo

**Alumno:** Lucio Aranda

## Opción elegida

Aplicación mobile de gestión de tareas desarrollada con React Native y Expo.

La aplicación permite:

* Registro de usuarios
* Inicio de sesión
* Creación y administración de tareas
* Selección de responsables desde contactos del dispositivo
* Asociación de imágenes mediante cámara o galería
* Asociación de ubicación geográfica
* Selección de fecha y hora para recordatorios
* Recordatorios mediante notificaciones locales
* Persistencia local de información
* Estado global mediante Zustand

---

# Tecnologías utilizadas

## Framework y Lenguaje

* React Native
* Expo
* TypeScript

## Navegación

* React Navigation
* Native Stack Navigator

## Persistencia

* AsyncStorage

## Estado Global

* Zustand

## Recursos del dispositivo

* Expo Notifications
* Expo Image Picker
* Expo Contacts
* Expo Location
* React Native DateTimePicker

## Testing

* Jest
* React Native Testing Library

---

# Funcionalidades implementadas

## Autenticación

* Registro de usuario
* Inicio de sesión
* Persistencia de sesión
* Cierre de sesión mediante menú de usuario

## Gestión de tareas

* Crear tareas
* Visualizar tareas
* Eliminar tareas
* Asociar fecha y hora de recordatorio
* Asociar imagen a una tarea
* Asociar responsable a una tarea
* Asociar ubicación a una tarea

## Permisos

La aplicación solicita permisos para acceder a funcionalidades nativas del dispositivo.

Permisos utilizados:

* Cámara
* Galería de imágenes
* Contactos
* Ubicación
* Notificaciones

La gestión de permisos se centraliza mediante:

```txt
utils/Permissions.ts
```

Antes de utilizar cualquier recurso del dispositivo se verifica que el usuario haya otorgado el permiso correspondiente.

## Gestión de contactos

* Solicitud de permisos
* Lectura de contactos del dispositivo
* Selección de responsable mediante modal
* Visualización de nombre, teléfono y correo electrónico

## Cámara y galería

* Captura de fotografías mediante cámara
* Selección de imágenes desde la galería
* Asociación de imágenes a las tareas

## Ubicación

* Solicitud de permisos de ubicación
* Obtención de coordenadas geográficas
* Asociación de ubicación a las tareas

## Calendario y selección de fecha

La aplicación utiliza React Native DateTimePicker para permitir al usuario seleccionar la fecha y hora de cada recordatorio.

Funcionalidades:

* Selección de fecha
* Selección de hora
* Validación de fechas futuras
* Programación de notificaciones utilizando la fecha seleccionada

Las validaciones se realizan mediante:

```txt
utils/taskValidations.ts
```

## Persistencia de datos

Uso de AsyncStorage para almacenar:

* Usuarios registrados
* Sesión activa
* Lista de tareas

## Notificaciones

Implementación mediante Expo Notifications.

Características:

* Creación automática de canal de notificaciones
* Programación de recordatorios
* Cancelación automática al eliminar tareas

## Estado Global con Zustand

Se implementó Zustand para centralizar el manejo de tareas dentro de un store global.

Store:

```txt
store/taskStore.ts
```

Estado:

* tasks

Acciones:

* loadTasks()
* addTask()
* deleteTask()
* updateTaskImage()

Beneficios:

* Evita prop drilling
* Facilita compartir información entre pantallas
* Mantiene sincronizado el estado de la aplicación
* Simplifica el mantenimiento del código

## Componentes reutilizables

### SimpleButton

Componente reutilizable utilizado en distintas pantallas para:

* Guardar tareas
* Agregar tareas
* Seleccionar responsables
* Agregar ubicación
* Cerrar modales

### TaskItem

Componente encargado de renderizar cada tarea dentro de la lista principal.

Muestra:

* Imagen de la tarea
* Título
* Fecha
* Responsable
* Ubicación
* Botón para eliminar

### TestButton

Componente reutilizable utilizado en el encabezado de la aplicación para mostrar el acceso a la ayuda.

También fue utilizado para realizar pruebas unitarias de componentes.

Verifica:

* Renderizado correcto
* Ejecución de eventos onPress

## Ayuda y soporte

La aplicación incorpora un botón de ayuda ubicado en el encabezado principal.

Funcionalidades:

* Apertura de modal informativo
* Información de contacto de soporte
* Cierre del modal mediante botón dedicado

Correo de soporte:

```txt
Soporte@gmail.com
```

---

# Testing

Se implementaron pruebas utilizando Jest y React Native Testing Library.

## Test de componente reutilizable

* TestButton

Verifica:

* Renderizado correcto
* Ejecución de eventos onPress

## Test de lógica de negocio

* taskValidation

Verifica:

* Tarea vacía
* Fecha nula
* Fecha inválida
* Datos válidos

## Test de custom hook

* useTaskCounter

Verifica:

* Incremento de contador
* Decremento de contador
* Reinicio de estado

---

# Pantallas de la aplicación

## Login

* Inicio de sesión
* Navegación al registro

## Registro

* Creación de usuarios

## Home

* Listado de tareas
* Eliminación de tareas
* Agregado de imágenes
* Menú de usuario
* Modal de ayuda

## Nueva tarea

* Título
* Fecha y hora
* Responsable
* Imagen
* Ubicación
* Guardado de tarea

---

# Cómo ejecutar la aplicación

## Clonar repositorio

```bash
git clone https://github.com/lucioaranda/TP.git
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar aplicación

```bash
npx expo start
```

o

```bash
npx expo run:android
```

---

# Ejecución de pruebas

Ejecutar todos los tests:

```bash
npm test
```

Ejecutar un test específico:

```bash
npx jest nombreDelTest
```

Ejemplo:

```bash
npx jest taskValidation.test.ts
```

---

# Video demostrativo

#Parcial 1

https://www.youtube.com/shorts/P_Df3ECUpdI

#Parcial 2 

https://www.youtube.com/shorts/ny86FF_By-4

---

# Estructura principal del proyecto

```txt
src
│
├── components
│   ├── SimpleButton.tsx
│   ├── TaskItem.tsx
│   └── TestButton.tsx
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
│   ├── Permissions.ts
│   └── taskValidations.ts
│
├── styles
│   └── styles.ts
│
└── test
    ├── TestButton.test.tsx
    ├── taskValidation.test.ts
    └── useTaskCounter.test.ts
```

---

# Arquitectura general

La aplicación fue desarrollada siguiendo una arquitectura basada en componentes reutilizables y estado global.

* React Navigation administra el flujo entre pantallas.
* AsyncStorage persiste la información localmente.
* Zustand centraliza la gestión de tareas.
* Expo proporciona acceso a funcionalidades nativas del dispositivo.
* Los permisos se gestionan mediante un módulo reutilizable.
* Los componentes reutilizables permiten reducir duplicación de código.

---

# Recursos nativos utilizados

* Cámara
* Galería de imágenes
* Contactos
* Ubicación
* Calendario (selección de fecha y hora)
* Notificaciones locales

Todos los recursos solicitan permisos al usuario antes de ser utilizados.
