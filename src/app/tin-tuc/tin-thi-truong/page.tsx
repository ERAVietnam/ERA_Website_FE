import { createCategoryMetadata, createCategoryPage } from "@/lib/newsCategoryPage";

const CATEGORY_SLUG = "tin-thi-truong";

export const generateMetadata = createCategoryMetadata(CATEGORY_SLUG);
export const revalidate = 3600;
export default createCategoryPage(CATEGORY_SLUG);
