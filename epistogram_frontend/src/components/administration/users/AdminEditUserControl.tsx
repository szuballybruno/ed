import { Box, Divider, Flex } from '@chakra-ui/react';
import { Button, Checkbox } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { useJobTitles } from '../../../services/api/miscApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { JobTitleDTO } from '../../../shared/dtos/JobTitleDTO';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { RoleDTO } from '../../../shared/dtos/RoleDTO';
import { UserDTO } from '../../../shared/dtos/UserDTO';
import { UserEditDTO } from '../../../shared/dtos/UserEditDTO';
import { isCurrentAppRoute, parseIntOrNull } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { AuthorizationContext, CurrentUserContext } from '../../system/AuthenticationFrame';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';
import { EditSection } from '../courses/EditSection';
import { TailingAdminButtons } from '../TailingAdminButtons';
import { useCompanies } from '../../../services/api/companyApiService';
import { PermissionAssignerControl } from './permissionAssigner/PermissionAssignerControl';
import { AssignedAuthItemsDTO } from '../../../shared/dtos/role/AssignedAuthItemsDTO';

export const roles = [
    {
        name: 'admin',
        id: 1,
        optionText: translatableTexts.roleNames.administrator,
    },
    {
        name: 'supervisor',
        id: 2,
        optionText: translatableTexts.roleNames.supervisor,
    },
    {
        name: 'user',
        id: 3,
        optionText: translatableTexts.roleNames.user
    }
];

const defaultAuthItemsDTO = { assignedPermissionIds: [], assignedRoleIds: [] };

export const AdminEditUserControl = (props: {
    editDTO: UserEditDTO | null,
    saveUserAsync: (editDTO: UserEditDTO) => Promise<void>
    showDeleteUserDialog?: (UserEditDTO: UserEditDTO | null) => void
}) => {

    const { editDTO, saveUserAsync, showDeleteUserDialog } = props;

    const editedUserId = useIntParam('userId')!;

    const { hasPermission } = useContext(AuthorizationContext);

    // editable fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDTO | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [assignedAuthItems, setAssignedAuthItems] = useState<AssignedAuthItemsDTO>(defaultAuthItemsDTO);

    const showError = useShowErrorDialog();

    const canSetInvitedUserCompany = true;//hasPermission('i');

    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(editedUserId);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();
    const { companies } = useCompanies();
    const { jobTitles } = useJobTitles();

    console.log(selectedCompany);

    useEffect(() => {

        if (!editDTO || jobTitles.length === 0 || companies.length === 0)
            return;

        console.log(companies);

        const comp = companies
            .single(x => x.id === editDTO.companyId);

        const jt = jobTitles
            .single(x => x.id === editDTO.jobTitleId);

        setFirstName(editDTO.firstName);
        setLastName(editDTO.lastName);
        setEmail(editDTO.email);
        setSelectedJobTitle(jt);
        setSelectedCompany(comp);
        setIsTeacher(editDTO.isTeacher);
        setAssignedAuthItems(editDTO.assignedAuthItems);
    }, [editDTO, jobTitles, companies]);

    const coinAmountEntryState = useEpistoEntryState({
        isMandatory: true,
        validateFunction: (value) => {

            if (value === '0')
                return 'Nem adhatsz hozzá \'0\' coin-t.';

            if (!parseIntOrNull(value))
                return 'Helytelen formátum';

            return null;
        }
    });

    const handleAddCoinsAsync = async () => {

        try {

            if (!coinAmountEntryState.validate())
                return;

            const amount = parseInt(coinAmountEntryState.value);

            await giftCoinsToUserAsync({ userId: editedUserId, amount });
            showNotification(`Sikeresen hozzáadtál ${amount} Coint.`);
            await refetchCoinBalance();
        }
        catch (e) {

            showError(e);
        }
    };

    const handleSaveUserAsync = async () => {

        if (!editDTO || !selectedCompany || !selectedJobTitle) {

            showNotification('A mandatory field is empty!');
            return;
        }

        const editedUserDTO: UserEditDTO = {
            id: editDTO.id,
            firstName,
            lastName,
            email,
            companyId: selectedCompany.id,
            jobTitleId: selectedJobTitle.id,
            isTeacher,
            assignedAuthItems
        };

        await saveUserAsync(editedUserDTO);
    };

    return <Flex direction="column"
        flex="1">

        <Flex flex="1">

            {/* left column */}
            <Flex direction="column"
                flex="1">

                {/* basic info section */}
                <EditSection isFirst
                    title="Alapadatok">

                    {/* first & last name */}
                    <Flex flex="1"
                        justify="space-between">
                        <EpistoEntry
                            style={{
                                flex: 1,
                                marginRight: 5
                            }}
                            name="lname"
                            value={lastName}
                            setValue={setLastName}
                            labelVariant={'top'}
                            label={translatableTexts.misc.lastName} />
                        <EpistoEntry
                            style={{
                                flex: 1
                            }}
                            value={firstName}
                            name="fname"
                            setValue={setFirstName}
                            labelVariant={'top'}
                            label={translatableTexts.misc.firstName} />
                    </Flex>

                    {/* email */}
                    <EpistoEntry
                        name="email"
                        value={email}
                        setValue={setEmail}
                        labelVariant={'top'}
                        label="Email" />
                </EditSection>

                {/* company section */}
                <EditSection title="Cég és beosztás">

                    {/* company */}
                    {canSetInvitedUserCompany && <Flex
                        direction="column"
                        align="stretch"
                        mt="5px"
                        width="100%">

                        <EpistoFont
                            isUppercase
                            fontSize="fontExtraSmall"
                            style={{
                                marginTop: '10px',
                                letterSpacing: '1.2px'
                            }}>

                            {translatableTexts.misc.company}
                        </EpistoFont>

                        <EpistoSelect
                            items={companies}
                            selectedValue={selectedCompany}
                            onSelected={setSelectedCompany}
                            getDisplayValue={x => '' + x?.name}
                            getCompareKey={company => '' + company?.id} />
                    </Flex>}

                    {/* job title */}
                    {canSetInvitedUserCompany && <Flex
                        direction="column"
                        align="stretch"
                        mt="5px"
                        width="100%">

                        <EpistoFont
                            isUppercase
                            fontSize="fontExtraSmall"
                            style={{
                                marginTop: '10px',
                                letterSpacing: '1.2px'
                            }}>

                            {translatableTexts.misc.jobTitle}
                        </EpistoFont>

                        <EpistoSelect
                            items={jobTitles}
                            selectedValue={selectedJobTitle}
                            onSelected={setSelectedJobTitle}
                            getDisplayValue={jt => '' + jt?.name}
                            getCompareKey={jt => '' + jt?.id} />
                    </Flex>}
                </EditSection>

                {/* access management */}
                <EditSection title="Jogosultságkezelés">

                    <PermissionAssignerControl
                        userId={editedUserId}
                        data={editDTO?.assignedAuthItems ?? defaultAuthItemsDTO}
                        onChange={setAssignedAuthItems} />
                </EditSection>
            </Flex>

            <Divider orientation='vertical'
                h="calc(100% - 20px)"
                w="1px"
                background="grey"
                my="10px" />

            <Box
                className='roundBorders'
                flex="1"
                p="0 10px 10px 10px"
                minWidth="300px">

                {!isCurrentAppRoute(applicationRoutes.administrationRoute.usersRoute.addRoute) && (

                    <LoadingFrame
                        loadingState={[coinBalanceStatus, giftCoinsToUserState]}
                        error={coinBalanceError}
                        direction="column">

                        <EditSection isFirst
                            title="EpistoCoin">
                            <EpistoLabel
                                isOverline
                                text="Egyenleg">

                                <EpistoFont
                                    fontSize="fontLargePlus"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 5,
                                        fontWeight: 600
                                    }}>

                                    {coinBalance}
                                    <EpistoConinImage style={{
                                        width: 20,
                                        height: 20,
                                        marginLeft: 5
                                    }} />
                                </EpistoFont>
                            </EpistoLabel>

                            <EpistoLabel width="100%"
                                isOverline
                                text="EpistoCoin hozzáadása">

                                <Flex align="center"
                                    flex="1"
                                    mt="10px">
                                    <EpistoEntryNew
                                        flex="1"
                                        style={{
                                            margin: '0 5px 0 0'
                                        }}
                                        type="number"
                                        placeholder='Összeg amelyet hozzá szeretnél adni'
                                        state={coinAmountEntryState} />

                                    <EpistoButton
                                        isDisabled={!!coinAmountEntryState.error}
                                        onClick={handleAddCoinsAsync}
                                        variant="colored">

                                        Hozzáadás
                                    </EpistoButton>
                                </Flex>

                            </EpistoLabel>
                        </EditSection>

                    </LoadingFrame>
                )}

                <EditSection
                    isFirst={isCurrentAppRoute(applicationRoutes.administrationRoute.usersRoute.addRoute)}
                    title="Alkalmazás adatai">

                    {/* is teacher */}
                    <EpistoFont isUppercase
                        fontSize="fontExtraSmall"
                        style={{
                            marginTop: 10,
                            letterSpacing: '1.2px'
                        }}>
                        {translatableTexts.administration.editUserControl.selectAsTeacher}
                    </EpistoFont>

                    <Flex align="center">
                        <Checkbox
                            checked={isTeacher}
                            onChange={(_, x) => setIsTeacher(x)} />

                        <EpistoFont
                            style={{ flex: '1' }}>

                            {translatableTexts.administration.editUserControl.selectUserAsTeacher}
                        </EpistoFont>
                    </Flex>
                </EditSection>
            </Box>
        </Flex>

        <TailingAdminButtons
            onDeleteCallback={() => {

                if (showDeleteUserDialog) {

                    showDeleteUserDialog(editDTO);
                } else {

                    throw new Error('Not implemented!');
                    // history.goBack();
                }
            }}
            onSaveCallback={handleSaveUserAsync} />
    </Flex >;
};
