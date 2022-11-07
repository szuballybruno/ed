import { Id } from '../../shared/types/versionId';


export class UserVideoPractiseProgressView {

    
    userId: Id<'User'>;

    
    videoId: Id<'Video'>;

    
    watchPercentage: number;

    
    creationDate: Date;

    
    playbackDuration: number;
}