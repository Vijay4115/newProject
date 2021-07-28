import db from "../firebase";
import auth from '@react-native-firebase/auth'

export const adPost = (fname,fdesc,fyear,fprice,fphone) =>{

    return async () =>{
        try {
            await db.collection('ads')
                .add({
                    name:fname,
                    desc:fdesc,
                    year:fyear,
                    price: fprice,
                    phone: fphone,
                    uid: auth().currentUser.uid
                })
            alert("Post Added");
                               
        } catch (e) { 
            console.log(e, "Catch Add post");
            alert(e) }
    }
}

export const getPosts =  () =>{

    try{
        return  async dispatch => {
          
        const query = await db.collection('ads').get()
            const result = query.docs.map(docSnap =>docSnap.data())
            
              dispatch({type:'GETPOST',payload:result})
      
    }
    
}catch(e)
{console.log(e);}
   
}
