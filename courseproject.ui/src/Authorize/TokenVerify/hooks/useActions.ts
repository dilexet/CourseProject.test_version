import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as TokenVerifyActionCreators from '../store/action-creator/tokenVerifyActions';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(TokenVerifyActionCreators, dispatch);
}