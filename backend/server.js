const app = require('./app/app.js');
const { connect } = require('./config/mongoose.js');

const port = process.env.PORT || 3000
const DATABASE_PATH = process.env.DATABASE_PATH || 'mongodb://127.0.0.1:27017/notes'

app.listen(port, () => {
    console.log("Server is running on port " + port);
})

async function run() {
    await connect(DATABASE_PATH)
}

run()