const server = require('./app')
const {conn} = require('./db')
const PORT  = 3001

server.listen(PORT, ()=>{
    conn.sync({force:true})
    console.log(`server running on port ${PORT}`)
})