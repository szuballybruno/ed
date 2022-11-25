import { UploadedFile } from 'express-fileupload';
import { DiscountCode } from '../models/entity/misc/DiscountCode';
import { ShopItem } from '../models/entity/misc/ShopItem';
import { ShopItemCategory } from '../models/entity/misc/ShopItemCategory';
import { User } from '../models/entity/misc/User';
import { CourseShopItemListDTO } from '@episto/communication';
import { DiscountCodeDTO } from '@episto/communication';
import { IdResultDTO } from '@episto/communication';
import { ShopItemAdminShortDTO } from '@episto/communication';
import { ShopItemBriefData } from '@episto/communication';
import { ShopItemCategoryDTO } from '@episto/communication';
import { ShopItemDTO } from '@episto/communication';
import { ShopItemEditDTO } from '@episto/communication';
import { ShopItemStatefulView } from '../models/views/ShopItemStatefulView';
import { ShopItemView } from '../models/views/ShopItemView';
import { CoinTransactionService } from './CoinTransactionService';
import { CourseService } from './CourseService';
import { EmailService } from './EmailService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UrlService } from './UrlService';
import { PrincipalId } from '@episto/xcore';
import { StorageFile } from '../models/entity/misc/StorageFile';
import { Id } from '@episto/commontypes';
import { CourseShopItemListView } from '../models/views/CourseShopItemListView';
import { AuthorizationService } from './AuthorizationService';

export class ShopService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _coinTransactionService: CoinTransactionService;
    private _courseService: CourseService;
    private _emailService: EmailService;
    private _fileService: FileService;
    private _urlService: UrlService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        coinTransactionService: CoinTransactionService,
        courseService: CourseService,
        emailService: EmailService,
        fileService: FileService,
        urlService: UrlService,
        authorizationService: AuthorizationService) {

        this._courseService = courseService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._coinTransactionService = coinTransactionService;
        this._emailService = emailService;
        this._fileService = fileService;
        this._urlService = urlService;
        this._authorizationService = authorizationService;
    }

    async getShopItemsAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const shopItemViews = await this._ormService
            .query(ShopItemStatefulView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(ShopItemDTO, [shopItemViews]);
    }

    async getShopItemCategoriesAsync(principalId: PrincipalId) {

        const shopItemCategories = await this._ormService
            .query(ShopItemCategory)
            .getMany();

        return this._mapperService
            .mapTo(ShopItemCategoryDTO, [shopItemCategories]);
    }

    async purchaseShopItemAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const shopItem = await this._ormService
            .getSingleById(ShopItem, shopItemId);

        const shopItemView = await this._ormService
            .query(ShopItemView, { shopItemId })
            .where('id', '=', 'shopItemId')
            .getSingle();

        await this._coinTransactionService
            .makeCoinTransactionAsync({
                amount: 0 - shopItemView.coinPrice,
                userId,
                shopItemId: shopItemView.id
            });

        // unlock course 
        if (shopItemView.courseId) {

            await this._courseService
                .createCourseAccessBridge(userId, shopItemView.courseId);

            const courseView = await this._courseService
                .getCourseViewAsync(userId, shopItemView.courseId);

            return {
                firstItemCode: '',
                discountCode: null
            };
        }

        // get item discount code
        else {

            const discountCodes = await this._ormService
                .query(DiscountCode, { shopItemId })
                .where('userId', 'IS', 'NULL')
                .and('shopItemId', '=', 'shopItemId')
                .getMany();

            const discountCode = discountCodes[0];
            if (!discountCode)
                throw new Error('No more unused discount codes for the selected item!');

            await this._ormService
                .save(DiscountCode, {
                    id: discountCode.id,
                    userId: userId
                });

            const user = await this._ormService
                .getSingleById(User, userId);

            await this._emailService
                .sendDiscountCodePurchasedMailAsync(
                    user.email,
                    discountCode.code,
                    shopItemView.name,
                    shopItem.detailsUrl + '',
                    this._urlService.getAssetUrl(shopItemView.coverFilePath));

            return {
                firstItemCode: null,
                discountCode: discountCode.code
            };
        }
    }

    async getShopItemBriefDataAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        const item = await this._ormService
            .query(ShopItemView, { shopItemId })
            .where('id', '=', 'shopItemId')
            .getSingle();

        return this._mapperService
            .mapTo(ShopItemBriefData, [item]);
    }

    async getAdminShopItemsAsync(principalId: PrincipalId) {

        const items = await this._ormService
            .query(ShopItemView)
            .getMany();

        return this._mapperService
            .mapTo(ShopItemAdminShortDTO, [items]);
    }

    async getShopItemEditDTOAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        const shopItem = await this._ormService
            .query(ShopItem, { shopItemId })
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'coverFileId', ShopItem))
            .where('id', '=', 'shopItemId')
            .getSingle();

        const discountCodes = await this._ormService
            .query(DiscountCode, { shopItemId })
            .where('shopItemId', '=', 'shopItemId')
            .getMany();

        return this._mapperService
            .mapTo(ShopItemEditDTO, [shopItem, discountCodes]);
    }

    async getPrivateCourseListAsync(principalId: PrincipalId) {

        const courses = await this._ormService
            .query(CourseShopItemListView)
            .getMany();

        return this._mapperService
            .mapTo(CourseShopItemListDTO, [courses]);
    }

    async saveShopItemAsync(principalId: PrincipalId, dto: ShopItemEditDTO, coverFile?: UploadedFile) {

        const isCourse = !!dto.courseId;
        const shopItemCategoryId = Id.create<'ShopItemCategory'>(1);

        // save entity details
        await this._ormService
            .save(ShopItem, {
                id: dto.id,
                coinPrice: dto.coinPrice,
                currencyPrice: dto.currencyPrice,
                courseId: isCourse ? dto.courseId : null,
                name: isCourse ? null : dto.name,
                purchaseLimit: isCourse ? null : dto.purchaseLimit,
                shopItemCategoryId: isCourse ? shopItemCategoryId : dto.shopItemCategoryId,
                detailsUrl: isCourse ? null : dto.detailsUrl
            });

        // save discount codes 
        await this._saveShopItemDiscountCodes(dto.id, dto.discountCodes);

        // upload cover file 
        if (coverFile)
            await this._saveCoverFileAsync(dto.id, coverFile);
    }

    async createShopItemAsync(principalId: PrincipalId) {

        const si = {
            coinPrice: 0,
            currencyPrice: 0,
            courseId: null,
            name: '',
            purchaseLimit: 0,
            shopItemCategoryId: Id.create<'ShopItemCategory'>(1),
            detailsUrl: null
        } as ShopItem;

        await this._ormService
            .createAsync(ShopItem, si);

        return {
            id: si.id
        } as IdResultDTO;
    }

    private async _saveShopItemDiscountCodes(shopItemId: Id<'ShopItem'>, discountCodes: DiscountCodeDTO[]) {

        // get existing codes
        const existingCodes = await this._ormService
            .query(DiscountCode, { shopItemId })
            .where('shopItemId', '=', 'shopItemId')
            .getMany();

        // handle added codes 
        const addedCodes = discountCodes
            .filter(x => !existingCodes
                .some(existingCode => existingCode.id === x.id));

        if (addedCodes.length > 0)
            await this._ormService
                .createManyAsync(DiscountCode, addedCodes
                    .map(addedCode => ({
                        shopItemId,
                        code: addedCode.code
                    } as DiscountCode))
                );

        // handle deleted codes
        const deletedCodes = existingCodes
            .filter(x => !discountCodes
                .some(code => code.id === x.id));

        if (deletedCodes.length > 0)
            await this._ormService
                .hardDelete(DiscountCode, deletedCodes.map(x => x.id));
    }

    private async _saveCoverFileAsync(shopItemId: Id<'ShopItem'>, file: UploadedFile) {

        return await this._fileService
            .uploadAssigendFileAsync({
                entitySignature: ShopItem,
                entityId: shopItemId,
                fileBuffer: file.data,
                fileCode: 'shop_item_cover',
                storageFileIdField: 'coverFileId'
            });
    }
}