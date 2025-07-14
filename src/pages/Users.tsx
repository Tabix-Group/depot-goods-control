import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  Shield, 
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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



const roles = {
  "Supervisor": { color: "bg-primary", permissions: "Administrador" },
  "Operario": { color: "bg-success", permissions: "Lectura/Escritura" },
  "Analista": { color: "bg-warning", permissions: "Solo lectura" }
};

  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, error, addUser, updateUser, deleteUser, refetch } = useUsers();

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = roles[role as keyof typeof roles];
    return (
      <Badge className={roleConfig?.color || "bg-muted"}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "activo" ? "default" : "secondary"} 
             className={status === "activo" ? "bg-success" : ""}>
        {status === "activo" ? "Activo" : "Inactivo"}
      </Badge>
    );
  };

  const activeUsers = users.filter(u => u.status === "activo").length;
  const supervisors = users.filter(u => u.role === "Supervisor").length;
  const operators = users.filter(u => u.role === "Operario").length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
          <p className="text-muted-foreground">
            Gestión de usuarios y permisos del sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Usuarios
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} activos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Supervisores
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supervisors}</div>
            <p className="text-xs text-muted-foreground">
              Permisos administrativos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Operarios
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operators}</div>
            <p className="text-xs text-muted-foreground">
              Personal operativo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sesiones Activas
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios conectados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por nombre, email o departamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background"
          />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Lista de Usuarios
          </CardTitle>
          <CardDescription>
            Gestión completa de usuarios del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Cargando usuarios...</div>
          ) : error ? (
            <div className="text-destructive">Error: {error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url || ""} />
                          <AvatarFallback>{getInitials(user.full_name || user.name || "?")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.full_name || user.name || "Sin nombre"}</p>
                          <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{user.phone || "-"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getRoleBadge(user.role || "")}
                        <p className="text-xs text-muted-foreground">
                          {roles[user.role as keyof typeof roles]?.permissions}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.department || "-"}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status || "")}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{user.last_login ? user.last_login.split(" ")[0] : "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.last_login ? user.last_login.split(" ")[1] : ""}
                        </p>
                      </div>
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
                            Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar Usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Shield className="h-4 w-4" />
                            Gestionar Permisos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                            Desactivar Usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Niveles de Permisos
          </CardTitle>
          <CardDescription>
            Descripción de los roles y permisos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary">Supervisor</Badge>
              </div>
              <h4 className="font-medium mb-2">Administrador Total</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gestión completa de inventario</li>
                <li>• Administración de usuarios</li>
                <li>• Configuración del sistema</li>
                <li>• Reportes y auditorías</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-success">Operario</Badge>
              </div>
              <h4 className="font-medium mb-2">Operaciones Diarias</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Registrar movimientos</li>
                <li>• Consultar inventario</li>
                <li>• Actualizar ubicaciones</li>
                <li>• Gestionar stock</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-warning">Analista</Badge>
              </div>
              <h4 className="font-medium mb-2">Solo Consulta</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ver inventario</li>
                <li>• Consultar reportes</li>
                <li>• Exportar datos</li>
                <li>• Análisis de tendencias</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}