import firebase from "../../firebase/firebase";

export const RESET_DATA = "RESET_DATA";
export const SET_MEMBERS_DATA = "SET_MEMBERS_DATA";
export const ADD_MEMBER_LOADING = "ADD_MEMBER_LOADING";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const ADD_MEMBER_ERROR = "ADD_MEMBER_ERROR";
export const SET_MEMBER_UPDATING = "SET_MEMBER_UPDATING";
export const REMOVE_MEMBER_UPDATING = "REMOVE_MEMBER_UPDATING";
const MEMBERS_PREFIX = "M1";

export function setMembersData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_MEMBERS_DATA,
      data,
    });
  };
}

export function setMemberUpdate(member) {
  return (dispatch) => {
    dispatch({
      type: SET_MEMBER_UPDATING,
      data: member,
    });
  };
}

export function removeMemberUpdate() {
  return (dispatch) => {
    dispatch({
      type: REMOVE_MEMBER_UPDATING,
    });
  };
}

export function watchMembersData() {
  return (dispatch) => {
    const db = firebase.firestore();
    db.collection("members").onSnapshot(
      (querySnapshot) => {
        const members = querySnapshot.docs.map(function (doc) {
          return doc.data();
        });
        dispatch({
          type: SET_MEMBERS_DATA,
          data: members,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
}

export function addMember(member) {
  return (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: ADD_MEMBER_LOADING,
    });

    db.collection("members")
      .add(member)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);

        const countersRef = db.collection("counters").doc("counters");
        const increment = firebase.firestore.FieldValue.increment(1);

        return countersRef.get().then((doc) => {
          const count = doc.exists && doc.data().members;
          countersRef.update({ members: increment });
          return docRef.update({
            id: `${MEMBERS_PREFIX}${count}`,
            compte: docRef.id,
            code: docRef.id,
          });
        });
      })
      .then(() => {
        console.log("Document successfully added!");
        dispatch({
          type: ADD_MEMBER_SUCCESS,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        dispatch({
          type: ADD_MEMBER_ERROR,
          data: error,
        });
      });
  };
}

export function updateMember(member, newData) {
  return (dispatch) => {
    if (!member) return;
    const db = firebase.firestore();
    dispatch({
      type: ADD_MEMBER_LOADING,
    });
    db.collection("members")
      .doc(member.code)
      .update(newData)
      .then(() => {
        console.log("Document Members successfully updated!");
        dispatch({
          type: ADD_MEMBER_SUCCESS,
        });
      })

      .catch((error) => {
        console.error("Error updating members document: ", error);
        dispatch({
          type: ADD_MEMBER_ERROR,
          data: error,
        });
      });
  };
}
