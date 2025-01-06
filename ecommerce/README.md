# Guía para Instalar y Ejecutar la Aplicación Localmente

Esta guía explica cómo clonar, configurar y ejecutar la aplicación localmente. Asegúrate de tener todas las tecnologías y herramientas necesarias instaladas en tu sistema.

----------

## Tecnologías Utilizadas

-   **Node.js**
-   **Docker** y **Docker Compose**
-   **MongoDB** como base de datos
-   **NestJS** como framework backend
-   **DataGrip** (opcional) para administrar la base de datos
-   **Postman** (opcional) para probar los endpoints

----------

## Requisitos Previos

1.  **Node.js**: Instala [Node.js](https://nodejs.org/).
2.  **Docker**: Instala [Docker](https://www.docker.com/) y asegúrate de que esté ejecutándose.
3.  **Git**: Instala [Git](https://git-scm.com/).
4.  **DataGrip** (opcional)

----------

## Pasos para Configurar la Aplicación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/RicardoDubon/API_CRUD.git
cd ecommerce

```

### 2. Crear el Archivo `.env`

Copia el archivo `.env.example` y renómbralo como `.env`. Luego configura las variables necesarias, ejemplo:

```plaintext
API_PORT=3000
MONGODB_URI=mongodb://mongo:27017/ecommerce
NASA_API_KEY=uJI5CgbcLX3CiNEvFJXo5TUrscEjDtCrKJPho3oD

```
Puedes acceder al siguiente enlace https://api.nasa.gov/ para generar tu propia `NASA_API_KEY` o bien utilizar la del ejemplo.

### 3. Configurar Dependencias

Instala las dependencias del proyecto utilizando `npm`:

```bash
npm install

```

### 4. Construir la Aplicación

Compila la aplicación para producción:

```bash
npm run build

```

----------

## Ejecución Local

### Opción 1: Sin Docker

1.  **Levanta MongoDB**:
    
    -   Si tienes MongoDB instalado localmente, asegúrate de que esté corriendo.
    -   Usa una URI similar a: `mongodb://localhost:27017/ecommerce` en tu archivo `.env`.
    -  Si está usando MongoAtlas asegúrate de que tu IP pueda acceder al clúster y copia la URI que te proporcionan y sustituye `<db_user>` y `<db_password>` por un usuario y contraseña registrados en tu cuenta de MongoAtlas.
2.  **Ejecuta la aplicación**:
    
    ```bash
    npm run start:prod
    
    ```
 
3.  **Ejecuta las pruebas**:
    
    ```bash
    npm run test
    
    ```
### Opción 2: Usando Docker

1.  **Levanta los contenedores**:
    
    ```bash
    docker-compose up --build
    
    ```
    
----------
----------

## Endpoints con Postman

Puedes probar los endpoints de la aplicación utilizando **Postman**. A continuación, se describen los endpoints disponibles y los datos de ejemplo que puedes usar para realizar las pruebas. Ejemplo URL:`http://localhost:3000` .

### CRUD de Productos

#### 1. **Crear un Producto**
- **Método**: POST  
- **Endpoint**: `/products`  
- **Body** (JSON):
    ```json
    {
      "name": "Product 2",
      "description": "This is a product.",
      "price": 100,
      "stock": 50
    }
    ```
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": {
            "name": "Product 2",
            "description": "This is a product.",
            "price": 100,
            "stock": 50,
            "_id": "677c445da4d14823bc9cabbd",
            "product_id": "5f3f34f5-5cdf-4ef5-a139-7b9305a82ff4",
            "created_at": "2025-01-06T21:00:13.739Z",
            "updated_at": "2025-01-06T21:00:13.739Z",
            "__v": 0
        }
    }
    ```

#### 2. **Obtener Todos los Productos**
- **Método**: GET  
- **Endpoint**: `/products`  
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": [
            {
                "_id": "677bda23fefb6c9ef745e5ff",
                "name": "Product 2",
                "description": "This is a product.",
                "price": 100,
                "stock": 50,
                "product_id": "fcf947ef-e23b-41e6-a71e-afc25b68de92",
                "created_at": "2025-01-06T13:26:59.679Z",
                "updated_at": "2025-01-06T13:26:59.679Z",
                "__v": 0
            }
        ]
    }
    ```

#### 3. **Obtener un Producto por ID**
- **Método**: GET  
- **Endpoint**: `/products/{product_id}`  
- **Ejemplo**: `/products/fcf947ef-e23b-41e6-a71e-afc25b68de92`  
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": {
            "_id": "677bda23fefb6c9ef745e5ff",
            "name": "Updated Product Nameee",
            "description": "This is a product.",
            "price": 150,
            "stock": 50,
            "product_id": "fcf947ef-e23b-41e6-a71e-afc25b68de92",
            "created_at": "2025-01-06T13:26:59.679Z",
            "updated_at": "2025-01-06T13:26:59.679Z",
            "__v": 0
        }
    }
    ```

#### 4. **Actualizar un Producto**
- **Método**: PATCH  
- **Endpoint**: `/products/{product_id}`  
- **Ejemplo**: `/products/fcf947ef-e23b-41e6-a71e-afc25b68de92`  
- **Body** (JSON):
    ```json
    {
      "name": "Updated Product Nameee",
      "price": 150
    }
    ```
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": {
            "_id": "677bda23fefb6c9ef745e5ff",
            "name": "Updated Product Nameee",
            "description": "This is a product.",
            "price": 150,
            "stock": 50,
            "product_id": "fcf947ef-e23b-41e6-a71e-afc25b68de92",
            "created_at": "2025-01-06T13:26:59.679Z",
            "updated_at": "2025-01-06T13:26:59.679Z",
            "__v": 0
        }
    }
    ```

#### 5. **Eliminar un Producto**
- **Método**: DELETE  
- **Endpoint**: `/products/{product_id}`  
- **Ejemplo**: `/products/585debc5-8cf9-4291-a6e5-c3b43c831ae6`  
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": {
            "acknowledged": true,
            "deletedCount": 1
        }
    }
    ```

### API de NASA

#### 1. **Astronomy Picture of the Day (APOD)**
- **Método**: GET  
- **Endpoint**: `/nasa/apod`  
- **Respuesta Esperada**:
    ```json
    {
        "statusCode": 200,
        "message": "Success",
        "data": {
            "date": "2025-01-06",
            "explanation": "Billions of years from now, only one of these two galaxies will remain...",
            "hdurl": "https://apod.nasa.gov/apod/image/2501/CollidingGalaxies_WebbHubble_1877.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Colliding Spiral Galaxies from Webb and Hubble",
            "url": "https://apod.nasa.gov/apod/image/2501/CollidingGalaxies_WebbHubble_1080.jpg"
        }
    }
    ```

---------- 


