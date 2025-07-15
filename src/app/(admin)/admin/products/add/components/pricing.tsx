// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import Header from "@/app/(admin)/components/header";

// interface iProps {
//   form: any;
// }

// const AddPricing: React.FC<iProps> = ({ form }) => {
//   return (
//     <div>
//       <Header
//         title="Add product"
//         subtext="Tell your buyers all they need to know about this product "
//       />
//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="itemunit"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Item Unit</FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="45" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="quantity"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Quantity</FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="50" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormField
//         control={form.control}
//         name="price"
//         render={({ field }) => (
//           <FormItem className="w-full mb-6">
//             <FormLabel>Price</FormLabel>
//             <FormControl>
//               <Input type="text" placeholder="5000" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="processingtime"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Processing Time</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="How long does it take to prepare an order? Select a processing time." />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="usdc">Cocoa</SelectItem>
//                   <SelectItem value="usdt">Textile</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="processingtime"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Delivery location(s)</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a location" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="usdc">Cocoa</SelectItem>
//                   <SelectItem value="usdt">Textile</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormField
//         control={form.control}
//         name="acceptreturns"
//         render={({ field }) => (
//           <FormItem className="w-full mb-6">
//             <FormLabel>Do you accept returns</FormLabel>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a location" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 <SelectItem value="yes">Yes</SelectItem>
//                 <SelectItem value="no">No</SelectItem>
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// };

// export default AddPricing;

// pricing.tsx
// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { Plus, Trash } from "lucide-react";

// interface iProps {
//   form: any;
// }

// const AddPricing: React.FC<iProps> = ({ form }) => {
//   const { control, getValues, setValue } = form;
//   const options = form.watch("options") || [];

//   const addOption = () => {
//     setValue("options", [
//       ...options,
//       {
//         name: "",
//         value: "",
//         inventory: 0,
//         stockPrice: 0,
//         markupType: "PERCENTAGE",
//         markupValue: 0,
//         sellingPrice: 0,
//         weight: 0,
//         unit: "",
//         moq: 1,
//       },
//     ]);
//   };

//   const removeOption = (index: number) => {
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setValue("options", newOptions);
//   };

//   const calculateSellingPrice = (index: number) => {
//     const option = options[index];
//     if (!option) return;

//     let sellingPrice = 0;
//     if (option.markupType === "PERCENTAGE") {
//       sellingPrice = option.stockPrice * (1 + option.markupValue / 100);
//     } else {
//       sellingPrice = option.stockPrice + option.markupValue;
//     }

//     setValue(`options.${index}.sellingPrice`, Number(sellingPrice.toFixed(2)));
//   };

//   return (
//     <div>
//       <Header
//         title="Pricing & Inventory"
//         subtext="Configure product options and pricing"
//       />

//       {options.map((_:any, index:any) => (
//         <div key={index} className="mb-8 p-4 border rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">Option #{index + 1}</h3>
//             {options.length > 1 && (
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeOption(index)}
//               >
//                 <Trash size={16} />
//               </Button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.name`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Size, Color" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.value`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Value</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Large, 50KG" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.unit`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Unit</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Bag, Kg" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.weight`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight (kg)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.1"
//                       step="0.1"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(parseFloat(e.target.value) || 0);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.moq`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>MOQ (Minimum Order)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="1"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(parseInt(e.target.value) || 1);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.stockPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Cost Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       {...field}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupType`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Markup Type</FormLabel>
//                   <FormControl>
//                     <select
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e.target.value);
//                         calculateSellingPrice(index);
//                       }}
//                     >
//                       <option value="PERCENTAGE">Percentage</option>
//                       <option value="FIXED">Fixed Amount</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupValue`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     {getValues(`options.${index}.markupType`) === "PERCENTAGE"
//                       ? "Markup %"
//                       : "Markup Amount (₦)"}
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       {...field}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.sellingPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Selling Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.01"
//                       step="0.01"
//                       {...field}
//                       readOnly
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={control}
//             name={`options.${index}.inventory`}
//             render={({ field }) => (
//               <FormItem className="w-full md:w-1/2">
//                 <FormLabel>Inventory Quantity</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min="0"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(parseInt(e.target.value) || 0);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="outline"
//         className="mt-4"
//         onClick={addOption}
//       >
//         <Plus size={16} className="mr-2" />
//         Add Product Option
//       </Button>
//     </div>
//   );
// };

// export default AddPricing;

// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { Plus, Trash } from "lucide-react";
// import { useEffect } from "react";

// interface iProps {
//   form: UseFormReturn<any>;
// }

// const AddPricing: React.FC<iProps> = ({ form }) => {
//   const { control, getValues, setValue, formState } = form;
//   const options = form.watch("options") || [];

//   const addOption = () => {
//     setValue("options", [
//       ...options,
//       {
//         name: "",
//         value: "",
//         inventory: 0,
//         stockPrice: 0,
//         markupType: "PERCENTAGE",
//         markupValue: 0,
//         sellingPrice: 0,
//         weight: 0,
//         unit: "",
//         moq: 1,
//       },
//     ]);
//   };

//   const removeOption = (index: number) => {
//     if (options.length <= 1) return;
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setValue("options", newOptions);
//   };

//   const calculateSellingPrice = (index: number) => {
//     const option = options[index];
//     if (!option) return;

//     let sellingPrice = 0;
//     if (option.markupType === "PERCENTAGE") {
//       sellingPrice = option.stockPrice * (1 + option.markupValue / 100);
//     } else {
//       sellingPrice = option.stockPrice + option.markupValue;
//     }

//     setValue(`options.${index}.sellingPrice`, Number(sellingPrice.toFixed(2)));
//   };

//   // Recalculate selling prices when form values change
//   useEffect(() => {
//     options.forEach((_:any, index:any) => {
//       calculateSellingPrice(index);
//     });
//   }, [formState]);

//   return (
//     <div>
//       <Header
//         title="Pricing & Inventory"
//         subtext="Configure product options and pricing"
//       />

//       {options.map((_:any, index:any) => (
//         <div key={index} className="mb-8 p-4 border rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">Option #{index + 1}</h3>
//             {options.length > 1 && (
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeOption(index)}
//               >
//                 <Trash size={16} />
//               </Button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.name`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Size, Color" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.value`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Value</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Large, 50KG" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.unit`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Unit</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Bag, Kg" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.weight`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight (kg)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.1"
//                       step="0.1"
//                       value={field.value}
//                       onChange={(e) => {
//                         const val = parseFloat(e.target.value) || 0;
//                         field.onChange(val);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.moq`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>MOQ (Minimum Order)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="1"
//                       value={field.value}
//                       onChange={(e) => {
//                         const val = parseInt(e.target.value) || 1;
//                         field.onChange(val);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.stockPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Cost Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={field.value}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupType`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Markup Type</FormLabel>
//                   <FormControl>
//                     <select
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       value={field.value}
//                       onChange={(e) => {
//                         field.onChange(e.target.value);
//                         calculateSellingPrice(index);
//                       }}
//                     >
//                       <option value="PERCENTAGE">Percentage</option>
//                       <option value="FIXED">Fixed Amount</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupValue`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     {getValues(`options.${index}.markupType`) === "PERCENTAGE"
//                       ? "Markup %"
//                       : "Markup Amount (₦)"}
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={field.value}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.sellingPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Selling Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.01"
//                       step="0.01"
//                       value={field.value}
//                       readOnly
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={control}
//             name={`options.${index}.inventory`}
//             render={({ field }) => (
//               <FormItem className="w-full md:w-1/2">
//                 <FormLabel>Inventory Quantity</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min="0"
//                     value={field.value}
//                     onChange={(e) => {
//                       field.onChange(parseInt(e.target.value) || 0);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="outline"
//         className="mt-4"
//         onClick={addOption}
//       >
//         <Plus size={16} className="mr-2" />
//         Add Product Option
//       </Button>
//     </div>
//   );
// };

// export default AddPricing;

// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { Plus, Trash } from "lucide-react";
// import { Key, useEffect } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";

// interface iProps {
//   form: UseFormReturn<any>;
// }

// const AddPricing: React.FC<iProps> = ({ form }) => {
//   const { control, getValues, setValue, formState } = form;
//   const options = form.watch("options") || [];

//   // Add option with image field
//   const addOption = () => {
//     setValue("options", [
//       ...options,
//       {
//         name: "",
//         value: "",
//         inventory: 0,
//         stockPrice: 0,
//         markupType: "PERCENTAGE",
//         markupValue: 0,
//         sellingPrice: 0,
//         weight: 0,
//         unit: "",
//         moq: 1,
//         image: [],
//       },
//     ]);
//   };

//   // ... removeOption and calculateSellingPrice remain the same ...

//   // Image upload handler for each option
//   const onDrop = (acceptedFiles: File[], index: number) => {
//     const currentImages = getValues(`options.${index}.image`) || [];
//     const newImages = [...currentImages, ...acceptedFiles];
//     setValue(`options.${index}.image`, newImages, { shouldValidate: true });
//   };

//   // Remove image from option
//   const removeImage = (index: number, imageIndex: number) => {
//     const currentImages = [...getValues(`options.${index}.image`)];
//     currentImages.splice(imageIndex, 1);
//     setValue(`options.${index}.image`, currentImages, { shouldValidate: true });
//   };

//   // ... rest of the component ...

//   return (
//     <div>
//       <Header title="Pricing & Inventory" subtext="Configure product options and pricing" />

//       {options.map((_:any, index: any) => (
//         <div key={index} className="mb-8 p-4 border rounded-lg">
//           {/* ... other fields ... */}

//           {/* Image Upload Section */}
//           <FormField
//             control={control}
//             name={`options.${index}.image`}
//             render={({ field }) => (
//               <FormItem className="mt-6">
//                 <FormLabel>Product Images</FormLabel>
//                 <div className="flex flex-wrap gap-4 mb-4">
//                   {field.value?.map((file: string | Blob | MediaSource | StaticImport, imgIndex: Key | null | undefined) => (
//                     <div key={imgIndex as any} className="relative">
//                       <Image
//                         src={typeof file === 'string' ? file : URL.createObjectURL(file as any)}
//                         alt={`Option ${index + 1} image ${imgIndex ? imgIndex :""}`}
//                         width={100}
//                         height={100}
//                         className="rounded-md object-cover border"
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
//                         onClick={() => removeImage(index, imgIndex as any)}
//                       >
//                         <Trash size={14} />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <Dropzone 
//                   onDrop={(files: File[]) => onDrop(files, index)} 
//                   maxFiles={5 - (field.value?.length || 0)}
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       ))}
      
//       {/* ... rest of the component ... */}
//     </div>
//   );
// };

// // Dropzone component
// const Dropzone = ({ onDrop, maxFiles }: any) => {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles,
//     maxSize: 5 * 1024 * 1024, // 5MB
//     accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
//         isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
//       }`}
//     >
//       <input {...getInputProps()} />
//       <p className="text-gray-600">
//         {isDragActive
//           ? "Drop images here"
//           : "Drag & drop images here, or click to select"}
//       </p>
//       <p className="text-sm text-gray-500 mt-2">
//         PNG, JPG up to 5MB (max {maxFiles} files)
//       </p>
//     </div>
//   );
// };

// export default AddPricing;

// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { Plus, Trash, X } from "lucide-react";
// import { Key, useEffect } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";

// interface iProps {
//   form: UseFormReturn<any>;
// }

// const AddPricing: React.FC<iProps> = ({ form }) => {
//   const { control, getValues, setValue, formState } = form;
//   const options = form.watch("options") || [];

//   const addOption = () => {
//     setValue("options", [
//       ...options,
//       {
//         name: "",
//         value: "",
//         inventory: 0,
//         stockPrice: 0,
//         markupType: "PERCENTAGE",
//         markupValue: 0,
//         sellingPrice: 0,
//         weight: 0,
//         unit: "",
//         moq: 1,
//         imageFiles: [],
//       },
//     ]);
//   };

//   const removeOption = (index: number) => {
//     if (options.length <= 1) return;
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setValue("options", newOptions);
//   };

//   const calculateSellingPrice = (index: number) => {
//     const option = options[index];
//     if (!option) return;

//     let sellingPrice = 0;
//     if (option.markupType === "PERCENTAGE") {
//       sellingPrice = option.stockPrice * (1 + option.markupValue / 100);
//     } else {
//       sellingPrice = option.stockPrice + option.markupValue;
//     }

//     setValue(`options.${index}.sellingPrice`, Number(sellingPrice.toFixed(2)));
//   };

//   // Handle image upload for a specific option
//   const onDrop = (acceptedFiles: File[], index: number) => {
//     const currentFiles = getValues(`options.${index}.imageFiles`) || [];
//     const newFiles = [...currentFiles, ...acceptedFiles];
//     setValue(`options.${index}.imageFiles`, newFiles, { shouldValidate: true });
//   };

//   // Remove image from a specific option
//   const removeImage = (index: number, imageIndex: number) => {
//     const currentFiles = [...getValues(`options.${index}.imageFiles`)];
//     currentFiles.splice(imageIndex, 1);
//     setValue(`options.${index}.imageFiles`, currentFiles, { shouldValidate: true });
//   };

//   // Recalculate selling prices
//   useEffect(() => {
//     options.forEach((_:any, index:any) => {
//       calculateSellingPrice(index);
//     });
//   }, [formState]);

//   return (
//     <div>
//       <Header
//         title="Pricing & Inventory"
//         subtext="Configure product options and pricing"
//       />

//       {options.map((_:any, index:any) => (
//         <div key={index} className="mb-8 p-4 border rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">Option #{index + 1}</h3>
//             {options.length > 1 && (
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeOption(index)}
//               >
//                 <Trash size={16} />
//               </Button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.name`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Size, Color" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.value`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Option Value</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Large, 50KG" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.unit`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Unit</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Bag, Kg" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.weight`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Weight (kg)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.1"
//                       step="0.1"
//                       value={field.value}
//                       onChange={(e) => {
//                         const val = parseFloat(e.target.value) || 0;
//                         field.onChange(val);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.moq`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>MOQ (Minimum Order)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="1"
//                       value={field.value}
//                       onChange={(e) => {
//                         const val = parseInt(e.target.value) || 1;
//                         field.onChange(val);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             <FormField
//               control={control}
//               name={`options.${index}.stockPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Cost Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={field.value}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupType`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Markup Type</FormLabel>
//                   <FormControl>
//                     <select
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       value={field.value}
//                       onChange={(e) => {
//                         field.onChange(e.target.value);
//                         calculateSellingPrice(index);
//                       }}
//                     >
//                       <option value="PERCENTAGE">Percentage</option>
//                       <option value="FIXED">Fixed Amount</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.markupValue`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     {getValues(`options.${index}.markupType`) === "PERCENTAGE"
//                       ? "Markup %"
//                       : "Markup Amount (₦)"}
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       value={field.value}
//                       onChange={(e) => {
//                         const value = parseFloat(e.target.value) || 0;
//                         field.onChange(value);
//                         calculateSellingPrice(index);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`options.${index}.sellingPrice`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Selling Price (₦)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min="0.01"
//                       step="0.01"
//                       value={field.value}
//                       readOnly
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={control}
//             name={`options.${index}.inventory`}
//             render={({ field }) => (
//               <FormItem className="w-full md:w-1/2 mb-6">
//                 <FormLabel>Inventory Quantity</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min="0"
//                     value={field.value}
//                     onChange={(e) => {
//                       field.onChange(parseInt(e.target.value) || 0);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Image Upload Section */}
//           <FormField
//             control={control}
//             name={`options.${index}.imageFiles`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Images</FormLabel>
//                 <div className="flex flex-wrap gap-4 mb-4">
//                   {field.value?.map((file: Blob | MediaSource, imgIndex: Key | null | undefined) => (
//                     <div key={imgIndex} className="relative group">
//                       <div className="relative w-24 h-24 rounded-md overflow-hidden border">
//                         <Image
//                           src={URL.createObjectURL(file)}
//                           alt={`Option image`}
//                           fill
//                           className="object-cover"
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="icon"
//                           className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                           onClick={() => removeImage(index, imgIndex as any)}
//                         >
//                           <X size={14} />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 <Dropzone 
//                   onDrop={(files: File[]) => onDrop(files, index)} 
//                   maxFiles={5 - (field.value?.length || 0)}
//                   disabled={field.value?.length >= 5}
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="outline"
//         className="mt-4"
//         onClick={addOption}
//       >
//         <Plus size={16} className="mr-2" />
//         Add Product Option
//       </Button>
//     </div>
//   );
// };

// // Dropzone component
// const Dropzone = ({ onDrop, maxFiles, disabled }: any) => {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles,
//     maxSize: 5 * 1024 * 1024, // 5MB
//     accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
//     disabled,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//         disabled 
//           ? 'bg-gray-100 cursor-not-allowed' 
//           : isDragActive 
//             ? 'border-primary bg-primary/10' 
//             : 'border-gray-300 hover:border-primary/70'
//       }`}
//     >
//       <input {...getInputProps()} />
//       <p className="text-gray-600">
//         {isDragActive
//           ? "Drop images here"
//           : disabled
//             ? "Maximum 5 images reached"
//             : "Drag & drop images here, or click to select"}
//       </p>
//       <p className="text-sm text-gray-500 mt-2">
//         PNG, JPG up to 5MB (max {maxFiles} files)
//       </p>
//     </div>
//   );
// };

// export default AddPricing;

"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/app/(admin)/components/header";
import { UseFormReturn } from "react-hook-form";
import { Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Key, useCallback } from "react";

interface iProps {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
}

const AddPricing: React.FC<iProps> = ({ form, isSubmitting }) => {
  const { control, getValues, setValue, formState } = form;
  const options = form.watch("options") || [];

  const addOption = () => {
    setValue("options", [
      ...options,
      {
        name: "",
        value: "",
        inventory: 0,
        stockPrice: 0,
        markupType: "PERCENTAGE",
        markupValue: 0,
        sellingPrice: 0,
        weight: 0,
        unit: "",
        moq: 1,
        imageFiles: [],
      },
    ]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 1) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setValue("options", newOptions);
  };

  const calculateSellingPrice = (index: number) => {
    const option = options[index];
    if (!option) return;

    let sellingPrice = 0;
    if (option.markupType === "PERCENTAGE") {
      sellingPrice = option.stockPrice * (1 + option.markupValue / 100);
    } else {
      sellingPrice = option.stockPrice + option.markupValue;
    }

    setValue(`options.${index}.sellingPrice`, Number(sellingPrice.toFixed(2)));
  };

  const onDrop = useCallback((acceptedFiles: File[], index: number) => {
    const currentFiles = getValues(`options.${index}.imageFiles`) || [];
    const newFiles = [...currentFiles, ...acceptedFiles];
    setValue(`options.${index}.imageFiles`, newFiles, { shouldValidate: true });
  }, [getValues, setValue]);

  const removeImage = (index: number, imageIndex: number) => {
    const currentFiles = [...getValues(`options.${index}.imageFiles`)];
    currentFiles.splice(imageIndex, 1);
    setValue(`options.${index}.imageFiles`, currentFiles, { shouldValidate: true });
  };

  return (
    <div>
      <Header
        title="Pricing & Inventory"
        subtext="Configure product options and pricing"
      />

      {options.map((_:any, index:any) => (
        <div key={index} className="mb-8 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Option #{index + 1}</h3>
            {options.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeOption(index)}
                disabled={isSubmitting}
              >
                <Trash size={16} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              control={control}
              name={`options.${index}.name`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Option Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Size, Color" {...field} disabled={isSubmitting} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.value`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Option Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Large, 50KG" {...field} disabled={isSubmitting} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField
              control={control}
              name={`options.${index}.unit`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bag, Kg" {...field} disabled={isSubmitting} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.weight`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={field.value}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        field.onChange(val);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.moq`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>MOQ (Minimum Order)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      value={field.value}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        field.onChange(val);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <FormField
              control={control}
              name={`options.${index}.stockPrice`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Cost Price (₦)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={field.value}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                        calculateSellingPrice(index);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.markupType`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Markup Type</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        calculateSellingPrice(index);
                      }}
                      disabled={isSubmitting}
                    >
                      <option value="PERCENTAGE">Percentage</option>
                      <option value="FIXED">Fixed Amount</option>
                    </select>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.markupValue`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {getValues(`options.${index}.markupType`) === "PERCENTAGE"
                      ? "Markup %"
                      : "Markup Amount (₦)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={field.value}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                        calculateSellingPrice(index);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`options.${index}.sellingPrice`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Selling Price (₦)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={field.value}
                      readOnly
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`options.${index}.inventory`}
            render={({ field, fieldState }) => (
              <FormItem className="w-full md:w-1/2 mb-6">
                <FormLabel>Inventory Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value) || 0);
                    }}
                    disabled={isSubmitting}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Image Upload Section */}
          <FormField
            control={control}
            name={`options.${index}.imageFiles`}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <div className="flex flex-wrap gap-4 mb-4">
                  {field.value?.map((file: Blob | MediaSource, imgIndex: Key | null | undefined) => (
                    <div key={imgIndex} className="relative group">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Option image`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index, imgIndex as any)}
                          disabled={isSubmitting}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Dropzone 
                  onDrop={(files: File[]) => onDrop(files, index)} 
                  maxFiles={5 - (field.value?.length || 0)}
                  disabled={field.value?.length >= 5 || isSubmitting}
                />
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={addOption}
        disabled={isSubmitting}
      >
        <Plus size={16} className="mr-2" />
        Add Product Option
      </Button>
    </div>
  );
};

// Dropzone component
const Dropzone = ({ onDrop, maxFiles, disabled }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        disabled 
          ? 'bg-gray-100 cursor-not-allowed' 
          : isDragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-gray-300 hover:border-primary/70'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "Drop images here"
          : disabled
            ? "Maximum 5 images reached"
            : "Drag & drop images here, or click to select"}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        PNG, JPG up to 5MB (max {maxFiles} files)
      </p>
    </div>
  );
};

export default AddPricing;