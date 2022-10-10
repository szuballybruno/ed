import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { RoleDTO } from '../../../shared/dtos/RoleDTO';
import { UserEditReadDTO } from '../../../shared/dtos/UserEditReadDTO';
import { UserEditSaveDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { EventTriggerType, parseIntOrNull } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { useAuthorizationContext } from '../../system/AuthorizationContext';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';
import { EditSection } from '../courses/EditSection';
import { TailingAdminButtons } from '../TailingAdminButtons';

export const AdminEditUserControl = ({
    editDTO,
    editedUserId,
    refetchTrigger,
    selectedCompanyId,
    saveUserAsync,
    showDeleteUserDialog
}: {
    editedUserId: Id<'User'>,
    editDTO: UserEditReadDTO | null,
    refetchTrigger: EventTriggerType,
    selectedCompanyId?: Id<'Company'> | null,
    saveUserAsync: (editDTO: UserEditSaveDTO) => Promise<void>
    showDeleteUserDialog?: (UserEditDTO: UserEditReadDTO | null) => void
}) => {

    const { hasPermission } = useAuthorizationContext();
    const mode = (editedUserId as any) < 0 ? 'ADD' : 'EDIT';
    const canSetCompanyId = false;

    // editable fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState<Id<'Department'> | null>(null);
    const [companyId, setCompanyId] = useState<Id<'Company'> | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [assignedRoleIds, setAssignedRoleIds] = useState<Id<'Role'>[]>([]);

    const showError = useShowErrorDialog();

    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(mode === 'EDIT' ? editedUserId : null);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();

    useSetBusy(useCoinBalanceOfUser, coinBalanceStatus, coinBalanceError);

    const {
        availableCompanies,
        availableDepartments,
        availableRoles
    } = editDTO ?? ({
        availableCompanies: [] as UserEditReadDTO['availableCompanies'],
        availableDepartments: [] as UserEditReadDTO['availableDepartments'],
        availableRoles: [] as UserEditReadDTO['availableRoles']
    });

    useEffect(() => {

        console.log('mode changed');
        if (mode === 'ADD') {
            setFirstName('');
            setLastName('');
            setEmail('');
            setIsTeacher(false);
            setDepartmentId(null);
            setCompanyId(null);
            setAssignedRoleIds([]);
        }
    }, [mode]);

    /**
     * Load state from editDTO
     */
    useEffect(() => {

        if (!editDTO || mode === 'ADD')
            return;

        setFirstName(editDTO.firstName);
        setLastName(editDTO.lastName);
        setEmail(editDTO.email);
        setIsTeacher(editDTO.isTeacher);
        setDepartmentId(editDTO.departmentId);
        setCompanyId(editDTO.companyId);
        setAssignedRoleIds(editDTO.roleIds);

    }, [editDTO, mode]);

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

        if (mode === 'EDIT' && companyId && departmentId) {

            const editedUserDTO: UserEditSaveDTO = {
                userId: editedUserId,
                firstName,
                lastName,
                email,
                companyId: companyId,
                departmentId,
                isTeacher,
                assignedRoleIds,
            };

            return saveUserAsync(editedUserDTO);
        }

        if (mode === 'ADD' && selectedCompanyId && departmentId) {

            const editedUserDTO: UserEditSaveDTO = {
                userId: editedUserId,
                firstName,
                lastName,
                email,
                companyId: selectedCompanyId,
                departmentId,
                isTeacher,
                assignedRoleIds,
            };

            return saveUserAsync(editedUserDTO);
        }


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
                {canSetCompanyId && <EpistoFlex2
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
                        items={availableCompanies}
                        selectedValue={availableCompanies.firstOrNull(x => x.id === companyId)}
                        onSelected={x => setCompanyId(x.id)}
                        getDisplayValue={x => '' + x.name}
                        getCompareKey={company => '' + company?.id} />
                </EpistoFlex2>}

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

            {/* is teacher */}
            <EpistoFont isUppercase
                fontSize="fontExtraSmall"
                style={{
                    marginTop: 10,
                    letterSpacing: '1.2px'
                }}>
                {translatableTexts.administration.editUserControl.selectAsTeacher}
            </EpistoFont>

            <EpistoFlex2 align="center">
                <Checkbox
                    checked={isTeacher}
                    onChange={(_, x) => setIsTeacher(x)} />

                <EpistoFont
                    style={{ flex: '1' }}>

                    {translatableTexts.administration.editUserControl.selectUserAsTeacher}
                </EpistoFont>
            </EpistoFlex2>
        </EditSection>

        {/* buttons */}
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
    </EpistoFlex2 >;
};
