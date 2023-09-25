import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {getDocs, collection} from 'firebase/firestore';


export const MainContext = createContext();

import axios from 'axios';

import DR1 from '../assets/pageImages/Doctors/Dr-1.jpeg'
import DR2 from '../assets/pageImages/Doctors/Dr-2.jpeg'
import DR3 from '../assets/pageImages/Doctors/Dr-3.jpg'
import DR4 from '../assets/pageImages/Doctors/Dr-4.jpg'

const Testimonies = [
     {name: 'Uwase Sandra'},
     {name: 'Mukamudenge Mary'},
     {name: 'Niyonigira Angera'},
     {name: 'Benimana Antoinetter'},
     {name: 'Ishime Constatine'}
]

const doctors = [
     {image: DR1, name: "Dr. Uwineza Angelique"},
     {image: DR2, name: "Dr. Keza Ange"},
     {image: DR3, name: "Dr. Uwase Geraldine"},
     {image: DR4, name: "Dr. Irakiza Angeline"},

]

const AppData = ({children}) => {
     const resourceCollection = collection(db, 'resources');
     const [products, setProucts] = useState([]);

     const [resData, setResData] = useState([]);
     const [resView, setResView] = useState(null);
     const [searchOn, setSearchOn] = useState(false);
     const [specialists, setSpecialist] = useState(doctors);
     const [testimonies, setTestimonies] = useState(Testimonies);

     const getResources = async () => {
          try {
               const responce = await getDocs(resourceCollection);
               const data = responce.docs.map((doc) => ({...doc.data(), id: doc.id}));
               setResData(data);
          } catch (error) {
               console.error(error)
          }
     }

     useEffect(() => {
          const getProducts = async () => {
               try{
                    const responce = await axios.get("https://fakestoreapi.com/products")
                    setProucts(responce.data);
               } catch (err){
                    console.log(err);
               }
          }
          getResources();
          getProducts();
          console.log('Geing fetched...')
     }, []);

     return(
          <MainContext.Provider value={{resData, setResData, resView,setResView, searchOn, setSearchOn, products,specialists,setSpecialist, testimonies,setTestimonies}} >
               {children}
          </MainContext.Provider>
     )
};

export default AppData;