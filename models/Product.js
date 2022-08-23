import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
 title:{
  type:String,
  required:true,
  maxlength:60
 },
 desc:{
  type:String,
  required:true
 },
 image:{
  type:String,
  required:true
 },
 sizes:{
  type:[{size:{type:Number,required:true},price:{type:Number,required:true}}],
  required:true
 },
 extraOptions:{
  type:[{text:{type:String,required:true},price:{type:Number,required:true}}]
 },
 type:
 {
type:Number,
required:true
 }
},{
 timestamps:true
})
export default mongoose.models.Product || mongoose.model('Product',ProductSchema)