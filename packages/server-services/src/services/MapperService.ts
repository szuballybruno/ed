import { XMapper } from '@episto/xmapper';
import { epistoMappingsBuilder, EpistoMappingsType } from './misc/mappings';
import { UrlService } from './UrlService';

export class MapperService extends XMapper<[UrlService], EpistoMappingsType> {

    constructor(urlService: UrlService) {

        super(epistoMappingsBuilder, [urlService]);
    }
}