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
import { useRoute } from '@react-navigation/native';

import styles from './Style';
import {postdetail} from '../../../helpers/GetApi';
import Comments from '../Comments';
import { images } from '../../../assets/images';

export default function PostDetail() {
  const [postDetail, setPostDetail] = useState();
  const [users,setUsers]=useState();
  const [comments,setComments]=useState([])
  const route = useRoute();

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const { post } = route.params || {};
      if (!post) {
        console.error('No post selected.');
        return;
      }
      const {posts,users,comments} = await postdetail(post.id);
      posts.user = users.users.find((user) => user.id === posts.userId); 

      const updatedComments = comments.comments.map((comment) => {
        const user = users.users.find((user) => user.id === comment.user.id);
        return { ...comment, user };
        
      });

      setPostDetail(posts);
      setUsers(users.users);
      setComments(updatedComments);

    } catch (error) {
      console.error('Error fetching Post Detail:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
    <View style={styles.container}>
      <View style={styles.list}>
      <View style={styles.usercontainer}>
        <Image style={styles.image} source={{uri:postDetail?.user?.image}}/>
        <Text style={styles.username}>{postDetail?.user?.username}</Text>
      </View>
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
          <Text style={styles.listitem}>{comments.length} Comments</Text>
        </View>
        
      </View>
      <View style={styles.comments}>
      {comments.map((comment)=>{
        return(
         <>
          <Comments username={comment?.user?.username} title={comment.body}
            image={comment?.user?.image}
          />
          <Text style={styles.horizontalline}></Text>
          </>
         

        )
      })}
      </View>
     
    
    </View>
    </ScrollView>
  );
}
