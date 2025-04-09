const express = require('express');
const sequelize = require('./sequelize')
const user = require('./models/User')
const claimRoute = require('./routes/claim')

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/api/mine', claimRoute);

sequelize.sync({force: false}).then(() => {
    console.log('DB Synced');
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
})
