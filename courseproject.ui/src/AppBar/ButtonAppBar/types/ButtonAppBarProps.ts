import {TFunction} from "react-i18next";
import {SelectChangeEvent} from "@mui/material/Select";

export type ButtonAppBarProps = {
    t: TFunction;
    language: string;
    darkMode: boolean;
    onChangeTheme: () => void;
    onChangeLanguage: (event: SelectChangeEvent) => void;
}