'use client'

import React, {useEffect, useState} from "react";
import {ICategory, IPoduct} from "../../app/page";
import {Api} from "../../services/api-client";
import {Preloader} from "../preloader/Preloader";
import {ProductBlock} from "../product_block/product_block";
import {Title} from "../ui/title";
import s from './shop.module.scss';
import {ShopFilters} from "../shop_filters/shop_filters";

interface Props {
  className?: string,
  category: string
}

export const Shop:React.FC<Props> = ({className='', category}) => {
  const [loading, setLoading] = useState(true)
  const [catName, setCatName] = useState(category)
  const [categories, setCategories] = useState<ICategory[]>()
  const [productItems, setProductItems] = useState<IPoduct[]>()
  useEffect(()=>{
    Api.categories.getAll().then(setCategories)
  }, [])
  useEffect(()=>{
    setLoading(true)
    const getProducts = async (str:string) => {
      let reqParam = `?categoryId=${str}`
      if (str == 'all') {
        reqParam=''
      }
      
      Api.products.search(reqParam).then(data => setProductItems(data)).finally(()=>setLoading(false))
    }
    getProducts(catName)
  }, [catName])
  
  return <section>
    <div className="screen_content">
      <div className={s.sides}>
        <div className={s.categories_side}>
          <div className={s.categories_side_in}>
            {categories?.map(cat => <button
              className={`${catName == String(cat.id) ? 'active' : ''} ${s.cat_btn}`}
              key={cat.id}
              onClick={()=>setCatName(String(cat.id))}
            >{cat.name}</button>)}
          </div>
        </div>
        <div className={s.content_side}>
          <ShopFilters />
          {
            loading ? <Preloader/> :
              productItems && productItems.length>0 ? (
                <div className="triple_blocks">
                  {
                    productItems.map(prod => <ProductBlock key={prod.id} productItem={prod} />)
                  }
                </div>
              ) :<Title size='md' text='There are no products in this category :(' />
          }
        </div>
      </div>
    </div>
  </section>;
}