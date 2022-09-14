

// const controller = require('../modules/order/controller/order-controller');
// const auth = require('../middleware/auth');
// const validation = require('../middleware/validation');
// const { request } = require('../modules/order/request/order-request');

import {sequelize,Project,ProjectCategory,Admin} from "../database/model/model.js"
import {authenticateToken} from "../middleware/auth.js"

export default function(express) {
  const router = express.Router();




  router.delete("/:id",authenticateToken,(req,res)=>{
      Project.destroy({
        where:{
          id:req.params.id
        }
      })
      res.status(200).send({
        message:"Data has deleted succesfully"
      })

  })

  router.put("/:id",authenticateToken,async (req,res)=>{

      const {excerpt,date,img,title} = req.body
      const id = req.params.id

      console.log(id)
      console.log(excerpt)
      console.log(date)
      console.log(img)
      console.log(title)

      const project = await Project.findOne({
        where:{
          id:id
        }
      })

      if (excerpt){
        project.set({
          excerpt:excerpt
        })
      }
      if (date){
        project.set({
          date:date
        })
      }
      if (img){
        project.set({
          img:img
        })
      }
      if (title){
        project.set({
          title:title
        })
      }

      await project.save()

      res.send("Data berhasil diubah")



  })


  router.route('/')

    .post(authenticateToken, async (req,res)=>{
      
      console.log("atas")
      const {id,excerpt,date,img,title,categorieId} = req.body

      const t = await sequelize.transaction();

            try {
            console.log("sampe sini")

            const newProject = await Project.create({
              id:id,
              excerpt:excerpt,
              date:date,
              img:img,
              title:title,
            },{transaction:t})

            const newProjectCategory = await ProjectCategory.create({
              projectId:id,
              categorieId:categorieId
            },{transaction: t });

            await t.commit();
            res.status(201).send({
              message:"Project Baru telah berhasil di tambahkan",
              project:newProject,
              ProjectCategory:newProjectCategory
            })

            } catch (error) {
                
            // If the execution reaches this line, an error was thrown.
            // We rollback the transaction.
                console.log(error)
                await t.rollback();
            }

    })


    .get(async (req,res)=>{
      let {search,category} = req.query

      if(category=="undefined"){
        category = undefined
      }
      if(search=="undefined"){
        search = undefined
      }
      let filter = {}
  
      if (search){
        console.log("search")
        filter = {where:{title:search}}
        // const data = await Project.findOne(filter)
        // res.send(data)
      }
      if (category){ 
        const datax = await ProjectCategory.findAll({
          where:{
            categorieId:category
          }
        })
        const listId = []
        for (let data of datax){
          listId.push(data.dataValues.projectId)
        }
        filter = {where:{id:listId}}
      }
  
      const data = await Project.findAll(filter)
      const results = {}
      results.maxPage = 1
      results.results = data
      // console.log(results)
      res.send(results)
    });

    

    

  return router;
}
