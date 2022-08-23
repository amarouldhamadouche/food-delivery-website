import mongoose from 'mongoose'
export const  CartSchema = mongoose.Schema({
 product : {
  type : Array,

  required:true

 },
 quantity:{
  type:Number,
 required:true},
 total:{
  type:Number,
  required:true
 },
 orderId:{
  type:String,
  required:true
 }
},{
 timestamps:true
})
export default mongoose.models.Cart || mongoose.model('Cart',CartSchema)