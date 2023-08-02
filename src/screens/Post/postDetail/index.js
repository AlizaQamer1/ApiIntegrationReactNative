import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Rating} from 'react-native-ratings';

import styles from './Style';
import {postdetail} from '../../../helpers/GetApi';
import PostListing from '../postListing';
import Comments from '../Comments';

export default function PostDetail() {
  const [postDetail, setPostDetail] = useState();

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const data = await postdetail();
      setPostDetail(data);
    } catch (error) {
      console.error('Error fetching Post Details:', error.message);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.list}>
      <Text style={[styles.listitem, styles.title]}>{postDetail?.title}</Text>
        <Text style={[styles.listitem, styles.body]}>
          {postDetail?.body}
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
          <Text style={styles.listitem}>{postDetail?.reactions} Reactions</Text>
        </View>
        <View style={styles.commentcontainer}>
          <Rating
            style={styles.starcontainer}
            type="bell"
            ratingCount={1}
            imageSize={25}
            readonly
            startingValue={1}
          />
          <Text style={styles.listitem}>{postDetail?.reactions} Comments</Text>
        </View>
        
      </View>
    <Comments username="Abdullah" title="Working on project"/>
    </View>
    </ScrollView>
  );
}
