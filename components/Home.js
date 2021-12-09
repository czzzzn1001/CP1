import React from "react";
import {View,Text,Image, StyleSheet} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
      <View style={{ flexDirection: 'row',
                     margin:25,
                     borderColor:"black",
                     padding:10,
                     justifyContent: 'space-around', }}>
        <Text style={{fontSize:40}}>
           JobApplication Helper
        </Text>
        <Image
        style={styles.picture}
        source={{
          uri: 'data:image/png;base64,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',
        }}
        
        />

    </View>
  );
};


const styles = StyleSheet.create({
  
  picture: {
    width: 50,
    height: 50,
  },
  
});

export default HomeScreen;