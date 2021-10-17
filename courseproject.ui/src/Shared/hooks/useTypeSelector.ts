import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/redusers";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;