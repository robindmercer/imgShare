# imgShare

imgShare is a web application to share images, comments, and more.

![](docs/screenshot1.png)

# Environment Variables

- `MONGODB_URI`, the mongodb database uri
- `PORT` the http server port. By default is `3000`

# Installation

```
git clone https://github.com/FaztTech/nodejs-imgshare
cd nodejs-imagshare
npm install
npm run build
npm start
```

# Installation with docker-compose (Recommended)

```
docker-compose up
```

# Tutorials

- [Youtube (es)](https://youtu.be/TqC3e8nBycg)

# Improvements for the Future

- [x] add user authentication
- [ ] Update docker compose
- [ ] add input validation
- [ ] add cloud storage for assets
- [ ] update public/js/scripts.js with vanilla js
- [ ] provides an API for client consumption
- [ ] hide /profile view from not authenticated users
- [ ] validate routes just for authenticated users

## Resources

- [Colors](https://www.color-hex.com/color-palette/26292)

https://www.youtube.com/watch?v=TqC3e8nBycg
# Start from Zero
```
npm init -y
npm install express express-handlebars
npm install handlebarsjs  // Html Inteligente   http://handlebarsjs.com
nom install mongoose      // conection a MongoDB
npm install morgan        // Console.log Url utilizados
npm install multer        // Modulo para subir imagenes 
npm install fs-extra      // File System con Async Await
npm install errorhandler  // Pinta errores por pantalla 
npm install md5           // desifra codigo para  Gravatar servicio AVATAR Globalmente Reconocido
npm install dotenv        // Para usar .env
npm install nodemon -D
npm install helper-timeago
```