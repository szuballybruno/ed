import { EntityTarget } from "typeorm";
import { staticProvider } from "../../staticProvider";

export const getRepository = <TEntity>(entityType: EntityTarget<TEntity>) => {

    const connection = staticProvider.ormConnection;

    const deleteEntitiesAsync = async (where: string, params: any) => {

        await connection
            .createQueryBuilder()
            .delete()
            .from(entityType)
            .where(where, params)
            .execute();
    }

    return {
        deleteEntitiesAsync
    }
}