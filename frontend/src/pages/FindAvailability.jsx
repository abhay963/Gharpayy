import { useEffect, useState } from "react";
import API from "../services/api";

export default function FindAvailability(){

  const [inventory,setInventory] = useState([]);

  useEffect(()=>{

    API.get("/inventory/all")
    .then(res=>setInventory(res.data))
    .catch(console.error)

  },[])

  return(

    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Find Availability
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {inventory.map(property=>(
          
          <div
          key={property.id}
          className="bg-gray-800 p-6 rounded-xl"
          >

            <h2 className="text-xl font-semibold">
              {property.property_name}
            </h2>

            <p className="text-gray-400">
              {property.location}
            </p>

            <p className="mt-2">
              {property.property_type}
            </p>

            <p className="text-indigo-400 mt-2">
              ₹ {property.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  )

}