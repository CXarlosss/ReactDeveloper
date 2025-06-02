import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/products/ProductCard";

const mockProduct = {
  id: 1,
  name: "Café con Leche",
  price: 3.75,
  image: "cafe_01",
};

describe("ProductCard", () => {
  it("muestra nombre, precio e imagen", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Café con Leche/i)).toBeInTheDocument();
    expect(screen.getByText(/3,75/)).toBeInTheDocument();
    expect(screen.getByAltText(/Imagen Café con Leche/i)).toBeInTheDocument();
  });
});
