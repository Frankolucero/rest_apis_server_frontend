import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, productsSchema, type Product } from "../types"
import axios from "axios";
import { toBoolean } from "../utils";


type productData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : productData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price:result.output.price
            })
        } else{
            throw new Error('datos no validos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(productsSchema, data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error('hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductByID(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        
        if(result.success){
            return result.output
        } else{
            throw new Error('hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : productData,id : Product['id']){
    
    

    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price:+data.price,
            availability: toBoolean(data.availability.toString())
        })
        
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url,result.output)
        }
    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteProduct(id:Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']){

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}