import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useRoute} from '@react-navigation/native';

import styles from './Style';
import {userprofile} from '../../helpers/GetApi';
import UserPost from '../../components/UserPost';

export default function User(navigation) {
  const [users, setUsers] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const route = useRoute();

  console.log(route?.params?.userId);
  useEffect(() => {
  
    fetchUserProfile();
  }, [navigation]);

  const fetchUserProfile = async () => {
    try {
      const {userId} = route.params;
      const {user, userinfo, userPosts} = await userprofile(userId);

      userPosts.posts = userPosts.posts.map(p => {
        const user = userinfo.users.find(user => user.id === p.userId);
        return {...p, user};
      });

      setUserInfo(userinfo.users);
      setUserPosts(userPosts.posts);
      setUsers(user);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };


  const maskCardNumber = cardNumber => {
    const visibleDigits = 4;
    const maskedValue =
      '*'.repeat(cardNumber?.length - visibleDigits) +
      cardNumber?.slice(-visibleDigits);
    return maskedValue;
  };
  const limitBodyText = (text, limit = 100) => {
    if (text?.length <= limit) {
      return text;
    }
    return text?.slice(0, limit) + '...';
  };
  console.log(userPosts);

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image style={styles.image} source={{uri: users?.image}} />
          <View style={styles.namecontainer}>
            <Text style={styles.firstname}>{users?.firstName} </Text>
            <Text style={styles.lastname}>{users?.lastName} </Text>
          </View>
        </View>
        <View style={styles.userinformation}>
          <Text style={styles.text}>{users?.username}</Text>
          <View style={styles.rowcontainer}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={23} color="gray" />
            <Text style={styles.headingtext}> {users?.address.address}</Text>
          </View>
          <Text style={styles.text}>
            {users?.company.title} at {users?.company.name}
          </Text>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Department:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.company.department}
            </Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Email:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.email}</Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Phone Number:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.phone}</Text>
          </View>
        </View>
        <View style={styles.userinformation}>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Age:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.age}</Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Gender:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.gender}</Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Weight:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.weight}</Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>BloodGroup:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.bloodGroup}
            </Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Height:</Text>
            <Text style={[styles.text, styles.titletext]}>{users?.height}</Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>BirthDate:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.birthDate}
            </Text>
          </View>
        </View>
        <View style={styles.userinformation}>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Address:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.address.city}, {users?.address.state}
            </Text>
          </View>
          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>PostalCode:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.address.postalCode}
            </Text>
          </View>
        </View>
        <View style={styles.userinformation}>
          <Text style={styles.headingtext}>Company Address:</Text>
          <Text style={[styles.text, styles.addresstext]}>
            {users?.company.address.address}
          </Text>
          <Text style={[styles.text, styles.addresstext]}>
            {users?.company.address.city}, {users?.company.address.state} -{' '}
            {users?.company.address.postalCode}
          </Text>
        </View>
        <View style={styles.userinformation}>
          <Text style={styles.headingtext}>Banking Information::</Text>
          <Text style={[styles.text, styles.addresstext]}>
            {maskCardNumber(users?.bank.cardNumber)}
          </Text>
          <Text style={[styles.text, styles.addresstext]}>
            {users?.bank.cardType}, {users?.bank.cardExpire}
          </Text>
          <Text style={[styles.text, styles.addresstext]}>
            {maskCardNumber(users?.bank.iban)}
          </Text>

          <View style={styles.rowcontainer}>
            <Text style={styles.headingtext}>Currency:</Text>
            <Text style={[styles.text, styles.titletext]}>
              {users?.bank.currency}
            </Text>
          </View>
        </View>
      </View>
     
      <Text>{userPosts?.posts?.user?.title}</Text>
    
      {userPosts &&
        userPosts.map(post => (
          <>

            <UserPost
              image={post.user?.image}
              title={post?.title}
              body={limitBodyText(post?.body)}
              reactions={post?.reactions}
              post={post}
              id={post?.user?.id}
           
            />
            <Text style={styles.horizontalline}></Text>
          </>
        ))}
    </ScrollView>
  );
}
