import React, { useState } from 'react'
import { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Button } from 'react-native'
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup } from '../actions/user';
import  firestore from '@react-native-firebase/firestore';
import messeging from '@react-native-firebase/messaging'





const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;



class SignUp extends Component {

    constructor(props){
        super(props);

        this.state={
            useremail:'',
            userpass:''
        }
    }
    onSignup = () => {
        messeging().getToken().then(tokens =>{
            firestore().collection('userTokens').add({
                token:tokens
            })
          })
          
      this.props.userSignup(this.state.useremail,this.state.userpass) 
        //console.log(this.props);
    }
    render() {
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.container}>
                        <Text style={{ fontSize: 25, color: 'blue', fontWeight: '700' }}>Sign Up </Text>
                        
                    </View>

                    <View style={styles.txtemail}>
                        <TextInput
                            placeholder="Enter Email"
                            placeholderTextColor="darkgrey"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(nm)=>this.setState({useremail:nm})}
                            style={{borderWidth:1,borderRadius:15,paddingLeft:15,borderColor:'#001E6C',fontSize:15}}
                            />
                    </View>
                    <View style={styles.txtpassword}>
                        <TextInput
                            placeholder="Enter Password"
                            placeholderTextColor="darkgrey"
                            secureTextEntry
                            autoCapitalize="none"
                            style={{borderWidth:1,borderRadius:15,paddingLeft:15,borderColor:'#001E6C',fontSize:15}}
                            onChangeText={(nm)=>this.setState({userpass:nm})}
                        />
                    </View>
                    <View style={styles.btnlogin} >
                        <Button title="SignUp" onPress={() => this.onSignup()} />
                    </View>
                    <View style={styles.btnsignup} >
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                            <Text style={{ textAlign: 'center', color: 'blue' ,fontSize:15}}>Login... ?</Text>
                        </TouchableOpacity>
                    </View>

                   

                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
        alignSelf: 'center',
    },
    txtemail: {
        marginTop: 50,
        width: screenwidth * 0.95,
        paddingLeft: 30
    },

    txtpassword: {
        marginTop: 30,
        width: screenwidth * 0.95,
        paddingLeft: 30
    },
    btnlogin: {
        marginTop: 80,
        width: screenwidth * 0.8,
        alignSelf: 'center',
    },
    btnsignup: {
        marginTop: 40,
        width: screenwidth * 0.8,
        alignSelf: 'center',
    },
})

const mapStateToProps = state =>{
    return{
        user:state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({userSignup},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);