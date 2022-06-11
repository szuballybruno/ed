import { UploadedFile } from 'express-fileupload';
import { CourseData } from '../models/entity/course/CourseData';
import { DiscountCode } from '../models/entity/DiscountCode';
import { ShopItem } from '../models/entity/ShopItem';
import { ShopItemCategory } from '../models/entity/ShopItemCategory';
import { User } from '../models/entity/User';
import { CourseBriefData } from '../shared/dtos/CourseBriefData';
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
import { PrincipalId } from '../utilities/ActionParams';

export class ShopService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _coinTransactionService: CoinTransactionService;
    private _courseService: CourseService;
    private _emailService: EmailService;
    private _fileService: FileService;
    private _urlService: UrlService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        coinTransactionService: CoinTransactionService,
        courseService: CourseService,
        emailService: EmailService,
        fileService: FileService,
        urlService: UrlService) {

        this._courseService = courseService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._coinTransactionService = coinTransactionService;
        this._emailService = emailService;
        this._fileService = fileService;
        this._urlService = urlService;
    }

    async getShopItemsAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const shopItemViews = await this._ormService
            .getRepository(ShopItemStatefulView)
            .createQueryBuilder('siv')
            .where('siv.userId = :userId', { userId })
            .getMany();

        return this._mapperService
            .mapMany(ShopItemStatefulView, ShopItemDTO, shopItemViews);
    }

    async getShopItemCategoriesAsync() {

        const shopItemCategories = await this._ormService
            .getRepository(ShopItemCategory)
            .createQueryBuilder('sic')
            .getMany();

        return this._mapperService
            .mapMany(ShopItemCategory, ShopItemCategoryDTO, shopItemCategories);
    }

    async purchaseShopItemAsync(principalId: PrincipalId, shopItemId: number) {

        const userId = principalId.toSQLValue();
        
        const shopItem = await this._ormService
            .getSingleById(ShopItem, shopItemId);

        const shopItemView = await this._ormService
            .getRepository(ShopItemView)
            .findOneOrFail({
                where: {
                    id: shopItemId
                }
            });

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
                firstItemCode: courseView.firstItemCode,
                discountCode: null
            };
        }

        // get item discount code
        else {

            const discountCodes = await this._ormService
                .getRepository(DiscountCode)
                .createQueryBuilder('dc')
                .where('dc.userId IS NULL')
                .andWhere('dc.shopItemId = :shopItemId', { shopItemId })
                .getMany();

            const discountCode = discountCodes[0];
            if (!discountCode)
                throw new Error('No more unused discount codes for the selected item!');

            await this._ormService
                .getRepository(DiscountCode)
                .save({
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

    async getShopItemBriefDataAsync(shopItemId: number) {

        const item = await this._ormService
            .getRepository(ShopItemView)
            .findOneOrFail({
                where: {
                    id: shopItemId
                }
            });

        return this._mapperService
            .map(ShopItemView, ShopItemBriefData, item);
    }

    async getAdminShopItemsAsync() {

        const items = await this._ormService
            .getRepository(ShopItemView)
            .createQueryBuilder('siv')
            .getMany();

        return this._mapperService
            .mapMany(ShopItemView, ShopItemAdminShortDTO, items);
    }

    async getShopItemEditDTOAsync(shopItemId: number) {

        const shopItem = await this._ormService
            .getRepository(ShopItem)
            .createQueryBuilder('si')
            .leftJoinAndSelect('si.coverFile', 'ci')
            .where('si.id = :shopItemId', { shopItemId })
            .getOneOrFail();

        const discountCodes = await this._ormService
            .getRepository(DiscountCode)
            .find({
                where: {
                    shopItemId
                }
            });

        return this._mapperService
            .map(ShopItem, ShopItemEditDTO, shopItem, discountCodes);
    }

    async getPrivateCourseListAsync() {

        const courses = await this._ormService
            .getRepository(CourseData)
            .createQueryBuilder('co')
            .leftJoinAndSelect('co.coverFile', 'cf')
            .where('co.visibility = \'private\'')
            .getMany();

        return this._mapperService
            .mapMany(CourseData, CourseShopItemListDTO, courses);
    }

    async saveShopItemAsync(dto: ShopItemEditDTO, coverFile?: UploadedFile) {

        const isCourse = !!dto.courseId;
        const courseCategoryId = 1;

        // save entity details
        await this._ormService
            .getRepository(ShopItem)
            .save({
                id: dto.id,
                coinPrice: dto.coinPrice,
                currencyPrice: dto.currencyPrice,
                courseId: isCourse ? dto.courseId : null,
                name: isCourse ? null : dto.name,
                purchaseLimit: isCourse ? null : dto.purchaseLimit,
                shopItemCategoryId: isCourse ? courseCategoryId : dto.shopItemCategoryId,
                detailsUrl: isCourse ? null : dto.detailsUrl
            });

        // save discount codes 
        await this.saveShopItemDiscountCodes(dto.id, dto.discountCodes);

        // upload cover file 
        if (coverFile)
            await this.saveCoverFileAsync(dto.id, coverFile);
    }

    async createShopItemAsync() {

        const si = {
            coinPrice: 0,
            currencyPrice: 0,
            courseId: null,
            name: '',
            purchaseLimit: 0,
            shopItemCategoryId: 1,
            detailsUrl: null
        } as ShopItem;

        await this._ormService
            .getRepository(ShopItem)
            .insert(si);

        return {
            id: si.id
        } as IdResultDTO;
    }

    private async saveShopItemDiscountCodes(shopItemId: number, discountCodes: DiscountCodeDTO[]) {

        // get existing codes
        const existingCodes = await this._ormService
            .getRepository(DiscountCode)
            .find({
                where: {
                    shopItemId
                }
            });

        // handle added codes 
        const addedCodes = discountCodes
            .filter(x => !existingCodes
                .some(existingCode => existingCode.id === x.id));

        if (addedCodes.length > 0)
            await this._ormService
                .getRepository(DiscountCode)
                .insert(addedCodes
                    .map(addedCode => ({
                        shopItemId,
                        code: addedCode.code
                    })));

        // handle deleted codes
        const deletedCodes = existingCodes
            .filter(x => !discountCodes
                .some(code => code.id === x.id));

        if (deletedCodes.length > 0)
            await this._ormService
                .getRepository(DiscountCode)
                .delete(deletedCodes.map(x => x.id));
    }

    private async saveCoverFileAsync(shopItemId: number, file: UploadedFile) {

        const getEntityAsync = () => this._ormService
            .getSingleById(ShopItem, shopItemId);

        const setFileIdAsync = (fileId: number) => this._ormService
            .getRepository(ShopItem)
            .save({
                id: shopItemId,
                coverFileId: fileId
            });

        return await this._fileService
            .uploadAssigendFileAsync<ShopItem>(
                this._fileService.getFilePath('shop_item_cover_images', 'shop_item_cover_image', shopItemId, 'jpg'),
                getEntityAsync,
                setFileIdAsync,
                entity => entity.coverFileId,
                file.data);
    }
}