import { x-mapper } from '@episto/x-mapper';
import { epistoMappingsBuilder, EpistoMappingsType } from './misc/mappings';
import { UrlService } from './UrlService';

export class MapperService extends x-mapper<[UrlService], EpistoMappingsType> {

    constructor(urlService: UrlService) {

        super(epistoMappingsBuilder, [urlService]);
    }
}