import { huTranslation } from './translations/hu';
import { TranslationType } from './types/TranslationType';

const translations: TranslationType[] = [
    huTranslation
];

const instatiateTranslation = (code: string): TranslationType['data'] => {

    return translations.single(x => x.languageCode === code).data;
};

export const translatableTexts = instatiateTranslation('hu');
