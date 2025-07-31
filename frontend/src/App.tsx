import ProductDataTable from "./pages/ProductListPage";

function App() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos</h1>
      <ProductDataTable />
    </div>
  );
}

export default App