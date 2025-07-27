"use client"

 import { useState, useEffect, useMemo } from "react";
 import {
   useGetCustomerInfo,
   useGetCustomerOrderHistory,
 } from "@/services/customers";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
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
   PackageCheck,
   Truck,
   CircleDollarSign,
 } from "lucide-react";

 interface OrderItem {
   category: string;
   id: number;
   image: string;
   manufacturer: string;
   price: number;
   productId: number;
   productName: string;
   quantity: number;
   selectedOption: string;
 }

 interface Order {
   id: number;
   orderReference: string;
   status: string;
   totalPrice: number;
   createdAt: string;
   updatedAt: string;
   items: OrderItem[];
   latestTimeline: {
     action: string;
     createdAt: string;
     details: any;
     id: number;
     orderId: number;
     status: string;
   };
   shipping: {
     createdAt: string;
     distance: number;
     distanceFee: number;
     id: number;
     orderId: number;
     paymentType: string;
     totalShippingFee: number;
     totalWeight: number;
     updatedAt: string;
     weightFee: number;
   };
   transactions: any[];
 }

 interface CustomerData {
   customerId: number;
   summary: {
     firstOrderDate: string;
     lastOrderDate: string;
     orderCounts: {
       CANCELLED: number;
       DELIVERED: number;
       PENDING: number;
       PROCESSING: number;
       SCHEDULED: number;
       SHIPPED: number;
     };
     productCounts: any;
     totalOrders: number;
     totalProducts: number;
     totalSpent: number;
   };
   orders: Order[];
 }

 interface CustomerDashboardProps {
   customerId: number;
 }

 const placeholderCustomerDetails = {
   name: "Mirabel Okon",
   title: "Business Owner",
   avatarUrl:
     "https:images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   address: {
     line1: "68 Bode Thomas",
     line2: "Surulere, Lagos Nigeria.",
     city: "Lagos",
     state: "Lagos Mainland",
     country: "Nigeria",
     postalCode: "101271",
   },
 };

  // Helper to calculate estimated shipping date
 const getEstimatedShippingDate = (createdAt: string) => {
   const date = new Date(createdAt);
   date.setDate(date.getDate() + 5);  
   return date.toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 };

  // Progress steps definitions
 const getProgressSteps = (status: string) => {
   const steps = [
     { name: "Order Placed", status: "pending" },
     { name: "Processing", status: "pending" },
     { name: "Shipped", status: "pending" },
     { name: "Delivered", status: "pending" },
   ];

   switch (status.toUpperCase()) {
     case "PENDING":
       steps[0].status = "completed";
       steps[1].status = "current";
       break;
     case "PROCESSING":
       steps[0].status = "completed";
       steps[1].status = "completed";
       steps[2].status = "current";
       break;
     case "SHIPPED":
       steps[0].status = "completed";
       steps[1].status = "completed";
       steps[2].status = "completed";
       steps[3].status = "current";
       break;
     case "DELIVERED":
       steps.forEach(step => step.status = "completed");
       break;
     default:
       steps[0].status = "completed";
   }

   return steps;
 };

  // Timeline events generator
 const getTimelineEvents = (order: Order) => {
   const events = [
     {
       id: 1,
       title: "Order Created",
       description: "Your order has been placed",
       status: "completed",
       icon: <Package className="w-5 h-5" />,
       timestamp: new Date(order.createdAt).toLocaleString("en-US", {
         month: "short",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
       }),
     },
     {
       id: 2,
       title: "Payment Received",
       description: "Payment confirmed successfully",
       status: "completed",
       icon: <CircleDollarSign className="w-5 h-5" />,
       timestamp: new Date(order.createdAt).toLocaleString("en-US", {
         month: "short",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
       }),
       badge: { label: "PAID" },
     },
     {
       id: 3,
       title: "Order Processed",
       description: "Your items are being prepared for shipping",
       status: "completed",
       icon: <PackageCheck className="w-5 h-5" />,
       timestamp: new Date(order.updatedAt).toLocaleString("en-US", {
         month: "short",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
       }),
     },
     {
       id: 4,
       title: "Order Shipped",
       description: "Your package is on the way",
       status: order.status === "SHIPPED" || order.status === "DELIVERED" ? "completed" : "pending",
       icon: <Truck className="w-5 h-5" />,
       timestamp: order.status === "SHIPPED" || order.status === "DELIVERED" 
         ? new Date(order.updatedAt).toLocaleString("en-US", {
             month: "short",
             day: "numeric",
             hour: "2-digit",
             minute: "2-digit",
           })
         : "Pending",
       action: order.status === "PROCESSING" ? {
         variant: "default",
         icon: <MapPin className="w-4 h-4 mr-1" />,
         label: "Track Package"
       } : undefined
     },
     {
       id: 5,
       title: "Order Delivered",
       description: "Your package has been delivered",
       status: order.status === "DELIVERED" ? "completed" : "pending",
       icon: <Check className="w-5 h-5" />,
       timestamp: order.status === "DELIVERED" 
         ? new Date(order.updatedAt).toLocaleString("en-US", {
             month: "short",
             day: "numeric",
             hour: "2-digit",
             minute: "2-digit",
           })
         : "Pending",
       badge: order.status === "DELIVERED" ? { label: "DELIVERED" } : undefined
     }
   ];

   return events;
 };

 export default function CustomerDashboard({
   customerId,
 }: CustomerDashboardProps) {
   const {
     getCustomerOrderHistoryIsLoading,
     getCustomerOrderHistoryData,
     setCustomerOrderHistoryFilter,
   } = useGetCustomerOrderHistory();

   const {
     getCustomerInfoData: data,
     setCustomerInfoFilter,
     getCustomerInfoIsLoading,
     refetchCustomerInfo,
   } = useGetCustomerInfo();

   console.log(data, getCustomerOrderHistoryData)

   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const cid = "67";

   useEffect(() => {
     if (cid) {
       setCustomerOrderHistoryFilter(cid);
       setCustomerInfoFilter(cid);
     }
   }, [cid, setCustomerOrderHistoryFilter]);

   useEffect(() => {
     if (
       getCustomerOrderHistoryData?.orders &&
       getCustomerOrderHistoryData.orders.length > 0 &&
       !selectedOrder
     ) {
       setSelectedOrder(getCustomerOrderHistoryData.orders[0]);
     }
   }, [getCustomerOrderHistoryData, selectedOrder]);

   const { orderSummary, displayOrder } = useMemo(() => {
     if (
       !getCustomerOrderHistoryData ||
       !getCustomerOrderHistoryData.orders ||
       getCustomerOrderHistoryData.orders.length === 0
     ) {
       return { orderSummary: null, displayOrder: null };
     }

     const currentOrder = selectedOrder || getCustomerOrderHistoryData.orders[0];
     if (!currentOrder) {
       return { orderSummary: null, displayOrder: null };
     }

     const subTotal = currentOrder.items.reduce(
       (sum: any, item: any) => sum + item.price * item.quantity,
       0
     );
     const summary = {
       quantity: currentOrder.items.reduce(
         (sum: any, item: any) => sum + item.quantity,
         0
       ),
       subTotal: subTotal,
       shippingFee: currentOrder.shipping.totalShippingFee,
       discount: 6000,
       totalAmount: currentOrder.totalPrice,
     };
     return { orderSummary: summary, displayOrder: currentOrder };
   }, [selectedOrder, getCustomerOrderHistoryData]);

   const formatCurrency = (amount: number) => {
     if (typeof amount !== "number") return "N/A";
     return new Intl.NumberFormat("en-NG", {
       style: "currency",
       currency: "NGN",
       maximumFractionDigits: 0,
     }).format(amount);
   };

   const formatDate = (dateString: string) => {
     if (!dateString) return "N/A";
     return new Date(dateString).toLocaleDateString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
     });
   };

   const formatDateTime = (dateString: string) => {
     if (!dateString) return "N/A";
     return new Date(dateString).toLocaleString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
       hour: "2-digit",
       minute: "2-digit",
       hour12: true,
     });
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

   const handleProductClick = (order: Order) => {
     setSelectedOrder(order);
   };

   if (getCustomerOrderHistoryIsLoading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gray-50">
         <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
       </div>
     );
   }

   if (!getCustomerOrderHistoryData || !displayOrder || !orderSummary) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
         <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
         <h2 className="text-2xl font-semibold text-gray-700">
           No Order History Found
         </h2>
         <p className="text-gray-500 mt-2">
           This customer has not placed any orders yet.
         </p>
       </div>
     );
   }

   const summary = getCustomerOrderHistoryData.summary;
   const progressSteps = getProgressSteps(displayOrder.status);
   const timelineEvents = getTimelineEvents(displayOrder);

   return (
     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
       <div className="max-w-8xl mx-auto space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left Column */}
           <div className="lg:col-span-2 space-y-6">
             {/* Header Section with Order Progress */}
             <div className="bg-white rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                   <h1 className="text-2xl font-semibold text-gray-800">
                     {displayOrder.orderReference}
                   </h1>
                   <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                     PAID
                   </Badge>
                   <Badge
                     className={`${
                       getStatusAppearance(displayOrder.status).color
                     }`}
                   >
                     {displayOrder.status}
                   </Badge>
                 </div>
                 <div className="flex gap-3">
                   <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                     <RotateCcw className="w-4 h-4" />
                     Refund
                   </Button>
                   <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                     Edit order
                   </Button>
                 </div>
               </div>

               {/* Order Progress */}
               <div className="mb-6">
                 <h2 className="text-lg font-medium text-gray-800 mb-4">
                   Order Progress
                 </h2>
                 <div className="relative">
                   <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                   <div className="flex justify-between relative">
                     {progressSteps.map((step, index) => (
                       <div key={index} className="flex flex-col items-center">
                         <div className="relative z-10 mb-2">
                           {step.status === "completed" && (
                             <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                           )}
                           {step.status === "current" && (
                             <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                           )}
                           {step.status === "pending" && (
                             <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
                           )}
                         </div>
                         <span
                           className={`text-sm ${
                             step.status === "completed" || step.status === "current"
                               ? "text-gray-800 font-medium"
                               : "text-gray-400"
                           }`}
                         >
                           {step.name}
                         </span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Bottom Actions */}
               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                 <div className="flex items-center gap-2 text-gray-600">
                   <Calendar className="w-5 h-5" />
                   <span>
                     Estimated shipping date: {getEstimatedShippingDate(displayOrder.createdAt)}
                   </span>
                 </div>
                 <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                   Track order
                   <MapPin className="w-4 h-4" />
                 </Button>
               </div>
             </div>

             {/* Enhanced Order Timeline */}
             <div className="bg-white rounded-lg p-6 shadow-sm">
               <h2 className="text-xl font-semibold text-gray-800 mb-6">
                 Order Timeline
               </h2>

               <div className="relative">
                 <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                 <div className="space-y-8">
                   {timelineEvents.map((event) => (
                     <div key={event.id} className="relative flex items-start gap-6">
                       <div
                         className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-sm ${
                           event.status === "completed"
                             ? "bg-green-500 text-white"
                             : event.status === "pending"
                             ? "bg-gray-300 text-gray-600"
                             : "bg-yellow-500 text-white"
                         }`}
                       >
                         {event.icon}
                       </div>

                       <div className="flex-1 min-w-0 pb-8">
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <h3 className="text-lg font-medium text-gray-800 mb-1">
                               {event.title}
                             </h3>
                             {event.description && (
                               <p className="text-sm text-gray-500 mb-3">
                                 {event.description}
                               </p>
                             )}

                             {event.action && (
                               <div className="mb-3">
                                 <Button
                                   variant={event.action.variant as any}
                                   size="sm"
                                   className={
                                     event.action.variant === "default"
                                       ? "bg-orange-500 hover:bg-orange-600 text-white"
                                       : ""
                                   }
                                 >
                                   {event.action.icon}
                                   {event.action.label}
                                 </Button>
                               </div>
                             )}

                             {event.badge && (
                               <div className="mb-3">
                                 <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                   {event.badge.label}
                                 </Badge>
                               </div>
                             )}
                           </div>

                           <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                             {event.timestamp}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Product Table */}
             <div className="bg-white rounded-lg shadow-sm">
               <div className="overflow-x-auto">
                 <Table className="table-fixed w-full">
                   <TableHeader>
                     <TableRow className="bg-gray-50 hover:bg-gray-100">
                       <TableHead className="w-[35%] font-medium text-gray-600 p-3">
                         Product
                       </TableHead>
                       <TableHead className="w-[15%] font-medium text-gray-600 p-3">
                         Price
                       </TableHead>
                       <TableHead className="w-[15%] font-medium text-gray-600 p-3">
                         Order Ref
                       </TableHead>
                       <TableHead className="w-[8%] font-medium text-gray-600 p-3">
                         Qty
                       </TableHead>
                       <TableHead className="w-[12%] font-medium text-gray-600 p-3">
                         Status
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
                                 src={item.image}
                                 alt={item.productName}
                                 className={`w-10 h-10 object-cover rounded-md flex-shrink-0 ${
                                   selectedOrder?.id === order.id
                                     ? "ring-2 ring-orange-500"
                                     : "group-hover:ring-1 group-hover:ring-orange-300"
                                 }`}
                                 onError={(e) => {
                                   (
                                     e.target as HTMLImageElement
                                   ).src = `https:placehold.co/40x40/f87171/ffffff?text=ERR`;
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
                             {formatCurrency(item.price)}
                           </TableCell>
                           <TableCell className="p-3 font-medium text-gray-800 text-sm">
                             {order.orderReference}
                           </TableCell>
                           <TableCell className="p-3 font-medium text-gray-800 text-sm">
                             {item.quantity}
                           </TableCell>
                           <TableCell className="p-3">
                             <Badge
                               className={`${
                                 getStatusAppearance(order.status).color
                               } text-[0.500rem] px-2 py-1`}
                             >
                               {order.status}
                             </Badge>
                           </TableCell>
                           <TableCell className="p-3">
                             <div className="flex items-center gap-1">
                               <div
                                 className="h-8 w-8 flex items-center justify-center bg-[#27A376] rounded-lg"
                                 onClick={() => setSelectedOrder(order)}
                               >
                                 <Eye className="w-4 h-4 text-white" />
                               </div>
                               <div
                                 onClick={() => {}}
                                 className="h-8 w-8 flex items-center justify-center bg-[#E03137] rounded-lg cursor-pointer"
                               >
                                 <Trash2 className="w-4 h-4 text-white" />
                               </div>
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
             {/* Customer Profile */}
             <div className="bg-white rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-800">
                   Customer Profile
                 </h3>
                 <button className="text-gray-400 hover:text-gray-600">
                   <Edit className="w-4 h-4" />
                 </button>
               </div>
               <div className="flex flex-col items-center text-center mb-6">
                 <img
                   src={placeholderCustomerDetails.avatarUrl}
                   alt={placeholderCustomerDetails.name}
                   className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-orange-200"
                 />
                 <h3 className="text-xl font-semibold text-gray-800 mb-1">
                   {data?.personalInfo.fullName}
                 </h3>
                 <p className="text-gray-500 text-sm mb-2">
                   {data?.customerType}
                 </p>
                 <Badge
                   variant={
                     data?.customerStatus?.toLowerCase() === "active"
                       ? "success"
                       : data?.customerStatus?.toLowerCase() === "pending"
                       ? "tertiary"
                       : "warning"
                   }
                   className="py-1 px-[26px] font-medium"
                 >
                   {data?.customerStatus?.toUpperCase()}
                 </Badge>
               </div>

               <div className="space-y-4 text-sm border-t pt-4">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">First Order:</span>
                   <span className="font-medium text-gray-800">
                     {formatDate(summary.firstOrderDate)}
                   </span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">Last Order:</span>
                   <span className="font-medium text-gray-800">
                     {formatDate(summary.lastOrderDate)}
                   </span>
                 </div>
               </div>

               <div className="mt-6 border-t pt-4">
                 <h4 className="text-md font-medium text-gray-800 mb-4">
                   Lifetime Summary
                 </h4>
                 <div className="grid grid-cols-2 gap-4 text-center">
                   <div>
                     <p className="text-xl font-bold text-orange-500">
                       {summary.totalOrders}
                     </p>
                     <p className="text-xs text-gray-500">Total Orders</p>
                   </div>
                   <div>
                     <p className="text-xl font-bold text-orange-500">
                       {formatCurrency(summary.totalSpent)}
                     </p>
                     <p className="text-xs text-gray-500">Total Spent</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Order Summary */}
             <div className="bg-white rounded-lg p-6 shadow-sm">
               <h4 className="text-md font-medium text-gray-800 mb-4">
                 Summary for {displayOrder.orderReference}
               </h4>
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between">
                   <span className="text-gray-500">Quantity:</span>
                   <span className="font-medium text-gray-800">
                     {orderSummary.quantity}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Sub Total</span>
                   <span className="font-medium text-gray-800">
                     {formatCurrency(orderSummary.subTotal)}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Shipping Fee:</span>
                   <span className="font-medium text-gray-800">
                     {formatCurrency(orderSummary.shippingFee)}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Discount</span>
                   <span className="font-medium text-red-500">
                     -{formatCurrency(orderSummary.discount)}
                   </span>
                 </div>
                 <div className="border-t pt-3 mt-2">
                   <div className="flex justify-between">
                     <span className="font-medium text-gray-800 text-base">
                       Total Amount:
                     </span>
                     <span className="font-bold text-gray-800 text-lg">
                       {formatCurrency(orderSummary.totalAmount)}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }