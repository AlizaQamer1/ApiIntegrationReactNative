import React from 'react';
import styles from './Style';
import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import AccordianComponent from '../../components/AccordianComponent';
import MultiLevelCollapsibleList from '../../components/Collapsible';
import MaskedView from '@react-native-community/masked-view';
import {images} from '../../assets/images';
export default function AccordianScreen() {
  //   const data = [
  //       {
  //         title: 'Parent 1',
  //         subItems: [
  //           {
  //             title: 'Child 1',
  //             subItems: [
  //               { title: 'Child 1.1' },
  //               { title: 'Child 1.2' },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Parent 2',
  //         subItems: [
  //           {
  //             title: 'Child 2',
  //             subItems: [
  //               { title: 'Child 2.1' },
  //               { title: 'Child 2.2' },
  //             ],
  //           },
  //         ],
  //       },
  //       // ...more items
  //     ];

  // return (
  //   <View>
  //   <SafeAreaView style={styles.container}>
  //   <Text style={{fontSize:30, color:"black"}}>Accordian with animation</Text>
  //   <ScrollView
  //     contentInsetAdjustmentBehavior="automatic"
  //     style={styles.container}>
  //     <AccordianComponent title="Native development">
  //         <Text style={styles.textSmall}>React Native lets you create truly native apps and
  //         doesn't compromise your users' experiences. It provides a core set of platform
  //         agnostic native components </Text>
  //     </AccordianComponent>
  //     <AccordianComponent title="Fast refresh">
  //         <Text style={styles.textSmall}>See your changes as soon as you save.
  //         With the power of JavaScript, React Native lets you iterate at
  //         lightning speed.</Text>
  //     </AccordianComponent>
  //     <AccordianComponent title="Cross-platform">
  //         <Text style={styles.textSmall}>React components wrap existing native code
  //         and interact with native APIs via React’s declarative UI paradigm
  //         and JavaScript. This enables native app development for whole new teams
  //         of developers</Text>
  //         <View style={styles.seperator}></View>
  //         <Button title="See more..."/>
  //     </AccordianComponent>
  //   </ScrollView>

  // </SafeAreaView>
  // <MultiLevelCollapsibleList data={data}/>
  // </View>
  // )
  return (
//testing
    <MaskedView
      style={{flex: 1, flexDirection: 'row', height: '100%'}}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 60,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Basic Mask
          </Text>
        </View>
      }>
      {/* <View style={{flex: 1, height: '100%', backgroundColor: '#324376'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#F5DD90'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#F76C5E'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#e1e1e1'}} /> */}
      <Image
        source={images.mask}
        style={{flex: 1, height: '100%', backgroundColor: '#324376'}}
      />
    </MaskedView>
  );
}
