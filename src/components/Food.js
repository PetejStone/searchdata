import React from 'react'
import Data from '../food.json'
import { useState, useEffect } from 'react';
import './Food.scss'


const Food = props => {
 
    const [filter, setFilter] = useState('') //used for text input 
    const [category, setCategory] = useState('') //initial state for category
    const [subcategory, setSubCategory] = useState('') //initial state for subcategory
    const [data, setData]= useState(Data) //initial state of data set to example file

    //creating an object to check against for constant time filtering when mapping display
    //if ID is in object, display it.
    let check = {} 

    //dict's state will be set to check when IDs are added/deleted
    const [dict, setDict] = useState('')


    //handling keypress input and setting state to filter
     function handleKeyPress(e) {
      setFilter(e.target.value)
      
    }

      //state for initial data
      useEffect(() => {
        setData(data); 
    },[setData])



    //state for isolating categories and subcategory objects
    useEffect(() => {
        let cat = [] //empty category array
        let subCat = [] //empty subcategory array

        //map through data
        data.items.map(item => {
            
            //add each item's id to check object
            check[item.id] = item.id
            
            //setDict to check
            setDict(check)
            
            //go through each item's category array
            for (let i=0; i< item.categories.length; i++) {

                //push each category's name, and the parent Id to cat (for filtering)
                cat.push({
                    parentId: item.id,
                    name: item.categories[i].name
                })

                //setCategory to hold each instance of category object
                setCategory(...category,cat)


                //if category has a subcategory
                //do the same as above
                if (item.categories[i].subcategory) {

                   //push each subcategory's name, and the parent id to subCat array (for filtering)
                    subCat.push({
                        parentId: item.id,
                        name: item.categories[i].subcategory.name
                    })

                    //setSubCategory to hold each instance of subcategory objects
                    setSubCategory(...subcategory, subCat)
                }
            }
        })
        
    },[data])


    useEffect(() => {
        
        //map through item name and descriptions and check if it includes input text
        data.items.map(item => 
             {
                 if (item.title && item.title.toLowerCase().includes(filter)) { 
                    check[item.id] = item.id //if included in title, add id to check object
                    setDict(check) // setDict state to that object
                 } else if (item.description && item.description.toLowerCase().includes(filter)) {
                    check[item.id] = item.id //if included in description, add id to check object
                    setDict(check) //setDict state to object
                 } else { 
                     delete dict[item.id] //if not in item or description, delete id from object
                 }
             }  
        )
         
        //map through categories for included text
        category && category.map(item => 
            {
                if (item.name && item.name.toLowerCase().includes(filter)) {
                   check[item.parentId] = item.parentId //if included, add the parent ID back to object
                   setDict(check) //set state
                } else {
                    delete dict[item.parentId] //if not, delete from object
                }
            }  
       )
       
       //map through subcategory for included text
       subcategory && subcategory.map(item => 
            {
                if (item.name && item.name.toLowerCase().includes(filter)) {
                   check[item.parentId] = item.parentId //if included. add parent ID back to object
                   setDict(check)//set state
                } else {
                    delete dict[item.parentId] //if not, delete
                }
            }  
       )
       
        
    },[filter, category, data, subcategory])
    
    return (
       <div>
            <input
            className="filter-items"
            type="text"
            placeholder='Filter'
            name="filter"
            value={filter}
            onChange={e => {
                setFilter(e.target.value.toLowerCase()); // set filter of state to the value typed in
            }}
            onKeyPress={e => handleKeyPress(e)}
            />
 
    
            <ul className = "items">
                    {data.items.map(item => //map through items
                        
                        //filter out and ONLY display items if their ID is in dict
                        dict && item.id in dict && <li className = "item"> 
                            <h3>{item.title}</h3>
                            <img src={item.img}/>
                            <p>{item.description}</p>
                            
                        </li>)}
                </ul>
       
       </div>
        
        
            
        
        
        
    );
};

export default Food