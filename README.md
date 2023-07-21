# Sitio_Web_1-NodeJS
API Rest para sitio web com NodeJS

IMPORTANT: no importados los ficheros node_modules instalar/crear proyecto de NodeJS para generarse automaticamente

## Crear y arrancar proyecto NodeJS desde el CMD:
- Entrar en la carpeta del proyecto

	`cd C:/wamp64/www/backend`

- Generar el poryecto (nombre proyecto 'proyecto-angular')

	`npm init`

- Rellenar preguntas:

	package name: `api-rest-nodejs`
	verison: `1.0.0`
    description: `Descripcion del proyecto`
    entery point: `index.js`
    test comand: ``
    keyword: ``
    author: ``
    licence: `MIT`

Navegando en http://localhost:4200/. La aplicación se actualizará automaticamente cuando se realicen y guarden cambios en los archivos.

## Instalar dependencias y librerias
- En la carpeta del proyecto en el cmd:

  `npm install express --save`

  `npm install body-parser --save`

  `npm install connect-multiparty --save`

  `npm install mongoose --save`

  `npm install nodemon --save`

  En el editor de codigo, dentro del proyecto en la carpeta package.json incluir en script `"start": "nodemon index.js"`

## Crear base de datos
Crear una base de datos en MongoDB para conectarla en la API Rest

## Ejecutar la API
- En la carpeta del proyecto en el cmd:

    `npm start`

## Utilizar cliente RESTfull
Para comprobar y hacer peticiones se utiliza un cliente RESTfull. 

Cliente RESTfull utilizado : POSTMAN (https://www.postman.com/)
