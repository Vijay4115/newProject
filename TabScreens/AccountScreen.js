import React, { Component } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet,Dimensions, Modal } from 'react-native'
import auth from '@react-native-firebase/auth'

const  screenheight = Dimensions.get('window').height;
const  screenwidth = Dimensions.get('window').width;

export default class AccountScreen extends Component {
    render() {
        return (
            <View>
                <Text style={{
                    alignSelf:'center',marginTop:50,fontSize:20,fontWeight:'600',fontStyle:'normal',color:'#001E6C'
                }}> Hello {auth().currentUser.email} </Text>

                <TouchableOpacity  style={styles.touch}
            onPress={()=>auth().signOut()} >
            <Text  style={styles.touchtext}>Account Logout</Text>
            </TouchableOpacity>
           
            </View>
        )
    }
}
const styles = StyleSheet.create({
   
    touch:{
        borderWidth:1,
        height:screenheight*0.05,
        width:screenwidth*0.7,
        marginTop:100,
        backgroundColor:'#262A53',
        alignSelf:'center'
    },
    touchtext:{
        color:'#fff',
        fontSize:20,
        fontWeight:"500",
        alignSelf:'center',
        padding:1,
    },
   
})
