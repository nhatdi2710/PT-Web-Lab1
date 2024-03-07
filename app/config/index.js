const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ct449-db"
    }
};
    
module.exports = config;