import { createServer} from 'http';

const PORT = process.env.PORT;
const users = [
    {
      id: "1",
      name: "Malik",
    },
    {
      id: "2",
      name: "ojo",
    },
    {
      id: "3",
      name: "Korede",
    },
  ];

// MIDDLEWARE

const logger = (req ,res, next)=>{
console.log(`url is ${req.url} , http method is ${req.method}`);
next();
}
const jsonMiddleWare = (req ,res, next)=>{
    res.setHeader("Content-Type", "application/json");
    next();
}

// ROUTE HANDLERS
const getAllUsers=(req,res)=>{
    res.write(JSON.stringify(users));
    res.end();
}

// ROUTE HANDLER FOR GET /api/users/:id
const getUserByID = ( req, res ) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === id);
    if (user) {
        res.write(JSON.stringify(user))
    } else {
        res.writeHead(404,{ "Content-Type": "application/json" });
        res.end(JSON.stringify({message: "User Not Found"}));
    }
    res.end()
}
// NOT FOUND HANDLER
const notFoundRoute = (req,res)=>{
 res.writeHead(404, { "Content-Type": "application/json" });
res.end(JSON.stringify({message: "Route Not Found"}));
}

const server = createServer((req,res) => {
    logger(req,res, ()=>{
      jsonMiddleWare(req, res, ()=>{

        if (req.url === "/api/users" && req.method=== "GET") {
            getAllUsers(req,res);
        }else if (req.url.match(/\api\/users\/([0-9]+)/) && req.method === "GET") {
            getUserByID(req,res)
        }
        else{
            notFoundRoute(req,res);
        }
      })
    })

});
server.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`);
})