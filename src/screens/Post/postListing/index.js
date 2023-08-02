import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

import Title from '../../../components/Title';
import styles from './Style';
import {images} from '../../../assets/images';
import {postlisting} from '../../../helpers/GetApi';

export default function PostListing() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const navigation=useNavigation();

  const handlePostClick = post => {
    navigation.navigate('postDetail', {post});
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const {post, user} = await postlisting(currentPage);
      const updatedPosts = post.posts.map(p => {
        const userr = user.users.find(user => user.id === p.userId);
        return {...p, userr};
      });

      if (currentPage === 1) {
        setPosts(updatedPosts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Posts:', error.message);
    }
  };

  const limitBodyText = (text, limit = 100) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };
  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
      setIsLoading(true);
    }
  };
  const renderFooter = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="black" />;
    } else {
      return <Text>No More Posts to show</Text>;
    }
    return null;
  };

  const renderUserImage = item => {
    if (item.userr && item.userr.image) {
      return {uri: item.userr.image};
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <Title style={styles.maintitle} title="Updates" />
      <FlatList
        data={posts}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        renderItem={({item, index}) => {
          console.log(item.userr?.image);
          return (
            <View style={styles.list}>
              <Text style={styles.horizontalline}></Text>
              <View style={styles.titlecontainer}>
              <Image style={styles.image} source={renderUserImage(item)} />
                {/* <Image style={styles.image} source={images.groceries} /> */}
                <Text style={[styles.listitem, styles.heading]}>
                  {item.title}
                </Text>
              </View>
              <Text style={[styles.listitem, styles.body]}>
                {limitBodyText(item.body)}
              </Text>
              <View style={styles.likingcontainer}>
                <Rating
                  style={styles.starcontainer}
                  type="heart"
                  ratingCount={1}
                  imageSize={25}
                  readonly
                  startingValue={1}
                />
                <Text style={styles.listitem}>{item.reactions}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handlePostClick(item)}>
                <Text style={styles.buttonText}>Show More</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
