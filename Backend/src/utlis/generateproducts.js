import { faker } from '@faker-js/faker';
import fs from "fs"	

function generateProducts(numProducts = 1000) {
    const products = [];
  
    for (let i = 0; i < numProducts; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        unitPrice: parseFloat(faker.commerce.price()),
        discount: faker.datatype.number({ min: 0, max: 50 }),
        discountPrice: 0, // We'll calculate this below
        brand: faker.company.name(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
        imagePublic_id: faker.datatype.uuid(),
        additionalImagesPublic_id: Array.from({ length: faker.datatype.number({ min: 0, max: 5 }) }, () => faker.datatype.uuid()),
        additionalImages: Array.from({ length: faker.datatype.number({ min: 0, max: 5 }) }, () => faker.image.imageUrl()),
        tags: faker.lorem.words(faker.datatype.number({ min: 1, max: 5 })).split(' '),
        category: faker.commerce.department(),
        subCategory: faker.commerce.product(),
        quantity: faker.datatype.number({ min: 1, max: 100 }),
        rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
        reviews: [],  // Assuming reviews can be added later
        stockStatus: faker.helpers.arrayElement(["in stock", "out of stock"]),
        sku: faker.datatype.uuid(),
        dimensions: {
          length: faker.datatype.float({ min: 1, max: 100, precision: 0.1 }),
          width: faker.datatype.float({ min: 1, max: 100, precision: 0.1 }),
          height: faker.datatype.float({ min: 1, max: 100, precision: 0.1 }),
        },
        weight: faker.datatype.float({ min: 1, max: 100, precision: 0.1 }),
        variants: faker.lorem.words(faker.datatype.number({ min: 0, max: 3 })).split(' '),
        seller: "66b5c7a9480eca331486995d",  // Assuming seller ID is a UUID for now
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
  
      // Calculate discountPrice based on price and discount
      product.discountPrice = product.discount > 0 ? product.price - (product.price * (product.discount / 100)) : product.price;
  
      products.push(product);
    }
  
    return products;
  }
  
  const products = generateProducts();
  
  // Save the data to a JSON file
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf-8');
  
  console.log('Dummy product data generated and saved to products.json');