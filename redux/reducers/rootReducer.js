import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import adminReducer from "./adminReducer";
import membersReducer from "./membersReducer";
import transactionsReducer from "./transactionsReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  admin: adminReducer,
  members: membersReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
