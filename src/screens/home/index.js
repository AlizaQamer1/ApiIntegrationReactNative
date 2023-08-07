import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';

import Title from '../../components/Title';
import styles from './Style';
import { storage } from '../../Storage';
import { useNavigation } from '@react-navigation/native';
import { quotations } from '../../helpers/GetApi';
import HomeSkeleton from '../../skeleton/homeSkeleton';

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreQuotes, setHasMoreQuotes] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const data = await quotations(currentPage);
      if (currentPage === 1) {
        setQuotes(data);
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...data]);
      }

      // Update hasMoreQuotes based on the fetched data
      setHasMoreQuotes(data.length > 0);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const token = storage.getString('token');
  const navigation = useNavigation();

  const handleLoadMore = () => {
    if (!isLoading && hasMoreQuotes) {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsLoading(true);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.Gridcontainer}>
      <Text style={styles.Griditem}>{item.quote}</Text>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="black" />;
    } else if (!hasMoreQuotes) {
      return <Text>No More Quotes to show</Text>;
    }
    return null;
  };

  return (
    <View style={styles.homecontainer}>
      <Title title={'Quotations That Inspire'} />
      {quotes.length > 0 ? (
        <FlatList
          data={quotes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <HomeSkeleton />
      )}
    </View>
  );
}
