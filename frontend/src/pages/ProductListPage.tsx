import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState
} from "@tanstack/react-table"
import * as React from "react"


import { deleteProduct, fetchProducts } from "@/api/productService"
import { ProductDialog } from "@/components/products/dialog"
import { ProductTable } from "@/components/products/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/models/Products"
import { PlusCircle } from "lucide-react"
import { getColumns } from "@/components/products/columns"

export default function ProductDataTable() {
    const [data, setData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>(undefined);
    const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);


    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const products = await fetchProducts();
            setData(products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAllProducts();
    }, []);


    const handleAddNew = () => {
        setSelectedProduct(undefined);
        setIsDialogOpen(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        try {
            await deleteProduct(productToDelete.id);
            fetchAllProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
        } finally {
            setProductToDelete(null);
        }
    };

    const handleSave = () => {
        fetchAllProducts();
    };

    const columns = React.useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: (product) => setProductToDelete(product),
    }), []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtrar por nome do produto..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto
                </Button>
            </div>
            <ProductTable table={table} loading={loading} />

            <ProductDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSave}
                product={selectedProduct}
            />

            <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá deletar permanentemente o produto "{productToDelete?.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                            Deletar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
