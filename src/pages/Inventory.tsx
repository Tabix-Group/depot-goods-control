import { useState } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const inventoryItems = [
  {
    id: "1",
    code: "TOR-001",
    name: "Tornillo Hexagonal M12 x 50",
    category: "Tornillería",
    stock: 150,
    minStock: 50,
    maxStock: 500,
    location: "A-02-15",
    unit: "unidad",
    price: 0.85,
    supplier: "Ferretería Central",
    status: "normal"
  },
  {
    id: "2", 
    code: "TUE-045",
    name: "Tuerca Ciega M8",
    category: "Tornillería",
    stock: 8,
    minStock: 25,
    maxStock: 200,
    location: "A-01-05", 
    unit: "unidad",
    price: 0.32,
    supplier: "Tornillos SA",
    status: "low"
  },
  {
    id: "3",
    code: "ARO-033", 
    name: "Arandela de Presión M6",
    category: "Tornillería",
    stock: 22,
    minStock: 100,
    maxStock: 1000,
    location: "C-03-18",
    unit: "unidad", 
    price: 0.15,
    supplier: "MetalParts",
    status: "low"
  },
  {
    id: "4",
    code: "CAB-012",
    name: "Cable Flexible 2.5mm",
    category: "Electricidad",
    stock: 450,
    minStock: 100,
    maxStock: 800,
    location: "D-01-03",
    unit: "metro",
    price: 1.20,
    supplier: "ElectroCorp",
    status: "normal"
  },
  {
    id: "5",
    code: "VAL-089",
    name: "Válvula Esférica 1/2\"",
    category: "Plomería", 
    stock: 75,
    minStock: 20,
    maxStock: 150,
    location: "B-04-12",
    unit: "unidad",
    price: 15.50,
    supplier: "HidroSupply",
    status: "normal"
  }
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(inventoryItems);

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (status === "low" || stock <= minStock) {
      return <Badge variant="destructive">Stock Bajo</Badge>;
    }
    return <Badge variant="default" className="bg-success">Normal</Badge>;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = inventoryItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.code.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
          <p className="text-muted-foreground">
            Gestión completa de artículos y stock
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Artículo
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Búsqueda y Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por código, nombre o categoría..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Artículos ({filteredItems.length})
          </CardTitle>
          <CardDescription>
            Listado completo del inventario actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.code}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.supplier}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.stock} {item.unit}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.location}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status, item.stock, item.minStock)}
                  </TableCell>
                  <TableCell>
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Artículos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredItems.length}</div>
            <p className="text-xs text-muted-foreground">
              {inventoryItems.length} artículos registrados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredItems.reduce((total, item) => total + (item.stock * item.price), 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor del inventario actual
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {filteredItems.filter(item => item.stock <= item.minStock).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Artículos con stock bajo
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}