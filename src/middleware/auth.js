import jwt from "jsonwebtoken"

export function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token==null) return res.status(401).send("Need Token to continue")
    jwt.verify(token,"123456789",(err,user)=>{
        if (err) {
            res.status(403).send("Token yang dimasukan salah")
        }
        next()
    })
}