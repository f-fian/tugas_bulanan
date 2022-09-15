
import express from "express";
import {Category,Project,ProjectCategory,Admin} from "./src/database/model/model.js"
import {category,project,projectCategory} from "./src/database/data/data.js"
import route from "./src/route/index.js"

const port = 3000;
const app = express()

app.use(express.json())

async function buatTabel(){
    await ProjectCategory.drop()
    await Project.drop()
    await Category.drop()
    await Admin.drop()

    await Project.sync({force:true})
    await Category.sync({force:true})
    await ProjectCategory.sync({force:true})
    await Admin.sync({force:true})

    await Category.bulkCreate(category)
    await Project.bulkCreate(project)
    await ProjectCategory.bulkCreate(projectCategory)
}
buatTabel()


app.use("/api",route(express))


app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})

























// sequelize.sync({force:true}).then(async ()=>{
    
// })


// app.get("/category/:category/:page",async (req,res)=>{

//     let offset = (req.params.page - 1) * 4 // 4 itu data / page

//     let category = req.params.category
//     const data = await ProjectCategory.findAll({
//         where:{
//             category:category
//         },
//         limit:4,
//         offset:offset 
//     })

//     console.log(data)
//     const count = await ProjectCategory.count({
//         where:{
//             category:category
//         }
//     })
//     const results = {}
//     results.results = data
//     results.maxPage = Math.ceil(count/4)
//     console.log(Math.ceil(count/4))
//     res.send(results)
// })


// // ini contoh aja
// app.get("/api/cms/project",async (req,res)=>{


//     const {search,category} = req.query

//     let offset = (req.params.page - 1) * 4 // 4 itu data / page

//     const data = await Project.findAll({
//         include:ProjectCategory
//     })

//     // console.log(data)
//     // const count = await ProjectCategory.count({
//     //     where:{
//     //         category:category
//     //     }
//     // })
//     // const results = {}
//     // results.results = data
//     // results.maxPage = Math.ceil(count/4)
//     // console.log(Math.ceil(count/4))
//     res.send(data)
// })

// app.get("/project/:project",async (req,res)=>{
//     let project = req.params.project
//     const data = await ProjectCategory.findOne({
//         where:{
//             title:project
//         }
//     })
//     const results = {}
//     results.results = data
//     res.send(results)
// })




// app.post("/admin/signup", async (req,res)=>{

//     await sequelize.authenticate()

//     console.log("sampe sini")
//     try{
//         console.log("1")
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, salt)
//         const name = req.body.name
//         console.log(salt);
//         console.log(hashedPassword);

//         let admin = { name: name, password: hashedPassword}
//         Admin.create(admin)
//         res.status(201).send({
//             message:"berhasil",
//             admin:admin
//         })
//     }catch(error){
//         res.status(500).send(error)
//     }
// })


// app.post("/admin/login",async (req,res)=>{
//     // const user = users.find((data)=> data.name == req.body.name)

//     console.log(req.body.name)

//     let name = req.body.name
//     let find_data = {name:name}
    
    
//     const user = await Admin.findOne({
//         where:find_data
//     })

//     console.log("cari")
//     console.log(user)

//     let admin = {  // ini yang bakal di bikin jwt nya
//         name:user.dataValues.name,
//         admin_id:user.dataValues.id
//     }
//     let password = user.dataValues.password

//     if (!admin){
//         res.status(404).send("Cant find Admin")
//     }

//     console.log("sampe sini");

//     try {
//         if (await bcrypt.compare(req.body.password,password)){
//             console.log("Admin has login succesfully")
//         } else{
//             res.send("The Passworrd you give is incorrect")
//         }
//     }catch{
//         res.status(500).send("internal server error. proses bcrypt salah ")
//     }

//     const accesToken = jwt.sign(admin,"123456789")

//     res.status(200)
//     res.json({
//         message:"Login Berhasil",
//         accesToken,
//     })
// })

