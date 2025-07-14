import { useState } from "react";
import { 
  MapPin, 
  Search, 
  Plus, 
  Building, 
  Archive,
  Grid3X3,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";

const sectors = [
  {
    id: "A",
    name: "Sector A - Tornillería",
    description: "Tornillos, tuercas y elementos de fijación",
    racks: 8,
    shelves: 64,
    positions: 512,
    occupied: 387,
    occupationRate: 75.6
  },
  {
    id: "B", 
    name: "Sector B - Herramientas",
    description: "Herramientas manuales y eléctricas",
    racks: 6,
    shelves: 48,
    positions: 384,
    occupied: 298,
    occupationRate: 77.6
  },
  {
    id: "C",
    name: "Sector C - Materiales Eléctricos", 
    description: "Cables, conectores y componentes eléctricos",
    racks: 10,
    shelves: 80,
    positions: 640,
    occupied: 445,
    occupationRate: 69.5
  },
  {
    id: "D",
    name: "Sector D - Plomería",
    description: "Tuberías, válvulas y accesorios",
    racks: 4,
    shelves: 32,
    positions: 256,
    occupied: 198,
    occupationRate: 77.3
  }
];

const recentLocations = [
  {
    code: "A-02-15",
    sector: "A",
    rack: "02",
    shelf: "15",
    product: "Tornillo Hexagonal M12",
    quantity: 150,
    lastMovement: "2h"
  },
  {
    code: "B-01-08",
    sector: "B", 
    rack: "01",
    shelf: "08",
    product: "Taladro Percutor 18V",
    quantity: 3,
    lastMovement: "4h"
  },
  {
    code: "C-03-22",
    sector: "C",
    rack: "03", 
    shelf: "22",
    product: "Cable Flexible 2.5mm",
    quantity: 450,
    lastMovement: "1h"
  }
];

export default function Locations() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalPositions = sectors.reduce((total, sector) => total + sector.positions, 0);
  const totalOccupied = sectors.reduce((total, sector) => total + sector.occupied, 0);
  const globalOccupationRate = (totalOccupied / totalPositions) * 100;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ubicaciones</h2>
          <p className="text-muted-foreground">
            Gestión de sectores, estantes y posiciones del depósito
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Ubicación
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Sectores"
          value={sectors.length}
          icon={Building}
          description="Áreas organizadas"
        />
        <StatsCard
          title="Estantes Totales"
          value={sectors.reduce((total, sector) => total + sector.racks, 0)}
          icon={Archive}
          description="Estructuras de almacenaje"
        />
        <StatsCard
          title="Posiciones"
          value={totalPositions.toLocaleString()}
          icon={Grid3X3}
          description={`${totalOccupied} ocupadas`}
        />
        <StatsCard
          title="Ocupación"
          value={`${globalOccupationRate.toFixed(1)}%`}
          icon={Package}
          change={globalOccupationRate > 75 ? "Alta ocupación" : "Capacidad disponible"}
          changeType={globalOccupationRate > 75 ? "negative" : "positive"}
        />
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Ubicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por código de ubicación (ej: A-02-15)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background"
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sectors Grid */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Sectores del Depósito
              </CardTitle>
              <CardDescription>
                Distribución y ocupación por sectores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {sectors.map((sector) => (
                  <div key={sector.id} className="p-4 rounded-lg border bg-background/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{sector.name}</h3>
                        <p className="text-sm text-muted-foreground">{sector.description}</p>
                      </div>
                      <Badge 
                        variant={sector.occupationRate > 80 ? "destructive" : "default"}
                        className={sector.occupationRate > 80 ? "" : "bg-success"}
                      >
                        {sector.occupationRate.toFixed(1)}% ocupado
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Estantes</p>
                        <p className="font-medium">{sector.racks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Repisas</p>
                        <p className="font-medium">{sector.shelves}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Posiciones</p>
                        <p className="font-medium">{sector.positions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ocupadas</p>
                        <p className="font-medium">{sector.occupied}</p>
                      </div>
                    </div>

                    {/* Occupation Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            sector.occupationRate > 80 ? 'bg-destructive' : 'bg-success'
                          }`}
                          style={{ width: `${sector.occupationRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimos movimientos por ubicación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLocations.map((location) => (
                  <div key={location.code} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="font-mono">
                        {location.code}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        hace {location.lastMovement}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{location.product}</p>
                    <p className="text-xs text-muted-foreground">
                      Cantidad: {location.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todos los Movimientos
              </Button>
            </CardContent>
          </Card>

          {/* Quick Location Guide */}
          <Card className="bg-gradient-card shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Guía de Códigos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Formato: SECTOR-ESTANTE-POSICIÓN</p>
                  <p className="text-muted-foreground">Ejemplo: A-02-15</p>
                </div>
                <div className="space-y-1">
                  <p><strong>A:</strong> Tornillería</p>
                  <p><strong>B:</strong> Herramientas</p>
                  <p><strong>C:</strong> Eléctricos</p>
                  <p><strong>D:</strong> Plomería</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}