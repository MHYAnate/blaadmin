// "use client"

// import { usePathname } from "next/navigation";
// import { useHandlePush } from "@/hooks/use-handle-push";
// import { ROUTES } from "@/constant/routes";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./table";
// import { useState, useEffect, useMemo } from "react"
// import { useGetCustomerOrderHistory, useGetCustomerInfo } from "@/services/customers" // Assuming hooks are in this path
// import {
//   Eye,
//   Trash2,
//   Calendar,
//   MapPin,
//   Check,
//   Loader2,
//   Edit,
//   ShoppingCart,
//   Package,
//   Clock,
//   RotateCcw,
//   ChevronRight,
//   CircleDollarSign,
//   PackageCheck,
//   Truck,
// } from "lucide-react"

// // --- TYPE DEFINITIONS ---
// interface OrderItem {
//   category: string
//   id: number
//   image: string
//   manufacturer: string
//   price: number
//   productId: number
//   productName: string
//   quantity: number
//   selectedOption: string
// }

// interface Order {
//   id: number
//   orderReference: string
//   status: string
//   totalPrice: number
//   createdAt: string
//   updatedAt: string
//   items: OrderItem[]
//   latestTimeline: {
//     action: string
//     createdAt: string
//     details: any
//     id: number
//     orderId: number
//     status: string
//   }
//   shipping: {
//     createdAt: string
//     distance: number
//     distanceFee: number
//     id: number
//     orderId: number
//     paymentType: string
//     totalShippingFee: number
//     totalWeight: number
//     updatedAt: string
//     weightFee: number
//   }
//   transactions: any[]
// }

// interface CustomerHistoryData {
//   customerId: number
//   summary: {
//     firstOrderDate: string
//     lastOrderDate: string
//     orderCounts: {
//       CANCELLED: number
//       DELIVERED: number
//       PENDING: number
//       PROCESSING: number
//       SCHEDULED: number
//       SHIPPED: number
//     }
//     productCounts: any
//     totalOrders: number
//     totalProducts: number
//     totalSpent: number
//   }
//   orders: Order[]
// }

// // Assuming this is the shape of the customer info response
// interface CustomerInfoData {
//     personalInfo: {
//         fullName: string;
//     };
//     customerType: string;
//     customerStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE';
// }


// // --- UI COMPONENTS ---
// type BadgeVariant = "default" | "success" | "warning" | "tertiary" | "danger";

// interface BadgeProps {
//   children: React.ReactNode
//   className?: string
//   variant?: BadgeVariant
// }

// const Badge = ({ children, className = "", variant = "default" }: BadgeProps) => {
//   const baseClasses = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"

//   const variants: Record<BadgeVariant, string> = {
//     default: "bg-gray-100 text-gray-800",
//     success: "bg-green-100 text-green-800",
//     warning: "bg-yellow-100 text-yellow-800",
//     tertiary: "bg-blue-100 text-blue-800",
//     danger: "bg-red-100 text-red-800",
//   }

//   return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>
// }

// type ButtonVariant = "default" | "outline"
// type ButtonSize = "default" | "sm"

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode
//   className?: string
//   variant?: ButtonVariant
//   size?: ButtonSize
// }

// const Button = ({ children, className = "", variant = "default", size = "default", ...props }: ButtonProps) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

//   const variants: Record<ButtonVariant, string> = {
//     default: "bg-orange-500 text-white hover:bg-orange-600",
//     outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
//   }

//   const sizes: Record<ButtonSize, string> = {
//     default: "h-10 px-4 py-2",
//     sm: "h-8 px-3 text-sm",
//   }

//   return (
//     <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
//       {children}
//     </button>
//   )
// }

// // --- HELPER FUNCTIONS ---

// const getEstimatedShippingDate = (createdAt: string) => {
//   if (!createdAt) return "N/A"
//   const date = new Date(createdAt)
//   date.setDate(date.getDate() + 5) // Assuming 5 days for shipping
//   return date.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   })
// }

// const getProgressSteps = (status: string) => {
//   const steps = [
//     { name: "Order Confirming", status: "pending" },
//     { name: "Payment Pending", status: "pending" },
//     { name: "Processing", status: "pending" },
//     { name: "Shipping", status: "pending" },
//     { name: "Delivered", status: "pending" },
//   ]

//   const statusMap: { [key: string]: string[] } = {
//     PENDING: ["completed", "current", "pending", "pending", "pending"],
//     PROCESSING: ["completed", "completed", "current", "pending", "pending"],
//     SHIPPED: ["completed", "completed", "completed", "current", "pending"],
//     DELIVERED: ["completed", "completed", "completed", "completed", "completed"],
//     COMPLETED: ["completed", "completed", "completed", "completed", "completed"],
//     CANCELLED: ["pending", "pending", "pending", "pending", "pending"],
//   };

//   const stepStatuses = statusMap[status.toUpperCase()] || statusMap.PENDING;
//   return steps.map((step, index) => ({ ...step, status: stepStatuses[index] }));
// }

// const getTimelineEvents = (order: Order) => {
//     if (!order) return [];
    
//     const events = [];

//     // Event 1: Order Created
//     events.push({
//         id: 1,
//         title: "Order Created",
//         description: `Your order ${order.orderReference} has been placed.`,
//         status: "completed",
//         icon: <Package className="w-5 h-5" />,
//         timestamp: new Date(order.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
//     });

//     // Event 2: Payment
//     events.push({
//         id: 2,
//         title: "Payment Received",
//         description: "Payment confirmed successfully via " + order.shipping.paymentType.replace("_", " "),
//         status: "completed",
//         icon: <CircleDollarSign className="w-5 h-5" />,
//         timestamp: new Date(order.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
//         badge: { label: "PAID" },
//     });

//     // Event 3: Processing
//     if (["PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status.toUpperCase())) {
//         events.push({
//             id: 3,
//             title: "Order Processed",
//             description: "Your items are being prepared for shipping.",
//             status: "completed",
//             icon: <PackageCheck className="w-5 h-5" />,
//             timestamp: new Date(order.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
//         });
//     }

//     // Event 4: Shipped
//     if (["SHIPPED", "DELIVERED"].includes(order.status.toUpperCase())) {
//          events.push({
//             id: 4,
//             title: "Order Shipped",
//             description: "Your package is on the way.",
//             status: "completed",
//             icon: <Truck className="w-5 h-5" />,
//             timestamp: new Date(order.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
//             action: { variant: "default", icon: <MapPin className="w-4 h-4 mr-1" />, label: "Track Package" }
//         });
//     }

//     // Event 5: Delivered
//     if (order.status.toUpperCase() === "DELIVERED") {
//         events.push({
//             id: 5,
//             title: "Order Delivered",
//             description: "Your package has been delivered.",
//             status: "completed",
//             icon: <Check className="w-5 h-5" />,
//             timestamp: new Date(order.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
//             badge: { label: "DELIVERED" }
//         });
//     }

//     return events.reverse(); // Show most recent first
// };


// // --- MAIN COMPONENT ---
// // interface CustomerDashboardProps {
// //     customerId: string | number;
// // }

// export default function CustomerDashboard() {
//   const { getCustomerOrderHistoryIsLoading, getCustomerOrderHistoryData, setCustomerOrderHistoryFilter } = useGetCustomerOrderHistory()
//   const { getCustomerInfoIsLoading, getCustomerInfoData, setCustomerInfoFilter } = useGetCustomerInfo()


//   console.log("getCustomerOrderHistoryData",getCustomerOrderHistoryData,"getCustomerInfoData",getCustomerInfoData)

//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

//   const handleProductClick = (order: Order) => {
//     setSelectedOrder(order);
//   };

//     const getStatusAppearance = (status: string) => {
//        switch (status?.toUpperCase()) {
//          case "COMPLETED":
//          case "DELIVERED":
//            return {
//              color: "bg-green-100 text-green-800",
//              icon: <Check className="w-4 h-4" />,
//            };
//          case "PROCESSING":
//            return {
//              color: "bg-yellow-100 text-yellow-800",
//              icon: <Loader2 className="w-4 h-4 animate-spin" />,
//            };
//          case "PENDING":
//            return {
//              color: "bg-gray-100 text-gray-800",
//              icon: <Clock className="w-4 h-4" />,
//            };
//          case "SCHEDULED":
//            return {
//              color: "bg-blue-100 text-blue-800",
//              icon: <Calendar className="w-4 h-4" />,
//            };
//          case "CANCELLED":
//            return {
//              color: "bg-red-100 text-red-800",
//              icon: <Trash2 className="w-4 h-4" />,
//            };
//          default:
//            return {
//              color: "bg-gray-100 text-gray-800",
//              icon: <Package className="w-4 h-4" />,
//            };
//        }
//      };

//   // const cid = "67"

//     const pathname = usePathname();
//     const cId = pathname.split("/").pop();
//     const { handlePush } = useHandlePush();
   
  
//     if (!cId) {
//       handlePush(ROUTES.ADMIN.SIDEBAR.ADMINS);
//       return null;
//     }
//   useEffect(() => {
//     if (cId) {
//       setCustomerOrderHistoryFilter(cId)
//       setCustomerInfoFilter(cId)
//     }
//   }, [cId, setCustomerOrderHistoryFilter, setCustomerInfoFilter])

//   useEffect(() => {
//     if (getCustomerOrderHistoryData?.orders && getCustomerOrderHistoryData.orders.length > 0 && !selectedOrder) {
//       setSelectedOrder(getCustomerOrderHistoryData.orders[0])
//     }
//   }, [getCustomerOrderHistoryData, selectedOrder])

//   const { orderSummary, displayOrder } = useMemo(() => {
//     if (!getCustomerOrderHistoryData?.orders?.length) {
//       return { orderSummary: null, displayOrder: null }
//     }
//     const currentOrder = selectedOrder || getCustomerOrderHistoryData.orders[0]
//     if (!currentOrder) {
//       return { orderSummary: null, displayOrder: null }
//     }
//     const subTotal = currentOrder.items.reduce((sum:any, item:any) => sum + item.price * item.quantity, 0)
//     const summary = {
//       quantity: currentOrder.items.reduce((sum:any, item:any) => sum + item.quantity, 0),
//       subTotal: subTotal,
//       shippingFee: currentOrder.shipping.totalShippingFee,
//       discount: 6000, // Hardcoded discount
//       totalAmount: currentOrder.totalPrice,
//     }
//     return { orderSummary: summary, displayOrder: currentOrder }
//   }, [selectedOrder, getCustomerOrderHistoryData])

//   const formatCurrency = (amount: number) => {
//     if (typeof amount !== "number") return "N/A"
//     return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount)
//   }

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A"
//     return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
//   }

//   if (getCustomerOrderHistoryIsLoading || getCustomerInfoIsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
//       </div>
//     )
//   }

//   if (!getCustomerOrderHistoryData || !displayOrder || !orderSummary || !getCustomerInfoData) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
//         <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
//         <h2 className="text-2xl font-semibold text-gray-700">No Order History Found</h2>
//         <p className="text-gray-500 mt-2">This customer has not placed any orders yet.</p>
//       </div>
//     )
//   }

//   const historySummary = getCustomerOrderHistoryData.summary
//   const progressSteps = getProgressSteps(displayOrder.status)
//   const timelineEvents = getTimelineEvents(displayOrder)

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <div className="mb-6">
//                 <h1 className="text-2xl font-semibold text-gray-600 mb-2">Manage orders</h1>
//               </div>
//               <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
//                 <div className="flex items-center gap-4">
//                   <h2 className="text-3xl font-bold text-gray-900">{displayOrder.orderReference}</h2>
//                   <Badge variant="success" className="font-medium px-4 py-1">PAID</Badge>
//                   <Badge variant="warning" className="font-medium px-4 py-1">In Progress</Badge>
//                 </div>
//                 <div className="flex gap-3">
//                   <Button variant="outline" className="flex items-center gap-2 px-6 py-2 border-orange-200 text-gray-600 hover:bg-orange-50">
//                     <RotateCcw className="w-4 h-4" /> Refund
//                   </Button>
//                   <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 font-medium">Edit order</Button>
//                 </div>
//               </div>
//               <div className="flex items-center text-sm text-gray-500 mb-8">
//                 <span>Order</span><ChevronRight className="w-4 h-4 mx-1" />
//                 <span>Order Details</span><ChevronRight className="w-4 h-4 mx-1" />
//                 <span>{displayOrder.orderReference}</span>
//               </div>
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Progress</h3>
//                 <div className="relative mb-8">
//                   <div className="absolute top-1 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
//                   <div className="flex justify-between relative">
//                     {progressSteps.map((step, index) => (
//                       <div key={index} className="flex flex-col items-center w-1/5">
//                         <div className={`w-full h-2 rounded-full mb-3 ${step.status === 'completed' ? 'bg-green-500' : step.status === 'current' ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
//                         <span className={`text-sm font-medium ${step.status !== 'pending' ? "text-gray-900" : "text-gray-400"}`}>{step.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar className="w-5 h-5" /><span className="font-medium">Estimated shipping date: {getEstimatedShippingDate(displayOrder.createdAt)}</span>
//                   </div>
//                   <Button className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2 px-6 py-2 font-medium">Track order <MapPin className="w-4 h-4" /></Button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Timeline</h2>
//               <div className="relative">
//                 <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
//                 <div className="space-y-8">
//                   {timelineEvents.map((event) => (
//                     <div key={event.id} className="relative flex items-start gap-6">
//                       <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-sm ${event.status === "completed" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>{event.icon}</div>
//                       <div className="flex-1 min-w-0 pb-8"><div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h3 className="text-lg font-medium text-gray-800 mb-1">{event.title}</h3>
//                             {event.description && <p className="text-sm text-gray-500 mb-3">{event.description}</p>}
//                             {event.action && <div className="mb-3"><Button variant={event.action.variant as any} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">{event.action.icon}{event.action.label}</Button></div>}
//                             {event.badge && <div className="mb-3"><Badge variant="success">{event.badge.label}</Badge></div>}
//                           </div>
//                           <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">{event.timestamp}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm">
//                <div className="overflow-x-auto">
//                  <Table className="table-fixed w-full">
//                    <TableHeader>
//                      <TableRow className="bg-gray-50 hover:bg-gray-100">
//                        <TableHead className="w-[35%] font-medium text-gray-600 p-3">
//                          Product
//                        </TableHead>
//                        <TableHead className="w-[15%] font-medium text-gray-600 p-3">
//                          Price
//                        </TableHead>
//                        <TableHead className="w-[15%] font-medium text-gray-600 p-3">
//                          Order Ref
//                        </TableHead>
//                        <TableHead className="w-[8%] font-medium text-gray-600 p-3">
//                          Qty
//                        </TableHead>
//                        <TableHead className="w-[12%] font-medium text-gray-600 p-3">
//                          Status
//                        </TableHead>
//                        <TableHead className="w-[15%] font-medium text-gray-600 p-3">
//                          Action
//                        </TableHead>
//                      </TableRow>
//                    </TableHeader>
//                    <TableBody>
//                      {getCustomerOrderHistoryData.orders.map((order: any) =>
//                        order.items.map((item: any) => (
//                          <TableRow
//                            key={`${order.id}-${item.id}`}
//                            className={`hover:bg-gray-50 border-b transition-colors ${
//                              selectedOrder?.id === order.id
//                                ? "bg-orange-50 border-l-4 border-l-orange-500"
//                                : ""
//                            }`}
//                          >
//                            <TableCell className="p-3">
//                              <div
//                                className="flex items-center gap-3 cursor-pointer group"
//                                onClick={() => handleProductClick(order)}
//                              >
//                                <img
//                                  src={item.image}
//                                  alt={item.productName}
//                                  className={`w-10 h-10 object-cover rounded-md flex-shrink-0 ${
//                                    selectedOrder?.id === order.id
//                                      ? "ring-2 ring-orange-500"
//                                      : "group-hover:ring-1 group-hover:ring-orange-300"
//                                  }`}
//                                  onError={(e) => {
//                                    (
//                                      e.target as HTMLImageElement
//                                    ).src = `https:placehold.co/40x40/f87171/ffffff?text=ERR`;
//                                  }}
//                                />
//                                <div className="min-w-0 flex-1">
//                                  <p
//                                    className={`font-medium text-sm truncate ${
//                                      selectedOrder?.id === order.id
//                                        ? "text-orange-600 font-semibold"
//                                        : "text-gray-800 group-hover:text-orange-500"
//                                    }`}
//                                  >
//                                    {item.productName}
//                                    {selectedOrder?.id === order.id && (
//                                      <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
//                                        Selected
//                                      </span>
//                                    )}
//                                  </p>
//                                  <p className="text-xs text-gray-500 truncate">
//                                    {item.manufacturer}
//                                  </p>
//                                </div>
//                              </div>
//                            </TableCell>
//                            <TableCell className="p-3 font-medium text-gray-800 text-sm">
//                              {formatCurrency(item.price)}
//                            </TableCell>
//                            <TableCell className="p-3 font-medium text-gray-800 text-sm">
//                              {order.orderReference}
//                            </TableCell>
//                            <TableCell className="p-3 font-medium text-gray-800 text-sm">
//                              {item.quantity}
//                            </TableCell>
//                            <TableCell className="p-3">
//                              <Badge
//                                className={`${
//                                  getStatusAppearance(order.status).color
//                                } text-[0.400rem] px-2 py-1`}
//                              >
//                                {order.status}
//                              </Badge>
//                            </TableCell>
//                            <TableCell className="p-3">
//                              <div className="flex items-center gap-1">
//                                <div
//                                  className="h-8 w-8 flex items-center justify-center bg-[#27A376] rounded-lg"
//                                  onClick={() => setSelectedOrder(order)}
//                                >
//                                  <Eye className="w-4 h-4 text-white" />
//                                </div>
//                                <div
//                                  onClick={() => {}}
//                                  className="h-8 w-8 flex items-center justify-center bg-[#E03137] rounded-lg cursor-pointer"
//                                >
//                                  <Trash2 className="w-4 h-4 text-white" />
//                                </div>
//                              </div>
//                            </TableCell>
//                          </TableRow>
//                        ))
//                      )}
//                    </TableBody>
//                  </Table>
//                </div>
//              </div>
//             </div>    

//           {/* Right Column */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Customer Profile</h3>
//                 <button className="text-gray-400 hover:text-gray-600"><Edit className="w-4 h-4" /></button>
//               </div>
//               <div className="flex flex-col items-center text-center mb-6">
//                 <img src="/images/user-avatar.jpg" alt={getCustomerInfoData.personalInfo.fullName} className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-orange-200" />
//                 <h3 className="text-xl font-semibold text-gray-800 mb-1">{getCustomerInfoData.personalInfo.fullName}</h3>
//                 <p className="text-gray-500 text-sm mb-2 capitalize">{getCustomerInfoData.customerType}</p>
//                 <Badge variant={getCustomerInfoData.customerStatus.toLowerCase() as BadgeVariant} className="py-1 px-[26px] font-medium">{getCustomerInfoData.customerStatus}</Badge>
//               </div>
//               <div className="space-y-4 text-sm border-t pt-4">
//                 <div className="flex justify-between items-center"><span className="text-gray-500">First Order:</span><span className="font-medium text-gray-800">{formatDate(historySummary.firstOrderDate)}</span></div>
//                 <div className="flex justify-between items-center"><span className="text-gray-500">Last Order:</span><span className="font-medium text-gray-800">{formatDate(historySummary.lastOrderDate)}</span></div>
//               </div>
//               <div className="mt-6 border-t pt-4">
//                 <h4 className="text-md font-medium text-gray-800 mb-4">Lifetime Summary</h4>
//                 <div className="grid grid-cols-2 gap-4 text-center">
//                   <div><p className="text-xl font-bold text-orange-500">{historySummary.totalOrders}</p><p className="text-xs text-gray-500">Total Orders</p></div>
//                   <div><p className="text-xl font-bold text-orange-500">{formatCurrency(historySummary.totalSpent)}</p><p className="text-xs text-gray-500">Total Spent</p></div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h4 className="text-md font-medium text-gray-800 mb-4">Summary for {displayOrder.orderReference}</h4>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between"><span className="text-gray-500">Quantity:</span><span className="font-medium text-gray-800">{orderSummary.quantity}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-500">Sub Total</span><span className="font-medium text-gray-800">{formatCurrency(orderSummary.subTotal)}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-500">Shipping Fee:</span><span className="font-medium text-gray-800">{formatCurrency(orderSummary.shippingFee)}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-500">Discount</span><span className="font-medium text-red-500">-{formatCurrency(orderSummary.discount)}</span></div>
//                 <div className="border-t pt-3 mt-2"><div className="flex justify-between"><span className="font-medium text-gray-800 text-base">Total Amount:</span><span className="font-bold text-gray-800 text-lg">{formatCurrency(orderSummary.totalAmount)}</span></div></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { usePathname } from "next/navigation";
import { useHandlePush } from "@/hooks/use-handle-push";
import { ROUTES } from "@/constant/routes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useState, useEffect, useMemo } from "react"
import { useGetCustomerOrderHistory, useGetCustomerInfo } from "@/services/customers" // Assuming hooks are in this path
import {
  Eye,
  Trash2,
  Calendar,
  MapPin,
  Check,
  Loader2,
  Edit,
  ShoppingCart,
  Package,
  Clock,
  RotateCcw,
  ChevronRight,
  CircleDollarSign,
  PackageCheck,
  Truck,
  User,
  Phone,
  Mail,
} from "lucide-react"

// --- TYPE DEFINITIONS ---
interface OrderItem {
  category: string
  id: number
  image: string
  manufacturer: string
  price: number
  productId: number
  productName: string
  quantity: number
  selectedOption: string
}

interface Order {
  id: number
  orderReference: string
  status: string
  totalPrice: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  latestTimeline: {
    action: string
    createdAt: string
    details: any
    id: number
    orderId: number
    status: string
  }
  shipping: {
    createdAt: string
    distance: number
    distanceFee: number
    id: number
    orderId: number
    paymentType: string
    totalShippingFee: number
    totalWeight: number
    updatedAt: string
    weightFee: number
  }
  transactions: any[]
}

interface CustomerHistoryData {
  customerId: number
  summary: {
    firstOrderDate: string
    lastOrderDate: string
    orderCounts: {
      CANCELLED: number
      DELIVERED: number
      PENDING: number
      PROCESSING: number
      SCHEDULED: number
      SHIPPED: number
    }
    productCounts: any
    totalOrders: number
    totalProducts: number
    totalSpent: number
  }
  orders: Order[]
}

// Assuming this is the shape of the customer info response
interface CustomerInfoData {
    personalInfo: {
        fullName: string;
        email?: string;
        phoneNumber?: string;
    };
    customerType: string;
    customerStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE';
    shippingAddress?: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        stateProvince: string;
        country: string;
        postalCode: string;
        fullAddress: string;
    };
}


// --- UI COMPONENTS ---
type BadgeVariant = "default" | "success" | "warning" | "tertiary" | "danger";

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: BadgeVariant
}

const Badge = ({ children, className = "", variant = "default" }: BadgeProps) => {
  const baseClasses = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"

  const variants: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    tertiary: "bg-blue-100 text-blue-800",
    danger: "bg-red-100 text-red-800",
  }

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>
}

type ButtonVariant = "default" | "outline"
type ButtonSize = "default" | "sm"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = ({ children, className = "", variant = "default", size = "default", ...props }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants: Record<ButtonVariant, string> = {
    default: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  }

  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// --- HELPER FUNCTIONS ---

const getEstimatedShippingDate = (createdAt: string) => {
  if (!createdAt) return "N/A"
  const date = new Date(createdAt)
  date.setDate(date.getDate() + 5) // Assuming 5 days for shipping
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const getProgressSteps = (status: string) => {
  const steps = [
    { name: "Order Confirming", status: "pending" },
    { name: "Payment Pending", status: "pending" },
    { name: "Processing", status: "pending" },
    { name: "Shipping", status: "pending" },
    { name: "Delivered", status: "pending" },
  ]

  const statusMap: { [key: string]: string[] } = {
    PENDING: ["completed", "current", "pending", "pending", "pending"],
    SCHEDULED: ["completed", "completed", "current", "pending", "pending"],
    PROCESSING: ["completed", "completed", "current", "pending", "pending"],
    SHIPPED: ["completed", "completed", "completed", "current", "pending"],
    DELIVERED: ["completed", "completed", "completed", "completed", "completed"],
    COMPLETED: ["completed", "completed", "completed", "completed", "completed"],
    CANCELLED: ["pending", "pending", "pending", "pending", "pending"],
  };

  const stepStatuses = statusMap[status.toUpperCase()] || statusMap.PENDING;
  return steps.map((step, index) => ({ ...step, status: stepStatuses[index] }));
}

const getTimelineEvents = (order: Order) => {
    if (!order) return [];
    
    const events = [];

    // Event 1: Order Created
    events.push({
        id: 1,
        title: "Order Created",
        description: `Your order ${order.orderReference} has been placed.`,
        status: "completed",
        icon: <Package className="w-5 h-5" />,
        timestamp: new Date(order.createdAt).toLocaleString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric",
            hour: "2-digit", 
            minute: "2-digit" 
        }),
    });

    // Event 2: Payment Processing/Confirmed
    if (order.transactions.length > 0) {
        events.push({
            id: 2,
            title: "Payment Confirmed",
            description: `Payment of ${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(order.totalPrice)} confirmed successfully`,
            status: "completed",
            icon: <CircleDollarSign className="w-5 h-5" />,
            timestamp: new Date(order.transactions[0].createdAt || order.createdAt).toLocaleString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit" 
            }),
            badge: { label: "PAID" },
        });
    } else if (["PENDING", "SCHEDULED"].includes(order.status.toUpperCase())) {
        events.push({
            id: 2,
            title: "Payment Pending",
            description: "Waiting for payment confirmation",
            status: "pending",
            icon: <Clock className="w-5 h-5" />,
            timestamp: new Date(order.createdAt).toLocaleString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit" 
            }),
        });
    }

    // Event 3: Processing
    if (["PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"].includes(order.status.toUpperCase())) {
        events.push({
            id: 3,
            title: "Order Processing",
            description: "Your items are being prepared for shipping.",
            status: "completed",
            icon: <PackageCheck className="w-5 h-5" />,
            timestamp: new Date(order.latestTimeline?.createdAt || order.updatedAt).toLocaleString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit" 
            }),
        });
    }

    // Event 4: Shipped
    if (["SHIPPED", "DELIVERED", "COMPLETED"].includes(order.status.toUpperCase())) {
         events.push({
            id: 4,
            title: "Order Shipped",
            description: "Your package is on the way.",
            status: "completed",
            icon: <Truck className="w-5 h-5" />,
            timestamp: new Date(order.updatedAt).toLocaleString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit" 
            }),
            action: { variant: "default", icon: <MapPin className="w-4 h-4 mr-1" />, label: "Track Package" }
        });
    }

    // Event 5: Delivered
    if (["DELIVERED", "COMPLETED"].includes(order.status.toUpperCase())) {
        events.push({
            id: 5,
            title: "Order Delivered",
            description: "Your package has been delivered successfully.",
            status: "completed",
            icon: <Check className="w-5 h-5" />,
            timestamp: new Date(order.updatedAt).toLocaleString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit" 
            }),
            badge: { label: "DELIVERED" }
        });
    }

    return events.reverse(); // Show most recent first
};


// --- MAIN COMPONENT ---
export default function CustomerDashboard() {
  const { getCustomerOrderHistoryIsLoading, getCustomerOrderHistoryData, setCustomerOrderHistoryFilter } = useGetCustomerOrderHistory()
  const { getCustomerInfoIsLoading, getCustomerInfoData, setCustomerInfoFilter } = useGetCustomerInfo()

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleProductClick = (order: Order) => {
    setSelectedOrder(order);
  };

    const getStatusAppearance = (status: string) => {
       switch (status?.toUpperCase()) {
         case "COMPLETED":
         case "DELIVERED":
           return {
             color: "bg-green-100 text-green-800",
             icon: <Check className="w-4 h-4" />,
           };
         case "PROCESSING":
           return {
             color: "bg-yellow-100 text-yellow-800",
             icon: <Loader2 className="w-4 h-4 animate-spin" />,
           };
         case "PENDING":
           return {
             color: "bg-gray-100 text-gray-800",
             icon: <Clock className="w-4 h-4" />,
           };
         case "SCHEDULED":
           return {
             color: "bg-blue-100 text-blue-800",
             icon: <Calendar className="w-4 h-4" />,
           };
         case "CANCELLED":
           return {
             color: "bg-red-100 text-red-800",
             icon: <Trash2 className="w-4 h-4" />,
           };
         default:
           return {
             color: "bg-gray-100 text-gray-800",
             icon: <Package className="w-4 h-4" />,
           };
       }
     };

    const pathname = usePathname();
    const cId = pathname.split("/").pop();
    const { handlePush } = useHandlePush();
   
  
    if (!cId) {
      handlePush(ROUTES.ADMIN.SIDEBAR.ADMINS);
      return null;
    }
  useEffect(() => {
    if (cId) {
      setCustomerOrderHistoryFilter(cId)
      setCustomerInfoFilter(cId)
    }
  }, [cId, setCustomerOrderHistoryFilter, setCustomerInfoFilter])

  useEffect(() => {
    if (getCustomerOrderHistoryData?.orders && getCustomerOrderHistoryData.orders.length > 0 && !selectedOrder) {
      setSelectedOrder(getCustomerOrderHistoryData.orders[0])
    }
  }, [getCustomerOrderHistoryData, selectedOrder])

  const { orderSummary, displayOrder } = useMemo(() => {
    if (!getCustomerOrderHistoryData?.orders?.length) {
      return { orderSummary: null, displayOrder: null }
    }
    const currentOrder = selectedOrder || getCustomerOrderHistoryData.orders[0]
    if (!currentOrder) {
      return { orderSummary: null, displayOrder: null }
    }
    const subTotal = currentOrder.items.reduce((sum:any, item:any) => sum + item.price * item.quantity, 0)
    const shippingFee = currentOrder.shipping?.totalShippingFee || 0
    const discount = 0 // Based on data structure, no discount field found
    const totalAmount = currentOrder.totalPrice
    
    const summary = {
      quantity: currentOrder.items.reduce((sum:any, item:any) => sum + item.quantity, 0),
      subTotal: subTotal,
      shippingFee: shippingFee,
      discount: discount,
      totalAmount: totalAmount,
      tax: totalAmount - subTotal - shippingFee + discount, // Calculate tax as remaining amount
    }
    return { orderSummary: summary, displayOrder: currentOrder }
  }, [selectedOrder, getCustomerOrderHistoryData])

  const formatCurrency = (amount: number) => {
    if (typeof amount !== "number") return "₦0"
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (getCustomerOrderHistoryIsLoading || getCustomerInfoIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    )
  }

  if (!getCustomerOrderHistoryData || !displayOrder || !orderSummary || !getCustomerInfoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">No Order History Found</h2>
        <p className="text-gray-500 mt-2">This customer has not placed any orders yet.</p>
      </div>
    )
  }

  const historySummary = getCustomerOrderHistoryData.summary
  const progressSteps = getProgressSteps(displayOrder.status)
  const timelineEvents = getTimelineEvents(displayOrder)

  // Get shipping address from the selected order or customer info
  const shippingAddress = displayOrder.latestTimeline?.details?.shippingAddress || getCustomerInfoData.shippingAddress

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-600 mb-2">Manage orders</h1>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">{displayOrder.orderReference}</h2>
                  <Badge 
                    variant={displayOrder.transactions.length > 0 ? "success" : "warning"} 
                    className="font-medium px-4 py-1"
                  >
                    {displayOrder.transactions.length > 0 ? "PAID" : "UNPAID"}
                  </Badge>
                  <Badge 
                    variant={
                      displayOrder.status.toUpperCase() === "DELIVERED" || displayOrder.status.toUpperCase() === "COMPLETED" 
                        ? "success" 
                        : displayOrder.status.toUpperCase() === "PROCESSING" 
                        ? "warning" 
                        : "tertiary"
                    } 
                    className="font-medium px-4 py-1"
                  >
                    {displayOrder.status.toUpperCase() === "COMPLETED" ? "DELIVERED" : 
                     displayOrder.status.toUpperCase() === "PROCESSING" ? "In Progress" : 
                     displayOrder.status}
                  </Badge>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2 px-6 py-2 border-orange-200 text-gray-600 hover:bg-orange-50">
                    <RotateCcw className="w-4 h-4" /> Refund
                  </Button>
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 font-medium">Edit order</Button>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-8">
                <span>Order</span><ChevronRight className="w-4 h-4 mx-1" />
                <span>Order Details</span><ChevronRight className="w-4 h-4 mx-1" />
                <span>{displayOrder.orderReference}</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Progress</h3>
                <div className="relative mb-8">
                  <div className="absolute top-1 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
                  <div className="flex justify-between relative">
                    {progressSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center w-1/5">
                        <div className={`w-full h-2 rounded-full mb-3 ${step.status === 'completed' ? 'bg-green-500' : step.status === 'current' ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                        <span className={`text-sm font-medium ${step.status !== 'pending' ? "text-gray-900" : "text-gray-400"}`}>{step.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">
                      Estimated shipping date: {displayOrder.latestTimeline?.details?.scheduledDate 
                        ? new Date(displayOrder.latestTimeline.details.scheduledDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                        : getEstimatedShippingDate(displayOrder.createdAt)
                      }
                    </span>
                  </div>
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2 px-6 py-2 font-medium">
                    Track order <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Timeline</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {timelineEvents.map((event) => (
                    <div key={event.id} className="relative flex items-start gap-6">
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-sm ${event.status === "completed" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                        {event.icon}
                      </div>
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-800 mb-1">{event.title}</h3>
                            {event.description && <p className="text-sm text-gray-500 mb-3">{event.description}</p>}
                            {event.action && (
                              <div className="mb-3">
                                <Button variant={event.action.variant as any} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                  {event.action.icon}{event.action.label}
                                </Button>
                              </div>
                            )}
                            {event.badge && (
                              <div className="mb-3">
                                <Badge variant="success">{event.badge.label}</Badge>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">{event.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
               <div className="overflow-x-auto">
                 <Table className="table-fixed w-full">
                   <TableHeader>
                     <TableRow className="bg-gray-50 hover:bg-gray-100">
                       <TableHead className="w-[35%] font-medium text-gray-600 p-3">
                         Product Name
                       </TableHead>
                       <TableHead className="w-[15%] font-medium text-gray-600 p-3">
                         Amount
                       </TableHead>
                       <TableHead className="w-[15%] font-medium text-gray-600 p-3">
                         Order ID
                       </TableHead>
                       <TableHead className="w-[8%] font-medium text-gray-600 p-3">
                         QTY
                       </TableHead>
                       <TableHead className="w-[12%] font-medium text-gray-600 p-3">
                         Order Status
                       </TableHead>
                       <TableHead className="w-[15%] font-medium text-gray-600 p-3">
                         Action
                       </TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {getCustomerOrderHistoryData.orders.map((order: any) =>
                       order.items.map((item: any) => (
                         <TableRow
                           key={`${order.id}-${item.id}`}
                           className={`hover:bg-gray-50 border-b transition-colors ${
                             selectedOrder?.id === order.id
                               ? "bg-orange-50 border-l-4 border-l-orange-500"
                               : ""
                           }`}
                         >
                           <TableCell className="p-3">
                             <div
                               className="flex items-center gap-3 cursor-pointer group"
                               onClick={() => handleProductClick(order)}
                             >
                               <img
                                 src={item.image || "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"}
                                 alt={item.productName}
                                 className={`w-10 h-10 object-cover rounded-md flex-shrink-0 ${
                                   selectedOrder?.id === order.id
                                     ? "ring-2 ring-orange-500"
                                     : "group-hover:ring-1 group-hover:ring-orange-300"
                                 }`}
                                 onError={(e) => {
                                   (
                                     e.target as HTMLImageElement
                                   ).src = `https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg`;
                                 }}
                               />
                               <div className="min-w-0 flex-1">
                                 <p
                                   className={`font-medium text-sm truncate ${
                                     selectedOrder?.id === order.id
                                       ? "text-orange-600 font-semibold"
                                       : "text-gray-800 group-hover:text-orange-500"
                                   }`}
                                 >
                                   {item.productName}
                                   {selectedOrder?.id === order.id && (
                                     <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                                       Selected
                                     </span>
                                   )}
                                 </p>
                                 <p className="text-xs text-gray-500 truncate">
                                   {item.manufacturer}
                                 </p>
                               </div>
                             </div>
                           </TableCell>
                           <TableCell className="p-3 font-medium text-gray-800 text-sm">
                             {formatCurrency(item.price * item.quantity)}
                           </TableCell>
                           <TableCell className="p-3 font-medium text-gray-800 text-sm">
                             #{order.id}
                           </TableCell>
                           <TableCell className="p-3 font-medium text-gray-800 text-sm">
                             {item.quantity}
                           </TableCell>
                           <TableCell className="p-3">
                             <Badge
                               className={`${
                                 getStatusAppearance(order.status).color
                               } text-[0.456rem] px-2 py-1 font-extrabold`}
                             >
                               {order.status.toUpperCase()}
                             </Badge>
                           </TableCell>
                           <TableCell className="p-3">
                             <div className="flex items-center gap-1">
                               <button
                                 className="h-8 w-8 flex items-center justify-center bg-[#27A376] rounded-lg hover:bg-green-600 transition-colors"
                                 onClick={() => setSelectedOrder(order)}
                               >
                                 <Eye className="w-4 h-4 text-white" />
                               </button>
                               <button
                                 onClick={() => {}}
                                 className="h-8 w-8 flex items-center justify-center bg-[#E03137] rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                               >
                                 <Trash2 className="w-4 h-4 text-white" />
                               </button>
                             </div>
                           </TableCell>
                         </TableRow>
                       ))
                     )}
                   </TableBody>
                 </Table>
               </div>
             </div>
            </div>    

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Customer Profile</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-3 border-2 border-orange-200">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{getCustomerInfoData.personalInfo.fullName}</h3>
                <p className="text-gray-500 text-sm mb-2 capitalize">{getCustomerInfoData.customerType.toLowerCase()}</p>
                <Badge 
                  variant={
                    getCustomerInfoData.customerStatus.toLowerCase() === 'active' ? 'success' : 
                    getCustomerInfoData.customerStatus.toLowerCase() === 'pending' ? 'warning' : 
                    'danger'
                  } 
                  className="py-1 px-[26px] font-medium"
                >
                  {getCustomerInfoData.customerStatus}
                </Badge>
              </div>
              <div className="space-y-4 text-sm border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">First Order:</span>
                  <span className="font-medium text-gray-800">{formatDate(historySummary.firstOrderDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Last Order:</span>
                  <span className="font-medium text-gray-800">{formatDate(historySummary.lastOrderDate)}</span>
                </div>
              </div>
              <div className="mt-6 border-t pt-4">
                <h4 className="text-md font-medium text-gray-800 mb-4">Lifetime Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-orange-500">{historySummary.totalOrders}</p>
                    <p className="text-xs text-gray-500">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-500">{formatCurrency(historySummary.totalSpent)}</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            {shippingAddress && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Primary address:</span>
                    <span className="font-medium text-gray-800 text-right max-w-[180px]">
                      {shippingAddress.fullAddress || `${shippingAddress.addressLine1}, ${shippingAddress.city}, ${shippingAddress.stateProvince}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">City:</span>
                    <span className="font-medium text-gray-800">{shippingAddress.city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">State/Province:</span>
                    <span className="font-medium text-gray-800">{shippingAddress.stateProvince}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Country:</span>
                    <span className="font-medium text-gray-800">{shippingAddress.country}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Post Code:</span>
                    <span className="font-medium text-gray-800">{shippingAddress.postalCode}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-md font-medium text-gray-800 mb-4">Order Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-medium text-gray-800">{orderSummary.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sub Total:</span>
                  <span className="font-medium text-gray-800">{formatCurrency(orderSummary.subTotal)}</span>
                </div>
                {orderSummary.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(orderSummary.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Fee:</span>
                  <span className="font-medium text-gray-800">{formatCurrency(orderSummary.shippingFee)}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount:</span>
                    <span className="font-medium text-red-500">-{formatCurrency(orderSummary.discount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 text-base">Total Amount:</span>
                    <span className="font-bold text-gray-800 text-lg">{formatCurrency(orderSummary.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}