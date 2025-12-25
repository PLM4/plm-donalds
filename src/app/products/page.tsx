import { Button } from "@/components/ui/button";

const ProductPage = () => {
  return (
    <div className="p-5 border border-red-500 rounded-xl">
      <h1 className="text-red-500">Products</h1>
      <Button>View Products</Button>
      <input type="text" placeholder="Search products..." />
    </div>
  );
};

export default ProductPage;
