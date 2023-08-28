import styles from './Style';
import {
 
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager
  
} from 'react-native';
import {React,useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
export default function AccordianComponent({ children, title }) {
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    LayoutAnimation.configureNext(LayoutAnimation.create(500, 'linear', 'scaleY'));
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{ children }</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
        <Text style={styles.accordTitle}>{ title }</Text>
        <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }
              size={20} color="#bbb" />
      </TouchableOpacity>
      { expanded && body }
    </View>
  );
}