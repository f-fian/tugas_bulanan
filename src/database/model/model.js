import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'bulanan',
    'root',
    '1234567',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});







// export const MenuType = sequelize.define("menu_type",{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     type:{
//         type:Sequelize.STRING
//     }
// },{paranoid:true,}
// )

// export const MenuList = sequelize.define("menu_list",{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true
//     // menuTypeId foreign key
//     },
//     name:{
//         type:Sequelize.STRING,
//         unique:true
//     },
//     price:{
//         type:Sequelize.INTEGER
//     }
// },{paranoid:true,}
// )

// export const OrderDetail = sequelize.define("order_detail",{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     unit_price:{
//         type:Sequelize.INTEGER
//     },
//     quantity:{
//         type:Sequelize.INTEGER
//     },
//     sum_price:{
//         type:Sequelize.INTEGER
//     }
//     // order id foreign key
    
//     // menu id foreign key
// },{paranoid:true,}
// )


// export const Order = sequelize.define("order",{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     // employeeid foreign_key
//     order_number:{
//         type:Sequelize.STRING,
//         unique:true
//     },
//     // order_date:{
//     //     type:Sequelize.DATEONLY
//     // },
//     table_number:{
//         type:Sequelize.INTEGER
//     },
//     total_price:{
//         type:Sequelize.INTEGER
//     }
// },{
//     paranoid:true,
//     createdAt:"order_date"}
// )










export const Category = sequelize.define("categorie",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    categoryName:{
        type:Sequelize.STRING,
        unique:true
    }
},{paranoid:true,timestamps: false}
)



export const Project = sequelize.define("project",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    excerpt:{
        type:Sequelize.TEXT('long')
    },
    date:{
        type:Sequelize.DATEONLY
    },
    img:{
        type:Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING,
    }
    // category foreign key
    // title foreign key
    //
},{paranoid:true,timestamps: false}
)

export const ProjectCategory = sequelize.define("pc",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
},{paranoid:true,}
)


export const Admin = sequelize.define("admin",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
    },
    password:{
        type:Sequelize.STRING
    }
},{paranoid:true,timestamps: false}
)

Project.hasMany(ProjectCategory)
ProjectCategory.belongsTo(Project)
Category.hasMany(ProjectCategory)
ProjectCategory.belongsTo(Category)




// foreign key bakal jadi column baru di table project


// Project.hasMany(ProjectCategory,{
//     as:"pro",
//     foreignKey:"projectId",
// })
// Category.hasMany(ProjectCategory,{
//     as:"cate",
//     foreignKey:"categoryId",
// })







// // list relasi
// Employee.hasMany(Order,{
//     foreignKey:"employee_id"
// })
// Order.hasMany(OrderDetail,{
//     foreignKey:"order_id",
//     sourceKey:"order_number"
// })
// MenuList.hasMany(OrderDetail,{
//     foreignKey:"menu_id"
// })
// MenuType.hasMany(MenuList,{
//     foreignKey:"menuTypeId"
// })
    









// let menu_type = [
//     {type:"makanan"},
//     {type:"minuman"}
// ]

// let menu_list = {
//     name : "Nasi bakar",
//     price:12000,
//     MenuTypeId:1

// }



