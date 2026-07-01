Proyecto de API Rest para el curso de "Back - End NodeJs" de <Talento Tech/>.

librerías requeridas:
    npm install express
    npm install cors
    npm install dotenv
    npm install firebase

Rutas disponibles para gestión de PRODUCTOS:

    GET /api/products devuelve todos los productos.

    GET /api/products/:id devuelve el producto con el ID indicado.

    POST /api/products/create recibe en el cuerpo (body) de la petición la información sobre el nuevo producto para ser guardado en el servicio de datos en la nube.

    DELETE /api/products/:id elimina el producto con el ID indicado.

Rutas disponibles para gestión de USUARIOS :

    POST /auth/login recibe las credenciales de usuario en el cuerpo (body) de la petición y devuelve el Bearer token si son válidas o un error de autenticación en caso contrario.
