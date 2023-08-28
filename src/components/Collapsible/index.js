import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const MultiLevelCollapsibleList = ({ data }) => {
    const [collapsedSections, setCollapsedSections] = useState({});
  
    const toggleSection = (sectionIndex) => {
      setCollapsedSections({
        ...collapsedSections,
        [sectionIndex]: !collapsedSections[sectionIndex],
      });
    };
  
    const renderSubItems = (subItems, parentIndex) => {
      return subItems.map((subItem, index) => (
        <View key={index} style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={() => toggleSection(parentIndex + '-' + index)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             
              <Text>{subItem.title}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections[parentIndex + '-' + index]}>
            {subItem.subItems && renderSubItems(subItem.subItems, parentIndex + '-' + index)}
          </Collapsible>
        </View>
      ));
    };
  
    return (
      <View>
        {data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleSection(index)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections[index]}>
              {item.subItems && renderSubItems(item.subItems, index)}
            </Collapsible>
          </View>
        ))}
      </View>
    );
  };
  

export default MultiLevelCollapsibleList;
