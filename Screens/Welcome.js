import React, { Component } from 'react'
import { SafeAreaView,View,Text,Button,ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import getUser  from '../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Welcome extends Component{
    componentDidMount = () => {

        //console.log(auth().onAuthStateChanged, "auth ");
        auth().onAuthStateChanged((user)=>{
            console.log(user , "User");
            if(user){
                this.props.getUser(user.uid)
    
                if(this.props.user != null){
                    this.props.navigation.navigate('TabNavigator')
                    this.props.navigation.reset({
                        index:0,
                        routes:[{name:'TabNavigator'}]
                    })
    
                }
            }
            else
            {
                this.props.navigation.navigate('Login')
                this.props.navigation.reset({
                    index:0,
                    routes:[{name:'Login'}]
                })
            }
        })
    }
    state={
        isloading:false
    }
    render(){

        return(

            this.state.isloading ?(
                <View>
                    <Text> welcome </Text>
                </View>
                ):
                (
                    <View>
                        <ActivityIndicator size="large" style={{marginTop:156,alignItems:'center'}}/>
                    </View>
                )
        )
    }
}
const mapStateToProps = state =>{
    return {
        user:state.user
    }
}
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({getUser},dispatch);

}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)