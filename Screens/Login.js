import React from 'react'
import { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, KeyboardAvoidingView,TouchableOpacity,TextInput,Button } from 'react-native'
import { Dimensions } from 'react-native';
import { userLogin,FbUser } from '../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginManager ,AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth'

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

function FBLOGIN() {
    return async (dispatch, getState) => {
      try {
        //const {email, public_profile} = getState().user
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        console.log(result);
        if (result.isCancelled) {
          throw 'User cancelled login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
        const response = auth.FacebookAuthProvider.credential(
          data.accessToken,

        );
        console.log(response);
        const res = auth().signInWithCredential(response);
        dispatch(FbUser(res).name);
        alert('Logged in');
      } catch (e) {
        console.log(e);
      }
    };
  }
class Login extends Component {

    constructor(props){
        super(props);

        this.state={
            useremail:'',
            userpass:''
        }
    }
        onLogin = () =>{
          
            this.props.userLogin(this.state.useremail,this.state.userpass);
        
    
        }
    render(){
      
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.container}>
                        <Text style={{ fontSize: 25, color: 'blue', fontWeight: '700' }}>Login </Text>
                       
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
                               style={{borderWidth:1,borderRadius:15,paddingLeft:15,borderColor:'#001E6C',fontSize:15}}
                            autoCapitalize="none"
                         secureTextEntry
                         onChangeText={(nm)=>this.setState({userpass:nm})}
                        />
                    </View>
                    <View style={styles.btnlogin} >
                        <Button  title="Login" onPress={()=> this.onLogin()}/>
                           
                    </View>
                    <View style={styles.btnlogin} >
                        <Button title="FaceBook Login" onPress={FBLOGIN()} />
                    </View>
                    <View style={styles.btnsignup} >
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUp")}> 
                                <Text style={{textAlign:'center',color:'blue'}}>Don't have Acccount ?</Text>
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
            marginTop: 100,
            width: screenwidth * 0.95,
            paddingLeft: 30
        },
    
        txtpassword: {
            marginTop: 50,
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
    const mapDispatchToProps = dispatch => {
    
        return bindActionCreators({userLogin,FbUser},dispatch)
    
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(Login)
    