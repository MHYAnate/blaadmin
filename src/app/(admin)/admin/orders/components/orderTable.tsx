// "use client"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Eye, Trash2, ChevronDown } from "lucide-react"

// const orderData = [
//   {
//     id: 1,
//     name: "Mirabel Okon",
//     email: "mirabel@gmail.com",
//     avatar: "/placeholder.svg?height=40&width=40&text=MO",
//     customerType: "Business Owner",
//     amount: "NGN68,000.00",
//     productName: "Nescafe Classic Coffee",
//     productBrand: "Nescafe",
//     productImage: "/placeholder.svg?height=40&width=40&text=Coffee",
//     orderId: "#908765",
//     status: "DELIVERED",
//     statusColor: "green",
//   },
//   {
//     id: 2,
//     name: "Hanna Baptista",
//     email: "hanna@gmail.com",
//     avatar: "/placeholder.svg?height=40&width=40&text=HB",
//     customerType: "Individual",
//     amount: "NGN68,000.00",
//     productName: "Nescafe Classic Coffee",
//     productBrand: "Nescafe",
//     productImage: "/placeholder.svg?height=40&width=40&text=Coffee",
//     orderId: "#908345",
//     status: "ONGOING",
//     statusColor: "yellow",
//   },
//   {
//     id: 3,
//     name: "Miracle Geidt",
//     email: "miracle@gmail.com",
//     avatar: "/placeholder.svg?height=40&width=40&text=MG",
//     customerType: "Business Owner",
//     amount: "NGN68,000.00",
//     productName: "Nestle Masala Maggi",
//     productBrand: "Nestle",
//     productImage: "/placeholder.svg?height=40&width=40&text=Maggi",
//     orderId: "#671100",
//     status: "CANCELLED",
//     statusColor: "red",
//   },
//   {
//     id: 4,
//     name: "Rayna Torff",
//     email: "rayna@gmail.com",
//     avatar: "/placeholder.svg?height=40&width=40&text=RT",
//     customerType: "Individual",
//     amount: "NGN68,000.00",
//     productName: "Coca Cola Tin",
//     productBrand: "Coca Cola",
//     productImage: "/placeholder.svg?height=40&width=40&text=Coke",
//     orderId: "#390110",
//     status: "DELIVERED",
//     statusColor: "green",
//   },
// ]

// const getStatusBadge = (status: string, color: string) => {
//   const colorClasses = {
//     green: "bg-green-100 text-green-800 hover:bg-green-100",
//     yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//     red: "bg-red-100 text-red-800 hover:bg-red-100",
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <Badge className={colorClasses[color as keyof typeof colorClasses] || "bg-gray-100 text-gray-800"}>
//         {status}
//       </Badge>
//       <ChevronDown className="w-4 h-4 text-gray-400" />
//     </div>
//   )
// }

// export default function DetailedOrderTable() {
//   return (
//     <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50">
//       <div className="bg-white rounded-lg shadow-sm">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-xl font-semibold text-gray-800">Detailed Order Table</h1>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50">
//                 <TableHead className="w-12">
//                   <Checkbox />
//                 </TableHead>
//                 <TableHead className="font-medium text-gray-600">Name</TableHead>
//                 <TableHead className="font-medium text-gray-600">Customer</TableHead>
//                 <TableHead className="font-medium text-gray-600">Amount</TableHead>
//                 <TableHead className="font-medium text-gray-600">Product Name</TableHead>
//                 <TableHead className="font-medium text-gray-600">Order ID</TableHead>
//                 <TableHead className="font-medium text-gray-600">Order Status</TableHead>
//                 <TableHead className="font-medium text-gray-600">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {orderData.map((order) => (
//                 <TableRow key={order.id} className="hover:bg-gray-50">
//                   <TableCell>
//                     <Checkbox />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
//                         <img
//                           src={order.avatar || "/placeholder.svg"}
//                           alt={order.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-800">{order.name}</p>
//                         <p className="text-sm text-gray-500">{order.email}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <span className="text-gray-700">{order.customerType}</span>
//                   </TableCell>
//                   <TableCell>
//                     <span className="font-medium text-gray-800">{order.amount}</span>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded overflow-hidden bg-gray-200">
//                         <img
//                           src={order.productImage || "/placeholder.svg"}
//                           alt={order.productName}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-800">{order.productName}</p>
//                         <p className="text-sm text-gray-500">{order.productBrand}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <span className="font-medium text-gray-800">{order.orderId}</span>
//                   </TableCell>
//                   <TableCell>{getStatusBadge(order.status, order.statusColor)}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white p-2">
//                         <Eye className="w-4 h-4" />
//                       </Button>
//                       <Button size="sm" variant="destructive" className="p-2">
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, ChevronDown } from "lucide-react";
import { useGetOrders } from "@/services/orders";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "green";
    case "PROCESSING":
      return "yellow";
    case "PENDING":
      return "gray";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

const getPaymentStatus = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "PAID":
      return "Paid";
    case "PENDING":
      return "Pending";
    case "PARTIALLY_PAID":
      return "Partially Paid";
    default:
      return paymentStatus.toLowerCase().replace("_", " ");
  }
};

const getStatusBadge = (status: string) => {
  const color = getStatusColor(status);
  const colorClasses = {
    green: "bg-green-100 text-green-800 hover:bg-green-100",
    yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    red: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={
          colorClasses[color as keyof typeof colorClasses] || "bg-gray-100"
        }
      >
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </Badge>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export default function DetailedOrderTable() {
  const {
    getOrdersData: data,
    getOrdersError,
    getOrdersIsLoading,
    setOrdersFilter,
  } = useGetOrders();

  if (getOrdersIsLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (getOrdersError || !data?.success) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-red-500">
            Error loading orders: { "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  const orders = data.data || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Detailed Order Table
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="font-medium text-gray-600">Name</TableHead>
                <TableHead className="font-medium text-gray-600">
                  Customer
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Amount
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Product Name
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Order ID
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Order Status
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order:any) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700 capitalize">
                      {order.customer.type}
                    </span>
                    <p className="text-sm text-gray-500">
                      {getPaymentStatus(order.paymentStatus)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-800">
                      {order.breakdown.formatted.total}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-200">
                        <img
                          src={order.product.image}
                          alt={order.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.product.manufacturer.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-800">
                      {order.orderId}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="p-2">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}