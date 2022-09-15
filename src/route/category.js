


import {sequelize,Project,ProjectCategory,Category} from "../database/model/model.js"
import {authenticateToken} from "../middleware/auth.js"



export default function(express){
    const router = express.Router();

    router.post("/",authenticateToken,async (req,res)=>{

        const newCategory = await Category.create({
            categoryName:req.body.categoryName
        })

        res.status(201).send({
            message:"New Category has been made succesfully",
            category:newCategory
        })


    })

    router.route("/:id")

    .get(authenticateToken,async (req,res)=>{

        const data = await Category.findOne({
            where:{
                id:req.params.id

            }
        })

        res.status(200).send({
            message:"Data berhasil di dapatkan",
            data:data})

    })


    .delete(authenticateToken,async (req,res)=>{
        const data = await Category.destroy({
            where:{
                id:req.params.id
            }
        })
        res.send(204)
    })

    .put(authenticateToken,async (req,res)=>{

        let categoryName = req.body.categoryName

        const data = await Category.update(
            {
                categoryName:categoryName
            },
            {
            where:{
                id:req.params.id
            }
            }
        )

        res.send("succes update data")
    })














    return router

}

    