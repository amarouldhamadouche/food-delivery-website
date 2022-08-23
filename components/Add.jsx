import styles from '../styles/Add.module.css'
import { useState } from 'react'
import axios from 'axios'
export const Add = ({setClose,product}) => {
 const sizeValues = ['Small','Medium','Large'] 
 const typeValues = ['Pizza','Sandwich','Burger','Soft drinks']
 const [file,setFile] = useState()
 const [name,setName] = useState(product?product.title:"")
 const [desc,setDesc] = useState(product?product.desc:"")
 const [sizeOption,setSizeOption] = useState(null)
 const [sizes,setSizes] = useState(product?product.sizes:[])
 const [extraOption,setExtraOption] = useState(null)
 const [extra,setExtra] = useState(product?product.extraOptions:[])
 const [type,setType] = useState(product?product.type:null)
 const handleExtraOptions = (e)=>{
  setExtraOption({...extraOption,[e.target.name]:e.target.value})
 }
 const handleExtra = (e)=>{
  e.preventDefault()
   setExtra((prev)=>[...prev,extraOption])
 }
 const handleSizeOptions = (e)=>{
  setSizeOption({...sizeOption,[e.target.name]:e.target.value})
 }
 const handleSizes = (e)=>{
  e.preventDefault()
   setSizes((prev)=>[...prev,sizeOption])
 }
 const handleCreate = async ()=>{
 
  const data = new FormData()
  data.append('file',file)
  data.append('upload_preset','images')
 try{
 const cloudinaryRes = await axios.post("https://api.cloudinary.com/v1_1/UrbanMobile/image/upload",data)
 const {url} = cloudinaryRes.data
 const product = {
 title:name,
 desc,
 sizes,
 extraOptions:extra,
 image:url,
 type
 }
 const res = await axios.put('http://localhost:3000/api/product',product)
 if(res.status===200){
  setClose(true)
 }
 }catch(err){

 }}
const handleUpdate = async(e)=>{
 if (file){
  var data = new FormData()
  data.append('file',file)
  data.append('upload_preset','images')
 }
 try{
  if(file){
  const cloudinaryRes = await axios.post("https://api.cloudinary.com/v1_1/UrbanMobile/image/upload",data)
  var {url} = cloudinaryRes.data
 }
 const updatedProduct = {
  title:name,
  desc,
  sizes,
  extraOptions:extra,
  image:file? url:product.image,
  type
  }
  const res = await axios.put(`http://localhost:3000/api/product/${product._id}`,updatedProduct)
  if(res.status===200){
   setClose(true)
  }
}catch(err){

}
}
  return (
    <div className={styles.container}>
     <div className={styles.wrapper}>
      <span className ={styles.close} onClick={()=>setClose(true)}>X</span>
      <h1 className={styles.title}>
       Add new product
      </h1>
      <div className={styles.item}>
       <label className = {styles.label}>
        choose an image
       </label>
       <input  type='file' onChange={(e)=>setFile(e.target.files[0])} />
      </div>
      <div className ={styles.item}>
      <label className={styles.label}>
       name
      </label>
      <input value={name} className={styles.input} type ='text' onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className ={styles.item}>
      <label className={styles.label}>
       desc
      </label>
      <textarea value={desc}  rows={5} type ='text' onChange={(e)=>setDesc(e.target.value)} />
      </div>
      <form className ={styles.item} onSubmit={(e)=>handleSizes(e)}>
      <label  className={styles.label}> add a size :</label>
      
       <select name='size' id='selcet-sizes'  onChange={(e)=>handleSizeOptions(e)} required={true}>
        <option className={styles.input} value = '' >please select a size</option>
        {
         sizeValues.map((s,i)=>(
          <option  className={styles.input} key={i} value={i}>{s} </option>
         ))
        }
       </select>
       
      <input className={styles.input} onChange={(e)=>handleSizeOptions(e)} placeholder='price' type = 'number' name='price' id ='price' required={true}/>
      <button className ={styles.add}>Add</button>
      <div style={{display:'flex',width:'100%'}}>
      {sizes && (
      sizes.map((s,i)=>(
       <span style={{backgroundColor:'white',color:"teal",border:'1px solid teal',fontWeight:300,padding:'5px',borderRadius:'10px',marginTop:'3px',marginLeft:'5px'}} key={i}>{sizeValues[s.size]} </span>
      ))
        )
      }
      </div>
      </form>
      <form className={styles.item} onSubmit={(e)=>handleExtra(e)}>
       <label className ={styles.label}>add an extra</label>
       <input className={styles.input} placeholder='text' type='text' name='text' id ='text' required={true} onChange={(e)=>handleExtraOptions(e)} />
       <input className={styles.input} placeholder='price' type='number' name='price' id ='price' required={true} onChange={(e)=>handleExtraOptions(e)}/>
       <button className ={styles.add} >Add</button>
       <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
      {extra && (
      extra.map((e,i)=>(
       <span style={{backgroundColor:'white',color:"teal",border:'1px solid teal',fontWeight:300,padding:' 5px',borderRadius:'10px',marginTop:'5px',marginLeft:'5px'}} key={i}>{e.text} </span>
      ))
        )
      }
      </div>
      </form>
    <div className={styles.item}>
     <label className={styles.label}>type : </label>
    
    
     <select  id='type' name='type' onChange={(e)=>setType(e.target.value)}>
      <option className={styles.input} value=''>please select the type</option>
      {typeValues.map((t,i)=>(
      <option className={styles.input} key={i} value={i}>{t} </option>
       
      ))}
     </select>
    </div>
    <button className={styles.create} onClick={(e)=>product?handleUpdate(e): handleCreate(e)}>
  {product?'update' : 'create' }  
    </button>
     </div>
    </div>
  )
}
