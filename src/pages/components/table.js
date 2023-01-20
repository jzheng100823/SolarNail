import React from 'react';
import "./table.css"
import { Link } from "react-router-dom";
import { getServices } from "../../services/services";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from '../../firebase';




const Table=()=>{
    const [services, setServices] = useState();
    const [selectedService, setSelectedService] = useState();
    const name=useRef();

    useEffect(()=>{
        if(!services)
        getServices().then(data=>{
            setServices(data);
        })
        .catch(e=>console.log("technician data error",e,));
    })
    return(
        <div>
            <h1 class="heading"> What We Offer</h1>
                { services &&
                    <div className='scrollable-div '>
                        <h2 className='smallHeading'>Services Provided</h2>
                    
                              {
                            services.map(service=><p value={service.name}>{service.name}</p>)
                             }
                             
                             </div>
    
                }
    
    </div>
    );
}
export default Table