import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ProductListingSkeleton = () => (
  <View style={styles.productListing}>
    <View style={styles.row}>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width="100%"
          height={400}
          backgroundColor="lightgray" foregroundColor={'#999'}
          
        >
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height={400} />
        </ContentLoader>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width="100%"
          height={400}
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height={400} />
        </ContentLoader>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productListing: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  
  },
  column: {
    width: '90%',
    height: 400,
    marginHorizontal: 40,
    overflow:"hidden",
    borderRadius:20
  },
});

export default ProductListingSkeleton;
