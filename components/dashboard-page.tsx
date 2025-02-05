"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Box, Calendar, ClipboardList, ThermometerSnowflake, TrendingDown, TrendingUp, Settings, Bell, Power, X, Search, ArrowUpDown, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type RoomTrend = 'rising' | 'falling' | 'stable';
type RoomStatus = 'alert' | 'normal' | 'warning';

interface CriticalItem {
  name: string;
  quantity: string;
  expiresIn: number;
}

interface Movement {
  item: string;
  quantity: string;
  source: string;
  destination: string;
}

interface Pickup {
  date: string;
  item: string;
  quantity: string;
  client: string;
}

interface ColdRoom {
  id: number;
  name: string;
  location: string;
  temperature: number;
  humidity: number;
  capacity: number;
  status: RoomStatus;
  trend: RoomTrend;
  lastUpdated: string;
  criticalItems: CriticalItem[];
  incomingToday: Movement[];
  outgoingToday: Movement[];
  upcomingPickups: Pickup[];
  alerts: string[];
  temperatureHistory: number[];
  isActive: boolean;
  targetTemp: number;
}

interface InventoryItem {
  id: string;
  product: string;
  quantity: string;
  location: string;
  farmer: string;
  dateReceived: string;
  expiryDate: string;
  status: "fresh" | "expiring-soon" | "expired";
}

const mockRooms: ColdRoom[] = [
  {
    id: 1,
    name: "Meru Coldroom",
    location: "Meru Town",
    temperature: 4,
    humidity: 85,
    capacity: 64.0,
    status: "normal",
    trend: "stable",
    lastUpdated: "2025-02-04 08:00",
    criticalItems: [
      { name: "Potatoes", quantity: "200kg", expiresIn: 3 },
      { name: "Carrots", quantity: "100kg", expiresIn: 2 }
    ],
    incomingToday: [
      { item: "Potatoes", quantity: "1000kg", source: "John Mutua", destination: "" },
      { item: "Carrots", quantity: "500kg", source: "Mary Wanjiku", destination: "" }
    ],
    outgoingToday: [
      { item: "Potatoes", quantity: "300kg", source: "", destination: "Fresh Mart" },
      { item: "Carrots", quantity: "200kg", source: "", destination: "Green Grocers" }
    ],
    upcomingPickups: [
      { date: "2025-02-05", item: "Potatoes", quantity: "500kg", client: "Fresh Mart" },
      { date: "2025-02-06", item: "Carrots", quantity: "300kg", client: "Green Grocers" }
    ],
    alerts: [],
    temperatureHistory: [4.0, 4.1, 4.0, 4.2, 4.0, 4.0],
    isActive: true,
    targetTemp: 4
  },
  {
    id: 2,
    name: "Nyeri Coldroom",
    location: "Nyeri Town",
    temperature: 3,
    humidity: 83,
    capacity: 85,
    status: "normal",
    trend: "rising",
    lastUpdated: "2025-02-04 08:30",
    criticalItems: [
      { name: "Cabbages", quantity: "300kg", expiresIn: 2 },
      { name: "Tomatoes", quantity: "150kg", expiresIn: 1 }
    ],
    incomingToday: [
      { item: "Cabbages", quantity: "800kg", source: "Peter Kamau", destination: "" },
      { item: "Tomatoes", quantity: "400kg", source: "Sarah Njeri", destination: "" }
    ],
    outgoingToday: [
      { item: "Cabbages", quantity: "200kg", source: "", destination: "Metro Market" },
      { item: "Tomatoes", quantity: "100kg", source: "", destination: "Food Plus" }
    ],
    upcomingPickups: [
      { date: "2025-02-05", item: "Cabbages", quantity: "400kg", client: "Metro Market" },
      { date: "2025-02-07", item: "Tomatoes", quantity: "200kg", client: "Food Plus" }
    ],
    alerts: [],
    temperatureHistory: [3.0, 3.2, 3.1, 3.3, 3.2, 3.0],
    isActive: true,
    targetTemp: 3
  },
  {
    id: 3,
    name: "Nakuru Coldroom",
    location: "Nakuru Town",
    temperature: 5,
    humidity: 82,
    capacity: 45,
    status: "alert",
    trend: "rising",
    lastUpdated: "2025-02-04 07:45",
    criticalItems: [
      { name: "Onions", quantity: "400kg", expiresIn: 4 },
      { name: "Green Peas", quantity: "200kg", expiresIn: 1 }
    ],
    incomingToday: [
      { item: "Onions", quantity: "600kg", source: "James Omondi", destination: "" },
      { item: "Green Peas", quantity: "300kg", source: "Alice Kemunto", destination: "" }
    ],
    outgoingToday: [
      { item: "Onions", quantity: "250kg", source: "", destination: "Quickmart" },
      { item: "Green Peas", quantity: "150kg", source: "", destination: "Farmers Choice" }
    ],
    upcomingPickups: [
      { date: "2025-02-05", item: "Onions", quantity: "300kg", client: "Quickmart" },
      { date: "2025-02-06", item: "Green Peas", quantity: "200kg", client: "Farmers Choice" }
    ],
    alerts: ["Temperature above threshold"],
    temperatureHistory: [4.0, 4.2, 4.5, 4.8, 5.0, 5.0],
    isActive: true,
    targetTemp: 4
  }
];

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    product: "Potatoes",
    quantity: "1000 kg",
    location: "Meru Coldroom",
    farmer: "John Mutua",
    dateReceived: "2025-02-01",
    expiryDate: "2025-02-10",
    status: "fresh"
  },
  {
    id: "2",
    product: "Carrots",
    quantity: "500 kg",
    location: "Meru Coldroom",
    farmer: "Mary Wanjiku",
    dateReceived: "2025-02-02",
    expiryDate: "2025-02-07",
    status: "expiring-soon"
  },
  {
    id: "3",
    product: "Cabbages",
    quantity: "800 kg",
    location: "Nyeri Coldroom",
    farmer: "Peter Kamau",
    dateReceived: "2025-02-01",
    expiryDate: "2025-02-06",
    status: "expiring-soon"
  },
  {
    id: "4",
    product: "Tomatoes",
    quantity: "400 kg",
    location: "Nyeri Coldroom",
    farmer: "Sarah Njeri",
    dateReceived: "2025-02-03",
    expiryDate: "2025-02-05",
    status: "expired"
  },
  {
    id: "5",
    product: "Onions",
    quantity: "600 kg",
    location: "Nakuru Coldroom",
    farmer: "James Omondi",
    dateReceived: "2025-02-02",
    expiryDate: "2025-02-09",
    status: "fresh"
  }
];

export default function DashboardPage() {
  const [rooms, setRooms] = useState<ColdRoom[]>(mockRooms);
  
  const maintenanceSchedule = [
    { room: "Cold Room #1", date: "2024-02-10", type: "Regular Check" },
    { room: "Cold Room #2", date: "2024-02-15", type: "Deep Cleaning" },
    { room: "Cold Room #3", date: "2024-02-20", type: "Temperature Calibration" },
  ]

  const getTrendIcon = (trend: RoomTrend) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: RoomStatus): "destructive" | "secondary" => {
    switch (status) {
      case 'alert':
        return 'destructive';
      case 'warning':
      case 'normal':
        return 'secondary';
    }
  };

  const toggleRoomPower = (roomId: number) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, isActive: !room.isActive }
          : room
      )
    );
  };

  const getTemperatureColor = (temp: number, target: number): string => {
    const diff = Math.abs(temp - target);
    if (diff <= 1) return 'text-green-500';
    if (diff <= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCapacityColor = (capacity: number): string => {
    if (capacity < 70) return 'bg-green-500';
    if (capacity < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "fresh":
        return <Badge className="bg-green-500 hover:bg-green-600">Fresh</Badge>
      case "expiring-soon":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Expiring Soon</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Cold Room Status</h1>
          <p className="text-sm text-muted-foreground">Real-time monitoring dashboard</p>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      {mockRooms.some(room => room.status === 'alert') && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Temperature Alert</AlertTitle>
          <AlertDescription>
            {mockRooms.find(room => room.status === 'alert')?.alerts[0]}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Dialog key={room.id}>
            <DialogTrigger asChild>
              <Card className={cn(
                "cursor-pointer transition-all hover:shadow-md", 
                !room.isActive && 'opacity-75'
              )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium">{room.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{room.location}</p>
                  </div>
                  <Badge variant={room.isActive ? getStatusColor(room.status) : 'secondary'}>
                    {room.isActive ? (room.status === 'alert' ? 'Alert' : 'Normal') : 'Inactive'}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Temperature</span>
                        <span className={cn(
                          "font-medium",
                          room.isActive ? getTemperatureColor(room.temperature, room.targetTemp) : ''
                        )}>
                          {room.temperature}°C
                        </span>
                      </div>
                      {room.isActive && getTrendIcon(room.trend)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Capacity Usage</span>
                        <span className="font-medium">{room.capacity}%</span>
                      </div>
                      <Progress 
                        value={room.capacity} 
                        className={cn("h-1", getCapacityColor(room.capacity))} 
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Last checked: {room.lastUpdated}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <div className="absolute right-4 top-4">
                <DialogClose className="rounded-full hover:bg-accent p-2">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-semibold">{room.name}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {room.location}
                </DialogDescription>
              </div>
              
              <div className="grid gap-6">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-4">Status Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Temperature</span>
                      <span className="font-medium">{room.temperature}°C</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Capacity Usage</span>
                        <span className="font-medium">{room.capacity}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all" 
                          style={{ width: `${room.capacity}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Checked</span>
                      <span className="font-medium">{room.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-4">Critical Items</h3>
                  <div className="space-y-3">
                    {room.criticalItems.map((item, i) => (
                      <div key={i} className="bg-red-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                          </div>
                          <p className="text-red-500 text-sm">Expires in {item.expiresIn} days</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-4">Today's Incoming</h3>
                    <div className="space-y-4">
                      {room.incomingToday.map((movement, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium">{movement.item}</p>
                            <p className="text-sm font-medium">{movement.quantity}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Farmer: {movement.source}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-4">Today's Outgoing</h3>
                    <div className="space-y-4">
                      {room.outgoingToday.map((movement, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium">{movement.item}</p>
                            <p className="text-sm font-medium">{movement.quantity}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Client: {movement.destination}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-4">Upcoming Pickups</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Client</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {room.upcomingPickups.map((pickup, i) => (
                        <TableRow key={i}>
                          <TableCell>{pickup.date}</TableCell>
                          <TableCell className="font-medium">{pickup.item}</TableCell>
                          <TableCell>{pickup.quantity}</TableCell>
                          <TableCell>{pickup.client}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center gap-2">
            <ThermometerSnowflake className="h-4 w-4" />
            Temperature Log
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,300 kg</div>
                  <p className="text-xs text-muted-foreground">5 different products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Fresh Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,600 kg</div>
                  <p className="text-xs text-muted-foreground">2 products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,300 kg</div>
                  <p className="text-xs text-muted-foreground">2 products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Expired</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">400 kg</div>
                  <p className="text-xs text-muted-foreground">1 product</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-8" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="fresh">Fresh</SelectItem>
                      <SelectItem value="expiring">Expiring Soon</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Quantity
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Date Received</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInventory.map((item) => (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <TableRow className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.farmer}</TableCell>
                            <TableCell>{item.dateReceived}</TableCell>
                            <TableCell>{item.expiryDate}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                          </TableRow>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <div className="absolute right-4 top-4">
                            <DialogClose className="rounded-full hover:bg-accent p-2">
                              <X className="h-4 w-4" />
                            </DialogClose>
                          </div>
                          <div className="space-y-1">
                            <DialogTitle className="text-xl font-semibold">{item.product}</DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                              Product Details
                            </DialogDescription>
                          </div>
                          
                          <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-muted-foreground">Quantity</h3>
                                <p className="text-lg font-semibold">{item.quantity}</p>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                                <div>{getStatusBadge(item.status)}</div>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                                <p>{item.location}</p>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-muted-foreground">Farmer</h3>
                                <p>{item.farmer}</p>
                              </div>
                            </div>

                            <div className="rounded-lg border p-4">
                              <h3 className="font-semibold mb-4">Timeline</h3>
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <div>
                                    <p className="font-medium">Received</p>
                                    <p className="text-sm text-muted-foreground">{item.dateReceived}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="h-2 w-2 rounded-full bg-red-500" />
                                  <div>
                                    <p className="font-medium">Expires</p>
                                    <p className="text-sm text-muted-foreground">{item.expiryDate}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-lg border p-4">
                              <h3 className="font-semibold mb-4">Storage Conditions</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Temperature</p>
                                  <p className="font-medium">4°C</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Humidity</p>
                                  <p className="font-medium">85%</p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-lg border p-4">
                              <h3 className="font-semibold mb-4">Quality Checks</h3>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">Last Inspection</p>
                                    <p className="text-sm text-muted-foreground">2025-02-04</p>
                                  </div>
                                  <Badge variant="outline">Passed</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">Next Inspection</p>
                                    <p className="text-sm text-muted-foreground">2025-02-11</p>
                                  </div>
                                  <Badge variant="outline">Scheduled</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-4">
                              <Button variant="outline">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Generate Report
                              </Button>
                              <Button>
                                <Settings className="h-4 w-4 mr-2" />
                                Manage Product
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="rounded-md border">
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Room</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceSchedule.map((schedule) => (
                        <TableRow key={schedule.room}>
                          <TableCell className="font-medium">{schedule.room}</TableCell>
                          <TableCell>{schedule.date}</TableCell>
                          <TableCell>{schedule.type}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Upcoming Maintenance</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="grid gap-1">
              <p className="font-medium">Cold Room #3</p>
              <p className="text-xs text-muted-foreground">Temperature Calibration</p>
            </div>
            <Badge variant="outline">Feb 20</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

