interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  image: string;
}

interface ApiResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

interface ProductShort {
  title: string;
  price: number;
}

const API_URL = "https://fakeapi.net/products";

async function getExpensiveProducts(): Promise<ProductShort[]> {
  const response: Response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: статус ${response.status}`);
  }

  const result: ApiResponse = await response.json();

  return result.data
    .filter((p: Product) => p.price > 100)
    .map((p: Product) => ({ title: p.title, price: p.price }));
}

async function main(): Promise<void> {
  try {
    const products: ProductShort[] = await getExpensiveProducts();
    console.log(`Продукты дороже $100 (${products.length} шт.):`);
    products.forEach((p) => console.log(`  ${p.title} — $${p.price}`));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка:", error.message);
    }
  }
}

main();
