import { useEffect, useState } from 'react';
import { CourseShopItemListDTO } from '@episto/communication';
import { DiscountCodeDTO } from '@episto/communication';
import { ShopItemCategoryDTO } from '@episto/communication';
import { ShopItemEditDTO } from '@episto/communication';
import { usePrivateCourses, useSaveShopItem, useShopItemCategories, useShopItemEditData } from '../../../services/api/shopApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoImageSelector } from '../../universal/EpistoImageSelector';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { EpistoFont } from '../../controls/EpistoFont';
import { translatableTexts } from '../../../static/translatableTexts';
import { useIntParam } from '../../../static/locationHelpers';
import { Id } from '@episto/commontypes';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoImage } from '../../controls/EpistoImage';
import { MUI } from '../../controls/MUIControls';

export const ShopAdminEditSubpage = () => {

    //util
    const { navigate2 } = useNavigation();

    const shopItemId = Id
        .create<'ShopItem'>(useIntParam('shopItemId')!);
    const showError = useShowErrorDialog();

    // http
    const { privateCourses, privateCoursesError, privateCoursesState } = usePrivateCourses();
    const { shopItemEditData, shopItemEditDataError, shopItemEditDataState, refetchItemEditData } = useShopItemEditData(shopItemId);
    const { shopItemCategories } = useShopItemCategories();
    const { saveShopItemAsync, saveShopItemState } = useSaveShopItem();

    const [name, setName] = useState('');
    const [detailsUrl, setDetailsUrl] = useState('');
    const [purchaseLimit, setPurchaseLimit] = useState('');
    const [coinPrice, setCoinPrice] = useState('');
    const [currencyPrice, setCurrencyPrice] = useState('');
    const [shopItemCategory, setShopItemCategory] = useState<ShopItemCategoryDTO | null>(null);
    const [course, setCourse] = useState<CourseShopItemListDTO | null>(null);
    const [isPurchaseLimited, setIsPurchaseLimited] = useState(false);
    const [discountCodes, setDiscountCodes] = useState<DiscountCodeDTO[]>([]);
    const [addCodesField, setAddCodesField] = useState('');

    const [coverFilePath, setCoverFilePath] = useState('');
    const [coverFileImage, setCoverFileImage] = useState<File | null>(null);

    const [isCourse, setIsCourse] = useState(false);

    // calc 
    const addedCodes = (() => {

        if (!addCodesField || addCodesField === '')
            return [];

        const lines = addCodesField
            .split('\n');

        const linesProcessed = lines
            .map(x => x.trim())
            .filter(x => x !== '');

        return linesProcessed
            .map(x => ({
                code: x
            } as DiscountCodeDTO));
    })();

    // func

    const addCodes = () => {

        const codeAlreadyExists = discountCodes
            .some(x => addedCodes
                .some(y => y.code === x.code));

        if (codeAlreadyExists) {

            showError(translatableTexts.administration.shopAdminEditSubpage.codeAlreadyExists);
            return;
        }

        setDiscountCodes(discountCodes
            .concat(addedCodes));
    };

    const handleSaveAsync = async () => {

        try {

            const dto = {
                id: shopItemId,
                courseId: isCourse ? course!.id : null,
                coinPrice: parseInt(coinPrice),
                currencyPrice: parseInt(currencyPrice),
                name: name,
                purchaseLimit: isPurchaseLimited
                    ? parseInt(purchaseLimit)
                    : null,
                shopItemCategoryId: shopItemCategory?.id ?? null,
                discountCodes,
                detailsUrl
            } as ShopItemEditDTO;

            await saveShopItemAsync(dto, coverFileImage ?? undefined);
            showNotification(translatableTexts.misc.savedSuccessfully);
            await refetchItemEditData();
        }
        catch (e) {

            showError(e);
        }
    };

    const handleDeleteAll = () => {

        setDiscountCodes(discountCodes
            .filter(x => x.isUsed));
    };

    const handleDelete = (code: DiscountCodeDTO) => {

        setDiscountCodes(discountCodes
            .filter(x => x !== code));
    };

    // set defaults
    useEffect(() => {

        if (!shopItemEditData || shopItemCategories.length === 0 || privateCourses.length === 0)
            return;

        setName(shopItemEditData.name);
        setPurchaseLimit(shopItemEditData.purchaseLimit + '');
        setIsPurchaseLimited(!!shopItemEditData.purchaseLimit);
        setCoinPrice(shopItemEditData.coinPrice + '');
        setCurrencyPrice(shopItemEditData.currencyPrice + '');
        setCoverFilePath(shopItemEditData.coverFilePath);
        setIsCourse(!!shopItemEditData.courseId);
        setDiscountCodes(shopItemEditData.discountCodes);
        setDetailsUrl(shopItemEditData.detailsUrl);

        setCourse(privateCourses
            .filter(x => x.id === shopItemEditData.courseId)[0]);

        setShopItemCategory(shopItemCategories
            .filter(x => x.id === shopItemEditData.shopItemCategoryId)[0]);
    }, [shopItemEditData, privateCourses, shopItemCategories]);

    // on is course switch
    useEffect(() => {

        if (!shopItemEditData || shopItemCategories.length === 0 || privateCourses.length === 0)
            return;

        if (isCourse) {

            setShopItemCategory(shopItemCategories
                .filter(x => x.id === Id.create<'ShopItemCategory'>(1))[0]);

            if (!course)
                setCourse(privateCourses[0]);
        }
        else {

            setShopItemCategory(shopItemCategories
                .filter(x => x.id === Id.create<'ShopItemCategory'>(3))[0]);

            setCoverFilePath(shopItemEditData?.coverFilePath ?? '');
            setName(shopItemEditData?.name ?? '');
        }
    }, [isCourse]);

    // on selected course changed 
    useEffect(() => {

        if (!course || !isCourse)
            return;

        setName(course.title);
        setCoverFilePath(course.coverImagePath ?? '');
    }, [course, isCourse]);

    return (
        <LoadingFrame
            loadingState={[shopItemEditDataState, privateCoursesState, saveShopItemState]}
            error={[shopItemEditDataError, privateCoursesError]}
            flex='1'>

            <AdminSubpageHeader
                direction="column"
                flex='1'
                px="30px"
                onSave={handleSaveAsync}>

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.courseOrItem}>
                    <EpistoFlex2 align="center">
                        <MUI.Checkbox
                            checked={isCourse}
                            onChange={(x, y) => setIsCourse(y)}
                            className="square50" />

                        <EpistoFont>
                            {translatableTexts.administration.shopAdminEditSubpage.isThisACourse}
                        </EpistoFont>
                    </EpistoFlex2>

                    {isCourse && <EpistoSelect
                        getCompareKey={x => x?.id + ''}
                        getDisplayValue={x => x?.title + ''}
                        items={privateCourses}
                        selectedValue={course}
                        onSelected={setCourse} />}
                </EpistoLabel>

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.coverImage}>
                    <EpistoImageSelector
                        isInteractionBlocked={isCourse}
                        width="300px"
                        height="200px"
                        setImageFile={setCoverFileImage}
                        setImageSource={setCoverFilePath}>
                        <EpistoImage
                            className="whall"
                            objectFit="cover"
                            src={coverFilePath} />
                    </EpistoImageSelector>
                </EpistoLabel>

                <EpistoEntry
                    value={name}
                    setValue={setName}
                    label={translatableTexts.administration.shopAdminEditSubpage.itemName}
                    labelVariant="top"
                    disabled={isCourse} />

                <EpistoEntry
                    value={detailsUrl}
                    setValue={setDetailsUrl}
                    label={translatableTexts.administration.shopAdminEditSubpage.detailsUrl}
                    labelVariant="top"
                    disabled={isCourse} />

                <EpistoLabel text={translatableTexts.misc.category}>
                    <EpistoSelect
                        getCompareKey={x => x?.id + ''}
                        getDisplayValue={x => x?.name + ''}
                        items={shopItemCategories}
                        selectedValue={shopItemCategory}
                        onSelected={setShopItemCategory}
                        isDisabled={isCourse} />
                </EpistoLabel>

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.purchaseLimit}>
                    <EpistoFlex2 align="center">

                        <MUI.Checkbox
                            checked={isPurchaseLimited}
                            onChange={(x, y) => setIsPurchaseLimited(y)}
                            className="square50" />

                        <EpistoEntry
                            marginTop="0"
                            flex="1"
                            value={purchaseLimit}
                            setValue={setPurchaseLimit}
                            type="number"
                            postfix={translatableTexts.administration.shopAdminEditSubpage.purchaseLimitPostfix}
                            disabled={isCourse || !isPurchaseLimited} />
                    </EpistoFlex2>
                </EpistoLabel>

                <EpistoEntry
                    value={coinPrice}
                    setValue={setCoinPrice}
                    type="number"
                    label={translatableTexts.administration.shopAdminEditSubpage.epistoCoinPrice}
                    labelVariant="top"
                    postfix={translatableTexts.administration.shopAdminEditSubpage.epistoCoinPricePostfix} />

                <EpistoEntry
                    value={currencyPrice}
                    setValue={setCurrencyPrice}
                    type="number"
                    label={translatableTexts.administration.shopAdminEditSubpage.fiatMoneyPrice}
                    labelVariant="top"
                    postfix={translatableTexts.administration.shopAdminEditSubpage.fiatMoneyPricePostfix} />

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.couponCodes}>

                    <EpistoFlex2>

                        {/* codes */}
                        <EpistoFlex2
                            direction="column"
                            marginRight="20px"
                            flex="1">

                            <EpistoFlex2>
                                <EpistoButton
                                    variant="action"
                                    onClick={handleDeleteAll}>

                                    <EpistoFlex2>
                                        {translatableTexts.misc.removeAll}

                                        <DeleteSweepIcon
                                            style={{
                                                marginLeft: '5px'
                                            }} />
                                    </EpistoFlex2>
                                </EpistoButton>
                            </EpistoFlex2>

                            {discountCodes
                                .map((x, index) => (
                                    <EpistoFlex2
                                        key={index}
                                        margin="5px"
                                        justify="space-between">
                                        <EpistoFont>
                                            {x.id ? 'id:' + x.id : 'Uj'} - {x.code}
                                        </EpistoFont>

                                        {x.isUsed && <LockIcon
                                            style={{
                                                margin: '5px 7px 5px 7px'
                                            }} />}

                                        {!x.isUsed && <EpistoButton
                                            onClick={() => handleDelete(x)}>

                                            <DeleteIcon />
                                        </EpistoButton>}
                                    </EpistoFlex2>
                                ))}
                        </EpistoFlex2>

                        {/* add codes */}
                        <EpistoFlex2 flex="1"
                            direction="column">

                            <EpistoFlex2 align="center"
                                justify="space-between">
                                <EpistoFont>
                                    {`${translatableTexts.administration.shopAdminEditSubpage.addedCodes} ${addedCodes.length}`}
                                </EpistoFont>

                                <EpistoButton
                                    variant="action"
                                    onClick={addCodes}>

                                    {translatableTexts.misc.add}
                                </EpistoButton>
                            </EpistoFlex2>

                            <EpistoEntry
                                flex="1"
                                label={translatableTexts.administration.shopAdminEditSubpage.addCodesField}
                                value={addCodesField}
                                setValue={setAddCodesField}
                                isMultiline />
                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoLabel>

            </AdminSubpageHeader>
        </LoadingFrame>
    );
};