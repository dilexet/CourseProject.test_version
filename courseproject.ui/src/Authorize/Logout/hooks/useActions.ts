import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as LogoutActionCreators from '../store/action-creator/logoutActions'

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(LogoutActionCreators, dispatch);
}