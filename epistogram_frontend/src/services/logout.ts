import {Cookies} from "react-cookie";

const logout = () => {
    //setSessionEnd
    const cookies = new Cookies()
    cookies.remove(cookies.getAll())
    localStorage.clear()
}

export default logout