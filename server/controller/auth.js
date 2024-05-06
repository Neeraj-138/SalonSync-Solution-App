import  jwt  from "jsonwebtoken";
import conn from "../utils/db.js";
import bcrypt from 'bcrypt';

const register=async(req,res)=>{
    
    var EmailExist=false;
    const { FirstName, LastName, Email,Phone, Address,Password} = req.body;
    console.log(req.body)
    if(!Email||!FirstName||!LastName||!Phone||!Address||!Password)
    {
        return res.json({
            RegisterStatus:false,
            Message:"Please fill all fields"
        })
    }
     conn.query("SELECT * FROM users WHERE Email=?",[Email],async(err,result)=>{
        console.log("users:", result);
        if(err) return res.json({RegisterStatus:false,Error:"Query Error"})
        
        if(result.length>0){
            EmailExist=true;
            return res.json({RegisterStatus:false,Message:"Email Already Exist"})
        }
        
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(Password, salt);
    
        if(!EmailExist)
        {
            conn.query("INSERT INTO users (`Email`,`Password`)VALUES(?,?)",[Email,hashedPassword],(err,result)=>{
                
                if(!err)
                {
                conn.query("SELECT UserID FROM users WHERE Email=?", [Email],(err,result)=>{
                    const UserID=result[0].UserID
                    conn.query("INSERT INTO customers(`UserID`,`FirstName`,`LastName`,`Email`,`Phone`,`Address`)VALUES(?,?,?,?,?,?)",
                    [UserID,FirstName,LastName,Email,Phone,Address],(err,result)=>{
                        if(err) return res.json({RegisterStatus:false,Error:"Query Error while inserting  data into customer"})
                        return res.json({RegisterStatus:true,Message:"Registered Successfully"})
                    })
                });
                }else{
                    console.log(err);
                }

            })
           

        }
    }) 
}

const login = async (req, res) => {
    console.log('req from the body', req.body);
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.json({
                loginStatus: false,
                Message: "Please fill all fields"
            });
        }
        let user = {};
        conn.query("SELECT * FROM users WHERE Email=?", [Email], async (err, rows) => {
            if (err) return res.json({ LogInStatus: false, Message: "Query Error" });
            console.log("result from backend from logintable", rows);

            const validPass = await bcrypt.compare(req.body.Password, rows[0].Password);
            console.log(validPass);
            if (!validPass) {
                return res.json({ loginStatus: false, Message: "Not Valid password" });
            }
          
            const payload = {
                Email: rows[0].Email,
                Id: rows[0].UserId,
                Roll: rows[0].Type
            };
            user = rows[0];
            conn.query("select * from customers where UserID=?",[rows[0].UserID],(err,rows)=>{
                console.log("from customer & user",rows[0],user)
                // user=rows[0];
                console.log("current user",user)
                if (rows.length > 0)
                {
                    const token = jwt.sign( payload , "jwt_secret_key", {expiresIn: '1h'});    
                    res.cookie('mytoken',token, {expires:new Date(Date.now()+3*24*60*60*1000), path: '/', httpOnly: true, sameSite: 'None' })
                    console.log(token);
                    res.setHeader('Authorization',`Bearer ${token}`); 
                    // console.log(req.headers.Authorization);
                    return res.json({
                        loginStatus: true,
                        token,
                        Message: "User logged in successfully",
                        user:user,
                        customer:rows[0]
                    });
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" });
                }
            })    
        });
    } catch (error) {
        res.json({
            loginStatus: false,
            Error: "Wrong credentials"
        });
    }
};
const logout=(req,res)=>{
    console.log("pressing logout")
     res.clearCookie("mytoken");

    return res.json({ LogoutStatus: true, Message: "Logout Successfully" });
}


export {register,login,logout};
