import {setupIntegrationTest, TestParams} from '../misc/base';
import {getCompaniesSeedData} from '../../src/sql/seed/seed_companies';
import {getUserSeedData} from '../../src/sql/seed/seed_users';
import {UserStatsController} from '../../src/api/UserStatsController';

const testCalculateCompanyProductivity = async (testParams: TestParams) => {


    const {api, cookies, serviceProvider, getSeedData} = testParams;

    const companiesSeedData = getSeedData(getCompaniesSeedData);
    const usersSeedData = getSeedData(getUserSeedData);

    const result = await api
        .callEndpoint(UserStatsController, 'getCompanyUsersPerformanceSummaryAction', {
            query: {
                companyId: companiesSeedData.EpistoGram.id
            },
            cookies
        });

    console.log(result);
};

setupIntegrationTest('Testing userStats')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();

        await testCalculateCompanyProductivity(testParams);
    })
    .noThrowError()
    .noLogResError()
    .build();
