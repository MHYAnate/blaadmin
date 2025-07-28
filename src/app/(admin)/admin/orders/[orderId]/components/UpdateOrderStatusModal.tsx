// "use client"

// type UpdateOrderStatusParams = {
//   id: string;
//   status: OrderStatus;
//   notes: string;
//   trackingNumber: string;
//   carrier: string;
//   estimatedDelivery?: string;
// };

// // types.ts
// export type OrderStatus = 
//   | 'PENDING'
//   | 'SCHEDULED'
//   | 'PROCESSING'
//   | 'SHIPPED'
//   | 'DELIVERED'
//   | 'COMPLETED'
//   | 'ONGOING'
//   | 'CANCELLED';

// // components/UpdateOrderStatusModal.tsx
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { format } from "date-fns";
// import { useState } from "react";
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { apiClient } from "@/services/api/client";
// import { toast } from "sonner";


// const STATUS_OPTIONS: OrderStatus[] = [
//   'PENDING', 'SCHEDULED', 'PROCESSING', 
//   'SHIPPED', 'DELIVERED', 'COMPLETED', 
//   'ONGOING', 'CANCELLED'
// ];
// type UpdateOrderPayload = {
//   id: string;
//   status: OrderStatus;
//   notes: string;
//   trackingNumber: string;
//   carrier: string;
//   estimatedDelivery?: string;
// };

// const useUpdateOrderStatus = ({ onSuccess }: { onSuccess?: () => void }) => {
//   const queryClient = useQueryClient();
  
//   const updateOrderStatusMutation = useMutation({
//     mutationFn: async (payload: UpdateOrderStatusParams) => {
//       const response = await apiClient.patch(`/admin/orders/${payload.id}/status`, {
//         status: payload.status,
//         notes: payload.notes,
//         trackingNumber: payload.trackingNumber,
//         carrier: payload.carrier,
//         estimatedDelivery: payload.estimatedDelivery
//       });
//       return response.data;
//     },
//     // ... rest of the code

//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
//       queryClient.invalidateQueries({ 
//         queryKey: ["orderDetails", variables.id] 
//       });
//       toast.success(data.message || "Order status updated successfully");
//       onSuccess?.();
//     },
//     onError: (error:any) => {
//       const errorMessage = error.response?.data?.error || 
//                          error.response?.data?.message || 
//                          error.message;
//       toast.error(errorMessage || "Failed to update order status");
//     }
//   });

//   return {
//     updateOrderStatus: updateOrderStatusMutation.mutateAsync,
//     isUpdating: updateOrderStatusMutation.isPending,
//   };
// };


// export function UpdateOrderStatusModal({ 
//   order, 
//   currentStatus 
// }: { 
//   order: any;
//   currentStatus: OrderStatus;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [date, setDate] = useState<Date | undefined>();
//   const { updateOrderStatus, isUpdating } = useUpdateOrderStatus({
//     onSuccess: () => setIsOpen(false)
//   });

//   const [formData, setFormData] = useState({
//     status: currentStatus,
//     notes: "",
//     trackingNumber: "",
//     carrier: "",
//     estimatedDelivery: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev: any) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     await updateOrderStatus({
//       id: order.id,
//       status: formData.status,
//       notes: formData.notes,
//       trackingNumber: formData.trackingNumber,
//       carrier: formData.carrier,
//       estimatedDelivery: date ? format(date, "yyyy-MM-dd") : undefined
//     });
//   };

//   // const validTransitions = {
//   //   'PENDING': ['PROCESSING', 'CANCELLED'],
//   //   'SCHEDULED': ['PENDING', 'PROCESSING', 'CANCELLED'],
//   //   'PROCESSING': ['SHIPPED', 'COMPLETED', 'CANCELLED'],
//   //   'SHIPPED': ['DELIVERED', 'CANCELLED'],
//   //   'COMPLETED': ['DELIVERED'],
//   //   'ONGOING': ['PROCESSING', 'SHIPPED', 'DELIVERED'],
//   //   'DELIVERED': [],
//   //   'CANCELLED': []
//   // };
//   const validTransitions: Record<OrderStatus, OrderStatus[]> = {
//     PENDING: ['PROCESSING', 'CANCELLED'],
//     SCHEDULED: ['PENDING', 'PROCESSING', 'CANCELLED'],
//     PROCESSING: ['SHIPPED', 'COMPLETED', 'CANCELLED'],
//     SHIPPED: ['DELIVERED', 'CANCELLED'],
//     COMPLETED: ['DELIVERED'],
//     ONGOING: ['PROCESSING', 'SHIPPED', 'DELIVERED'],
//     DELIVERED: [],
//     CANCELLED: []
//   };
  

//   const allowedStatuses = validTransitions[currentStatus] || [];

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm">
//           Update Status
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Update Order Status</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="status">New Status</Label>
//             <Select
//               value={formData.status}
//               onValueChange={(value) => 
//                 setFormData((prev: any)  => ({ ...prev, status: value}))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 {STATUS_OPTIONS
//                   .filter(status => allowedStatuses.includes(status))
//                   .map(status => (
//                     <SelectItem key={status} value={status}>
//                       {status}
//                     </SelectItem>
//                   ))}
//               </SelectContent>
//             </Select>
//             {allowedStatuses.length === 0 && (
//               <p className="text-sm text-muted-foreground mt-1">
//                 No valid status transitions available
//               </p>
//             )}
//           </div>

//           {['SHIPPED', 'DELIVERED'].includes(formData.status) && (
//             <>
//               <div>
//                 <Label htmlFor="trackingNumber">Tracking Number</Label>
//                 <Input
//                   name="trackingNumber"
//                   value={formData.trackingNumber}
//                   onChange={handleChange}
//                   placeholder="Enter tracking number"
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="carrier">Carrier</Label>
//                 <Input
//                   name="carrier"
//                   value={formData.carrier}
//                   onChange={handleChange}
//                   placeholder="Enter carrier name"
//                 />
//               </div>
              
//               <div>
//                 <Label>Estimated Delivery Date</Label>
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   disabled={(date) => date < new Date()}
//                   className="rounded-md border"
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <Label htmlFor="notes">Admin Notes</Label>
//             <Textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               placeholder="Add internal notes"
//               rows={3}
//             />
//           </div>

//           <div className="flex justify-end gap-2">
//             <Button 
//               variant="outline" 
//               onClick={() => setIsOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               // disabled={isUpdating || !allowedStatuses.includes(formData.status)}
//             >
//               {isUpdating ? "Updating..." : "Update Status"}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// // components/UpdateOrderStatusModal.tsx
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { format } from "date-fns";
// import { useState } from "react";
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { apiClient } from "@/services/api/client";
// import { toast } from "sonner";

// // Define OrderStatus type
// export type OrderStatus = 
//   | 'PENDING'
//   | 'SCHEDULED'
//   | 'PROCESSING'
//   | 'SHIPPED'
//   | 'DELIVERED'
//   | 'COMPLETED'
//   | 'ONGOING'
//   | 'CANCELLED';

// const STATUS_OPTIONS: OrderStatus[] = [
//   'PENDING', 'SCHEDULED', 'PROCESSING', 
//   'SHIPPED', 'DELIVERED', 'COMPLETED', 
//   'ONGOING', 'CANCELLED'
// ];

// // Unified payload type
// type UpdateOrderStatusPayload = {
//   id: string;
//   status: OrderStatus;
//   notes: string;
//   trackingNumber: string;
//   carrier: string;
//   estimatedDelivery?: string;
// };

// // Status transition rules
// const validTransitions: Record<OrderStatus, OrderStatus[]> = {
//   PENDING: ['PROCESSING', 'CANCELLED'],
//   SCHEDULED: ['PENDING', 'PROCESSING', 'CANCELLED'],
//   PROCESSING: ['SHIPPED', 'COMPLETED', 'CANCELLED'],
//   SHIPPED: ['DELIVERED', 'CANCELLED'],
//   COMPLETED: ['DELIVERED'],
//   ONGOING: ['PROCESSING', 'SHIPPED', 'DELIVERED'],
//   DELIVERED: [],
//   CANCELLED: []
// };

// // Custom hook moved to top level
// const useUpdateOrderStatus = ({ onSuccess }: { onSuccess?: () => void }) => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (payload: UpdateOrderStatusPayload) => {
//       const { id, ...data } = payload;
//       const response = await apiClient.patch(`/admin/orders/${id}/status`, data);
//       return response.data;
//     },
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
//       queryClient.invalidateQueries({ 
//         queryKey: ["orderDetails", variables.id] 
//       });
//       toast.success(data.message || "Order status updated successfully");
//       onSuccess?.();
//     },
//     onError: (error: any) => {
//       const errorMessage = error.response?.data?.error || 
//                          error.response?.data?.message || 
//                          error.message;
//       toast.error(errorMessage || "Failed to update order status");
//     }
//   });
// };

// export function UpdateOrderStatusModal({ 
//   order, 
//   currentStatus 
// }: { 
//   order: any;
//   currentStatus: OrderStatus;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [date, setDate] = useState<Date | undefined>();
  
//   // Initialize form with current order data
//   const [formData, setFormData] = useState({
//     status: currentStatus,
//     notes: order.adminNotes || "",
//     trackingNumber: order.trackingNumber || "",
//     carrier: order.carrier || "",
//     estimatedDelivery: order.estimatedDelivery || ""
//   });

//   const { mutateAsync: updateOrderStatus, isPending: isUpdating } = useUpdateOrderStatus({
//     onSuccess: () => setIsOpen(false)
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     await updateOrderStatus({
//       id: order.id,
//       status: formData.status,
//       notes: formData.notes,
//       trackingNumber: formData.trackingNumber,
//       carrier: formData.carrier,
//       estimatedDelivery: date ? format(date, "yyyy-MM-dd") : undefined
//     });
//   };

//   const allowedStatuses = validTransitions[currentStatus] || [];

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm">
//           Update Status
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Update Order #{order.orderNumber} Status</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="status">New Status</Label>
//             <Select
//               value={formData.status}
//               onValueChange={(value: OrderStatus) => 
//                 setFormData(prev => ({ ...prev, status: value }))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 {STATUS_OPTIONS
//                   .filter(status => allowedStatuses.includes(status))
//                   .map(status => (
//                     <SelectItem key={status} value={status}>
//                       {status}
//                     </SelectItem>
//                   ))}
//               </SelectContent>
//             </Select>
//             {allowedStatuses.length === 0 && (
//               <p className="text-sm text-muted-foreground mt-1">
//                 No valid status transitions available
//               </p>
//             )}
//           </div>

//           {['SHIPPED', 'DELIVERED'].includes(formData.status) && (
//             <>
//               <div>
//                 <Label htmlFor="trackingNumber">Tracking Number</Label>
//                 <Input
//                   name="trackingNumber"
//                   value={formData.trackingNumber}
//                   onChange={handleChange}
//                   placeholder="Enter tracking number"
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="carrier">Carrier</Label>
//                 <Input
//                   name="carrier"
//                   value={formData.carrier}
//                   onChange={handleChange}
//                   placeholder="Enter carrier name"
//                 />
//               </div>
              
//               <div>
//                 <Label>Estimated Delivery Date</Label>
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   fromDate={new Date()}
//                   className="rounded-md border"
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <Label htmlFor="notes">Admin Notes</Label>
//             <Textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               placeholder="Add internal notes"
//               rows={3}
//             />
//           </div>

//           <div className="flex justify-end gap-2">
//             <Button 
//               variant="outline" 
//               onClick={() => setIsOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               disabled={isUpdating}
//             >
//               {isUpdating ? "Updating..." : "Update Status"}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { apiClient } from "@/services/api/client"
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Define OrderStatus type
export type OrderStatus =
  | "PENDING"
  | "SCHEDULED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "ONGOING"
  | "CANCELLED"

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "SCHEDULED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "COMPLETED",
  "ONGOING",
  "CANCELLED",
]

// Unified payload type
type UpdateOrderStatusPayload = {
  id: string
  status: OrderStatus
  notes: string
  trackingNumber: string
  carrier: string
  estimatedDelivery?: string
}

// Status transition rules
const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PROCESSING", "CANCELLED"],
  SCHEDULED: ["PENDING", "PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "COMPLETED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "CANCELLED"],
  COMPLETED: ["DELIVERED"],
  ONGOING: ["PROCESSING", "SHIPPED", "DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
}

// Custom hook
const useUpdateOrderStatus = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateOrderStatusPayload) => {
      const { id, ...data } = payload
      const response = await apiClient.patch(`/admin/orders/${id}/status`, data)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] })
      queryClient.invalidateQueries({
        queryKey: ["orderDetails", variables.id],
      })
      toast.success(data.message || "Order status updated successfully")
      onSuccess?.()
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message
      toast.error(errorMessage || "Failed to update order status")
    },
  })
}

export function UpdateOrderStatusModal({
  order,
  currentStatus,
  refetch,
}: {
  order: any
  currentStatus: OrderStatus
  refetch : ()=> void;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()

  // Initialize form with current order data
  const [formData, setFormData] = useState({
    status: currentStatus,
    notes: order.adminNotes || "",
    trackingNumber: order.trackingNumber || "",
    carrier: order.carrier || "",
    estimatedDelivery: order.estimatedDelivery || "",
  })

  const { mutateAsync: updateOrderStatus, isPending: isUpdating } = useUpdateOrderStatus({
    onSuccess: () => setIsOpen(false),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    await updateOrderStatus({
      id: order.id,
      status: formData.status,
      notes: formData.notes,
      trackingNumber: formData.trackingNumber,
      carrier: formData.carrier,
      estimatedDelivery: date ? format(date, "yyyy-MM-dd") : undefined,
    })
    refetch()
  }

  const allowedStatuses = validTransitions[currentStatus] || []
  const showShippingFields = ["SHIPPED", "DELIVERED"].includes(formData.status)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Update Order #{order.orderNumber} Status</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-1">
            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: OrderStatus) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.filter((status) => allowedStatuses.includes(status)).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {allowedStatuses.length === 0 && (
                <p className="text-sm text-muted-foreground">No valid status transitions available</p>
              )}
            </div>

            {/* Shipping Fields - Responsive Grid */}
            {showShippingFields && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      name="trackingNumber"
                      value={formData.trackingNumber}
                      onChange={handleChange}
                      placeholder="Enter tracking number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carrier">Carrier</Label>
                    <Input
                      name="carrier"
                      value={formData.carrier}
                      onChange={handleChange}
                      placeholder="Enter carrier name"
                    />
                  </div>
                </div>

                {/* Compact Date Picker */}
                <div className="space-y-2">
                  <Label>Estimated Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} fromDate={new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Admin Notes</Label>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add internal notes"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
