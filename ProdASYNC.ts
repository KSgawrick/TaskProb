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

const API_URL = "https://fakeapi.net/products";

async function getProducts(): Promise<Product[]> {
  const response: Response = await fetch(API_URL);
  const result: ApiResponse = await response.json();
  return result.data;
}

async function main(): Promise<void> {
  const products: Product[] = await getProducts();
  console.log("Загружено продуктов:", products.length);
  products.forEach((p) => console.log(`${p.id}. ${p.title} — $${p.price}`));
}

main();
