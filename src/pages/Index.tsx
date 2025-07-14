import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, BarChart3, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sistema de Gestión de Depósito
          </h1>
          <p className="text-xl text-muted-foreground">
            Controla tu inventario de manera eficiente y profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Inventario</CardTitle>
              <CardDescription>
                Gestiona todos tus artículos y stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/inventory">
                <Button className="w-full">Ver Inventario</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Ubicaciones</CardTitle>
              <CardDescription>
                Organiza tus espacios de almacenamiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/locations">
                <Button className="w-full">Ver Ubicaciones</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Visualiza métricas y estadísticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard">
                <Button className="w-full">Ver Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>
                Administra permisos y accesos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/users">
                <Button className="w-full">Ver Usuarios</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Comienza seleccionando una de las opciones arriba para gestionar tu depósito
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
