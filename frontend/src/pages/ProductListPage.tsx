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


import { fetchProducts } from "@/api/productService"
import { columns } from "@/components/products/columns"
import { ProductDialog } from "@/components/products/dialog"
import { ProductTable } from "@/components/products/table"
import { Input } from "@/components/ui/input"
import type { Product } from "@/models/Products"

export default function ProductDataTable() {
    const [data, setData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const products = await fetchProducts();
            setData(products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAllProducts();
    }, []);

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
                <ProductDialog />
            </div>
            <ProductTable table={table} loading={loading} />
        </div>
    )
}
