import { createProduct, updateProduct } from "@/api/productService"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { categoryMap, type Product } from "@/models/Products"
import { useEffect, useState, type FormEvent } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type ProductFormData = Omit<Product, 'id' | 'created_at'>

interface ProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: () => void
    product?: Product
}

const defaultFormState: ProductFormData = {
    name: "",
    category: "I",
    description: "",
    price: 0,
};

export function ProductDialog({
    open,
    onOpenChange,
    onSave,
    product
}: ProductDialogProps) {
    const [form, setForm] = useState<ProductFormData>(defaultFormState);

    useEffect(() => {
        if (open) {
            if (product) {
                setForm({
                    name: product.name,
                    category: product.category,
                    description: product.description || "",
                    price: product.price,
                });
            } else {
                setForm(defaultFormState);
            }
        }
    }, [product, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: id === 'price' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleCategoryChange = (value: Product['category']) => {
        setForm(prevForm => ({ ...prevForm, category: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (product) {
                await updateProduct({ ...product, ...form });
            } else {
                await createProduct(form);
            }
            onSave();
            onOpenChange(false);
        } catch (err) {
            console.error("Failed to save product:", err);
            alert("Erro ao salvar produto");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product ? "Editar Produto" : "Adicionar Novo Produto"}</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para {product ? "editar" : "cadastrar"} um produto.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nome</Label>
                            <Input id="name" value={form.name} onChange={handleChange} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Descrição</Label>
                            <Input id="description" value={form.description || ''} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Categoria</Label>
                            <Select value={form.category} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="col-span-3 w-full">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(categoryMap).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Preço</Label>
                            <Input id="price" type="string" value={form.price} onChange={handleChange} className="col-span-3" required step="0.01" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button type="submit">{product ? "Salvar Alterações" : "Salvar Produto"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}