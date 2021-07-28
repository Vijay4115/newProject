import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView,TextInput, Button } from 'react-native'
import { Dimensions } from 'react-native';
import { adPost } from '../actions/post';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'

//import PushNotification from 'react-native-push-notification';  

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

  class CreateAdScreen extends Component {


    sendNoti = () =>{
            firestore().collection('userTokens').get().then(querysnap =>{
                const userdevietokens = querysnap.docs.map(docsnap =>{
                        return docsnap.data().token
                })
            
                fetch('https://217474f522d6.ngrok.io/send-noti',{
                    method:'post',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        tokens : userdevietokens
                    })
                })

            })
    }
    constructor(props){

        super(props)
        
        //Local Notification without firebase...
        // PushNotification.configure({
        
        //     onRegister: function (token) {
        //       console.log("TOKEN:", token);
        //     },
          
        //     onNotification: function (notification) {
        //       console.log("NOTIFICATION:", notification);
        //       notification.finish(PushNotificationIOS.FetchResult.NoData);
        //     },
        //    onAction: function (notification) {
        //       console.log("ACTION:", notification.action);
        //       console.log("NOTIFICATION:", notification);
          
        //     },
        //   onRegistrationError: function(err) {
        //       console.error(err.message, err);
        //     },
          
        //     permissions: {
        //       alert: true,
        //       badge: true,
        //       sound: true,
        //     },
          
        //     popInitialNotification: true,
          
        //     requestPermissions: true,
        //   });




       this.state={
            name:'',
            desc:'',
            year : '',
            price :'',
            phone :'',
            i:'i'
        }


    }
   
    onButtonClick = async() =>{
       this.sendNoti();
         this.props.adPost(this.state.name,this.state.desc,this.state.year,this.state.price,this.state.phone)
        // PushNotification.createChannel(
        //     {               
        //       channelId:this.state.i, // (required)
        //       channelName: "My channel", // (required)
        //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        //       playSound: false, // (optional) default: true
        //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        //       importance: 1, // (optional) default: 4. Int value of the Android notification importance
        //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        //     },
        //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        //   );
       
        //   PushNotification.localNotification({
        //     title: "New Post Added", // (optional)
        //     message: "Click To See", // (required)
        //     channelId: this.state.i,
        //    });
        
        //    this.setState({i: this.state.i + 1})
    }
       
     

       
    render() 
    {
        return (
            <KeyboardAvoidingView >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.text}>Create Ad  !</Text>
                
                        <TextInput
                           placeholder="Enter Name"
                           placeholderTextColor="darkgrey"
                           onChangeText={(text) => this.setState({name:text})}
                           style={styles.textinput}
                        />
                        <TextInput
                           placeholder="Enter Description"
                           placeholderTextColor="darkgrey"
                            numberOfLines={3}
                            multiline
                            style={styles.textinput}
                            onChangeText={(text) => this.setState({desc:text})}
                        />
                        <TextInput
                          placeholder="Enter Year of purchase"
                          placeholderTextColor="darkgrey"
                            keyboardType="numeric"
                            onChangeText={(text) => this.setState({year:text})}
                            style={styles.textinput}
                        />
                        <TextInput
                           placeholder="Price in INR"
                           placeholderTextColor="darkgrey"
                            keyboardType="numeric"
                            onChangeText={(text) => this.setState({price:text})}
                            style={styles.textinput}
                        />
                        <TextInput
                         placeholder="Contact Nummber"
                         placeholderTextColor="darkgrey"
                         keyboardType="number-pad"
                            onChangeText={(text) => this.setState({phone:text})}
                            style={styles.textinput}
                        />
                        {/* <Button icon="camera" mode="contained" onPress={() => console.log('pressed')}>
                         openCamera() 
                            Upload Image
                        </Button> */}
            
                        <Button title="Post"  onPress={() => this.onButtonClick()} />
                      
                     
                           
                      
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // borderWidth:1,
        height: screenheight,
        marginHorizontal: 30,
        justifyContent: 'space-evenly'
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'blue',
        fontWeight: '700'
    },
    textinput:{
        borderWidth:1.5,
        borderColor:'#035397',
        marginTop:5,
        paddingLeft:15,
        borderRadius:15,
    },

})
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({adPost},dispatch)
}

export default connect (null,mapDispatchToProps)(CreateAdScreen)

