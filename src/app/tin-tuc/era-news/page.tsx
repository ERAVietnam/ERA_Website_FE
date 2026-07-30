import { createCategoryMetadata, createCategoryPage } from "@/lib/newsCategoryPage";

const CATEGORY_SLUG = "era-news";

export const generateMetadata = createCategoryMetadata(CATEGORY_SLUG);
export const revalidate = 300;
export default createCategoryPage(CATEGORY_SLUG);
