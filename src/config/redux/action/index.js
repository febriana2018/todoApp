import firebase, {database} from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: "Febriana Pam"})
    }, 1000)
    
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    return (
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            alert('success: ', res);
            dispatch({type: 'CHANGE_LOADING', value: false})
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
        })
    )
}

export const LoginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success: ', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified,
                refreshToken: res.user.refreshToken
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_LOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUser})
            resolve(dataUser)
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_LOGIN', value: false})
            reject(false)
        })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const urlNotes = database.ref('notes/' + userId);
    return new Promise((resolve,reject) => {
        urlNotes.on('value', function(snapshot) {
            console.log('get Data: ',snapshot.val());
            if (snapshot.val()!==null) {
                const data = [];
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })
                dispatch({type: 'SET_NOTES', value: data})
                resolve(snapshot.val())
                //cek commit
            }
        });
    })
    
}

export const updateDataAPI = (data) => (dispatch) => {
    const urlNotes = database.ref('notes/' + data.userId +'/' + data.noteId);
    return new Promise((resolve,reject) => {
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }

        });
    })
    
}

export const deleteDataAPI = (data) => (dispatch) => {
    const urlNotes = database.ref('notes/' + data.userId +'/' + data.noteId);
    return new Promise((resolve,reject) => {
        urlNotes.remove();
    })
    
}