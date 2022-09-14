
import project from "./project.js"
import admin from "./admin.js"
import category from "./category.js"

export default function(express) {
    const app = express();

    app.use('/project', project(express));
    app.use('/admin', admin(express));
    app.use('/category', category(express));
//   app.use('/auth', auth(express));
//   app.use('/menu', menu(express));
  

  return app;
}