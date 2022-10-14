import { useEffect, useState } from 'react';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { UserApiService } from '../../../services/api/UserApiService1';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { RoleDTO } from '../../../shared/dtos/RoleDTO';
import { UserEditReadDTO } from '../../../shared/dtos/UserEditReadDTO';
import { UserEditSaveDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { parseIntOrNull } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoCheckboxLabel } from '../../controls/EpistoCheckboxLabel';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoFormLabel } from '../../controls/EpistoFormLabel';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';
import { EditSection } from '../courses/EditSection';
import { TailingAdminButtons } from '../TailingAdminButtons';

export const AdminEditUserControl = ({
    editDTO,
    editedUserId,
    saveUserAsync,
    activeCompany,
    companies
}: {
    editedUserId: Id<'User'>,
    editDTO: UserEditReadDTO | null,
    companies: CompanyDTO[],
    saveUserAsync: (editDTO: UserEditSaveDTO) => Promise<void>,
    activeCompany: CompanyDTO | null
}) => {

    const mode = (editedUserId as any) < 0 ? 'ADD' : 'EDIT';
    const canSetCompanyId = false;

    // editable fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState<Id<'Department'> | null>(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState<Id<'Company'> | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [assignedRoleIds, setAssignedRoleIds] = useState<Id<'Role'>[]>([]);
    const [isSurveyRequired, setIsSurveyRequired] = useState(true);

    const showError = useShowErrorDialog();

    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(mode === 'EDIT' ? editedUserId : null);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();
    const { userControlDropdownData } = UserApiService.useUserControlDropdownData();

    useSetBusy(useCoinBalanceOfUser, coinBalanceStatus, coinBalanceError);

    const availableDepartments = userControlDropdownData?.departments ?? [];
    const availableRoles = userControlDropdownData?.availableRoles ?? [];
    const defaultCompany = activeCompany ?? companies.firstOrNull();

    console.log(activeCompany);

    const company = companies
        .firstOrNull(x => x.id === selectedCompanyId) ?? defaultCompany;

    /**
     * Load state from editDTO
     */
    useEffect(() => {

        if (!defaultCompany)
            return;

        const {
            id: defaultCompanyId,
            isSurveyRequired: defaultIsSurveyRequired
        } = defaultCompany;

        const {
            firstName,
            lastName,
            email,
            isTeacher,
            departmentId,
            roleIds,
            isSurveyRequired,
            companyId
        } = editDTO ?? {
            firstName: '',
            lastName: '',
            email: '',
            isTeacher: false,
            departmentId: null,
            companyId: defaultCompanyId,
            roleIds: [] as Id<'Role'>[],
            isSurveyRequired: defaultIsSurveyRequired
        };

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setIsTeacher(isTeacher);
        setDepartmentId(departmentId);
        setSelectedCompanyId(companyId);
        setAssignedRoleIds(roleIds);
        setAssignedRoleIds(roleIds);
        setIsSurveyRequired(isSurveyRequired);
    }, [editDTO, defaultCompany]);

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

            if (!coinAmountEntryState.validate() || mode === 'ADD')
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

        if (!company)
            throw new Error('Can not save without company id!');

        if (!departmentId)
            throw new Error('Can not save without department id!');

        const editedUserDTO: UserEditSaveDTO = {
            userId: editedUserId,
            firstName,
            lastName,
            email,
            companyId: company.id,
            departmentId,
            isTeacher,
            assignedRoleIds,
            isSurveyRequired
        };

        return saveUserAsync(editedUserDTO);
    };

    return <EpistoFlex2 direction="column"
        flex="1">

        {/* left column */}
        <EpistoFlex2 direction="column"
            flex="1">

            {/* basic info section */}
            <EditSection
                title="Alapadatok">

                {/* first & last name */}
                <EpistoFlex2 flex="1"
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
                </EpistoFlex2>

                {/* email */}
                <EpistoEntry
                    name="email"
                    value={email}
                    setValue={setEmail}
                    labelVariant={'top'}
                    label="Email" />
            </EditSection>

            {/* company section */}
            <EditSection title="Cég és jogosultságkezelés">

                {/* company */}
                <EpistoFlex2
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

                    {canSetCompanyId
                        ? <EpistoSelect
                            items={companies}
                            selectedValue={company}
                            onSelected={x => setSelectedCompanyId(x.id)}
                            getDisplayValue={x => '' + x.name}
                            getCompareKey={company => '' + company?.id} />
                        : <EpistoFont
                            margin={{
                                top: 'px5'
                            }}>
                            {company?.name ?? '-'}
                        </EpistoFont>}
                </EpistoFlex2>

                {/* role */}
                <EpistoFlex2
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

                        {translatableTexts.misc.role}
                    </EpistoFont>

                    <EpistoFlex2
                        direction="column">

                        <EpistoSelect
                            items={availableRoles.filter(x => x.id !== Id.create(3))}
                            currentKey={5 - assignedRoleIds.length + ''}
                            onSelected={(value: RoleDTO) => {

                                /* Company role which contains all other roles */
                                if (value.id === Id.create(1)) {

                                    return setAssignedRoleIds(availableRoles.map(x => x.id));
                                }

                                /* HR role which contains role manager and user */
                                if (value.id === Id.create(2)) {

                                    return setAssignedRoleIds(
                                        availableRoles
                                            .filter(x => x.id !== Id.create(1))
                                            .map(x => x.id));
                                }

                                /* User role */
                                if (value.id === Id.create(4)) {

                                    return setAssignedRoleIds([Id.create(4)]);
                                }

                            }}
                            getCompareKey={(item: RoleDTO) => {
                                return item.id + '';
                            }}
                            getDisplayValue={(item: RoleDTO) => {
                                return item.name;
                            }} />

                        {availableRoles
                            .map(({ id: roleId, name: roleName }, index) => {

                                const isAssigned = assignedRoleIds
                                    .some(x => x === roleId);

                                return (
                                    <EpistoFlex2
                                        align="center"
                                        key={index}>

                                        <EpistoFont>
                                            {roleName}
                                        </EpistoFont>

                                        <EpistoCheckbox
                                            value={isAssigned}
                                            setValue={isAssigned => {

                                                // add 
                                                if (isAssigned && !assignedRoleIds.includes(roleId)) {

                                                    setAssignedRoleIds([...assignedRoleIds, roleId]);
                                                    return;
                                                }

                                                // remove 
                                                setAssignedRoleIds(assignedRoleIds
                                                    .filter(x => x !== roleId));
                                            }} />
                                    </EpistoFlex2>
                                );
                            })}
                    </EpistoFlex2>
                </EpistoFlex2>

                {/* department */}
                <EpistoFlex2
                    direction="column">

                    <EpistoFont
                        isUppercase
                        fontSize="fontExtraSmall"
                        style={{
                            marginTop: '10px',
                            letterSpacing: '1.2px'
                        }}>

                        {translatableTexts.misc.department}
                    </EpistoFont>

                    <EpistoSelect
                        items={availableDepartments}
                        selectedValue={availableDepartments.firstOrNull(x => x.id === departmentId)}
                        onSelected={x => setDepartmentId(x.id)}
                        getDisplayValue={x => '' + x.name}
                        getCompareKey={dep => '' + dep?.id} />
                </EpistoFlex2>
            </EditSection>
        </EpistoFlex2>

        {/* coin stuff */}
        <EditSection
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

                <EpistoFlex2 align="center"
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
                </EpistoFlex2>

            </EpistoLabel>
        </EditSection>

        {/* teacher stuff */}
        <EditSection
            title="Alkalmazás adatai">

            {/* is survey required */}
            <EpistoFormLabel
                text={translatableTexts.administration.editUserControl.surveyIsRequiredLabel}>

                <EpistoCheckboxLabel
                    label={translatableTexts.administration.editUserControl.surveyIsRequiredCheckboxLabel}>

                    <EpistoCheckbox
                        value={isSurveyRequired}
                        setValue={setIsSurveyRequired} />
                </EpistoCheckboxLabel>
            </EpistoFormLabel>

            {/* is teacher */}
            <EpistoFormLabel
                text={translatableTexts.administration.editUserControl.selectAsTeacher}>

                <EpistoCheckboxLabel
                    label={translatableTexts.administration.editUserControl.selectUserAsTeacher}>

                    <EpistoCheckbox
                        value={isTeacher}
                        setValue={setIsTeacher} />
                </EpistoCheckboxLabel>
            </EpistoFormLabel>
        </EditSection>

        {/* buttons */}
        <TailingAdminButtons
            onSaveCallback={handleSaveUserAsync} />
    </EpistoFlex2 >;
};
