import { Flex, Image } from "@chakra-ui/react";
import { Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseBriefData } from "../../../models/shared_models/CourseBriefData";
import { CourseShopItemListDTO } from "../../../models/shared_models/CourseShopItemListDTO";
import { ShopItemCategoryDTO } from "../../../models/shared_models/ShopItemCategoryDTO";
import { ShopItemEditDTO } from "../../../models/shared_models/ShopItemEditDTO";
import { usePrivateCourses, useSaveShopItem, useShopItemCategories, useShopItemEditData } from "../../../services/api/shopApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { LoadingFrame } from "../../system/LoadingFrame";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoLabel } from "../../universal/EpistoLabel";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const ShopAdminEditSubpage = () => {

    //util
    const { navigate } = useNavigation();
    const params = useParams<{ shopItemId: string }>();
    const shopItemId = parseInt(params.shopItemId);
    const showError = useShowErrorDialog();

    // http
    const { privateCourses, privateCoursesError, privateCoursesState } = usePrivateCourses();
    const { shopItemEditData, shopItemEditDataError, shopItemEditDataState } = useShopItemEditData(shopItemId);
    const { shopItemCategories } = useShopItemCategories();
    const { saveShopItemAsync, saveShopItemState } = useSaveShopItem();

    const [name, setName] = useState("");
    const [purchaseLimit, setPurchaseLimit] = useState("");
    const [coinPrice, setCoinPrice] = useState("");
    const [currencyPrice, setCurrencyPrice] = useState("");
    const [shopItemCategory, setShopItemCategory] = useState<ShopItemCategoryDTO | null>(null);
    const [course, setCourse] = useState<CourseShopItemListDTO | null>(null);
    const [isPurchaseLimited, setIsPurchaseLimited] = useState(false);

    const [coverFilePath, setCoverFilePath] = useState("");
    const [coverFileImage, setCoverFileImage] = useState<File | null>(null);

    const [isCourse, setIsCourse] = useState(false);

    // func
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
                shopItemCategoryId: shopItemCategory?.id ?? null
            } as ShopItemEditDTO;

            await saveShopItemAsync(dto, coverFileImage ?? undefined);
            showNotification("Sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    // set defaults
    useEffect(() => {

        if (!shopItemEditData || shopItemCategories.length === 0 || privateCourses.length === 0)
            return;

        setName(shopItemEditData.name);
        setPurchaseLimit(shopItemEditData.purchaseLimit + "");
        setIsPurchaseLimited(!!shopItemEditData.purchaseLimit);
        setCoinPrice(shopItemEditData.coinPrice + "");
        setCurrencyPrice(shopItemEditData.currencyPrice + "");
        setCoverFilePath(shopItemEditData.coverFilePath);
        setIsCourse(!!shopItemEditData.courseId);

        setShopItemCategory(shopItemCategories
            .filter(x => x.id === shopItemEditData.shopItemCategoryId)[0]);
    }, [shopItemEditData, privateCourses, shopItemCategories]);

    // on is course switch
    useEffect(() => {

        if (!isCourse) {

            setShopItemCategory(shopItemCategories
                .filter(x => x.id === 3)[0]);

            setCoverFilePath(shopItemEditData?.coverFilePath ?? "");
            setName(shopItemEditData?.name ?? "");
        }
        else {

            setShopItemCategory(shopItemCategories
                .filter(x => x.id === 1)[0]);

            setCourse(privateCourses[0]);
        }
    }, [isCourse]);

    // on selected course changed 
    useEffect(() => {

        if (!course || !isCourse)
            return;

        setName(course.title);
        setCoverFilePath(course.coverImagePath ?? "");
    }, [course, isCourse]);

    return (
        <LoadingFrame
            loadingState={[shopItemEditDataState, privateCoursesState, saveShopItemState]}
            error={[shopItemEditDataError, privateCoursesError]}
            className="whall">

            <AdminSubpageHeader
                px="30px"
                onSave={handleSaveAsync}>

                <EpistoLabel text="Kuruz/termek">
                    <Flex align="center">
                        <Checkbox
                            checked={isCourse}
                            onChange={(x, y) => setIsCourse(y)}
                            className="square50" />

                        <Typography>
                            Ez a ShopItem kurzust reprezental?
                        </Typography>
                    </Flex>

                    {isCourse && <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.title + ""}
                        items={privateCourses}
                        selectedValue={course}
                        onSelected={setCourse} />}
                </EpistoLabel>

                <EpistoLabel text="Borítókép">
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
                    label="Termek neve"
                    labelVariant="top"
                    disabled={isCourse} />

                <EpistoLabel text="Kategória">
                    <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.name + ""}
                        items={shopItemCategories}
                        selectedValue={shopItemCategory}
                        onSelected={setShopItemCategory}
                        isDisabled={isCourse} />
                </EpistoLabel>

                <EpistoLabel text="Vasarlasi limit">
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
                            postfix="Darab"
                            disabled={isCourse || !isPurchaseLimited} />
                    </Flex>
                </EpistoLabel>

                <EpistoEntry
                    value={coinPrice}
                    setValue={setCoinPrice}
                    type="number"
                    label="EpistoCoin ar"
                    labelVariant="top"
                    postfix="EpistoCoin(s)" />

                <EpistoEntry
                    value={currencyPrice}
                    setValue={setCurrencyPrice}
                    type="number"
                    label="Valuta ar"
                    labelVariant="top"
                    postfix="Huf" />

            </AdminSubpageHeader>
        </LoadingFrame>
    );
}