"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, ArrowUpDown, ClipboardList, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

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

export default function InventoryPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Track and manage your produce inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

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
        <CardContent className="pb-6">
          <div className="flex items-center gap-4 mb-6">
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

