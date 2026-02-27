// Static data API - replaces Supabase with multi-language support
import { 
  getProducts as getStaticProducts, 
  getProductBySlug as getStaticProductBySlug, 
  getCategories as getStaticCategories, 
  type Product, 
  type Category 
} from '../data/products'

import { 
  getProductsEn, 
  getProductBySlugEn, 
  getCategoriesEn 
} from '../data/products-en'

import { 
  getProductsCn, 
  getProductBySlugCn, 
  getCategoriesCn 
} from '../data/products-cn'

// Re-export types
export type { Product, Category }

// Detect language from URL path (works in both browser and build time)
function detectLanguage(url?: string): 'vi' | 'en' | 'cn' {
  // If URL is provided (build time), use it
  if (url) {
    if (url.includes('/en/')) return 'en'
    if (url.includes('/cn/')) return 'cn'
    return 'vi'
  }
  
  // Browser runtime
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/en/')) return 'en'
    if (path.startsWith('/cn/')) return 'cn'
  }
  
  return 'vi'
}

// Helper functions that match the old Supabase API with language detection
export async function getProducts(category?: string, url?: string): Promise<Product[]> {
  const lang = detectLanguage(url)
  console.log('Loading products from static data, language:', lang)
  
  let products: Product[]
  if (lang === 'en') {
    products = getProductsEn(category)
  } else if (lang === 'cn') {
    products = getProductsCn(category)
  } else {
    products = getStaticProducts(category)
  }
  
  console.log('Static data returned', products.length, 'products')
  return products
}

export async function getProductBySlug(slug: string, url?: string): Promise<Product | null> {
  const lang = detectLanguage(url)
  console.log('Loading product by slug:', slug, 'language:', lang)
  
  if (lang === 'en') {
    return getProductBySlugEn(slug)
  } else if (lang === 'cn') {
    return getProductBySlugCn(slug)
  } else {
    return getStaticProductBySlug(slug)
  }
}

export async function getCategories(url?: string): Promise<Category[]> {
  const lang = detectLanguage(url)
  console.log('Loading categories from static data, language:', lang)
  
  let categories: Category[]
  if (lang === 'en') {
    categories = getCategoriesEn()
  } else if (lang === 'cn') {
    categories = getCategoriesCn()
  } else {
    categories = getStaticCategories()
  }
  
  console.log('Static data returned', categories.length, 'categories')
  return categories
}

