import React from 'react'
import Data from '../food.json'
import { useState, useEffect } from 'react';
import './Food.scss'


const Food = props => {
    const [food, setFood] = useState()
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    let check = {}
    const [dict, setDict] = useState('')
     function handleKeyPress(e) {
      setText(e.target.value)
      
    }

    //state for input text
    useEffect(() => {
        setText(text)
    },[])

    //state for setting data
    useEffect(() => {
        setFood({Data});
        
    },[setFood])

    //state for isolating categories objects
    useEffect(() => {
        let cat = []
        let subCat = []
        let filter = food && food.Data.items.map(item => {
            
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
        
    },[food])


    useEffect(() => {
        // console.log(filter.toString())
        
        food && food.Data.items.map(item => 
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
       
        
    },[filter, category, food, subcategory])
    
    return (
       <div>
            {console.log(dict)}
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
                    {food && food.Data.items.map(item => 
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