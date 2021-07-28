import db from "../firebase";
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth'


export const userSignup = (femail, fpassword) => {

    return async (dispatch) => {
    try {
        const result = await auth().createUserWithEmailAndPassword(femail, fpassword)
        
        if (result.user.uid) {
                const user = {
                    uid: result.user.uid,
                    email: femail,
                    password: fpassword
                }
                await db.collection('users').doc(result.user.uid).set(user);
                dispatch({ type: 'SIGNUP', payload: user });

                alert("User has been Signed Up");
            }

        }
        catch (e) {
            alert(e)
        }
    }
}

export const getUser = (uid) => {

    return async dispatch =>{
            
        try{
                const userquery = await db.collection('users').doc(uid).get()
                
                const user = userquery.data();
                dispatch({type:'LOGIN',payload:user})
        }
        catch(e){
            console.log("User Must Registered To the App");
            
        }
    }
}
export const userLogin = (femail,fpassword) =>{

    return async (dispatch,getstate) =>{
        try{

            const result = await auth().signInWithEmailAndPassword(femail,fpassword);
           
            dispatch(getUser(result.user.uid))
           
            
        }
        catch(e)
        {
            console.log(e);
           
        }
    }
}

export const FbUser = (uid,type) => {
    return async dispatch =>{
        try{
            console.log(uid);
            const query  = await db.collection('users').doc(uid).get();
            let user = query.data();

            dispatch({type:'FB_LOGIN',payload:user});

        }catch(e){
            console.log(e);
        }
    }
}