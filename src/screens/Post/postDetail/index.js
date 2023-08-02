import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import styles from './Style';
import {postdetail} from '../../../helpers/GetApi';
import Comments from '../Comments';

export default function PostDetail() {
  const [postDetail, setPostDetail] = useState();
  const [users, setUsers] = useState();
  const [comments, setComments] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const {post} = route.params || {};
      if (!post) {
        console.error('No post selected.');
        return;
      }
      const {posts, users, comments} = await postdetail(post.id);
      posts.user = users.users.find(user => user.id === posts.userId);

      const updatedComments = comments.comments.map(comment => {
        const user = users.users.find(user => user.id === comment.user.id);
        return {...comment, user};
      });

      setPostDetail(posts);
      setUsers(users.users);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error fetching Post Detail:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={styles.usercontainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('user', {userId: postDetail?.user?.id})
              }>
              <Image
                style={styles.image}
                source={{uri: postDetail?.user?.image}}
              />
            </TouchableOpacity>
            <Text style={styles.username}>{postDetail?.user?.username}</Text>
          </View>
          <Text style={[styles.listitem, styles.title]}>
            {postDetail?.title}
          </Text>
          <Text style={[styles.listitem, styles.body]}>{postDetail?.body}</Text>
          <View style={styles.likingcontainer}>
            <FontAwesomeIcon style={styles.like} icon={faThumbsUp} size={25} />
            <Text style={styles.listitem}>
              {postDetail?.reactions} Reactions
            </Text>
          </View>
          <View style={styles.commentcontainer}>
            <FontAwesomeIcon
              style={styles.comment}
              icon={faComment}
              size={25}
            />
            <Text style={styles.listitem}>{comments.length} Comments</Text>
          </View>
        </View>
        <View style={styles.comments}>
          {comments.map(comment => {
            return (
              <>
                <Comments
                  username={comment?.user?.username}
                  title={comment.body}
                  image={comment?.user?.image}
                  id={comment?.user?.id}
                />
                <Text style={styles.horizontalline}></Text>
              </>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
