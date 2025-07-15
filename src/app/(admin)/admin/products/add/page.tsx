// "use client";

// import AddProduct from "./components/product-details";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import AddPricing from "./components/pricing";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function AddProductsPage() {
//   const [activeTab, setActiveTab] = useState<string>("add-product");
//   const formSchema = z.object({
//     productname: z.string().min(5, "Name must be greater 4"),
//     brand: z.string(),
//     fulldescription: z
//       .string()
//       .min(10, {
//         message: "Bio must be at least 10 characters.",
//       })
//       .max(160, {
//         message: "Bio must not be longer than 30 characters.",
//       }),
//     shortdescription: z.string(),
//     productcategory: z.string(),
//     itemunit: z.number(),
//     quantity: z.string(),
//     price: z.string().min(10, { message: "Greater than 10" }),
//     processingtime: z.string(),
//     location: z.string(),
//     acceptreturns: z.string(),
//   });
//   const formData = {
//     productname: "",
//     brand: "",
//     productcategory: "",
//     fulldescription: "",
//     shortdescription: "",
//     price: "",
//     quantity: "",
//     itemunit: 0,
//     processingtime: "",
//     location: "",
//     acceptreturns: "",
//   };
//   type FormSchemaType = z.infer<typeof formSchema>;
//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//   });
//   async function onSubmit(values: FormSchemaType) {
//     const isValid = await trigger();
//     if (isValid) {
//       if (activeTab === "add-product") {
//         setActiveTab("add-pricing");
//       }
//     } else {
//       alert("Please complete the required fields.");
//     }
//     console.warn(values);
//   }

//   const {
//     watch,
//     formState: { errors },
//     trigger,
//   } = form;
//   console.log(errors);

//   const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     setActiveTab("add-pricing");
//   };
//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 mt-6">
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}
//           <div className="gap-5 justify-end flex">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab("add-product");
//                 }}
//               >
//                 Cancel
//               </Button>
//             )}
            
//             <Button
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//             >
//               Next
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }

// "use client";

// import AddProduct from "./components/product-details";
// import AddPricing from "./components/pricing";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function AddProductsPage() {
//   const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");

//   const formSchema = z.object({
//     productname: z.string().min(5, "Name must be greater than 4"),
//     brand: z.string(),
//     fulldescription: z.string(),
//     shortdescription: z.string(),
//     productcategory: z.string(),
//     itemunit: z.number(),
//     quantity: z.string(),
//     price: z.string(),
//     processingtime: z.string(),
//     location: z.string(),
//     acceptreturns: z.string(),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       productname: "",
//       brand: "",
//       productcategory: "",
//       fulldescription: "",
//       shortdescription: "",
//       price: "",
//       quantity: "",
//       itemunit: 0,
//       processingtime: "",
//       location: "",
//       acceptreturns: "",
//     },
//   });

//   const {
//     trigger,
//     formState: { errors },
//   } = form;

//   // Final submit after both steps
//   const handleFinalSubmit = async () => {
//     const isValid = await trigger();
//     if (!isValid) {
//       alert("Please complete all required fields.");
//       return;
//     }

//     const values = form.getValues();
//     console.log("Final Submitted Data:", values);

//     // You can now call your API here to persist the product + pricing
//   };

//   // Handles both steps
//   const onSubmit = async () => {
//     const isValid = await trigger();
//     if (!isValid) {
//       alert("Please complete all required fields.");
//       return;
//     }

//     if (activeTab === "add-product") {
//       setActiveTab("add-pricing");
//     } else {
//       await handleFinalSubmit();
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit();
//         }} className="mb-8 mt-6">
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}

//           <div className="flex justify-end gap-5">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 type="button"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={() => setActiveTab("add-product")}
//               >
//                 Back
//               </Button>
//             )}
//             <Button
//               type="submit"
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//             >
//               {activeTab === "add-product" ? "Next" : "Submit"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }

// add-products-page.tsx




// "use client";

// import AddProduct from "./components/product-details";
// import AddPricing from "./components/pricing";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// // import { apiClient } from "@/app/(admin)/admin/manufacturers/apiClient";

// import axios from 'axios';
// import { Storage } from '@/lib/utils'; // Make sure the path to your Storage utility is correct

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Your API's base URL
// });

// // Add a request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // Get the token from storage
//     const token = Storage.get('token');

//     // If the token exists, add it to the Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );


// // types.ts
// export type ProductOption = {
//   name: string;
//   value: string;
//   image?: string[];
//   inventory: number;
//   stockPrice: number;
//   markupType: "PERCENTAGE" | "FIXED";
//   markupValue: number;
//   sellingPrice: number;
//   weight: number;
//   unit: string;
//   moq: number;
// };

// export type ProductFormValues = {
//   name: string;
//   description: string;
//   categoryId: string;
//   manufacturerId: string;
//   options: ProductOption[];
//   type?: string;
// };

// export default function AddProductsPage() {
//   const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formSchema = z.object({
//     name: z.string(),
//     description: z.string(),
//     categoryId: z.string(),
//     manufacturerId: z.string(),
//     options: z.array(
//       z.object({
//         name: z.string(),
//         value: z.string(),
//         inventory: z.number(),
//         stockPrice: z.number(),
//         markupType: z.enum(["PERCENTAGE", "FIXED"]),
//         markupValue: z.number(),
//         sellingPrice: z.number(),
//         weight: z.number(),
//         unit: z.string(),
//         moq: z.number(),
//       })
//     ),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       categoryId: "",
//       manufacturerId: "",
//       options: [
//         {
//           name: "",
//           value: "",
//           inventory: 0,
//           stockPrice: 0,
//           markupType: "PERCENTAGE",
//           markupValue: 0,
//           sellingPrice: 0,
//           weight: 0,
//           unit: "",
//           moq: 1,
//         },
//       ],
//     },
//   });

//   const handleFinalSubmit = async (values: FormSchemaType) => {
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         ...values,
//         categoryId: parseInt(values.categoryId),
//         manufacturerId: parseInt(values.manufacturerId),
//         type: "platform",
//       };

//       const response = await apiClient.post("/admin/products", payload);

//       if (response.data.success) {
//         toast.success("Product created successfully");
//         form.reset();
//       } else {
//         throw new Error(response.data.error || "Failed to create product");
//       }
//     } catch (error: any) {
//       console.error("Creation failed:", error);
//       toast.error(error.message || "Failed to create product");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onSubmit = async () => {
//     const isValid = await form.trigger();
//     if (!isValid) return;

//     if (activeTab === "add-product") {
//       setActiveTab("add-pricing");
//     } else {
//       handleFinalSubmit(form.getValues());
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSubmit();
//           }}
//           className="mb-8 mt-6"
//         >
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}

//           <div className="flex justify-end gap-5 mt-8">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 type="button"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={() => setActiveTab("add-product")}
//                 disabled={isSubmitting}
//               >
//                 Back
//               </Button>
//             )}
//             <Button
//               type="submit"
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
             
//             >
//               {activeTab === "add-product" ? "Next" : "Create Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }

// "use client";

// import AddProduct from "./components/product-details";
// import AddPricing from "./components/pricing";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import axios from 'axios';
// import { Storage } from '@/lib/utils';
// import { useRouter } from "next/navigation";

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
// });

// // Add token refresh mechanism
// const refreshTokens = async () => {
//   try {
//     const response = await axios.post('/api/auth/refresh');
//     Storage.set('token', response.data.accessToken);
//     return response.data.accessToken;
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     throw error;
//   }
// };

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = Storage.get('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for token refresh
// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newToken = await refreshTokens();
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export type ProductOption = {
//   name: string;
//   value: string;
//   image?: string[];
//   inventory: number;
//   stockPrice: number;
//   markupType: "PERCENTAGE" | "FIXED";
//   markupValue: number;
//   sellingPrice: number;
//   weight: number;
//   unit: string;
//   moq: number;
// };

// export type ProductFormValues = {
//   name: string;
//   description: string;
//   categoryId: string;
//   manufacturerId: string;
//   options: ProductOption[];
//   type?: string;
// };

// export default function AddProductsPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formSchema = z.object({
//     name: z.string(),
//     description: z.string(),
//     categoryId: z.string(),
//     manufacturerId: z.string(),
//     options: z.array(
//       z.object({
//         name: z.string(),
//         value: z.string(),
//         inventory: z.number(),
//         stockPrice: z.number(),
//         markupType: z.enum(["PERCENTAGE", "FIXED"]),
//         markupValue: z.number(),
//         sellingPrice: z.number(),
//         weight: z.number(),
//         unit: z.string(),
//         moq: z.number(),
//       })
//     ),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       categoryId: "",
//       manufacturerId: "",
//       options: [
//         {
//           name: "",
//           value: "",
//           inventory: 0,
//           stockPrice: 0,
//           markupType: "PERCENTAGE",
//           markupValue: 0,
//           sellingPrice: 0,
//           weight: 0,
//           unit: "",
//           moq: 1,
//         },
//       ],
//     },
//   });

//   const handleFinalSubmit = async (values: FormSchemaType) => {
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         ...values,
//         categoryId: parseInt(values.categoryId),
//         manufacturerId: parseInt(values.manufacturerId),
//         type: "platform",
//         criticalLevel: 5,    // Default value
//         targetLevel: 50,     // Default value
//         stockAlert: false,   // Default value
//         options: values.options.map(option => ({
//           ...option,
//           image: [],  // Default empty image array
//           price: option.sellingPrice,  // Add price field
//           lowStockThreshold: 5  // Default value
//         })),
//       };

//       const response = await apiClient.post("/admin/products", payload);

//       if (response.data.success) {
//         toast.success("Product created successfully");
//         form.reset();
//         router.push("/admin/products");
//       } else {
//         throw new Error(response.data.error || "Failed to create product");
//       }
//     } catch (error: any) {
//       console.error("Creation failed:", error);
      
//       let errorMessage = "Failed to create product";
//       if (error.response) {
//         if (error.response.status === 401) {
//           errorMessage = "Session expired. Please log in again.";
//         } else if (error.response.data?.error) {
//           errorMessage = error.response.data.error;
//         } else if (error.response.data?.message) {
//           errorMessage = error.response.data.message;
//         }
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onSubmit = async () => {
//     const isValid = await form.trigger();
//     if (!isValid) return;

//     if (activeTab === "add-product") {
//       setActiveTab("add-pricing");
//     } else {
//       await handleFinalSubmit(form.getValues());
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSubmit();
//           }}
//           className="mb-8 mt-6"
//         >
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}

//           <div className="flex justify-end gap-5 mt-8">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 type="button"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={() => setActiveTab("add-product")}
//                 disabled={isSubmitting}
//               >
//                 Back
//               </Button>
//             )}
//             <Button
//               type="submit"
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Processing..." : 
//                 activeTab === "add-product" ? "Next" : "Create Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }


// "use client";

// import AddProduct from "./components/product-details";
// import AddPricing from "./components/pricing";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Storage } from '@/lib/utils';
// import { useRouter } from "next/navigation";
// import { useCreateProduct } from "@/services/products";
// import axios from 'axios';

// // API Client setup with interceptors
// const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || '/api' });

// // Add interceptors (same as before)
// apiClient.interceptors.request.use(/* ... */);
// apiClient.interceptors.response.use(/* ... */);

// // Product option type
// export type ProductOption = {
//   name: string;
//   value: string;
//   image?: string[];
//   inventory: number;
//   stockPrice: number;
//   markupType: "PERCENTAGE" | "FIXED";
//   markupValue: number;
//   sellingPrice: number;
//   weight: number;
//   unit: string;
//   moq: number;
// };

// export default function AddProductsPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");
//   const { createProduct, isCreating } = useCreateProduct(() => {
//     router.push("/admin/products");
//   });

//   // Form schema with enhanced validation
//   const formSchema = z.object({
//     name: z.string().min(3, "Product name must be at least 3 characters"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
//     categoryId: z.string().min(1, "Category is required"),
//     manufacturerId: z.string().min(1, "Manufacturer is required"),
//     options: z.array(
//       z.object({
//         name: z.string().min(1, "Option name is required"),
//         value: z.string().min(1, "Option value is required"),
//         inventory: z.number().min(0, "Inventory must be at least 0"),
//         stockPrice: z.number().min(0.01, "Cost price must be greater than 0"),
//         markupType: z.enum(["PERCENTAGE", "FIXED"]),
//         markupValue: z.number().min(0, "Markup must be at least 0"),
//         sellingPrice: z.number().min(0.01, "Selling price must be greater than 0"),
//         weight: z.number().min(0.1, "Weight must be at least 0.1"),
//         unit: z.string().min(1, "Unit is required"),
//         moq: z.number().min(1, "MOQ must be at least 1"),
//       })
//     ).min(1, "At least one product option is required"),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       categoryId: "",
//       manufacturerId: "",
//       options: [{
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
//       }],
//     },
//   });

//   // NEW: Upload images for product options
//   const uploadOptionImages = async (options: ProductOption[]) => {
//     const uploadPromises = options.map(async (option) => {
//       if (!option.image || option.image.length === 0) return [];
      
//       try {
//         const formData = new FormData();
//         option.image.forEach(file => formData.append("images", file));
//         formData.append("folder", "products");
        
//         const response = await apiClient.post("/upload", formData);
//         return response.data.urls || [];
//       } catch (error) {
//         console.error("Image upload failed:", error);
//         return [];
//       }
//     });

//     return Promise.all(uploadPromises);
//   };

//   const handleFinalSubmit = async (values: FormSchemaType) => {
//     try {
//       // Upload option images
//       const imageUrls = await uploadOptionImages(values.options);
      
//       // Prepare options with image URLs
//       const optionsWithImages = values.options.map((option, index) => ({
//         ...option,
//         image: imageUrls[index] || [],
//         price: option.sellingPrice,  // Add price field
//         lowStockThreshold: 5          // Default value
//       }));

//       // Create payload
//       const payload = {
//         name: values.name,
//         description: values.description,
//         categoryId: parseInt(values.categoryId),
//         manufacturerId: parseInt(values.manufacturerId),
//         type: "platform",
//         criticalLevel: 5,    // Default value
//         targetLevel: 50,     // Default value
//         stockAlert: false,   // Default value
//         options: optionsWithImages
//       };

//       // Create product
//       await createProduct(payload as any);
      
//     } catch (error: any) {
//       console.error("Creation failed:", error);
//       const errorMessage = error?.response?.data?.error || 
//                           error.message || 
//                           "Failed to create product";
//       toast.error(errorMessage);
//     }
//   };

//   const onSubmit = async () => {
//     const isValid = await form.trigger();
//     if (!isValid) return;

//     if (activeTab === "add-product") {
//       setActiveTab("add-pricing");
//     } else {
//       await handleFinalSubmit(form.getValues());
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 mt-6">
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}

//           <div className="flex justify-end gap-5 mt-8">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 type="button"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={() => setActiveTab("add-product")}
//                 disabled={isCreating}
//               >
//                 Back
//               </Button>
//             )}
//             <Button
//               type="submit"
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//               disabled={isCreating}
//             >
//               {isCreating ? "Processing..." : 
//                 activeTab === "add-product" ? "Next" : "Create Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }

// "use client";

// import AddProduct from "./components/product-details";
// import AddPricing from "./components/pricing";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Storage } from '@/lib/utils';
// import { useRouter } from "next/navigation";
// import { useCreateProduct } from "@/services/products";
// import axios from 'axios';

// // API Client with interceptors
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
// });

// // Add request interceptor for token handling
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = Storage.get('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for token refresh
// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post('/api/auth/refresh');
//         Storage.set('token', response.data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Product option type with image files
// export type ProductOption = {
//   name: string;
//   value: string;
//   imageFiles?: File[]; // Client-side only
//   images?: string[];   // Server-side URLs
//   inventory: number;
//   stockPrice: number;
//   markupType: "PERCENTAGE" | "FIXED";
//   markupValue: number;
//   sellingPrice: number;
//   weight: number;
//   unit: string;
//   moq: number;
// };

// export default function AddProductsPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");
//   const { createProduct, isCreating } = useCreateProduct(() => {
//     router.push("/admin/products");
//   });

//   // Form schema with validation
//   const formSchema = z.object({
//     name: z.string(),
//     description: z.string(),
//     categoryId: z.string(),
//     manufacturerId: z.string(),
//     options: z.array(
//       z.object({
//         name: z.string(),
//         value: z.string(),
//         inventory: z.number(),
//         stockPrice: z.number(),
//         markupType: z.enum(["PERCENTAGE", "FIXED"]),
//         markupValue: z.number(),
//         sellingPrice: z.number(),
//         weight: z.number(),
//         unit: z.string(),
//         moq: z.number(),
//         imageFiles: z.array(z.instanceof(File)).optional(), // Client-side files
//       })
//     ).min(1, "At least one product option is required"),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       categoryId: "",
//       manufacturerId: "",
//       options: [{
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
//       }],
//     },
//   });

//   // Upload images to backend
//   const uploadImages = async (files: File[]): Promise<string[]> => {
//     if (!files || files.length === 0) return [];
    
//     try {
//       const formData = new FormData();
//       files.forEach(file => formData.append("images", file));
//       formData.append("folder", "products");
      
//       const response = await apiClient.post("/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response.data.urls || [];
//     } catch (error: any) {
//       console.error("Image upload failed:", error);
//       const errorMessage = error.response?.data?.error || 
//                           error.message || 
//                           "Image upload failed";
//       toast.error(errorMessage);
//       throw error;
//     }
//   };

//   const handleFinalSubmit = async (values: FormSchemaType) => {
//     try {
//       // Upload images for each option
//       const updatedOptions = await Promise.all(
//         values.options.map(async (option) => {
//           if (option.imageFiles && option.imageFiles.length > 0) {
//             const imageUrls = await uploadImages(option.imageFiles);
//             return {
//               ...option,
//               images: imageUrls,
//               // Remove client-only field
//               imageFiles: undefined,
//             };
//           }
//           return {
//             ...option,
//             images: [],
//             imageFiles: undefined,
//           };
//         })
//       );

//       // Create payload
//       const payload = {
//         name: values.name,
//         description: values.description,
//         categoryId: parseInt(values.categoryId),
//         manufacturerId: parseInt(values.manufacturerId),
//         type: "platform",
//         criticalLevel: 5,    // Default value
//         targetLevel: 50,     // Default value
//         stockAlert: false,   // Default value
//         options: updatedOptions.map(option => ({
//           ...option,
//           price: option.sellingPrice,  // Add price field
//           lowStockThreshold: 5          // Default value
//         })),
//       };

//       // Create product
//       await createProduct(payload as any);
      
//     } catch (error) {
//       console.error("Product creation failed:", error);
//       // Error is handled by useCreateProduct hook
//     }
//   };

//   const onSubmit = async () => {
//     const isValid = await form.trigger();
//     if (!isValid) return;

//     if (activeTab === "add-product") {
//       setActiveTab("add-pricing");
//     } else {
//       await handleFinalSubmit(form.getValues());
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit();
//         }} className="mb-8 mt-6">
//           {activeTab === "add-pricing" ? (
//             <AddPricing form={form} />
//           ) : (
//             <AddProduct form={form} />
//           )}

//           <div className="flex justify-end gap-5 mt-8">
//             {activeTab === "add-pricing" && (
//               <Button
//                 variant="outline"
//                 type="button"
//                 className="w-auto py-4 px-[3rem] font-bold text-base"
//                 size="xl"
//                 onClick={() => setActiveTab("add-product")}
//                 disabled={isCreating}
//               >
//                 Back
//               </Button>
//             )}
//             <Button
//               type="submit"
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//               disabled={isCreating}
//             >
//               {isCreating ? "Processing..." : 
//                 activeTab === "add-product" ? "Next" : "Create Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </section>
//   );
// }

"use client";

import AddProduct from "./components/product-details";
import AddPricing from "./components/pricing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/(admin)/admin/manufacturers/apiClient";
import { routes } from "@/services/api-routes/index";
import { ErrorHandler } from "@/services/errorHandler";

// Product option type
export type ProductOption = {
  name: string;
  value: string;
  imageFiles?: File[];
  images?: string[];
  inventory: number;
  stockPrice: number;
  markupType: "PERCENTAGE" | "FIXED";
  markupValue: number;
  sellingPrice: number;
  weight: number;
  unit: string;
  moq: number;
};

export default function AddProductsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"add-product" | "add-pricing">("add-product");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form schema with validation
  const formSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    categoryId: z.string().min(1, "Category is required"),
    manufacturerId: z.string().min(1, "Manufacturer is required"),
    options: z.array(
      z.object({
        name: z.string().min(1, "Option name is required"),
        value: z.string().min(1, "Option value is required"),
        inventory: z.number().min(0, "Inventory cannot be negative"),
        stockPrice: z.number().min(0.01, "Cost price must be at least 0.01"),
        markupType: z.enum(["PERCENTAGE", "FIXED"]),
        markupValue: z.number().min(0, "Markup value cannot be negative"),
        sellingPrice: z.number().min(0.01, "Selling price must be at least 0.01"),
        weight: z.number().min(0.1, "Weight must be at least 0.1kg"),
        unit: z.string().min(1, "Unit is required"),
        moq: z.number().min(1, "MOQ must be at least 1"),
        imageFiles: z.array(z.instanceof(File)).optional(),
      })
    ).min(1, "At least one product option is required"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      manufacturerId: "",
      options: [{
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
      }],
    },
  });

  // Upload images to backend
  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) return [];
    
    try {
      const formData = new FormData();
      files.forEach(file => formData.append("images", file));
      formData.append("folder", "products");
      
      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.urls || [];
    } catch (error: any) {
      console.error("Image upload failed:", error);
      throw new Error(error.response?.data?.error || error.message || "Image upload failed");
    }
  };

  const createProduct = async (payload: any) => {
    try {
      setIsSubmitting(true);
      const response = await apiClient.post(routes.createProduct(), payload);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async (values: FormSchemaType) => {
    try {
      // Upload images for each option
      const optionsWithImages = await Promise.all(
        values.options.map(async (option) => {
          let images: string[] = [];
          if (option.imageFiles && option.imageFiles.length > 0) {
            images = await uploadImages(option.imageFiles);
          }
          return {
            ...option,
            images,
            imageFiles: undefined, // Remove client-only field
          };
        })
      );

      // Create payload
      const payload = {
        name: values.name,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        manufacturerId: parseInt(values.manufacturerId),
        type: "platform",
        criticalLevel: 5,
        targetLevel: 50,
        stockAlert: false,
        options: optionsWithImages.map(option => ({
          value: option.value,
          price: option.sellingPrice,
          moq: option.moq,
          images: option.images,
          inventory: option.inventory,
          stockPrice: option.stockPrice,
          markupType: option.markupType,
          markupValue: option.markupValue,
          sellingPrice: option.sellingPrice,
          weight: option.weight,
          unit: option.unit,
          lowStockThreshold: 5
        })),
      };

      // Create product
      const response = await createProduct(payload);
      
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (error: any) {
      console.error("Product creation failed:", error);
      
      // Handle specific error cases
      if (error.message.includes("name")) {
        form.setError("name", { 
          type: "manual", 
          message: "A product with this name already exists" 
        });
        setActiveTab("add-product");
      } else if (error.message.includes("category")) {
        form.setError("categoryId", { 
          type: "manual", 
          message: "Invalid category selected" 
        });
        setActiveTab("add-product");
      } else if (error.message.includes("manufacturer")) {
        form.setError("manufacturerId", { 
          type: "manual", 
          message: "Invalid manufacturer selected" 
        });
        setActiveTab("add-product");
      } else {
        const errorMessage = ErrorHandler(error) || "Failed to create product";
        toast.error(errorMessage);
      }
    }
  };

  const onSubmit = async () => {
    try {
      // Validate current tab fields
      const fields = activeTab === "add-product" 
        ? ["name", "description", "categoryId", "manufacturerId"] 
        : ["options"];
      
      const isValid = await form.trigger(fields as any);
      if (!isValid) return;

      if (activeTab === "add-product") {
        setActiveTab("add-pricing");
      } else {
        await handleFinalSubmit(form.getValues());
      }
    } catch (error) {
      toast.error("Validation failed. Please check your inputs.");
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="mb-8 mt-6">
          {activeTab === "add-pricing" ? (
            <AddPricing form={form} isSubmitting={isSubmitting} />
          ) : (
            <AddProduct form={form} />
          )}

          <div className="flex justify-end gap-5 mt-8">
            {activeTab === "add-pricing" && (
              <Button
                variant="outline"
                type="button"
                className="w-auto py-4 px-[3rem] font-bold text-base"
                size="xl"
                onClick={() => setActiveTab("add-product")}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              variant="warning"
              className="w-auto px-[3rem] py-4 font-bold text-base"
              size="xl"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : 
                activeTab === "add-product" ? "Next" : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}