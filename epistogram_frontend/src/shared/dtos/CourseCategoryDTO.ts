export type CourseCategoryDTO = {
    id: number;
    name: string;
    childCategories: CourseCategoryDTO[]
}