import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  MapPin,
  ArrowUpDown,
  Clock,
  Users,
  Target
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recentMovements = [
  {
    id: "MOV-001",
    type: "entrada",
    product: "Tuerca M8 x 1.25",
    quantity: 150,
    location: "A-02-15",
    time: "10:30",
    operator: "María García"
  },
  {
    id: "MOV-002", 
    type: "salida",
    product: "Tornillo Phillips 6x40",
    quantity: 75,
    location: "B-01-08",
    time: "11:15",
    operator: "Carlos López"
  },
  {
    id: "MOV-003",
    type: "entrada",
    product: "Arandela Plana M10",
    quantity: 200,
    location: "A-03-22",
    time: "12:00",
    operator: "Ana Martínez"
  },
];

const lowStockItems = [
  {
    code: "TOR-001",
    name: "Tornillo Hexagonal M12",
    currentStock: 15,
    minStock: 50,
    location: "B-02-10"
  },
  {
    code: "TUE-045",
    name: "Tuerca Ciega M8",
    currentStock: 8,
    minStock: 25,
    location: "A-01-05"
  },
  {
    code: "ARO-033",
    name: "Arandela de Presión M6",
    currentStock: 22,
    minStock: 100,
    location: "C-03-18"
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Vista general del estado del depósito
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Artículos"
          value="1,247"
          icon={Package}
          change="+12% desde el mes pasado"
          changeType="positive"
        />
        <StatsCard
          title="Movimientos Hoy"
          value="47"
          icon={ArrowUpDown}
          change="+8 desde ayer"
          changeType="positive"
        />
        <StatsCard
          title="Stock Bajo"
          value="12"
          icon={AlertTriangle}
          change="3 críticos"
          changeType="negative"
        />
        <StatsCard
          title="Ubicaciones Activas"
          value="156"
          icon={MapPin}
          change="95% ocupación"
          changeType="neutral"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Movements */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Movimientos Recientes
            </CardTitle>
            <CardDescription>
              Últimas operaciones registradas en el depósito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={movement.type === "entrada" ? "default" : "secondary"}
                      className={movement.type === "entrada" ? "bg-success" : "bg-warning"}
                    >
                      {movement.type === "entrada" ? "ENT" : "SAL"}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{movement.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {movement.operator} • {movement.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{movement.quantity}</p>
                    <p className="text-xs text-muted-foreground">{movement.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todos los Movimientos
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Alertas de Stock Bajo
            </CardTitle>
            <CardDescription>
              Artículos que requieren reposición urgente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.code} className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.code} • {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-warning">
                      {item.currentStock} / {item.minStock}
                    </p>
                    <p className="text-xs text-muted-foreground">Stock actual</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Generar Orden de Compra
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Acciones Rápidas
          </CardTitle>
          <CardDescription>
            Operaciones frecuentes del depósito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-20 flex flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>Nuevo Artículo</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ArrowUpDown className="h-6 w-6" />
              <span>Registrar Movimiento</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="h-6 w-6" />
              <span>Nueva Ubicación</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Ver Reportes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}