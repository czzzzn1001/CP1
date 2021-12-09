import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, FlatList, View, Button, Image, TextInput, ScrollView } from 'react-native';
import { event } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';

export default function JobApplications() {
    const [num, setNum] = useState(1);
    const [company, setCompany] = useState("");
    const [link, setLink] = useState("");
    const [applications, setApplications] = useState([]);

    useEffect(() => { getData() }
        , [])

    const getData = async () => {
        try {
            // the '@profile_info' can be any string
            const jsonValue = await AsyncStorage.getItem('@jobApplications')
            let data = null
            if (jsonValue != null) {
                data = JSON.parse(jsonValue)
                setApplications(data)
                console.log('just set data')
            } else {
                console.log('just read a null value from Storage')
                // this happens the first time the app is loaded
                // as there is nothing in storage...
                setApplications([])
                setCompany("")
                setLink("")
                //setNum(num + 1);
            }
        } catch (e) {
            console.log("error in getData ")
            // this shouldn't happen, but its good practice
            // to check for errors!
            console.dir(e)
            // error reading value
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@jobApplications', jsonValue)
            console.log('just stored ' + jsonValue)
        } catch (e) {
            console.log("error in storeData ")
            console.dir(e)
            // saving error
        }
    }

    const clearAll = async () => {
        try {
            console.log('in clearData')
            await AsyncStorage.clear()
        } catch (e) {
            console.log("error in clearData ")
            console.dir(e)
            // clear error
        }
    }

    const renderApplication = ({ item }) => {
        return (
            <View style={styles.application}>
                <Text>{item.num}</Text>
                <Text>{item.company}</Text>
                <Text>{item.link} </Text>
            </View>
        )
    }

    let debug = false
    const debugView =
        (<View>
            <Text style={styles.headerText}>
                DEBUGGING INFO
            </Text>
            <Text>
                num is ({num})
            </Text>
            <Text>
                company is ({company})
            </Text>
            <Text>
                link is ({link})
            </Text>
            {/* <Text>
         result is ({result})
      </Text> */}
            <Text>
                JobApplications are {JSON.stringify(applications)}
            </Text>
        </View>);

    // here is where we render the app
    return (
        <ScrollView>
            
            <View style={styles.container}>
                <Image
                    style={styles.picture}
                    source={{
                        uri: "https://cdn.aarp.net/content/dam/aarp/work/job-search/2020/08/1140-new-job-keyboard.jpg"
                    }}
                />
                <Text style={styles.headerText}>Job Applications</Text>
                <Text style={{ fontSize: 25 }}>
                    Enter the info for your job applications below
                </Text>

                <View style={{
                    flexDirection: 'row',
                    margin: 20,
                    justifyContent: 'space-around'
                }}>
                    <TextInput // for the date/time
                        style={{ fontSize: 30 }}
                        placeholder="Company"
                        onChangeText={text => {
                            setCompany(text);
                        }}
                        value={company}
                    />

                    <TextInput // for the goal
                        style={{ fontSize: 30 }}
                        placeholder="Link"
                        onChangeText={text => {
                            setLink(text);
                        }}
                        value={link}
                    />

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <Button
                        title={"Record"}
                        color="blue"
                        onPress={() => {
                            const newApplication =
                                applications.concat(
                                    {
                                        'num': num,
                                        'company': company,
                                        'link': link,
                                        'applied': new Date()
                                    })
                            setApplications(newApplication)
                            storeData(newApplication)
                            setCompany("")
                            setLink("")
                            setNum(num + 1);
                        }}
                    />
                    <Button
                        title={"Clear"}
                        color="red"
                        onPress={() => {
                            clearAll()
                            setApplications([])
                        }}
                    />

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray'
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'green', backgroundColor: 'lightgray'
                    }}>
                        History of Applications
                    </Text>
                </View>

                <View style={styles.application}>
                    <Text>Number</Text>
                    <Text>Company</Text>
                    <Text>Link</Text>
                </View>


                <FlatList
                    data={applications.reverse()}
                    renderItem={renderApplication}
                    keyExtractor={item => item.num}
                />

                {debug ? debugView : <Text></Text>}

            </View>
        </ScrollView>

    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee',
        justifyContent: 'center',
        textAlign: 'left',
        marginTop: 20,
        padding: 20,
    },
    application: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        textAlign: 'center',
        backgroundColor: '#aaa',
        fontSize: 32,
        padding: 10,
        color: 'blue'
    },
    picture: {
        width: 500,
        height: 200,
    },

});