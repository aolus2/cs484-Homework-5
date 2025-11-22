import { useState } from "react";
import { FixedSizeList as List } from "react-window";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}
interface Problem4Props {
  initialCount?: number;
}

// Generate sample products
const generateProducts = (count: number): Product[] => {
    const categories = ["Electronics", "Books", "Clothing", "Home", "Sports"];
    return Array.from({ length: count }, (_, index) => ({
        id: index,
        name: `Product ${index}`,
        price: parseFloat((Math.random() * 100).toFixed(2)),
        category: categories[Math.floor(Math.random() * categories.length)],
    }));
};

export default function Problem4({ initialCount = 100000 }: Problem4Props) {
    const [products] = useState(generateProducts(initialCount));

    // Hint: Use data-testid={`product-row-${index}`} in each product <div>
  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 4: List Virtualization</h1>
      <p>
        Rendering a list of 100,000 products without virtualization. Observe the
        performance issues.
      </p>
      <div style={{ marginTop: "20px" }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Notice the lag when rendering a large list.</li>
          <li>Implement list virtualization using react-window.</li>
          <li>Observe the improved performance after optimization.</li>
        </ol>
      </div>

      <div data-testid="product-list" style={{ marginTop: 16 }}>
        <List
          height={600}
          itemCount={products.length}
          itemSize={50}
          width={"100%"}
          overscanCount={5}
        >
          {({ index, style }: { index: number; style: React.CSSProperties }) => {
            const product = products[index];
            return (
              <div
                data-testid={`product-row-${index}`}
                style={{
                  ...style,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>{product.name}</div>
                <div>${product.price.toFixed(2)}</div>
                <div>{product.category}</div>
              </div>
            );
          }}
        </List>
      </div>
    </div>
  );
}
