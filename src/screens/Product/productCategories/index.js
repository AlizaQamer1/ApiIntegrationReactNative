import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,Image} from 'react-native'

import styles from './Style'

import { images } from '../../../assets/images'
import Title from '../../../components/Title'
import ProductCategorySkeleton from '../../../skeleton/productCategorySkeleton'
import { productcategories } from '../../../helpers/GetApi'




export default function ProductCategories() {
  const[productCategory,setProductCategory]=useState()

  useEffect(() => {
    fetchProductCategories();
  },[]);
  
  const fetchProductCategories = async () => {
    try {
      const data = await productcategories();

        setProductCategory(data);
      } 
    
     catch (error) {
      console.error('Error fetching ProductCategories:', error);
    }
  };

  const List=[
    {name:"Product1", key:2},
    {name:"Product2", key:1},
    {name:"Product3", key:3},
    {name:"Product4", key:4},
    {name:"Product5", key:5},
    {name:"Product6", key:6},
    {name:"Product7", key:1},
    {name:"Product8", key:2},
    {name:"Product9", key:3},
    {name:"Product10", key:4},
    {name:"Product11", key:5},
    {name:"Product12", key:6},
    {name:"Product13", key:1},
    {name:"Product14", key:2},
    {name:"Product15", key:3},
    {name:"Product16", key:4},
    {name:"Product17", key:5},
    {name:"Product18", key:6},
    {name:"Product19", key:1},
    {name:"Product20", key:2},
  
  ]
  const productImages = [
    images.smartphone,
    images.laptops,
    images.fragnance,
    images.skincare,
    images.groceries,
    images.homedecoration,
    images.furniture,
    images.tops,
    images.womendresses,
    images.womenshoes,
    images.menshirt,
    images.menshoes,
    images.menwatches,
    images.womenwatches,
    images.womenbags,
    images.womenjewerly,
    images.sunglasses,
    images.automotive,
    images.motorcycle,
    images.lighting,
  ];
  return (
   <View style={styles.category}>
      <Title title="Available Products On Our Store"/>
       <View style={styles.categorycontainer}>
      
     <FlatList
      data={productCategory}
      renderItem={({item,index})=>{
        return(
          <View style={styles.list}>
          {productCategory.length>0?
          <>
          <Image style={styles.image} source={productImages[index]}/>
          <Text style={styles.listitem}>{item}</Text>
          </>
          :
          <ProductCategorySkeleton/>
          }
          </View>
        )
      }}
      numColumns={2}
     />
      </View>
    </View>
  )
}
