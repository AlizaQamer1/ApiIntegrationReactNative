import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import styles from './Style';

const ProductCategorySkeleton = () => (
  <ContentLoader
    speed={1}
    backgroundColor="lightgray"
    foregroundColor="#999"
    height={300} 
    style={styles.productcategoryskeleton} 
  >
    <Rect x="10" y="17" rx="2" ry="1" width="180" height="200" />
    <Rect x="200" y="17" rx="2" ry="1" width="180" height="200" />
    <Rect x="10" y="277" rx="2" ry="1" width="180" height="200" />
    <Rect x="200" y="277" rx="2" ry="1" width="180" height="200" />
    <Rect x="10" y="537" rx="2" ry="1" width="180" height="200" />
    <Rect x="200" y="537" rx="2" ry="1" width="180" height="200" />
  </ContentLoader>
);

export default ProductCategorySkeleton;

