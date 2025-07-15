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
// import { Textarea } from "@/components/ui/textarea";
// import Header from "@/app/(admin)/components/header";

// interface iProps {
//   form: any;
// }

// const AddProduct: React.FC<iProps> = ({ form }) => {
//   return (
//     <div>
//       <Header
//         title="Add product"
//         subtext="Tell your buyers all they need to know about this product "
//       />

//       <div className="flex gap-6 my-6">
//         <FormField
//           control={form.control}
//           name="productname"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Nescafe Classic Coffe"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="brand"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Brand</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select A Brand" />
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
//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="productcategory"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Category</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Admin role" />
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
//           name="shortdescription"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Short Description</FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="Oryza Sativa" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="fulldescription"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Full Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us a little bit about yourself"
//                   className="resize-none h-[169px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// product-details.tsx
// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { useGetManufacturers } from "@/services/manufacturers";

// interface iProps {
//   form: UseFormReturn<any>;
// }

  

// const AddProduct: React.FC<iProps> = ({ form }) => {
//   // Mock data - replace with actual API calls

//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//     refetchManufacturers,
//     setManufacturersFilter,
//   } = useGetManufacturers();

//   console.log(getManufacturersData)
//   const manufacturers = [
//     { id: "3", name: "Naija Foods Ltd." },
//     { id: "4", name: "Green Foods" },
//     { id: "6", name: "Lagos Agro" },
//     { id: "10", name: "African Foods" },
//   ];

//   const categories = [
//     { id: "1", name: "Dry Staples & Grains" },
//     { id: "2", name: "Spices & Seasonings" },
//     { id: "3", name: "Oils & Fats" },
//   ];

//   return (
//     <div>
//       <Header
//         title="Add product"
//         subtext="Tell your buyers all they need to know about this product"
//       />

//       <div className="my-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Premium Quality Rice"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="manufacturerId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Manufacturer</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select manufacturer" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {getManufacturersData?.data?.map((manu:any) => (
//                     <SelectItem key={manu.id} value={manu.id}>
//                       {manu.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="categoryId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Category</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="mb-6">
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Detailed product description..."
//                   className="min-h-[120px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { useGetManufacturers } from "@/services/manufacturers";
// import { useEffect } from "react";

// interface iProps {
//   form: UseFormReturn<any>;
// }

// const AddProduct: React.FC<iProps> = ({ form }) => {
//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//   } = useGetManufacturers();

//   const categories = [
//     { id: "1", name: "Dry Staples & Grains" },
//     { id: "2", name: "Spices & Seasonings" },
//     { id: "3", name: "Oils & Fats" },
//   ];

//   // Set default manufacturer if available
//   useEffect(() => {
//     if (getManufacturersData?.data?.length > 0 && !form.getValues("manufacturerId")) {
//       form.setValue("manufacturerId", getManufacturersData.data[0].id.toString());
//     }
//   }, [getManufacturersData, form]);

//   return (
//     <div>
//       <Header
//         title="Add product"
//         subtext="Tell your buyers all they need to know about this product"
//       />

//       <div className="my-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Premium Quality Rice"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="manufacturerId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Manufacturer</FormLabel>
//               <Select 
//                 onValueChange={field.onChange} 
//                 value={field.value}
//                 disabled={getManufacturersIsLoading}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select manufacturer" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {getManufacturersIsLoading ? (
//                     <SelectItem value="select">Loading manufacturers...</SelectItem>
//                   ) : (
//                     getManufacturersData?.data?.map((manu:any) => (
//                       <SelectItem key={manu.id} value={manu.id.toString()}>
//                         {manu.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="categoryId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Category</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="mb-6">
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Detailed product description..."
//                   className="min-h-[120px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


// "use client";

// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import Header from "@/app/(admin)/components/header";
// import { UseFormReturn } from "react-hook-form";
// import { useGetManufacturers } from "@/services/manufacturers";
// import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";

// interface iProps {
//   form: UseFormReturn<any>;
// }

// const AddProduct: React.FC<iProps> = ({ form }) => {
//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//   } = useGetManufacturers();

//   const categories = [
//     { id: "1", name: "Dry Staples & Grains" },
//     { id: "2", name: "Spices & Seasonings" },
//     { id: "3", name: "Oils & Fats" },
//   ];

//   // Set default manufacturer if available
//   useEffect(() => {
//     if (getManufacturersData?.data?.length > 0 && !form.getValues("manufacturerId")) {
//       form.setValue("manufacturerId", getManufacturersData.data[0].id.toString());
//     }
//   }, [getManufacturersData, form]);

//   return (
//     <div>
//       <Header
//         title="Add product"
//         subtext="Tell your buyers all they need to know about this product"
//       />

//       <div className="my-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Premium Quality Rice"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="flex gap-6 mb-6">
//         <FormField
//           control={form.control}
//           name="manufacturerId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Manufacturer</FormLabel>
//               <Select 
//                 onValueChange={field.onChange} 
//                 value={field.value}
//                 disabled={getManufacturersIsLoading}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select manufacturer" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {getManufacturersIsLoading ? (
//                     <SelectItem value="loading">Loading manufacturers...</SelectItem>
//                   ) : (
//                     getManufacturersData?.data?.map((manu: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
//                       <SelectItem key={manu.id} value={manu.id ?manu.id.toString():""}>
//                         {manu.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="categoryId"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Product Category</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="mb-6">
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Detailed product description..."
//                   className="min-h-[120px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/app/(admin)/components/header";
import { UseFormReturn } from "react-hook-form";
import { useGetManufacturers } from "@/services/manufacturers";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";

interface iProps {
  form: UseFormReturn<any>;
}

const AddProduct: React.FC<iProps> = ({ form }) => {
  const {
    getManufacturersData,
    getManufacturersIsLoading,
  } = useGetManufacturers();

  const categories = [
    { id: "1", name: "Dry Staples & Grains" },
    { id: "2", name: "Spices & Seasonings" },
    { id: "3", name: "Oils & Fats" },
  ];

  useEffect(() => {
    if (getManufacturersData?.data?.length > 0 && !form.getValues("manufacturerId")) {
      form.setValue("manufacturerId", getManufacturersData.data[0].id.toString());
    }
  }, [getManufacturersData, form]);

  return (
    <div>
      <Header
        title="Add product"
        subtext="Tell your buyers all they need to know about this product"
      />

      <div className="my-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Premium Quality Rice"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-6 mb-6">
        <FormField
          control={form.control}
          name="manufacturerId"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Manufacturer</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                disabled={getManufacturersIsLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getManufacturersIsLoading ? (
                    <SelectItem value="loading">Loading manufacturers...</SelectItem>
                  ) : (
                    getManufacturersData?.data?.map((manu: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                      <SelectItem key={manu.id} value= {manu.id ? manu.id.toString():""}>
                        {manu.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed product description..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddProduct;