import { Permission } from '../../models/entity/authorization/Permission';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { permissionCodes } from '../../shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { NoComplexTypes, NoIdType } from '../../utilities/misc';

type Constraint = { [K in PermissionCodeType]: NoIdType<NoComplexTypes<Permission>> };

export const getPermissionsSeedData = () => getSeedList<Permission, Constraint>()(permissionCodes);

export type PermissionsSeedDataType = ReturnType<typeof getPermissionsSeedData>;