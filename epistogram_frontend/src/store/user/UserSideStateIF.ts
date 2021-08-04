import { userData } from "../types/userData";
import { vote } from "../types/vote";



export interface UserSideStateIF {
    // Minden userrel kapcsolatos adat, amire a UI-ban szükség lehet
    userData: userData
    //userStatistics: userStatistics
    // A jelenlegi szavazás adatai
    vote: vote
}
