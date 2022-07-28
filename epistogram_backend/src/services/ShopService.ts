import { UploadedFile } from 'express-fileupload';
import { DiscountCode } from '../models/entity/DiscountCode';
import { ShopItem } from '../models/entity/ShopItem';
import { ShopItemCategory } from '../models/entity/ShopItemCategory';
import { User } from '../models/entity/User';
import { CourseShopItemListDTO } from '../shared/dtos/CourseShopItemListDTO';
import { DiscountCodeDTO } from '../shared/dtos/DiscountCodeDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { ShopItemAdminShortDTO } from '../shared/dtos/ShopItemAdminShortDTO';
import { ShopItemBriefData } from '../shared/dtos/ShopItemBriefData';
import { ShopItemCategoryDTO } from '../shared/dtos/ShopItemCategoryDTO';
import { ShopItemDTO } from '../shared/dtos/ShopItemDTO';
import { ShopItemEditDTO } from '../shared/dtos/ShopItemEditDTO';
import { ShopItemStatefulView } from '../models/views/ShopItemStatefulView';
import { ShopItemView } from '../models/views/ShopItemView';
import { CoinTransactionService } from './CoinTransactionService';
import { CourseService } from './CourseService';
import { EmailService } from './EmailService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UrlService } from './UrlService';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { StorageFile } from '../models/entity/StorageFile';
import { Id } from '../shared/types/versionId';
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

    getShopItemsAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                const shopItemViews = await this._ormService
                    .query(ShopItemStatefulView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService
                    .mapTo(ShopItemDTO, [shopItemViews]);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'VIEW_SHOP', { companyId });
            }
        };


    }

    getShopItemCategoriesAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const shopItemCategories = await this._ormService
                    .query(ShopItemCategory)
                    .getMany();

                return this._mapperService
                    .mapTo(ShopItemCategoryDTO, [shopItemCategories]);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'VIEW_SHOP', { companyId });
            }
        };


    }

    purchaseShopItemAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        return {
            action: async () => {
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
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'VIEW_SHOP', { companyId });
            }
        };


    }

    getShopItemBriefDataAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        return {
            action: async () => {
                const item = await this._ormService
                    .query(ShopItemView, { shopItemId })
                    .where('id', '=', 'shopItemId')
                    .getSingle();

                return this._mapperService
                    .mapTo(ShopItemBriefData, [item]);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'VIEW_SHOP', { companyId });
            }
        };


    }

    getAdminShopItemsAsync(principalId: PrincipalId) {

        return {
            action: async () => {

                const items = await this._ormService
                    .query(ShopItemView)
                    .getMany();

                return this._mapperService
                    .mapTo(ShopItemAdminShortDTO, [items]);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'MANAGE_SHOP');
            }
        };
    }

    getShopItemEditDTOAsync(principalId: PrincipalId, shopItemId: Id<'ShopItem'>) {

        return {
            action: async () => {
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
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'MANAGE_SHOP');
            }
        };


    }

    getPrivateCourseListAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const courses = await this._ormService
                    .query(CourseShopItemListView)
                    .getMany();

                return this._mapperService
                    .mapTo(CourseShopItemListDTO, [courses]);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'MANAGE_SHOP');
            }
        };


    }

    saveShopItemAsync(principalId: PrincipalId, dto: ShopItemEditDTO, coverFile?: UploadedFile) {

        return {
            action: async () => {
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
                await this.saveShopItemDiscountCodes(dto.id, dto.discountCodes);

                // upload cover file 
                if (coverFile)
                    await this.saveCoverFileAsync(dto.id, coverFile);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'MANAGE_SHOP');
            }
        };


    }

    createShopItemAsync(principalId: PrincipalId) {

        return {
            action: async () => {
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
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'MANAGE_SHOP');
            }
        };


    }

    private async saveShopItemDiscountCodes(shopItemId: Id<'ShopItem'>, discountCodes: DiscountCodeDTO[]) {

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

    private async saveCoverFileAsync(shopItemId: Id<'ShopItem'>, file: UploadedFile) {

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