import { Button } from "@/components/ui/button";

const ProductPage = () => {
  return (
    <div className="rounded-xl border border-red-500 p-5">
      <h1 className="text-red-500">Products</h1>
      <Button>View Products</Button>
      <input type="text" placeholder="Search products..." />
    </div>
  );
};

export default ProductPage;
