import {currentlyEdited} from "./types";
import {organization} from "../types/organization";
import {course} from "../types/course";
import {user} from "../types/user";
import {vote} from "../types/vote";
import {article} from "../types/article";
import {group} from "../types/group";
import {overlay} from "../types/overlay";


export interface AdminSideStateIF {
    users: user[]
    courses: course[]
    articles: article[]
    votes: vote[]
    groups: group[]
    organizations: organization[]
    currentlyEdited: currentlyEdited
}
