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

function getProducts(): Promise<Product[]> {
  return fetch(API_URL)
    .then((response: Response) => response.json())
    .then((result: ApiResponse) => result.data);
}

getProducts().then((products: Product[]) => {
  console.log("Загружено продуктов:", products.length);
  products.forEach((p) => console.log(`${p.id}. ${p.title} — $${p.price}`));
});
