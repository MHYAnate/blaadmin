// "use client";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { useEffect, useState, useCallback } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import { apiClient } from "@/app/(admin)/admin/manufacturers/apiClient";
// import { Trash, UploadCloud, Copy } from "lucide-react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";

// // Enhanced schema with all product option fields
// const productSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   description: z.string().optional(),
//   categoryId: z.string().min(1, "Category is required"),
//   manufacturerId: z.string().min(1, "Manufacturer is required"),
//   isActive: z.boolean().optional(),
//   type: z.string().min(1, "Type is required"),
//   stockAlert: z.boolean().optional(),
//   criticalLevel: z.coerce.number().min(0).optional(),
//   // targetLevel: z.coerce.number().min(0).optional(),
//   options: z.array(z.object({
//     id: z.number().optional(), // For existing options
//     value: z.string().min(1, "Option value is required"),
//     price: z.coerce.number().min(0, "Retail price must be 0 or more"), // Updated label
//     inventory: z.coerce.number().min(0, "Inventory must be 0 or more"),
//     stockPrice: z.coerce.number().min(0, "Stock price must be 0 or more"), // Updated label
//     markupType: z.enum(["PERCENTAGE", "FIXED"]),
//     markupValue: z.coerce.number().min(0, "Discount must be 0 or more"), // Updated label
//     sellingPrice: z.coerce.number().min(0, "Bulk price must be 0 or more"), // Updated label
//     weight: z.coerce.number().min(0, "Weight must be 0 or more"),
//     unit: z.string().min(1, "Unit is required"),
//     moq: z.coerce.number().min(1, "MOQ must be at least 1"),
//     lowStockThreshold: z.coerce.number().min(0).optional(),
//     image: z.array(z.string()).optional(), // Existing images
//     newImages: z.array(z.instanceof(File)).optional(), // New image files
//   })).min(1, "At least one product option is required"),
// });

// type ProductFormValues = z.infer<typeof productSchema>;

// // Helper function to process options
// const processOptions = (options: any[]) => {
//   return options.map(option => ({
//     value: option.value,
//     price: parseFloat(option.price) || 0,
//     moq: parseInt(option.moq) || 1,
//     image: option.image || [],
//     unit: option.unit || "",
//     inventory: parseInt(option.inventory) || 0,
//     lowStockThreshold: parseInt(option.lowStockThreshold) || 10,
//     markupType: option.markupType || "PERCENTAGE",
//     markupValue: parseFloat(option.markupValue) || 0,
//     sellingPrice: parseFloat(option.sellingPrice) || 0,
//     stockPrice: parseFloat(option.stockPrice) || 0,
//     weight: parseFloat(option.weight) || 0,
//   }));
// };

// interface Manufacturer {
//   id: number;
//   name: string;
// }

// interface Category {
//   id: number;
//   name: string;
// }

// interface IProps {
//   product: any;
//   manufacturers: Manufacturer[];
//   categories?: Category[];
//   setClose: () => void;
// }

// const EditProductForm: React.FC<IProps> = ({ 
//   product, 
//   manufacturers, 
//   categories = [],
//   setClose 
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [copiedOption, setCopiedOption] = useState<any>(null);

//   const form = useForm<ProductFormValues>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       categoryId: "",
//       manufacturerId: "",
//       isActive: false,
//       type: "platform",
//       stockAlert: false,
//       // criticalLevel: 5,
//       // targetLevel: 50,
//       options: [],
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "options",
//   });

//   // Calculate bulk price from retail price and discount
//   const calculateBulkPrice = useCallback((index: number) => {
//     const retailPrice = form.getValues(`options.${index}.price`);
//     const markupType = form.getValues(`options.${index}.markupType`);
//     const markupValue = form.getValues(`options.${index}.markupValue`);
    
//     if (retailPrice >= 0 && markupValue >= 0) {
//       let bulkPrice = retailPrice;
//       if (markupType === "PERCENTAGE") {
//         bulkPrice = retailPrice * (1 - markupValue / 100);
//       } else {
//         bulkPrice = retailPrice - markupValue;
//       }
//       form.setValue(`options.${index}.sellingPrice`, parseFloat(bulkPrice.toFixed(2)));
//     }
//   }, [form]);

//   // Initialize form with product data
//   useEffect(() => {
//     if (product) {
//       form.reset({
//         name: product.name,
//         description: product.description || "",
//         categoryId: String(product.categoryId),
//         manufacturerId: String(product.manufacturerId),
//         isActive: product.isActive || false,
//         type: product.type || "platform",
//         stockAlert: product.stockAlert || false,
//         // criticalLevel: product.criticalLevel || 5,
//         // targetLevel: product.targetLevel || 50,
//         options: product.options?.map((opt: any) => ({
//           id: opt.id,
//           value: opt.value,
//           price: opt.price || 0,
//           inventory: opt.inventory || 0,
//           stockPrice: opt.stockPrice || 0,
//           markupType: opt.markupType || "PERCENTAGE",
//           markupValue: opt.markupValue || 0,
//           sellingPrice: opt.sellingPrice || 0,
//           weight: opt.weight || 0,
//           unit: opt.unit || "",
//           moq: opt.moq || 1,
//           lowStockThreshold: opt.lowStockThreshold || 10,
//           image: opt.image || [],
//           newImages: [],
//         })) || [],
//       });
//     }
//   }, [product, form]);

//   // Handle image uploads
//   const uploadImages = async (files: File[]): Promise<string[]> => {
//     if (!files || files.length === 0) return [];
    
//     const formData = new FormData();
//     files.forEach(file => formData.append("images", file));
//     formData.append("folder", "products");
    
//     try {
//       setIsUploading(true);
//       const response = await apiClient.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data.urls || [];
//     } catch (error) {
//       toast.error("Image upload failed. Please try again.");
//       throw error;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Copy/paste functionality
//   const handleCopyOption = (index: number) => {
//     const optionToCopy = form.getValues(`options.${index}`);
//     const { id, ...optionData } = optionToCopy;
//     setCopiedOption(optionData);
//     toast.success("Option copied!");
//   };

//   const handlePasteOption = () => {
//     if (copiedOption) {
//       append({
//         ...copiedOption,
//         newImages: [],
//       });
//       toast.info("Option pasted!");
//     } else {
//       toast.warning("No option copied yet.");
//     }
//   };

//   // Submit handler
//   const onSubmit = async (values: ProductFormValues) => {
//     setIsSubmitting(true);
    
//     try {
//       // Process options with image uploads
//       const processedOptions = await Promise.all(
//         values.options.map(async (option) => {
//           let uploadedImageUrls: string[] = [];
          
//           // Upload new images if any
//           if (option.newImages && option.newImages.length > 0) {
//             uploadedImageUrls = await uploadImages(option.newImages);
//           }
          
//           // Combine existing and new images
//           const allImages = [...(option.image || []), ...uploadedImageUrls];
          
//           return {
//             ...option,
//             image: allImages,
//             newImages: undefined, // Remove client-only field
//           };
//         })
//       );

//       // Compute price range
//       const allRetailPrices = values.options.map(opt => opt.price);
//       const allBulkPrices = values.options.map(opt => opt.sellingPrice);
//       const minPrice = Math.min(...allBulkPrices);
//       const maxPrice = Math.max(...allRetailPrices);

//       // Prepare update data
//       const updateData = {
//         ...(values.name !== undefined && { name: values.name }),
//         ...(values.description !== undefined && { description: values.description }),
//         ...(values.type !== undefined && { type: values.type }),
//         ...(values.isActive !== undefined && { isActive: values.isActive }),
//         ...(values.stockAlert !== undefined && { stockAlert: values.stockAlert }),
//         // ...(values.criticalLevel !== undefined && { criticalLevel: values.criticalLevel }),
//         // ...(values.targetLevel !== undefined && { targetLevel: values.targetLevel }),
//         ...(values.categoryId !== undefined && { categoryId: parseInt(values.categoryId) }),
//         ...(values.manufacturerId !== undefined && { manufacturerId: parseInt(values.manufacturerId) }),
//         priceRange: { min: minPrice, max: maxPrice }, // New field
//         options: processOptions(processedOptions)
//       };

//       // Update product
//       const response = await apiClient.patch(`/admin/products/${product.id}`, updateData);
      
//       if (response.data.success) {
//         toast.success("Product updated successfully!");
//         setClose();
//       } else {
//         throw new Error(response.data.error || "Failed to update product");
//       }
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       toast.error(error.message || "Failed to update product");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Product Details */}
//           <div className="p-4 border rounded-lg">
//             <h3 className="text-lg font-medium mb-4">Product Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField control={form.control} name="name" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Name</FormLabel>
//                   <FormControl><Input placeholder="e.g., Premium Rice" {...field} /></FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />
              
//               <FormField control={form.control} name="type" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Type</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="platform">Platform</SelectItem>
//                       <SelectItem value="business">Business</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//               <FormField control={form.control} name="categoryId" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   {categories.length > 0 ? (
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {categories.map(category => (
//                           <SelectItem key={category.id} value={String(category.id)}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <FormControl>
//                       <Input placeholder="Category ID" {...field} />
//                     </FormControl>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )} />
              
//               <FormField control={form.control} name="manufacturerId" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Manufacturer</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select manufacturer" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {manufacturers.map(manufacturer => (
//                         <SelectItem key={manufacturer.id} value={String(manufacturer.id)}>
//                           {manufacturer.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//             </div>
            
//             <div className="mt-4">
//               <FormField control={form.control} name="description" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea 
//                       placeholder="Product description..." 
//                       className="min-h-[120px]" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//               <FormField control={form.control} name="isActive" render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
//                   <div className="space-y-0.5">
//                     <FormLabel>Product Status</FormLabel>
//                     <p className="text-sm text-muted-foreground">
//                       Active products are visible to customers
//                     </p>
//                   </div>
//                   <FormControl>
//                     <Switch 
//                       checked={field.value} 
//                       onCheckedChange={field.onChange} 
//                     />
//                   </FormControl>
//                 </FormItem>
//               )} />
              
//               <FormField control={form.control} name="stockAlert" render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
//                   <div className="space-y-0.5">
//                     <FormLabel>Stock Alerts</FormLabel>
//                     <p className="text-sm text-muted-foreground">
//                       Enable low stock notifications
//                     </p>
//                   </div>
//                   <FormControl>
//                     <Switch 
//                       checked={field.value} 
//                       onCheckedChange={field.onChange} 
//                     />
//                   </FormControl>
//                 </FormItem>
//               )} />
//             </div>
            
      
//           </div>

//           {/* Product Options */}
//           <div className="space-y-4">
//             {/* <div className="flex justify-between items-center">
//               <h3 className="text-lg font-medium">Product Options</h3>
//               <div className="flex gap-2">
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   size="sm"
//                   onClick={handlePasteOption}
//                   disabled={!copiedOption}
//                 >
//                   Paste Option
//                 </Button>
//                 <Button 
//                   type="button" 
//                   variant="default" 
//                   size="sm"
//                   onClick={() => append({
//                     value: "",
//                     price: 0,
//                     inventory: 0,
//                     stockPrice: 0,
//                     markupType: "PERCENTAGE",
//                     markupValue: 0,
//                     sellingPrice: 0,
//                     weight: 0,
//                     unit: "",
//                     moq: 1,
//                     lowStockThreshold: 10,
//                     image: [],
//                     newImages: []
//                   })}
//                 >
//                   Add Option
//                 </Button>
//               </div>
//             </div> */}

//             {fields.map((field, index) => (
//               <OptionFormFields 
//                 key={field.id} 
//                 form={form} 
//                 index={index} 
//                 onCopy={handleCopyOption}
//                 onRemove={remove}
//                 calculateBulkPrice={calculateBulkPrice}
//               />
//             ))}
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end gap-4 pt-6">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={setClose}
//               disabled={isSubmitting || isUploading}
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="submit" 
//               disabled={isSubmitting || isUploading}
//             >
//               {isSubmitting ? "Updating..." : "Update Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// // Option form fields component
// interface OptionFormFieldsProps {
//   form: any;
//   index: number;
//   onCopy: (index: number) => void;
//   onRemove: (index: number) => void;
//   calculateBulkPrice: (index: number) => void;
// }

// const OptionFormFields: React.FC<OptionFormFieldsProps> = ({ 
//   form, 
//   index, 
//   onCopy, 
//   onRemove, 
//   calculateBulkPrice 
// }) => {
//   return (
//     <div className="p-4 border rounded-lg space-y-4 relative bg-slate-50">
//       <div className="absolute top-2 right-2 flex gap-2">
//         <Button 
//           type="button" 
//           variant="outline" 
//           size="icon" 
//           className="h-7 w-7"
//           onClick={() => onCopy(index)}
//         >
//           <Copy className="h-4 w-4" />
//         </Button>
//         <Button 
//           type="button" 
//           variant="destructive" 
//           size="icon" 
//           className="h-7 w-7"
//           onClick={() => onRemove(index)}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       </div>
      
//       <p className="font-semibold text-md">Option #{index + 1}</p>
      
//       {/* Basic Option Details */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <FormField
//           control={form.control}
//           name={`options.${index}.value`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>specific discription</FormLabel>
//               <FormControl>
//                 <Input placeholder="specific discription" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.unit`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Unit</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., Kg, grams, ..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.weight`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Weight </FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.moq`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>MOQ</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       {/* Pricing Fields */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {/* Stock Price */}
//         <FormField
//           control={form.control}
//           name={`options.${index}.stockPrice`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Stock Price (₦)</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="number" 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         {/* Retail Price */}
//         <FormField
//           control={form.control}
//           name={`options.${index}.price`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Retail Price (₦)</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="number" 
//                   {...field} 
//                   onChange={(e) => {
//                     field.onChange(e);
//                     calculateBulkPrice(index);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.markupType`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Discount Type</FormLabel>
//               <Select 
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   calculateBulkPrice(index);
//                 }} 
//                 value={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
//                   <SelectItem value="FIXED">Fixed (₦)</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.markupValue`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Discount Value</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="number" 
//                   {...field} 
//                   onChange={(e) => {
//                     field.onChange(e);
//                     calculateBulkPrice(index);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
      
//       {/* Bulk Price */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name={`options.${index}.sellingPrice`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Bulk Price (₦)</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="number" 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name={`options.${index}.inventory`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Current Inventory</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name={`options.${index}.lowStockThreshold`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Low Stock Threshold</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       {/* Image Upload Component */}
//       <ImageUploader form={form} index={index} />
//     </div>
//   );
// };

// // Image uploader component
// const ImageUploader = ({ form, index }: { form: any; index: number }) => {
//   const existingImages = form.watch(`options.${index}.image`) || [];
//   const newFiles = form.watch(`options.${index}.newImages`) || [];

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const currentFiles = form.getValues(`options.${index}.newImages`) || [];
//     form.setValue(`options.${index}.newImages`, [...currentFiles, ...acceptedFiles]);
//   }, [form, index]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
//     onDrop,
//   });
  
//   const removeExistingImage = (imgUrl: string) => {
//     const updatedImages = existingImages.filter((url: string) => url !== imgUrl);
//     form.setValue(`options.${index}.image`, updatedImages);
//   };

//   const removeNewFile = (fileIndex: number) => {
//     const updatedFiles = newFiles.filter((_: any, i: number) => i !== fileIndex);
//     form.setValue(`options.${index}.newImages`, updatedFiles);
//   };

//   return (
//     <div className="space-y-2">
//       <FormLabel>Product Images</FormLabel>
//       <div 
//         {...getRootProps()} 
//         className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
//           isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
//         }`}
//       >
//         <input {...getInputProps()} />
//         <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
//         <p className="mt-1 text-sm text-gray-600">
//           Drag & drop or click to add images
//         </p>
//       </div>
      
//       {(existingImages.length > 0 || newFiles.length > 0) && (
//         <div className="flex gap-2 flex-wrap mt-2">
//           {/* Existing images */}
//           {existingImages.map((url: string, imgIndex: number) => (
//             <div key={`existing-${imgIndex}`} className="relative h-20 w-20">
//               <Image 
//                 src={url} 
//                 alt="Product image" 
//                 fill
//                 className="rounded-md object-cover" 
//               />
//               <button 
//                 type="button" 
//                 onClick={() => removeExistingImage(url)}
//                 className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center shadow-md"
//               >
//                 <Trash className="h-3 w-3" />
//               </button>
//             </div>
//           ))}
          
//           {/* New file previews */}
//           {newFiles.map((file: File, fileIndex: number) => (
//             <div key={`new-${fileIndex}`} className="relative h-20 w-20">
//               <Image 
//                 src={URL.createObjectURL(file)} 
//                 alt="Preview" 
//                 fill
//                 className="rounded-md object-cover" 
//               />
//               <button 
//                 type="button" 
//                 onClick={() => removeNewFile(fileIndex)}
//                 className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center shadow-md"
//               >
//                 <Trash className="h-3 w-3" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProductForm;

"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { apiClient } from "@/app/(admin)/admin/manufacturers/apiClient";
import { Trash, UploadCloud, Copy, Info } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required"),
  manufacturerId: z.string().min(1, "Manufacturer is required"),
  isActive: z.boolean().optional(),
  type: z.string().min(1, "Type is required"),
  processingTimeDays: z.coerce.number().min(1).default(1),
  minDeliveryDays: z.coerce.number().min(1).default(1),
  maxDeliveryDays: z.coerce.number().min(1).default(7),
  includeSaturdays: z.boolean().default(false),
  acceptsReturns: z.boolean().default(true),
  options: z.array(z.object({
    id: z.number().optional(),
    value: z.string().min(1, "Option value is required"),
    stockPrice: z.coerce.number().min(0, "Stock price cannot be negative"),
    price: z.coerce.number().min(0.01, "Retail price must be greater than 0"),
    inventory: z.coerce.number().min(0, "Inventory must be 0 or more"),
    discountType: z.enum(["NONE", "PERCENTAGE", "FIXED"]).default("NONE"),
    bulkDiscount: z.coerce.number().min(0).default(0),
    minimumBulkQuantity: z.coerce.number().min(1).default(1),
    weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),
    unit: z.string().min(1, "Unit is required"),
    image: z.array(z.string()).optional(),
    newImages: z.array(z.instanceof(File)).optional(),
  })
    .refine((option) => {
      if (option.stockPrice > 0 && option.stockPrice >= option.price) {
        return false;
      }
      return true;
    }, {
      message: "Stock price must be less than retail price for profitability",
      path: ["stockPrice"]
    })
    .refine((option) => {
      if (option.discountType !== "NONE") {
        if (option.bulkDiscount <= 0) return false;
        if (option.discountType === "PERCENTAGE" && option.bulkDiscount > 100) return false;
        if (option.discountType === "FIXED" && option.bulkDiscount >= option.price) return false;
        if (option.minimumBulkQuantity < 2) return false;

        let bulkPrice = option.price;
        if (option.discountType === "PERCENTAGE") {
          bulkPrice = option.price * (1 - option.bulkDiscount / 100);
        } else if (option.discountType === "FIXED") {
          bulkPrice = option.price - option.bulkDiscount;
        }

        if (option.stockPrice > 0 && bulkPrice <= option.stockPrice) {
          return false;
        }
      }
      return true;
    }, {
      message: "Invalid bulk pricing configuration",
      path: ["bulkDiscount"]
    })).min(1, "At least one product option is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Manufacturer {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface IProps {
  product: any;
  manufacturers: Manufacturer[];
  categories?: Category[];
  setClose: () => void;
}

const EditProductForm: React.FC<IProps> = ({
  product,
  manufacturers,
  categories = [],
  setClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedOption, setCopiedOption] = useState<any>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      categoryId: "",
      manufacturerId: "",
      isActive: false,
      type: "platform",
      processingTimeDays: 1,
      minDeliveryDays: 1,
      maxDeliveryDays: 7,
      includeSaturdays: false,
      acceptsReturns: true,
      options: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const calculatePricingMetrics = useCallback((index: number) => {
    const stockPrice = form.getValues(`options.${index}.stockPrice`);
    const retailPrice = form.getValues(`options.${index}.price`);
    const discountType = form.getValues(`options.${index}.discountType`);
    const bulkDiscount = form.getValues(`options.${index}.bulkDiscount`);

    if (stockPrice >= 0 && retailPrice > 0) {
      const retailMargin = stockPrice > 0 ? ((retailPrice - stockPrice) / retailPrice) * 100 : 0;

      let bulkPrice = 0;
      let bulkMargin = 0;

      if (discountType !== "NONE" && bulkDiscount > 0) {
        if (discountType === "PERCENTAGE") {
          bulkPrice = retailPrice * (1 - bulkDiscount / 100);
        } else if (discountType === "FIXED") {
          bulkPrice = retailPrice - bulkDiscount;
        }

        if (bulkPrice > 0 && stockPrice > 0) {
          bulkMargin = ((bulkPrice - stockPrice) / bulkPrice) * 100;
        }
      }

      const retailMarginElement = document.getElementById(`retail-margin-${index}`);
      const bulkMarginElement = document.getElementById(`bulk-margin-${index}`);
      const bulkPriceElement = document.getElementById(`bulk-price-display-${index}`);

      if (retailMarginElement) {
        retailMarginElement.textContent = `${retailMargin.toFixed(1)}%`;
        retailMarginElement.className = `text-lg font-bold ${retailMargin > 20 ? 'text-green-600' : retailMargin > 10 ? 'text-yellow-600' : 'text-red-600'}`;
      }

      if (bulkMarginElement && discountType !== "NONE") {
        bulkMarginElement.textContent = `${bulkMargin.toFixed(1)}%`;
        bulkMarginElement.className = `text-lg font-bold ${bulkMargin > 15 ? 'text-green-600' : bulkMargin > 8 ? 'text-yellow-600' : 'text-red-600'}`;
      }

      if (bulkPriceElement && discountType !== "NONE" && bulkPrice > 0) {
        bulkPriceElement.textContent = `₦${bulkPrice.toFixed(2)}`;
      }
    }
  }, [form]);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        categoryId: String(product.categoryId),
        manufacturerId: String(product.manufacturerId),
        isActive: product.isActive || false,
        type: product.type || "platform",
        processingTimeDays: product.processingTimeDays || 1,
        minDeliveryDays: product.minDeliveryDays || 1,
        maxDeliveryDays: product.maxDeliveryDays || 7,
        includeSaturdays: product.includeSaturdays || false,
        acceptsReturns: product.acceptsReturns !== false,
        options: product.options?.map((opt: any) => ({
          id: opt.id,
          value: opt.value,
          stockPrice: opt.stockPrice || opt.manufacturerPrice || 0,
          price: opt.price || 0,
          inventory: opt.inventory || 0,
          discountType: opt.discountType || "NONE",
          bulkDiscount: opt.bulkDiscount || opt.markupValue || 0,
          minimumBulkQuantity: opt.minimumBulkQuantity || opt.moq || 1,
          weight: opt.weight || 0,
          unit: opt.unit || "",
          image: opt.image || [],
          newImages: [],
        })) || [],
      });
    }
  }, [product, form]);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    formData.append("folder", "products");

    try {
      setIsUploading(true);
      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.urls || [];
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyOption = (index: number) => {
    const optionToCopy = form.getValues(`options.${index}`);
    const { id, ...optionData } = optionToCopy;
    setCopiedOption(optionData);
    toast.success("Option copied!");
  };

  const handlePasteOption = () => {
    if (copiedOption) {
      append({
        ...copiedOption,
        newImages: [],
      });
      toast.info("Option pasted!");
    } else {
      toast.warning("No option copied yet.");
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);

    try {
      const processedOptions = await Promise.all(
        values.options.map(async (option) => {
          let uploadedImageUrls: string[] = [];

          if (option.newImages && option.newImages.length > 0) {
            uploadedImageUrls = await uploadImages(option.newImages);
          }

          const allImages = [...(option.image || []), ...uploadedImageUrls];

          return {
            value: option.value,
            stockPrice: option.stockPrice,
            retailPrice: option.price,
            discountType: option.discountType,
            bulkDiscount: option.bulkDiscount,
            minimumBulkQuantity: option.minimumBulkQuantity,
            inventory: option.inventory,
            weight: option.weight,
            unit: option.unit,
            image: allImages,
          };
        })
      );

      const updateData = {
        name: values.name,
        description: values.description,
        shortDescription: values.shortDescription,
        type: values.type,
        isActive: values.isActive,
        processingTimeDays: values.processingTimeDays,
        minDeliveryDays: values.minDeliveryDays,
        maxDeliveryDays: values.maxDeliveryDays,
        includeSaturdays: values.includeSaturdays,
        acceptsReturns: values.acceptsReturns,
        categoryId: parseInt(values.categoryId),
        manufacturerId: parseInt(values.manufacturerId),
        options: processedOptions
      };

      const response = await apiClient.patch(`/admin/products/${product.id}`, updateData);

      if (response.data.success) {
        toast.success("Product updated successfully!");
        setClose();
      } else {
        throw new Error(response.data.error || "Failed to update product");
      }
    } catch (error: any) {
      console.error("Update failed:", error);

      if (error.message.includes("stock price") || error.message.includes("Stock price")) {
        toast.error("Stock price must be less than retail price for profitability");
      } else if (error.message.includes("bulk") || error.message.includes("Bulk")) {
        toast.error("Invalid bulk pricing configuration. Check your discount settings.");
      } else {
        toast.error(error.message || "Failed to update product");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Details */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Premium Rice" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="platform">Platform</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="mt-4">
              <FormField control={form.control} name="shortDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief product summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  {categories.length > 0 ? (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Input placeholder="Category ID" {...field} />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="manufacturerId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manufacturer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {manufacturers.map(manufacturer => (
                        <SelectItem key={manufacturer.id} value={String(manufacturer.id)}>
                          {manufacturer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="mt-4">
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Delivery & Processing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <FormField control={form.control} name="processingTimeDays" render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Time (Days)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="minDeliveryDays" render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Delivery Days</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="maxDeliveryDays" render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Delivery Days</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <FormField control={form.control} name="isActive" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Product Status</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Active products are visible to customers
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="includeSaturdays" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Include Saturdays</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Include Saturday in delivery
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="acceptsReturns" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Accepts Returns</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Product accepts returns
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Product Options</h3>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePasteOption}
                  disabled={!copiedOption}
                >
                  Paste Option
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => append({
                    value: "",
                    stockPrice: 0,
                    price: 0,
                    inventory: 0,
                    discountType: "NONE",
                    bulkDiscount: 0,
                    minimumBulkQuantity: 1,
                    weight: 0,
                    unit: "",
                    image: [],
                    newImages: []
                  })}
                >
                  Add Option
                </Button>
              </div>
            </div>

            {fields.map((field, index) => (
              <OptionFormFields
                key={field.id}
                form={form}
                index={index}
                onCopy={handleCopyOption}
                onRemove={remove}
                calculatePricingMetrics={calculatePricingMetrics}
              />
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={setClose}
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// Option form fields component
interface OptionFormFieldsProps {
  form: any;
  index: number;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  calculatePricingMetrics: (index: number) => void;
}

const OptionFormFields: React.FC<OptionFormFieldsProps> = ({
  form,
  index,
  onCopy,
  onRemove,
  calculatePricingMetrics
}) => {
  return (
    <div className="p-4 border rounded-lg space-y-4 relative ">
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onCopy(index)}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="h-7 w-7"
          onClick={() => onRemove(index)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <p className="font-semibold text-md">Option #{index + 1}</p>

      {/* Basic Option Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`options.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5KG Premium Pack" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`options.${index}.unit`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="e.g., kg, grams" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`options.${index}.weight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" min="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Pricing Section */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Info size={16} />
          Pricing Configuration
        </h4>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name={`options.${index}.stockPrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  Stock Price (₦)
                  <span className="text-xs font-normal block">What you pay manufacturer</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      calculatePricingMetrics(index);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`options.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel >
                  Retail Price (₦)
                  <span className="text-xs font-normal block">What customers pay individually</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      calculatePricingMetrics(index);
                    }}

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Profit Margin Display */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Retail Profit Margin</div>
            <div id={`retail-margin-${index}`} className="text-lg font-bold text-gray-800">
              0%
            </div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Bulk Profit Margin</div>
            <div id={`bulk-margin-${index}`} className="text-lg font-bold text-gray-800">
              0%
            </div>
          </div>
        </div> */}

        {/* Bulk Pricing Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name={`options.${index}.discountType`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Bulk Discount Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    calculatePricingMetrics(index);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NONE">No Bulk Pricing</SelectItem>
                    <SelectItem value="PERCENTAGE">Percentage Discount</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount Discount</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`options.${index}.bulkDiscount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  {form.watch(`options.${index}.discountType`) === "PERCENTAGE"
                    ? "Discount Percentage (%)"
                    : "Discount Amount (₦)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max={form.watch(`options.${index}.discountType`) === "PERCENTAGE" ? "100" : undefined}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      calculatePricingMetrics(index);
                    }}
                    disabled={form.watch(`options.${index}.discountType`) === "NONE"}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`options.${index}.minimumBulkQuantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Bulk Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    disabled={form.watch(`options.${index}.discountType`) === "NONE"}

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Calculated Bulk Price Display */}
        {form.watch(`options.${index}.discountType`) !== "NONE" && (
          <div className="mt-4 rounded p-3">
            <div className="text-sm font-medium">Calculated Bulk Price:</div>
            <div id={`bulk-price-display-${index}`} className="text-lg font-bold">
              ₦0.00
            </div>
            <div className="text-xs mt-1">
              This price will be automatically calculated and applied for bulk orders
            </div>
          </div>
        )}
      </div>

      {/* Inventory */}
      <FormField
        control={form.control}
        name={`options.${index}.inventory`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Inventory</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Image Upload Component */}
      <ImageUploader form={form} index={index} />
    </div>
  );
};

// Image uploader component
const ImageUploader = ({ form, index }: { form: any; index: number }) => {
  const existingImages = form.watch(`options.${index}.image`) || [];
  const newFiles = form.watch(`options.${index}.newImages`) || [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentFiles = form.getValues(`options.${index}.newImages`) || [];
    form.setValue(`options.${index}.newImages`, [...currentFiles, ...acceptedFiles]);
  }, [form, index]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    onDrop,
  });

  const removeExistingImage = (imgUrl: string) => {
    const updatedImages = existingImages.filter((url: string) => url !== imgUrl);
    form.setValue(`options.${index}.image`, updatedImages);
  };

  const removeNewFile = (fileIndex: number) => {
    const updatedFiles = newFiles.filter((_: any, i: number) => i !== fileIndex);
    form.setValue(`options.${index}.newImages`, updatedFiles);
  };

  return (
    <div className="space-y-2">
      <FormLabel>Product Images</FormLabel>
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-1 text-sm text-gray-600">
          Drag & drop or click to add images
        </p>
      </div>

      {(existingImages.length > 0 || newFiles.length > 0) && (
        <div className="flex gap-2 flex-wrap mt-2">
          {existingImages.map((url: string, imgIndex: number) => (
            <div key={`existing-${imgIndex}`} className="relative h-20 w-20">
              <Image
                src={url}
                alt="Product image"
                fill
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(url)}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center shadow-md"
              >
                <Trash className="h-3 w-3" />
              </button>
            </div>
          ))}

          {newFiles.map((file: File, fileIndex: number) => (
            <div key={`new-${fileIndex}`} className="relative h-20 w-20">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                fill
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removeNewFile(fileIndex)}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center shadow-md"
              >
                <Trash className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditProductForm;