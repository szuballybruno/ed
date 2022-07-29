import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { XTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressListener';
import { IXTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { getCORSMiddleware } from './../services/misc/middlewareService';

export const initTurboExpressListener = (globalConfig: GlobalConfiguration): IXTurboExpressListener => {

    const listener = XTurboExpressListener
        .create()
        .setExpressMiddleware(getCORSMiddleware(globalConfig))
        .setExpressMiddleware(bodyParser.json({ limit: '32mb' }))
        .setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }))
        .setExpressMiddleware(fileUpload())
        .build();

    return listener;
};