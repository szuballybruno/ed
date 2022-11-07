import { huTranslation } from './translations/hu';
import { TranslationType } from './types/TranslationType';

const translations: TranslationType[] = [
    huTranslation
];

const instatiateTranslation = (code: string): TranslationType['data'] => {

    const trans = translations.filter(x => x.languageCode === code)[0];
    if (!trans)
        throw new Error('Translation not found: ' + code);

    return trans.data;
};

export const translatableTexts = instatiateTranslation('hu');
