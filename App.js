import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button,Image,TextInput } from 'react-native';
import { event } from 'react-native-reanimated';
import JobApplications from './components/JobApplications';
import JobApp from './components/JobApp';

const coding_url="https://blog.acromedia.com/hubfs/Blog%20Images/%28Acro%20Blog%29%20Coding%20Standards%20and%20Development%20-%201.0%20-%20mh.jpg"
const mind_url='https://www.thecoderschool.com/blog/wp-content/uploads/2019/01/CodingMakesYouSmarter.jpg'

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={{flex:3}}>
         <JobApp/>
      </View>
      
    </View>
  );
}




const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Application" component={ApplicationScreen} />

        <Stack.Screen name="About" component={AboutScreen} />

        <Stack.Screen name="Preference" component={PreferenceScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  const [url,setUrl]=useState(mind_url)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row',
                     margin:"25px",
                     border:"thick solid black",
                     padding:'10px',
                     justifyContent: 'space-between', }}>

        <Button
          title="Go to Zheng's applications"
          onPress={() =>
            navigation.navigate('Application', { name: 'Zheng', greeting:'Welcome',url:coding_url })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />

        <Button
          title="About"
          onPress={() =>
            navigation.navigate('About', { name: 'Zheng', greeting:'Hello' })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />

        <Button
          title="Preference"
          onPress={() =>
            navigation.navigate('Preference',{ name: 'Zheng', greeting:'Hello' })
          }
        />
       </View>


       <View style={{flex:3,justifyContent:'space-between'}}>
       <TextInput
          style={{fontSize:30}}
          placeholder="url"
          onChangeText={text => {setUrl(text)}}
      />
         <Image
        style={styles.image}
        source={{
          uri: url,
        }}
        />
      </View>


    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const AboutScreen = ({ navigation, route,url }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'stretch'}}>
        <Text style={styles.profileText}>
          {route.params.greeting}, this is {route.params.name}'s About page
        </Text>
      </View>
      
      <View style={{flex:3}}>
      <Image
        style={styles.image}
        source={{
          uri: mind_url,
        }}
        />
      </View>
    </View>
  );
};

const PreferenceScreen = ({ navigation, route,url }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'stretch'}}>
        <Text style={styles.profileText}>
          {route.params.greeting}, this is {route.params.name}'s Preference page
        </Text>
      </View>
      
      <View style={{flex:3}}>
      <Image
        style={styles.image}
        source={{
          uri: mind_url,
        }}
        />
      </View>
    </View>
  );
       // we're using the parameter name passed in from the HomeScreen
};

const ApplicationScreen = ({ navigation, route,url }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'stretch'}}>
        <Text style={styles.profileText}>
          {route.params.greeting}, this is {route.params.name}'s applications page
        </Text>
      </View>

      <View>
        <JobApplications/>
      </View>

      <View style={{flex:3}}>
      <Image
        style={styles.image}
        source={{
          uri: mind_url,
        }}
        />
      </View>
    </View>
  );
       // we're using the parameter name passed in from the HomeScreen
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  image:{
    resizeMode:'cover',
    width: '100%',
    height: '100%',
  },
  profileText:{
    fontSize:64,
    color:'purple'
  }
});
