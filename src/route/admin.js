import bcrypt from "bcrypt"
import {Admin} from "../database/model/model.js"
import jwt from "jsonwebtoken"


export default function(express) {
    const router = express.Router();
    router.post("/signup", async (req,res)=>{
        console.log("sampe sini")
        try{
            console.log("1")
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const name = req.body.name
            console.log(salt);
            console.log(hashedPassword);
    
            let admin = { name: name, password: hashedPassword}
            Admin.create(admin)
            res.status(201).send({
                message:"berhasil",
                admin:admin
            })
        }catch(error){
            res.status(500).send(error)
        }
    })
    
    router.post("/login",async (req,res)=>{
        // const user = users.find((data)=> data.name == req.body.name)
    
        console.log(req.body.name)
    
        let name = req.body.name
        let find_data = {name:name}
        
        
        const user = await Admin.findOne({
            where:find_data
        })
    
        console.log("cari")
        console.log(user)
    
        let admin = {  // ini yang bakal di bikin jwt nya
            name:user.dataValues.name,
            admin_id:user.dataValues.id
        }
        let password = user.dataValues.password
    
        if (!admin){
            res.status(404).send("Cant find Admin")
        }
    
        console.log("sampe sini");
    
        try {
            if (await bcrypt.compare(req.body.password,password)){
                console.log("Admin has login succesfully")
            } else{
                res.send("The Passworrd you give is incorrect")
            }
        }catch{
            res.status(500).send("internal server error. proses bcrypt salah ")
        }
    
        const accesToken = jwt.sign(admin,"123456789")
    
        res.status(200)
        res.json({
            message:"Login Berhasil",
            accesToken,
        })
    })

    // route.post("/admin/post/project",authenticateToken, async (req,res)=>{
    //     const newproject = await Project.create({
    //         project_name:req.body.project_name,
    //         team:req.body.team,
    //     })
    //     let data = newproject.dataValues
    //     if(newproject){
    //         res.status(201).json({
    //             message:"Category baru telah di tambahkan",
    //             menu:data
    //         })
    //     }
    // })

    


    


    return router;
}