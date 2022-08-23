import dbConnect from "../../../util/mongo";
import Cart from "../../../models/Cart"
export default async function handler(req,res){
 const {method,query:{id}} = req
 dbConnect()
 if (method==='GET'){
  try{
  const cart = await Cart.findOne({orderId:id})
  res.status(200).json(cart)
}catch(err){
 res.status(500).json(err)
}
 }

}