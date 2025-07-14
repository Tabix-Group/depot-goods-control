import { useState } from "react";
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  User,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const movements = [
  {
    id: "MOV-001",
    type: "entrada",
    date: "2024-01-15",
    time: "10:30",
    product: "Tornillo Hexagonal M12 x 50",
    code: "TOR-001",
    quantity: 150,
    location: "A-02-15",
    operator: "María García",
    supplier: "Ferretería Central",
    reference: "OC-2024-001",
    status: "completado"
  },
  {
    id: "MOV-002",
    type: "salida", 
    date: "2024-01-15",
    time: "11:15",
    product: "Tornillo Phillips 6x40",
    code: "TOR-015",
    quantity: 75,
    location: "B-01-08",
    operator: "Carlos López",
    destination: "Obra Centro Comercial",
    reference: "REQ-2024-045",
    status: "completado"
  },
  {
    id: "MOV-003",
    type: "entrada",
    date: "2024-01-15", 
    time: "12:00",
    product: "Arandela Plana M10",
    code: "ARO-033",
    quantity: 200,
    location: "A-03-22",
    operator: "Ana Martínez",
    supplier: "MetalParts",
    reference: "OC-2024-002",
    status: "completado"
  },
  {
    id: "MOV-004",
    type: "ajuste",
    date: "2024-01-15",
    time: "14:20",
    product: "Cable Flexible 2.5mm",
    code: "CAB-012", 
    quantity: -25,
    location: "D-01-03",
    operator: "Juan Pérez",
    reason: "Mercadería dañada",
    reference: "AJ-2024-001",
    status: "completado"
  },
  {
    id: "MOV-005",
    type: "transferencia",
    date: "2024-01-15",
    time: "15:45",
    product: "Válvula Esférica 1/2\"",
    code: "VAL-089",
    quantity: 12,
    location: "B-04-12",
    newLocation: "B-04-15",
    operator: "Roberto Silva",
    reason: "Reorganización de sector",
    reference: "TR-2024-003",
    status: "completado"
  }
];

export default function Movements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredMovements, setFilteredMovements] = useState(movements);

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <ArrowDown className="h-4 w-4 text-success" />;
      case "salida":
        return <ArrowUp className="h-4 w-4 text-destructive" />;
      case "ajuste":
        return <Package className="h-4 w-4 text-warning" />;
      case "transferencia":
        return <ArrowUpDown className="h-4 w-4 text-primary" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  const getMovementBadge = (type: string) => {
    const variants = {
      entrada: "default",
      salida: "secondary", 
      ajuste: "outline",
      transferencia: "outline"
    } as const;

    const colors = {
      entrada: "bg-success",
      salida: "bg-warning",
      ajuste: "bg-destructive",
      transferencia: "bg-primary"
    };

    return (
      <Badge 
        variant={variants[type as keyof typeof variants] || "default"}
        className={type === "entrada" || type === "salida" ? colors[type as keyof typeof colors] : ""}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const todayMovements = movements.filter(m => m.date === "2024-01-15").length;
  const entriesCount = movements.filter(m => m.type === "entrada").length;
  const exitsCount = movements.filter(m => m.type === "salida").length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Movimientos</h2>
          <p className="text-muted-foreground">
            Registro completo de entradas, salidas y transferencias
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Movimiento
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Movimientos Hoy"
          value={todayMovements}
          icon={ArrowUpDown}
          change="+8 desde ayer"
          changeType="positive"
        />
        <StatsCard
          title="Entradas"
          value={entriesCount}
          icon={ArrowDown}
          description="Este período"
        />
        <StatsCard
          title="Salidas"
          value={exitsCount}
          icon={ArrowUp}
          description="Este período"
        />
        <StatsCard
          title="Balance"
          value={`+${entriesCount - exitsCount}`}
          icon={Package}
          changeType="positive"
        />
      </div>

      {/* Filters */}
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
                placeholder="Buscar por producto, código o referencia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de movimiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="salida">Salidas</SelectItem>
                <SelectItem value="ajuste">Ajustes</SelectItem>
                <SelectItem value="transferencia">Transferencias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Fecha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Historial de Movimientos
          </CardTitle>
          <CardDescription>
            Registro detallado de todas las operaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Operador</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMovementIcon(movement.type)}
                      {getMovementBadge(movement.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movement.date}</p>
                      <p className="text-sm text-muted-foreground">{movement.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-sm text-muted-foreground">{movement.code}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      movement.quantity > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.location}</Badge>
                    {movement.newLocation && (
                      <div className="mt-1">
                        <span className="text-xs text-muted-foreground">→ </span>
                        <Badge variant="outline">{movement.newLocation}</Badge>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{movement.operator}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{movement.reference}</p>
                      {movement.supplier && (
                        <p className="text-xs text-muted-foreground">{movement.supplier}</p>
                      )}
                      {movement.destination && (
                        <p className="text-xs text-muted-foreground">{movement.destination}</p>
                      )}
                      {movement.reason && (
                        <p className="text-xs text-muted-foreground">{movement.reason}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-success">
                      {movement.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}