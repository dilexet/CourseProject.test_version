import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as LoginActionCreators from '../store/action-creator/loginActions'

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(LoginActionCreators, dispatch);
}