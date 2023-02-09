import { huTranslation } from './translations/hu';
import { ITranslation } from './types/ITranslation';

type TranslationSchema = (typeof huTranslation)['data'];

const translations: ITranslation<TranslationSchema>[] = [
    huTranslation
];

const instatiateTranslation = (code: string): TranslationSchema => {

    const trans = translations.filter(x => x.languageCode === code)[0];
    if (!trans)
        throw new Error('Translation not found: ' + code);

    return trans.data;
};

export const translatableTexts = instatiateTranslation('hu');
