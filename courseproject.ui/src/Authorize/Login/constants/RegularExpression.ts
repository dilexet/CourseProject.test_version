export const RegularExpression = {
    Login: "([A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4})|(^[a-zA-Z][a-zA-Z0-9-_.]{5,25}$)",
    Password: "(?=^.{8,30}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
}