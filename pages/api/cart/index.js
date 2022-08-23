import dbConnect from "../../../util/mongo";
import Cart from "../../../models/Cart"
export default async function handler(req,res){
 const {method} = req
 dbConnect()
 if (method==='POST'){
  try{
  const cart = await Cart.create(req.body)
  res.status(200).json(cart)
}catch(err){
 res.status(500).json(err,'errrr')
}
 }

}