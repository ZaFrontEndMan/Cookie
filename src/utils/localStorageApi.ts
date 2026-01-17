
const STORAGE_KEY = 'products';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const localStorageApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(100); // Simulate API call
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const products = JSON.parse(data);
    return products.map((product: any) => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt)
    }));
  },

  // Get single product
  getProduct: async (id: string): Promise<Product | null> => {
    await delay(50);
    const products = await localStorageApi.getProducts();
    return products.find(product => product.id === id) || null;
  },

  // Create product
  createProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    await delay(200);
    const products = await localStorageApi.getProducts();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedProducts = [...products, newProduct];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    
    return newProduct;
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product> => {
    await delay(200);
    const products = await localStorageApi.getProducts();
    
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    const updatedProduct: Product = {
      ...products[productIndex],
      ...productData,
      updatedAt: new Date()
    };
    
    const updatedProducts = [...products];
    updatedProducts[productIndex] = updatedProduct;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    
    return updatedProduct;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await delay(100);
    const products = await localStorageApi.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
  }
};
