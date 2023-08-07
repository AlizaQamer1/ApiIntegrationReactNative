import React from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ProductDetailSkeleton = () => {
  return (
    <View style={{ flex: 1, paddingLeft: 20 }}>
      <ContentLoader
        width="100%"
        height={700}
        viewBox="0 0 450 700"
        backgroundColor="lightgray"
        foregroundColor={'#999'}
      >
        <Rect x="0" y="0" rx="5" ry="5" width="90%" height="300" />

        <Rect x="0" y="280" rx="5" ry="5" width="90%" height="50" />

        <Rect x="0" y="380" rx="5" ry="5" width="50%" height="50" />
      
        <Rect x="0" y="440" rx="5" ry="5" width="50%" height="50" />
        <Rect x="0" y="500" rx="5" ry="5" width="70%" height="50" />
        <Rect x="0" y="560" rx="5" ry="5" width="90%" height="50" />
        <Rect x="0" y="620" rx="5" ry="5" width="70%" height="50" />
        <Rect x="0" y="680" rx="5" ry="5" width="70%" height="50" />
      </ContentLoader>
    </View>
  );
};

export default ProductDetailSkeleton;
