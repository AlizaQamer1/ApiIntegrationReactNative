import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native';
import styles from './Style';
import Title from '../../components/Title';
import {images} from '../../assets/images';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';
export default function AddComment({navigation}) {
  const [content, setContent] = useState();
  const [error, setError] = useState();

  const handleComment = async () => {
    setError('');

    if (content.trim() === '') {
      setContentError('Comment is required.');
    }
  };

  const handleContentFocus = () => {
    setError('');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backicon} source={images.backarrow} />
        </TouchableOpacity>
        <Title title="Share Your Comments" />
      </View>
      <View style={styles.commentform}>
        {/* Title input */}
        <Text style={styles.text}>Content</Text>
        <Input
          value={content}
          onChangeText={content => setContent(content)}
          placeholder="Enter Comment"
          inputType="text"
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}
<View style={styles.postcommentbutton}>
        <Button buttonColor="#0492C2" title="Post Comment" onPress={handleComment} />
        </View>
      </View>
    </View>
  );
}
