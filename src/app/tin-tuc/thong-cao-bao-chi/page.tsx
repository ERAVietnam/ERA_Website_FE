import { createCategoryMetadata, createCategoryPage } from "@/lib/newsCategoryPage";

const CATEGORY_SLUG = "thong-cao-bao-chi";

export const generateMetadata = createCategoryMetadata(CATEGORY_SLUG);
export const revalidate = 300;
export default createCategoryPage(CATEGORY_SLUG);
