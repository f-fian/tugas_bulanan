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

            let lisetNewProjectCategory = []
            for (let x = 0; x < categorieId.length; x++){
                let newProjectCategory = await ProjectCategory.create({
                  projectId:id,
                  categorieId:categorieId[x]
                },{transaction: t });

                lisetNewProjectCategory.push(newProjectCategory)
            }
            
            await t.commit();
            res.status(201).send({
              message:"Project Baru telah berhasil di tambahkan",
              project:newProject,
              ProjectCategory:lisetNewProjectCategory
            })

            } catch (error) {
                console.log(error)
                await t.rollback();
            }

    })

    .get(async (req,res)=>{
      let {search,category,page} = req.query
      let offset = (page-1)*4

      console.log(`--------page${page}`)

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
        filter = {where:{id:listId},limit:4,offset:offset}
      }
      if (category == "all"){
          filter = {limit:4,offset:offset}
      }
  
      const data = await Project.findAll(filter)
      const count = await Project.count(filter)
      
      const results = {}
      results.maxPage = Math.ceil(count/4)
      results.results = data
      // console.log(results)
      res.send(results)
    });

  return router;
}
