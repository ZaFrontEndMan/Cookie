
import { create } from 'zustand';
import { localStorageApi, Product } from '@/utils/localStorageApi';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product>;
  updateProduct: (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await localStorageApi.getProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        isLoading: false 
      });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct = await localStorageApi.createProduct(productData);
      set((state) => ({ 
        products: [...state.products, newProduct],
        isLoading: false
      }));
      console.log("Add product:", newProduct);
      return newProduct;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add product',
        isLoading: false 
      });
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProduct = await localStorageApi.updateProduct(id, productData);
      set((state) => ({
        products: state.products.map(product =>
          product.id === id ? updatedProduct : product
        ),
        isLoading: false
      }));
      return updatedProduct;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update product',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await localStorageApi.deleteProduct(id);
      set((state) => ({
        products: state.products.filter(product => product.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete product',
        isLoading: false 
      });
      throw error;
    }
  }
}));
