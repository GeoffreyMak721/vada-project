import firebase from "../../firebase/firebase";

export const RESET_DATA = "RESET_DATA";
export const SET_ADMIN_DATA = "SET_ADMIN_DATA";
export const SET_ADMIN_LIST_DATA = "SET_ADMIN_LIST_DATA";
export const REMOVE_ADMIN_DATA = "REMOVE_ADMIN_DATA";
export const ADMIN_LOGGED_OUT = "ADMIN_LOGGED_OUT";
export const ADD_ADMIN_LOADING = "ADD_ADMIN_LOADING";
export const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS";
export const ADD_ADMIN_ERROR = "ADD_ADMIN_ERROR";
export const REMOVE_ADMIN_UPDATING = "REMOVE_ADMIN_UPDATING";
export const SET_ADMIN_UPDATING = "SET_ADMIN_UPDATING";
export const RESET_LOADING_STATE = "RESET_LOADING_STATE";

export function setAdminData(admin) {
  return (dispatch) => {
    dispatch({
      type: SET_ADMIN_DATA,
      data: admin,
    });
  };
}

export function resetLoading() {
  return (dispatch) => {
    dispatch({
      type: RESET_LOADING_STATE,
    });
  };
}

export function setAdminUpdate(admin) {
  return (dispatch) => {
    dispatch({
      type: SET_ADMIN_UPDATING,
      data: admin,
    });
  };
}

export function removeAdminUpdate() {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ADMIN_UPDATING,
    });
  };
}

export function logoutAdmin() {
  return (dispatch) => {
    dispatch({
      type: ADMIN_LOGGED_OUT,
    });
  };
}

export function addAdmin(admin) {
  console.log("admin", admin);
  return (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: ADD_ADMIN_LOADING,
    });

    db.collection("admins")
      .add(admin)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);

        const countersRef = db.collection("counters").doc("counters");
        const increment = firebase.firestore.FieldValue.increment(1);

        return countersRef.get().then((doc) => {
          const count = doc.exists && doc.data().admins;
          countersRef.update({ admins: increment });
          return docRef.update({
            id: `${admin.attribut}${count}`,
            code: docRef.id,
          });
        });
      })
      .then(() => {
        console.log("Document successfully added!");
        dispatch({
          type: ADD_ADMIN_SUCCESS,
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

export function updateAdmin(admin, newData, selfData = false) {
  return (dispatch) => {
    if (!admin) return;
    const db = firebase.firestore();
    dispatch({
      type: ADD_ADMIN_LOADING,
    });
    db.collection("admins")
      .doc(admin.code)
      .update(newData)
      .then(() => {
        console.log("Document successfully added!");
        if (selfData) {
          dispatch({
            type: SET_ADMIN_DATA,
            data: { ...admin, ...newData },
          });
        }
        dispatch({
          type: ADD_ADMIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        dispatch({
          type: ADD_ADMIN_ERROR,
          data: error,
        });
      });
  };
}

export function watchAdminsData(admin = {}) {
  return (dispatch) => {
    console.log("admin watch");
    if (!!admin && admin.attribut !== "A1") return;

    const db = firebase.firestore();

    db.collection("admins")
      .where("attribut", "!=", "A1")
      .onSnapshot(
        (querySnapshot) => {
          const admins = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((data) => data.code !== admin.code);
          console.log("admin watch data", admins);
          dispatch({
            type: SET_ADMIN_LIST_DATA,
            data: admins,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };
}
