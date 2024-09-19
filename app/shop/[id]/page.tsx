'use client'

import React, {useEffect, useState} from "react";
import s from './shop.module.scss'
import {Api} from "../../../services/api-client";
import {ICategory, IPoduct} from "../../page";
import {Title} from "../../../components/ui/title";
import {Preloader} from "../../../components/preloader/Preloader";

export default function ShopPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [catName, setCatName] = useState(params.id)
  const [categories, setCategories] = useState<ICategory[]>()
  const [productItems, setProductItems] = useState<IPoduct[]>()
  useEffect(()=>{
    Api.categories.getAll().then(setCategories)
  }, [])
  useEffect(()=>{
    console.log(catName)
    setLoading(true)
    const getProducts = async (str) => {
      let reqParam = `?categoryId=${str}`
      if (str == 'all') {
        reqParam=''
      }
      
      Api.products.search(reqParam).then(data => setProductItems(data)).finally(()=>setLoading(false))
    }
    getProducts(catName)
  }, [catName])
  
  console.log(productItems)
  
  return <section>
    <div className="screen_content">
      {/*<p>Shop page {params.id}</p>*/}
      <div className={s.sides}>
        <div className={s.categories_side}>
          {categories?.map(cat => <button 
            className={`${catName == String(cat.id) ? 'active' : ''} ${s.cat_btn}`} 
            key={cat.id} 
            onClick={()=>setCatName(String(cat.id))}
          >{cat.name}</button>)}
        </div>
        <div className={s.content_side}>
          {
            loading ? <Preloader/> :
            productItems && productItems.length>0 ? (
              <div className="triple_blocks">
                {
                  productItems.map(prod => <p key={prod.id}>{prod.title} {prod.category.id}</p>)
                }
              </div>
            ) :<Title size='md' text='There are no products in this category :(' />
          }
        </div>
      </div>
    </div>
  </section>;
}