import { Id } from '@episto/commontypes';


export class UserVideoPractiseProgressView {

    
    userId: Id<'User'>;

    
    videoId: Id<'Video'>;

    
    watchPercentage: number;

    
    creationDate: Date;

    
    playbackDuration: number;
}