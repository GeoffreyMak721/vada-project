import firebase from "../../firebase/firebase";
import { setAdminData } from "./adminActions";

export const RESET_DATA = "RESET_DATA";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginAdmin({ username, password }) {
  return (dispatch) => {
    const db = firebase.firestore();

    dispatch({
      type: LOGIN_LOADING,
    });

    db.collection("admins")
      .where("nom", "==", username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          dispatch({
            type: LOGIN_ERROR,
            data: { username: "nom d'utilisateur incorect !" },
          });
        } else {
          const admin = querySnapshot.docs.map(function (doc) {
            return doc.data();
          });

          if (admin[0].password === password) {
            dispatch(setAdminData(admin[0]));
            dispatch({
              type: LOGIN_SUCCESS,
            });
          } else {
            dispatch({
              type: LOGIN_ERROR,
              data: { password: "mot de passe incorect !" },
            });
          }
        }
      })
      .catch((e) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: {
            username: "erreur de connexion",
            password: "erreue de connexion",
          },
        });
      });
  };
}

export function logoutAdmin() {
  return (dispatch) => {
    dispatch({
      type: RESET_DATA,
    });
  };
}
