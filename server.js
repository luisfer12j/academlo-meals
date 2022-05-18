const { app } = require('./app');
const { db } = require('./utils/database');
const { initModels } = require('./models/initModels');


db.authenticate()
    .then(() => console.log('Database authenticated successfully'))
    .catch((error) => console.log(error));


//Establish models relations
initModels();


db.sync()
    .then(() => console.log('Database sync succesfully'))
    .catch(error => console.log(error));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`DataBase MEALS is running in port: ${PORT}`));
