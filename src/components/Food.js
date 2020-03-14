import React from 'react'
import Data from '../food.json'
import { useState, useEffect } from 'react';
import './Food.scss'


const Food = props => {
    const [isMounted, setIsMounted] = useState(false)
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [data, setData]= useState(Data.items)
    let check = {}
    const [dict, setDict] = useState('')
     function handleKeyPress(e) {
      setText(e.target.value)
      
    }

    //state for input text
    useEffect(() => {
        setText(text)
    },[])

    useEffect(() => {
        setData(data)
        setIsMounted(true)
    })

      //state for setting data
      useEffect(() => {
        let items = data.filter(item => dict && item.id in dict)
        console.log(items)
        if (isMounted === true) {
            // setData(data.filter(item => dict && item.id in dict));
            console.log('mounted', items)
        }
        
    },[dict, isMounted])

    //state for isolating categories objects
    useEffect(() => {
        let cat = []
        let subCat = []
        data.map(item => {
            
            check[item.id] = item.id
            setDict(check)
            
            for (let i=0; i< item.categories.length; i++) {
                cat.push({
                    parentId: item.id,
                    name: item.categories[i].name
                })
                setCategory(...category,cat)
                if (item.categories[i].subcategory) {
                    // console.log(item.categories[i].subcategory, 'check')
                    subCat.push({
                        parentId: item.id,
                        name: item.categories[i].subcategory.name
                    })
                    setSubCategory(...subcategory, subCat)
                }
            }
        })
        
    },[data])


    useEffect(() => {
        // console.log(filter.toString())
        
        data.map(item => 
             {
                 if (item.title && item.title.toLowerCase().includes(filter)) {
                    check[item.id] = item.id
                    setDict(check)
                 } else if (item.description && item.description.toLowerCase().includes(filter)) {
                    check[item.id] = item.id
                    setDict(check)
                 } else {
                     delete dict[item.id]
                 }
             }  
        )

        category && category.map(item => 
            {
                if (item.name && item.name.toLowerCase().includes(filter)) {
                   check[item.parentId] = item.parentId
                   setDict(check)
                } else {
                    delete dict[item.parentId]
                }
            }  
       )

       category && category.map(item => 
            {
                if (item.name && item.name.toLowerCase().includes(filter)) {
                   check[item.parentId] = item.parentId
                   setDict(check)
                } else {
                    delete dict[item.parentId]
                }
            }  
       )

       
        
    },[filter])
    
    return (
       <div>
            {console.log(dict, data)}
            <input
            className="filter-items"
            type="text"
            placeholder='Filter'
            name="filter"
            value={text}
            onChange={e => {
                setText(e.target.value); // set filter of state to the value typed in
            }}
            onKeyPress={e => handleKeyPress(e)}
            />
        <button onClick={() => setFilter(text.toLowerCase())}>Filter</button>
    
            <ul className = "items">
                    {data.map(item => 
                        <li className = "item"> 
                            <h3>{item.title}</h3>
                            <img src={item.img}/>
                            <p>{item.description}</p>
                            
                        </li>)}
                </ul>
       
       </div>
        
        
            
        
        
        
    );
};

export default Food