import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

import Title from '../../../components/Title';
import styles from './Style';
import {postlisting} from '../../../helpers/GetApi';
import {postListingSuccess} from '../../../redux/postactions';
import {useDispatch, useSelector} from 'react-redux';

export default function PostListing() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postData = useSelector(state => state?.post?.postData);
  console.log('Post Listing data', postData);

  const handlePostClick = post => {
    navigation.push('postDetail', {post});
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const {post, user} = await postlisting(currentPage);
      const updatedPosts =
        post && post.posts && post.posts.length > 0
          ? post.posts.map(p => {
              const userr = user.users.find(user => user.id === p.userId);
              return {...p, userr};
            })
          : [];

      if (currentPage === 1) {
        setPosts(updatedPosts);
        dispatch(postListingSuccess(updatedPosts));
      } else {
        setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
        dispatch(
          postListingSuccess(prevPosts => [...prevPosts, ...updatedPosts]),
        );
      }

      setIsLoading(false);
      setIsFetchingMore(false); // Done fetching more posts
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
    if (!isLoading && !isFetchingMore) {
      setCurrentPage(prevPage => prevPage + 1);
      setIsFetchingMore(true); // Start fetching more posts
    }
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
      <View style={styles.addpostbutton}>
        <Button
          onPress={() => navigation.navigate('addpost')}
          title="Add Post"
        />
      </View>
      <FlatList
        data={posts}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          return (
            <View style={styles.list}>
              <Text style={styles.horizontalline}></Text>
              <View style={styles.titlecontainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('user', {userId: item?.userr?.id})
                  }>
                  <Image style={styles.image} source={renderUserImage(item)} />
                </TouchableOpacity>

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
              <View style={{flexDirection:"row"}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePostClick(item)}>
                <Text style={styles.buttonText}>Show More</Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                style={[styles.button,styles.commentbutton]}
                onPress={() => navigation.navigate("addcomment")}>
                <Text style={styles.buttonText}>Add Comment</Text>
              </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => {
          if (isLoading) {
            return (
              <ActivityIndicator
                size="large"
                color="teal"
                style={{marginTop: '80%'}}
              />
            );
          } else if (!isLoading && posts.length === 0) {
            return <Text>No Posts Available</Text>;
          } else if (isFetchingMore) {
            return <ActivityIndicator size="small" color="black" />;
          } else {
            return <Text>No More Posts to Show</Text>;
          }
        }}
      />
    </View>
  );
}
