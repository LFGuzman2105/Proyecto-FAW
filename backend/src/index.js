const app = require('./config/config');
require("./app/usuario")(app);
require("./app/tarea")(app);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});