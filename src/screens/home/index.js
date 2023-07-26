import React,{useState,useEffect} from 'react';
import {View, Text, FlatList, Button, Alert} from 'react-native';

import Title from '../../components/Title';
import styles from './Style';
import {storage} from '../../Storage';
import {useNavigation} from '@react-navigation/native';
import { quotations } from '../../helpers/PostApi';

export default function Home() {
  const [quotes, setQuotes] = useState([]);

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await quotations();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const List = [
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial ',
      key: 1,
    },
  
    
  ];

  const token = storage.getString('token');
  token ? Alert.alert(token) : null;

  const navigation = useNavigation();
  const buttonPress = () => {
    storage.delete('token');
    navigation.navigate('AutheticationStack', {screen: 'Login'});
  };

  return (
    <View style={styles.homecontainer}>
      <Button title="logout" onPress={buttonPress} />

      <Title title={'Quotations That Inspire'} />
      <FlatList
        data={quotes}
        renderItem={({item}) => (
          <View style={styles.Gridcontainer}>
            <Text style={styles.Griditem}>{item.quote}</Text>
          </View>
        )}
      />
    </View>
  );
}
