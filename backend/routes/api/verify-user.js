export default async (req, res) =>{
    try{
        const {token} = req.body;
        //verify the token
        await verifyToken({token});

    }catch(error){
        res.status(400).json({ error });
    }
}