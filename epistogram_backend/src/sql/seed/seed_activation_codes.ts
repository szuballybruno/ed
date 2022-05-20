import { ActivationCode } from '../../models/entity/ActivationCode';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';

export const getActivationCodeSeedData = (companies: CompaniesSeedDataType) => getSeedList<ActivationCode>()({
    activation_code_1: {
        code: 'PCW-HAFIKUXU',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_2: {
        code: 'PCW-FICOFIXO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_3: {
        code: 'PCW-FEMECODU',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_4: {
        code: 'PCW-SAVEREXE',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_5: {
        code: 'PCW-SICAMAKI',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_6: {
        code: 'PCW-PAHIHAMO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_7: {
        code: 'PCW-TOMEQOPE',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_8: {
        code: 'PCW-DAZEJAVU',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_9: {
        code: 'PCW-LUFANOFU',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_10: {
        code: 'PCW-FATOHIWE',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_11: {
        code: 'PCW-TAJACIPO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_12: {
        code: 'PCW-SOYEJUMI',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_13: {
        code: 'PCW-PUTOJEDA',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_14: {
        code: 'PCW-NOQAZUWE',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_15: {
        code: 'PCW-PUDEFACO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_16: {
        code: 'PCW-WIKAGIXE',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_17: {
        code: 'PCW-JOJEMEGI',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_18: {
        code: 'PCW-XASUZOPU',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_19: {
        code: 'PCW-YUTIKUVA',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_20: {
        code: 'PCW-NOBUBIKO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_21: {
        code: 'PCW-GIWACISO',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_22: {
        code: 'PCW-ZIGAGURI',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_23: {
        code: 'PCW-ZONOKAXI',
        companyId: companies.PCWorld.id,
        isUsed: false
    },
    activation_code_24: {
        code: 'PCW-MIJOPICE',
        companyId: companies.PCWorld.id,
        isUsed: false
    }
});

export type ActivationCodeSeedDataType = ReturnType<typeof getActivationCodeSeedData>;