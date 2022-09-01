import { Flex, Image } from '@chakra-ui/react';
import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { CourseShopItemListDTO } from '../../../shared/dtos/CourseShopItemListDTO';
import { DiscountCodeDTO } from '../../../shared/dtos/DiscountCodeDTO';
import { ShopItemCategoryDTO } from '../../../shared/dtos/ShopItemCategoryDTO';
import { ShopItemEditDTO } from '../../../shared/dtos/ShopItemEditDTO';
import { usePrivateCourses, useSaveShopItem, useShopItemCategories, useShopItemEditData } from '../../../services/api/shopApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { SelectImage } from '../../universal/SelectImage';
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
import { Id } from '../../../shared/types/versionId';

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
            className="whall">

            <AdminSubpageHeader
                direction="column"
                px="30px"
                onSave={handleSaveAsync}>

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.courseOrItem}>
                    <Flex align="center">
                        <Checkbox
                            checked={isCourse}
                            onChange={(x, y) => setIsCourse(y)}
                            className="square50" />

                        <EpistoFont>
                            {translatableTexts.administration.shopAdminEditSubpage.isThisACourse}
                        </EpistoFont>
                    </Flex>

                    {isCourse && <EpistoSelect
                        getCompareKey={x => x?.id + ''}
                        getDisplayValue={x => x?.title + ''}
                        items={privateCourses}
                        selectedValue={course}
                        onSelected={setCourse} />}
                </EpistoLabel>

                <EpistoLabel text={translatableTexts.administration.shopAdminEditSubpage.coverImage}>
                    <SelectImage
                        isInteractionBlocked={isCourse}
                        width="300px"
                        height="200px"
                        setImageFile={setCoverFileImage}
                        setImageSource={setCoverFilePath}>
                        <Image
                            className="whall"
                            objectFit="cover"
                            src={coverFilePath} />
                    </SelectImage>
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
                    <Flex align="center">

                        <Checkbox
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
                    </Flex>
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

                    <Flex>

                        {/* codes */}
                        <Flex
                            direction="column"
                            marginRight="20px"
                            flex="1">

                            <Flex>
                                <EpistoButton
                                    variant="colored"
                                    onClick={handleDeleteAll}>

                                    <Flex>
                                        {translatableTexts.misc.removeAll}

                                        <DeleteSweepIcon
                                            style={{
                                                marginLeft: '5px'
                                            }} />
                                    </Flex>
                                </EpistoButton>
                            </Flex>

                            {discountCodes
                                .map((x, index) => (
                                    <Flex
                                        key={index}
                                        m="5px"
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
                                    </Flex>
                                ))}
                        </Flex>

                        {/* add codes */}
                        <Flex flex="1"
                            direction="column">

                            <Flex align="center"
                                justify="space-between">
                                <EpistoFont>
                                    {`${translatableTexts.administration.shopAdminEditSubpage.addedCodes} ${addedCodes.length}`}
                                </EpistoFont>

                                <EpistoButton
                                    variant="colored"
                                    onClick={addCodes}>

                                    {translatableTexts.misc.add}
                                </EpistoButton>
                            </Flex>

                            <EpistoEntry
                                flex="1"
                                label={translatableTexts.administration.shopAdminEditSubpage.addCodesField}
                                value={addCodesField}
                                setValue={setAddCodesField}
                                isMultiline />
                        </Flex>
                    </Flex>
                </EpistoLabel>

            </AdminSubpageHeader>
        </LoadingFrame>
    );
};