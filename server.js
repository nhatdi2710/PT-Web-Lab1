const app = require('./route');
const config = require('./route/config');

const port = config.app.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})