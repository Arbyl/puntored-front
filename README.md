# Proyecto Frontend: Módulo de Recargas con Next.js

Este proyecto frontend está construido con **Next.js** y consume el API del backend desplegado en **Azure App Service**. Permite a los usuarios:
- Autenticarse y obtener un token.
- Consultar proveedores de recargas.
- Realizar recargas de saldo.
- Ver el resultado de la recarga.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (v14 o superior).
- **npm** o **yarn** (para gestionar las dependencias).

## Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/Arbyl/puntored-front.git
cd puntored-front
```

### 2.  Instala las dependencias

Si usas npm:
```bash
npm install
```

Si usas yarn:
```bash
yarn install
```

### 3.  Configura el backend
El frontend está configurado para conectarse al backend desplegado en Azure App Service. Asegúrate de que el backend esté funcionando correctamente en la URL que se configuró en el código.

En el archivo /page.tsx, el frontend hace llamadas a los siguientes endpoints del backend:

Autenticación: [https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/authenticate](https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/authenticate)

Obtener proveedores: [https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/getSuppliers](https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/getSuppliers)

Realizar compra: [https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/buy](https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net//buy)

### 4. Ejecutar el proyecto
Usa el siguiente comando para ejecutar el proyecto en desarrollo:

Si usas npm:

```bash
npm run dev
```

Si usas yarn:

```bash
yarn dev
```

El proyecto se ejecutará en http://localhost:3000.


### 5. Despliegue
Para desplegar el proyecto en producción, puedes utilizar Vercel o cualquier plataforma de despliegue compatible con Next.js. 

### 6. Flujo de la aplicación
Autenticación: Al iniciar la página, se obtiene un token del backend.
Obtener Proveedores: Los proveedores disponibles son cargados y mostrados en un dropdown.
Realizar Recarga: El usuario ingresa el número de teléfono, el monto y selecciona un proveedor para realizar la recarga.
Resultado: El resultado de la transacción se muestra en pantalla, incluyendo el transactionalID si la recarga fue exitosa.

### 7. Archivos importantes
/page.tsx: Archivo principal que gestiona el flujo de la aplicación y las llamadas a la API del backend.
/styles: Estilos para la aplicación.

### 8. Consideraciones
Validaciones: El formulario valida que el número de teléfono tenga 10 dígitos y que el monto sea un valor numérico dentro de los límites permitidos.
Mensajes de error: Si alguna llamada a la API falla, se muestra un mensaje de error en pantalla.




