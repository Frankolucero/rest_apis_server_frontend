import type { Product } from "../types"
import { Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/productServices"

type ProductDetailsProps = {
    product: Product
}

export async function action ({params}: ActionFunctionArgs){
    if(params.id !== undefined) {
        
        await deleteProduct(+params.id)
        return redirect('/')
    }
   
}
export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    const isAvaliable = product.availability

  return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button 
                        type="submit" name='id' value={product.id}
                        className={`${isAvaliable ? 'text-black' : 'text-red-600' } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}>
                            {isAvaliable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button onClick={() => navigate(`/productos/${product.id}/edit`)} className="bg-indigo-600 text-white w-full text-xs uppercase p-2 rounded-lg text-center">Editar</button>

                    <Form 
                        className="w-full" 
                        method="POST" 
                        action={`productos/${product.id}/eliminar`}
                        >
                        <input type="submit" value='Eliminar' className="bg-red-600 text-white w-full text-xs uppercase p-2 rounded-lg text-center"/>
                    </Form>
                </div>
            </td>
    </tr> 
  )
}
