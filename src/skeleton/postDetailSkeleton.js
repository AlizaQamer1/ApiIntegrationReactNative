import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ProductCategorySkeleton = () => (
  <View style={styles.productCategory}>
    <View style={styles.row}>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="0 0 150 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="0 0 150 200"
          backgroundColor="lightgray" foregroundColor={'#999'}
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="10 10 150 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="10 10 150 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="10 10 150 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
      <View style={styles.column}>
        <ContentLoader
          speed={1}
          width={150}
          height={250}
          viewBox="10 10 150 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ccc"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="150" height="200" />
        </ContentLoader>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productCategory: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    marginLeft: 20,
  },
});

export default ProductCategorySkeleton;
