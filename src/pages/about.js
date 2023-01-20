import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./about.css"
import { getTechnicians} from '../services/technicians';

const About = () => {

  const [technicians, setTechnicians] = useState();
  useEffect(() => {
    if (!technicians)
        getTechnicians().then( data =>{
            setTechnicians(data);
        })
        .catch(e => console.log("technician error: ", e));
})


    return (
    <div class="aboutDiv">
      { technicians && 
          <div class="techDiv">
      
              { 
                  technicians.map(person=>
                    <div>
                     <div>
                     <h1>{person.fullName}</h1>

                         {/* <img style={{width: 200, height: 200}}
                          className="image"
                          src={person.imageLocation}
                          alt="Second slide"
                          />  */}
                          <p>{person.description}</p>
                      </div>  
                     </div>
                     
                     
                     )
              }
          </div>
}
{ !technicians &&
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
 }

           
        </div>
        );
}

export default About;