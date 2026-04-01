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
  return new Promise<Product[]>((resolve, reject) => {
    fetch(API_URL)
      .then((response: Response) => {
        if (!response.ok) {
          reject(new Error(`Ошибка HTTP: статус ${response.status}`));
          return;
        }
        return response.json();
      })
      .then((result: ApiResponse | undefined) => {
        if (result) resolve(result.data);
      })
      .catch((error: Error) => reject(error));
  });
}

getProducts()
  .then((products: Product[]) => {
    console.log("Загружено продуктов:", products.length);
    products.forEach((p) => console.log(`${p.id}. ${p.title} — $${p.price}`));
  })
  .catch((error: Error) => {
    console.error("Не удалось загрузить продукты:", error.message);
  });
