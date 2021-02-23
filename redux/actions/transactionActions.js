import firebase from "../../firebase/firebase";

export const RESET_DATA = "RESET_DATA";
export const SET_TRANSACTION_DATA = "SET_TRANSACTION_DATA";
export const ADD_TRANSACTION_LOADING = "ADD_TRANSACTION_LOADING";
export const ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS";
export const ADD_TRANSACTION_ERROR = "ADD_TRANSACTION_ERROR";

export function setMembersData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_MEMBERS_DATA,
      data,
    });
  };
}

export function getTransaction(member) {
  return (dispatch) => {
    const db = firebase.firestore();
    db.collection("transactions")
      .where("compte", "==", member.compte)
      .onSnapshot(
        (querySnapshot) => {
          const transaction = querySnapshot.docs.map(function (doc) {
            return doc.data();
          });
          console.log("docRef ", transaction);
          dispatch({
            type: SET_TRANSACTION_DATA,
            data: { [member.compte]: transaction },
          });
        },
        (e) => {
          dispatch({
            type: ADD_TRANSACTION_ERROR,
            data: e,
          });
        }
      );
  };
}

export function addTransaction(transaction) {
  return (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: ADD_TRANSACTION_LOADING,
    });
    db.collection("transactions")
      .add(transaction)
      .then((docRef) => {
        console.log("docRef ", docRef);
        console.log("Document written with ID: ", docRef.id);

        return docRef
          .update({
            code: docRef.id,
            date_firebase: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((doc) => console.log("doc updated ", doc));
      })
      .then(() => {
        console.log("Document successfully added!");
        dispatch({
          type: ADD_TRANSACTION_SUCCESS,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        dispatch({
          type: ADD_TRANSACTION_ERROR,
          data: error,
        });
      });
  };
}
