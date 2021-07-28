import React, {  Component } from 'react'
import {LogBox ,FlatList,SafeAreaView,StyleSheet,Platform, Linking,RefreshControl} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';
import { getPosts } from '../actions/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

LogBox.ignoreAllLogs(true)

const method=(item) =>{
    return(
        <Card style={styles.card}>
        <Card.Title title={item.name}  />
        <Card.Content>
          
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button onPress={()=>openDialog()}>Call Seller</Button>
        </Card.Actions>
      </Card>
    )
}


const openDialog = (phone) =>{
            if(Platform.OS == 'android'){
                Linking.openURL(`tel:${phone}`)
            }
            else
            {
                Linking.openURL(`telprompt:${phone}`)
            }
    }
 
class HomeScreen extends Component {
   
    constructor(props){
        super(props);
        this.state ={
            refreshing:false,
        }
    }

   
componentDidMount =() =>{
   
    
    this.props.getPosts();
     
}


wait = (timeout) =>{
    return new Promise(resolve =>{
        setTimeout(resolve,timeout)
    })
}

onRefresh = () =>{
    this.setState({refreshing:true});
    this.wait(3000).then(()=> {
        this.props.getPosts()
        this.setState({refreshing:false})
    })
}

    render(){

    return (
        
        <SafeAreaView>
        <FlatList 
                data={this.props.post?.feed}
                refreshControl = {<RefreshControl  refreshing={this.state.refreshing}
                 onRefresh={()=> this.onRefresh()}/>}
                keyExtractor={(item)=>item.uid}
                renderItem={({item})=>method(item)}
                /> 
</SafeAreaView>
        
    )
            }
}

const styles = StyleSheet.create({
    card:{
      margin:10,
      elevation:2,
      
    },
   
})

const mapStateToProps = state =>{
    
    return {
    post:state.post,
      }
    
}
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({getPosts},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)




















