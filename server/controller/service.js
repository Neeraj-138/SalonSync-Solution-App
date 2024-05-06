import conn from "../utils/db.js"

const getAllServices=(req,res)=>{
    // console.log("userId",id);
    const id=req.params.id;
    const qu="SELECT * FROM services s left JOIN branch_service bs ON s.sId = bs.sId WHERE bs.bId=?";
    conn.query(qu,[id],(err,result)=>{
        // console.log(result);
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })

}
const addServices=(req,res)=>{
    console.log("services",req.body)
    console.log("category",req.body.selectedCategory)
    const Name=req.body.service;
    const Description=req.body.desc;
    const Price=req.body.price;
    conn.query("INSERT INTO `saloon`.`services` (`Name`, `Description`, `Price`, `Image`, `cId`) VALUES (?,?,?,?,?)",
        [req.body.service,req.body.desc,req.body.price,req.body.link,req.body.selectedCategory],(err,rows)=>{
            console.log("insertID",rows,rows)
        if(err) return res.json({Status:false,Error:"Query Error"})
        
        if(Array.isArray(req.body.finalbranch))
        {
            req.body.finalbranch.forEach(element => {
                console.log("Services into database ",element)
                conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[element.bId,rows.insertId], (err,rows, fields)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("inserting",rows);
                    }
                })
                
            });
        }
        else {
            // conn.query("INSERT INTO AppointmentServices (AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, req.body.bookingData.services], (err,rows, fields)=>{})
            conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[req.body.finalbranch.bId,rows.insertId],(err,result)=>{
                if(err) return res.json({Status:false,Error:"Query Error"})
                return res.json({Status:true ,result:result});
            })
        }
  
    })
}

const getServices=(req,res)=>{
    conn.query(` 
        SELECT s.sId, s.Name, s.Price, s.Image, sc.categoryName, GROUP_CONCAT(br.City)  as City  
        FROM saloon.services s
        LEFT JOIN saloon.service_categories sc ON s.cId = sc.cId
        LEFT JOIN saloon.branch_service bs ON s.sId = bs.sId
        LEFT JOIN saloon.branches br ON bs.bId = br.bId
        GROUP BY s.sId, s.Name, s.Price, s.Image, sc.categoryName`,
    (err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}

const getService=(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    conn.query("select * from services where sId=?",[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}
const getSeviceByService=(req,res)=>{  
    const service = req.query.service;
    const branch = req.query.branch;
    
    // console.log("Service searched:", service);
    // console.log("Branch chosen:", branch);
        conn.query(`SELECT services.* ,branches.City FROM services 
        INNER JOIN branch_service ON services.sId = branch_service.sId
        INNER JOIN branches ON branch_service.bId = branches.bId
        where branches.City=? and services.Name like ?` ,[branch,"%"+service+"%"],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}
const getSearchedServicebyCategory=(req,res)=>{  
    const category = req.query.Category;
    const branch = req.query.Branch;
    
    console.log("Category searched:", req.query.Category);
    console.log("Branch chosen:", branch);
        conn.query(` 
        select s.* ,br.City,sc.* from services s  inner join service_categories sc on s.cId=sc.cId inner join branch_service bs on s.sId=bs.sId inner join branches br on bs.bId=br.bId where sc.CategoryName=? and br.City=? ` ,[category,branch],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        console.log("service",result)
        return res.json({Status:true ,result:result});
    })
}

const deleteService=(req,res)=>{
    const id=req.params.sId;
    console.log("from server",id);
    conn.query(`delete  FROM saloon.branch_service	where	sId=?`,[id],(err,result)=>{
        if(err) {
            
        console.log(err) 
        return res.json({Status:false,Error:"Query Error"})
        
        }
        conn.query(`delete  FROM saloon.services	where	sId=?`,[id],(err,result)=>{
            if(err) {
            
                console.log(err) 
                return res.json({Status:false,Error:"Query Error"})
                
                }else{
                    return res.json({Status:true ,result:result});

                }

        })
    })
}

const getCategory=(req,res)=>{
    conn.query(`SELECT * FROM saloon.service_categories`,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}

const updateService=(req,res)=>{
    // const id=req.params.id;
    // console.log("hitting")
    // const Description=req.body.Description;
    // const Price =req.body.Price;
    // console.log(req.body.updateService,req.body.selectedCategory,req.body.finalbranch)
    // console.log("to update",req.body.finalbranch);
    // conn.query("UPDATE `saloon`.`services` SET `Name` = ?, `Description` = ?, `Price` =?, `Image` =?, `cId` = ? WHERE (`sId` = ?)",
    // [req.body.updateService.service,req.body.updateService.description,req.body.updateService.price,req.body.updateService.Image,req.body.selectedCategory,req.body.updateService.sId],(err,result)=>{
    //     if(err) return res.json({Status:false,Error:"Query Error"})
    //     console.log(result)
    //     conn.query("SELECT * FROM saloon.branch_service where sId=?",[req.body.updateService.sId],(err,rows)=>{
    //         console.log("lenght",rows.length)
    //         if(rows.length===0){
    //             if(Array.isArray(req.body.finalbranch))
    //             {
    //                 req.body.finalbranch.forEach(element => {
    //                     console.log("Services into database ",element)
    //                     conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[element.bId,req.body.updateService.sId], (err,rows, fields)=>{
    //                         if(err){
    //                             console.log(err);
    //                         }
    //                         else{
    //                             console.log("inserting",rows);
    //                         }
    //                     })
                        
    //                 });
    //             }
    //             else {
    //                 // conn.query("INSERT INTO AppointmentServices (AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, req.body.bookingData.services], (err,rows, fields)=>{})
    //                 conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[req.body.finalbranch.bId,req.body.selectedCategory.sId],(err,result)=>{
    //                     if(err) return res.json({Status:false,Error:"Query Error"})
    //                     return res.json({Status:true ,result:result});
    //                 })
    //             }
    //             // conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[id,req.body.updateService.sId],(err,rows)=>{
    //             //     if(err) return res.json({Status:false,Error:"Query Error"})
    //             //     // console.log("ranchesupdating",rows)
    //             //     return res.json({Status:true ,result:result});
    //             // })
    //         }else{
    //             if(Array.isArray(req.body.finalbranch))
    //             {
    //                 req.body.finalbranch.forEach(element => {
    //                     console.log("Services into database ",element)
    //                     conn.query("INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES (?,?)",[element.bId,req.body.updateService.sId], (err,rows, fields)=>{
    //                         if(err){
    //                             console.log(err);
    //                         }
    //                         else{
    //                             console.log("inserting",rows);
    //                         }
    //                     })
                        
    //                 });
    //             }
    //             // const branchesToRemove = rows.filter(branch => !finalbranch.some(fb => fb.bId === branch.bId));
    //             // branchesToRemove.forEach(branchToRemove => {
    //             //     conn.query("DELETE FROM `saloon`.`branch_service` WHERE (`bId` = ?) AND (`sId` = ?)", [branchToRemove.bId, updateService.sId], (err, rows) => {
    //             //         if (err) {
    //             //             console.log(err);
    //             //         } else {
    //             //             console.log("Removed branch_service", rows);
    //             //         }
    //             //     });
    //             // });
    //             return res.json({ Status: true, result: rows }); 

    //             // conn.query("UPDATE `saloon`.`branch_service` SET `bId` = ? WHERE (`bId` = ?) and (`sId` = ?)",[req.body.finalbranch.bId,req.body.finalbranch.bId,req.body.updateService.sId],(err,rows)=>{
    //             // if(err) return res.json({Status:false,Error:"Query Error"})
    //             // // console.log("branchesupdating",rows)
    //             // return res.json({Status:true ,result:result});
    //             // })
    //         }
    //     })
    // });
    const { updateService, selectedCategory, finalbranch } = req.body;
    const sId = updateService.sId;

    conn.beginTransaction(err => {
        if (err) {
            return res.json({ Status: false, Error: "Transaction Begin Error" });
        }

        conn.query(
            "UPDATE `saloon`.`services` SET `Name` = ?, `Description` = ?, `Price` = ?, `Image` = ?, `cId` = ? WHERE (`sId` = ?)",
            [updateService.service, updateService.description, updateService.price, updateService.Image, selectedCategory, sId],
            (err, updateResult) => {
                if (err) {
                    conn.rollback(() => {
                        return res.json({ Status: false, Error: "Query Error" });
                    });
                }

                conn.query(
                    "DELETE FROM `saloon`.`branch_service` WHERE `sId` = ?",
                    [sId],
                    (err, deleteResult) => {
                        if (err) {
                            conn.rollback(() => {
                                return res.json({ Status: false, Error: "Deletion Error" });
                            });
                        }

                        if (!Array.isArray(finalbranch)) {
                            finalbranch = [finalbranch]; // Ensure finalbranch is an array
                        }

                        const insertValues = finalbranch.map(branch => [branch.bId, sId]);

                        conn.query(
                            "INSERT INTO `saloon`.`branch_service` (`bId`, `sId`) VALUES ?",
                            [insertValues],
                            (err, insertResult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        return res.json({ Status: false, Error: "Insertion Error" });
                                    });
                                }

                                conn.commit(err => {
                                    if (err) {
                                        conn.rollback(() => {
                                            return res.json({ Status: false, Error: "Commit Error" });
                                        });
                                    }

                                    return res.json({ Status: true, Result: { updateResult, deleteResult, insertResult } });
                                });
                            }
                        );
                    }
                );
            }
        );
    });
}
const getSeviceByCategory=(req,res)=>{
    const category=req.params.category

    console.log("to update", category);
    conn.query(`select s.*  from  services s inner join service_categories sc on s.cId=sc.cId where sc.CategoryName=?`,[category],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        console.log("to update", result);
    
        return res.json({Status:true ,result:result});
    });
    
}
const getselectedBranchforServices=(req,res)=>{
    console.log("hiitedd",req.params.id);
    conn.query(`select b.bId as bId,b.Name as Name , b.City as city from services s inner join branch_service bs on  s.sId=bs.sId inner join branches b on bs.bId=b.bId where s.sId=? `,[req.params.id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        console.log("to update", result);
    
        return res.json({Status:true ,result:result});
    });
    







}


export {getselectedBranchforServices,getCategory,getAllServices,getSeviceByCategory,getSeviceByService,getSearchedServicebyCategory,addServices,getService,getServices,deleteService,updateService};