// AddPost.js

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';

import styles from './Style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';
import Title from '../../components/Title';
import {images} from '../../assets/images';

export default function AddPost({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reactions, setReactions] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [reactionError, setReactionError] = useState('');
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const reactionInputRef = useRef();

  const date = new Date();

  const handlePost= async () => {
    setTitleError('');
    setContentError('');
    setReactionError('');

    if (title.trim() === '') {
      setTitleError('Post Title is required.');
    }

    if (content.trim() === '') {
      setContentError('Post Description is required.');
    }

    // Check if reactions is a valid number
    if (isNaN(reactions)) {
      setReactionError('Reactions must be a number.');
    }
  };

  const handleTitleFocus = () => {
    setTitleError('');
  };

  const handleContentFocus = () => {
    setContentError('');
  };

  const handleReactionFocus = () => {
    setReactionError('');
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backicon} source={images.backarrow} />
            </TouchableOpacity>
            <Title style={styles.title} title="Post Your Thoughts" />
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.postform}>
              {/* Title input */}
              <Text style={styles.text}>Title</Text>
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="Enter Title of Post"
                ref={titleInputRef}
                returnKeyType="next"
                onSubmitEditing={() => contentInputRef?.current?.focus()}
                blurOnSubmit={false}
                onFocus={handleTitleFocus}
                inputType="text"
              />
              {!!titleError && (
                <Text style={styles.errorText}>{titleError}</Text>
              )}

              {/* Content input */}
              <Text style={styles.text}>Post Content</Text>
              <Input
                value={content}
                onChangeText={setContent}
                placeholder="Enter Post Description"
                ref={contentInputRef}
                returnKeyType="next"
                onSubmitEditing={() => reactionInputRef?.current?.focus()}
                blurOnSubmit={false}
                onFocus={handleContentFocus}
                inputType="text"
              />
              {!!contentError && (
                <Text style={styles.errorText}>{contentError}</Text>
              )}

              {/* Reaction input */}
              <Text style={styles.text}>Reactions</Text>
              <Input
                value={reactions.toString()}
                onChangeText={setReactions}
                placeholder="Enter Initial Reactions"
                ref={reactionInputRef}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onFocus={handleReactionFocus}
                inputType="number"
              />
              {!!reactionError && (
                <Text style={styles.errorText}>{reactionError}</Text>
              )}
              <Text style={styles.dateText}>
                {moment(date).toISOString()}{' '}
                {/* Format the date using moment and convert to ISO 8601 */}
              </Text>

              <Buttoncomponent
                buttonColor="#0492C2"
                title="Post"
                onPress={hand}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
