// "use client";

// import Header from "@/app/(admin)/components/header";
// import { Card, CardContent } from "@/components/ui/card";
// import SupplierManagementCard from "@/components/widgets/supplier-management";
// import { useEffect, useState } from "react";
// import {
//   useDeleteManufacturerProduct,
//   useGetManufacturerInfo,
//   useGetManufacturerProducts,
//   useGetManufacturers,
//   useUpdateManufacturerStatus,
// } from "@/services/manufacturers";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ChevronLeft } from "lucide-react";
// import EditManufacturer from "./edit-manufacturer";
// import DeleteContent from "@/app/(admin)/components/delete-content";
// import ViewProduct from "@/app/(admin)/admin/products/components/view-product";
// import EditProduct from "@/app/(admin)/admin/products/components/edit-products";
// import ProductDataTable from "@/app/(admin)/admin/products/components/data-table";
// import { InputFilter } from "@/app/(admin)/components/input-filter";
// import { SelectFilter } from "@/app/(admin)/components/select-filter";
// import DatePickerWithRange from "@/components/ui/date-picker";
// import { productTypeList } from "@/constant";
// import { capitalizeFirstLetter, showSuccessAlert } from "@/lib/utils";
// interface iProps {
//   manufacturerId: string;
// }

// const ManufacturerDetails: React.FC<iProps> = ({ manufacturerId }) => {

//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [manufacturerStatus, setManufacturerStatus] = useState<boolean>(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const [tab, setTab] = useState<string>("update");
//   const [filter, setFilter] = useState<string>("");
//   const [status, setStatus] = useState<string>("");
//   const [pageSize, setPageSize] = useState<string>("10");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
//   const onPageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//     refetchManufacturers,
//     setManufacturersFilter,
//   } = useGetManufacturers();
  
//   console.log("manufac", getManufacturersData);
  
//   const findManufacturerById = (id: string) => {
//     if (!getManufacturersData?.data) return null;
    
//     return getManufacturersData.data.find((manufacturer: { id: any }) => 
//       // Convert both IDs to string for consistent comparison
//       String(manufacturer.id) === String(id)
//     );
//   };
  
//   const manufacturer = findManufacturerById(manufacturerId);
//   console.log("find", manufacturer);

//   const item = {
//     logo: "/images/bladmin-login.jpg",
//     total: "6,700",
//     status: false,
//     name: "Mutiu",
//     email: "mutiu@gmail.com",
//     country: "Nigeria",
//     contactPerson: "Mutiu Garuba",
//     id: "1122-5",
//     phone: "+2349011223321",
//     createdAt: "",
//     updatedAt: "",
//   };

//   const {
//     getManufacturerInfoData: data,
//     getManufacturerInfoIsLoading,
//     refetchManufacturerInfo,
//     setManufacturerInfoFilter,
//   } = useGetManufacturerInfo();

//   useEffect(() => {
//     setManufacturerInfoFilter(manufacturerId);
//   }, [manufacturerId]);

//   console.log(data);

//   const {
//     getManufacturerProductsData,
//     getManufacturerProductsError,
//     getManufacturerProductsIsLoading,
//     refetchManufacturerProducts,
//     setManufacturerProductsFilter,
//   } = useGetManufacturerProducts();
//   const { deleteProductData, deleteProductIsLoading, deleteProductPayload } =
//     useDeleteManufacturerProduct((res: any) => {
//       refetchManufacturerProducts();
//       setOpen(false);
//     });
//   const {
//     updateManufacturerStatusData,
//     updateManufacturerStatusIsLoading,
//     updateManufacturerStatusPayload,
//   } = useUpdateManufacturerStatus((res: any) => {
//     console.log(res);
//     refetchManufacturerInfo();
//     showSuccessAlert("Manufacturer status updated succcessfully!");
//   });
//   const updatePayload = {
//     status: true,
//   };
//   const payload = {
//     // search: filter,
//     page: currentPage,
//     pageSize,
//     type: status,
//   };

//   const handleViewProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("view");
//     setOpen(true);
//   };

//   const handleEditProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("edit");
//     setOpen(true);
//   };

//   const handleDeleteProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("delete-product");
//     setOpen(true);
//   };

//   useEffect(() => {
//     setManufacturerProductsFilter({ manufacturerId, data: payload });
//   }, [filter, status, pageSize]);

//   const renderItem = () => {
//     switch (tab) {
//       case "update":
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//       case "delete":
//         return (
//           <DeleteContent
//             handleClose={() => setOpen(false)}
//             title="manufacturer"
//             handleClick={() => deleteProductPayload(manufacturerId)}
//           />
//         );
//       // case "view":
//       //   return <ViewProduct setClose={() => setOpen(false)} productData={manufacturer.products} />;
//       case "view":
//         return <ViewProduct setClose={() => setOpen(false)} productData={selectedProduct} />;
//       case "edit":
//         return <EditProduct setClose={() => setOpen(false)} />;
//       case "delete-product":
//         return (
//           <DeleteContent handleClose={() => setOpen(false)} title="Product" />
//         );
//       default:
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//     }
//   };

//   const handleToggle = () => {
//     updateManufacturerStatusPayload({
//       payload: updatePayload,
//       id: manufacturerId,
//     });
//   };

//   return (
//     <div>
//       <Card>
//         <CardContent className="p-4 ">
//           <div className="flex justify-between items-center mb-6">
//             <Header
//               title="Manufacturer"
//               subtext="Manage Manufacturer"
//               showBack={true}
//             />
//           </div>

//           <div className="mb-6">
//             <SupplierManagementCard
//               item={manufacturer}
//               handleUpdateManufacturerStatus={handleToggle}
//               showToggle={true}
//               showOptions={true}
//               setTab={setTab}
//               setOpen={setOpen}
//               loading={updateManufacturerStatusIsLoading || false}
//             />
//           </div>

//           <div className="flex items-center gap-4 mb-6">
//             <InputFilter
//               setQuery={setFilter}
//               placeholder="Search by customer name, categoryId, manufacturerId"
//             />

//             <SelectFilter
//               setFilter={setStatus}
//               placeholder="Product Type"
//               list={productTypeList}
//             />
//             <DatePickerWithRange
//               setFromDate={setStartDate}
//               setToDate={setEndDate}
//             />
//           </div>

//           <ProductDataTable
//         handleEdit={handleEditProduct}
//         handleView={handleViewProduct}
//         handleDelete={handleDeleteProduct}
//             setPageSize={setPageSize}
//             data={manufacturer?.products}
//             currentPage={currentPage}
//             onPageChange={onPageChange}
//             pageSize={Number(pageSize)}
//             totalPages={40}
//             loading={getManufacturerProductsIsLoading}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onOpenChange={() => setOpen(!open)}>
//         <DialogContent
//           className={`${
//             tab !== "delete" && tab !== "delete-product"
//               ? "right-0 p-8 max-w-[47.56rem] h-screen overflow-y-scroll"
//               : "max-w-[33.75rem] left-[50%] translate-x-[-50%] py-10"
//           }`}
//         >
//           {tab !== "delete" && tab !== "delete-product" && (
//             <DialogHeader>
//               <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-4.5 items-center">
//                 <div onClick={() => setOpen(false)} className="cursor-pointer">
//                   <ChevronLeft size={24} />
//                 </div>
//                 {capitalizeFirstLetter(tab)}{" "}
//                 {tab === "update" ? "Manufacturer" : "Product"}
//               </DialogTitle>
//             </DialogHeader>
//           )}
//           {renderItem()}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ManufacturerDetails;

// ManufacturerDetails.tsx
// "use client";

// import Header from "@/app/(admin)/components/header";
// import { Card, CardContent } from "@/components/ui/card";
// import SupplierManagementCard from "@/components/widgets/supplier-management";
// import { useEffect, useState } from "react";
// import {
//   useDeleteManufacturerProduct,
//   useGetManufacturerInfo,
//   useGetManufacturerProducts,
//   useGetManufacturers,
//   useUpdateManufacturerStatus,
// } from "@/services/manufacturers";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ChevronLeft } from "lucide-react";
// import EditManufacturer from "./edit-manufacturer";
// import DeleteContent from "@/app/(admin)/components/delete-content";
// import ViewProduct from "@/app/(admin)/admin/products/components/view-product";
// import EditProduct from "@/app/(admin)/admin/products/components/edit-products";
// import ProductDataTable from "@/app/(admin)/admin/products/components/data-table";
// import { InputFilter } from "@/app/(admin)/components/input-filter";
// import { SelectFilter } from "@/app/(admin)/components/select-filter";
// import DatePickerWithRange from "@/components/ui/date-picker";
// import { productTypeList } from "@/constant";
// import { capitalizeFirstLetter, showSuccessAlert } from "@/lib/utils";
// import { useDeleteProduct } from "@/services/products";

// interface iProps {
//   manufacturerId: string;
// }

// const ManufacturerDetails: React.FC<iProps> = ({ manufacturerId }) => {
//   const [manufacturerStatus, setManufacturerStatus] = useState<boolean>(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const [tab, setTab] = useState<string>("update");
//   const [filter, setFilter] = useState<string>("");
//   const [status, setStatus] = useState<string>("");
//   const [pageSize, setPageSize] = useState<string>("10");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
  
//   // Track selected product details
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const onPageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//     refetchManufacturers,
//     setManufacturersFilter,
//   } = useGetManufacturers();
  
//   const findManufacturerById = (id: string) => {
//     if (!getManufacturersData?.data) return null;
//     return getManufacturersData.data.find(
//       (manufacturer: { id: any }) => String(manufacturer.id) === String(id)
//     );
//   };
  
//   const manufacturer = findManufacturerById(manufacturerId);

//   // const { 
//   //   deleteProduct, 
//   //   deleteProductIsLoading 
//   // } = useDeleteProduct(() => {
//   //   // Refetch products after successful deletion
//   //   refetchManufacturerProducts();
//   //   setOpen(false);
//   // });

//   const { 
//     deleteProduct, 
//     isLoading 
//   } = useDeleteProduct({
//     onSuccess: () => {
//       showSuccessAlert("Product deleted successfully!");
//       refetchManufacturerProducts();
//       setOpen(false);
//     },
//     onError: (error: any) => {
//       console.error("Failed to delete product:", error);
//       // Handle error (show toast, etc.)
//     }
//   });

  
//   const {
//     getManufacturerInfoData: data,
//     getManufacturerInfoIsLoading,
//     refetchManufacturerInfo,
//     setManufacturerInfoFilter,
//   } = useGetManufacturerInfo();

//   useEffect(() => {
//     setManufacturerInfoFilter(manufacturerId);
//   }, [manufacturerId]);

//   const {
//     getManufacturerProductsData,
//     getManufacturerProductsError,
//     getManufacturerProductsIsLoading,
//     refetchManufacturerProducts,
//     setManufacturerProductsFilter,
//   } = useGetManufacturerProducts();
  
//   // const { deleteProductData, deleteProductIsLoading, deleteProductPayload } =
//   //   useDeleteManufacturerProduct((res: any) => {
//   //     refetchManufacturerProducts();
//   //     setOpen(false);
//   //   });
  
//   const {
//     updateManufacturerStatusData,
//     updateManufacturerStatusIsLoading,
//     updateManufacturerStatusPayload,
//   } = useUpdateManufacturerStatus((res: any) => {
//     refetchManufacturerInfo();
//     showSuccessAlert("Manufacturer status updated succcessfully!");
//   });
  
//   const updatePayload = {
//     status: true,
//   };
  
//   const payload = {
//     page: currentPage,
//     pageSize,
//     type: status,
//   };

//   useEffect(() => {
//     setManufacturerProductsFilter({ manufacturerId, data: payload });
//   }, [filter, status, pageSize]);

//   // Handlers for product actions
//   const handleViewProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("view");
//     setOpen(true);
//   };

//   const handleEditProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("edit");
//     setOpen(true);
//   };

//   // const handleDeleteProduct = (product: any) => {
//   //   setSelectedProduct(product);
//   //   setTab("delete-product");
//   //   setOpen(true);
//   // };

//   const handleDeleteProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("delete-product");
//     setOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedProduct) {
//       deleteProduct(selectedProduct.id);
//     }
//   };

//   const renderItem = () => {
//     switch (tab) {
//       case "update":
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//       case "delete":
//         return (
//           <DeleteContent
//             handleClose={() => setOpen(false)}
//             title="manufacturer"
//             handleClick={() => delete(manufacturerId)}
//           />
       
//         );
//       case "view":
//         return (
//           <ViewProduct 
//             setClose={() => setOpen(false)} 
//             productData={selectedProduct} 
//           />
//         );
//       case "edit":
//         return (
//           <EditProduct 
//             setClose={() => setOpen(false)} 
//             // productData={selectedProduct} 
//           />
//         );
//       case "delete-product":
//         return (
//         <DeleteContent 
//         handleClose={() => setOpen(false)} 
//         title="Product" 
//         handleClick={handleConfirmDelete}
//         loading={isLoading}
//       />
//         );
//       default:
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//     }
//   };

//   const handleToggle = () => {
//     updateManufacturerStatusPayload({
//       payload: updatePayload,
//       id: manufacturerId,
//     });
//   };

//   return (
//     <div>
//       <Card>
//         <CardContent className="p-4 ">
//           <div className="flex justify-between items-center mb-6">
//             <Header
//               title="Manufacturer"
//               subtext="Manage Manufacturer"
//               showBack={true}
//             />
//           </div>

//           <div className="mb-6">
//             <SupplierManagementCard
//               item={manufacturer}
//               handleUpdateManufacturerStatus={handleToggle}
//               showToggle={true}
//               showOptions={true}
//               setTab={setTab}
//               setOpen={setOpen}
//               loading={updateManufacturerStatusIsLoading || false}
//             />
//           </div>

//           <div className="flex items-center gap-4 mb-6">
//             <InputFilter
//               setQuery={setFilter}
//               placeholder="Search by customer name, categoryId, manufacturerId"
//             />

//             <SelectFilter
//               setFilter={setStatus}
//               placeholder="Product Type"
//               list={productTypeList}
//             />
//             <DatePickerWithRange
//               setFromDate={setStartDate}
//               setToDate={setEndDate}
//             />
//           </div>

//           <ProductDataTable
//             handleEdit={handleEditProduct}
//             handleView={handleViewProduct}
//             // handleDelete={handleDeleteProduct}
//             handleDelete={handleDeleteProduct}
//             setPageSize={setPageSize}
//             data={manufacturer?.products || []}
//             currentPage={currentPage}
//             onPageChange={onPageChange}
//             pageSize={Number(pageSize)}
//             totalPages={40}
//             loading={getManufacturerProductsIsLoading}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onOpenChange={() => setOpen(!open)}>
//         <DialogContent
//           className={`${
//             tab !== "delete" && tab !== "delete-product"
//               ? "right-0 p-8 max-w-[47.56rem] h-screen overflow-y-scroll"
//               : "max-w-[33.75rem] left-[50%] translate-x-[-50%] py-10"
//           }`}
//         >
//           {tab !== "delete" && tab !== "delete-product" && (
//             <DialogHeader>
//               <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-4.5 items-center">
//                 <div onClick={() => setOpen(false)} className="cursor-pointer">
//                   <ChevronLeft size={24} />
//                 </div>
//                 {capitalizeFirstLetter(tab)}{" "}
//                 {tab === "update" ? "Manufacturer" : "Product"}
//               </DialogTitle>
//             </DialogHeader>
//           )}
//           {renderItem()}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ManufacturerDetails;

// "use client";

// import Header from "@/app/(admin)/components/header";
// import { Card, CardContent } from "@/components/ui/card";
// import SupplierManagementCard from "@/components/widgets/supplier-management";
// import { useEffect, useState } from "react";
// import {
//   useDeleteManufacturerProduct,
//   useGetManufacturerInfo,
//   useGetManufacturerProducts,
//   useGetManufacturers,
//   useUpdateManufacturerStatus,
//   useDeleteManufacturer// NEW HOOK
// } from "@/services/manufacturers";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ChevronLeft } from "lucide-react";
// import EditManufacturer from "./edit-manufacturer";
// import DeleteContent from "@/app/(admin)/components/delete-content";
// import ViewProduct from "@/app/(admin)/admin/products/components/view-product";
// import EditProduct from "@/app/(admin)/admin/products/components/edit-products";
// import ProductDataTable from "@/app/(admin)/admin/products/components/data-table";
// import { InputFilter } from "@/app/(admin)/components/input-filter";
// import { SelectFilter } from "@/app/(admin)/components/select-filter";
// import DatePickerWithRange from "@/components/ui/date-picker";
// import { productTypeList } from "@/constant";
// import { capitalizeFirstLetter, showSuccessAlert } from "@/lib/utils";
// import { useDeleteProduct } from "@/services/products";
// import { useRouter } from "next/navigation"; // ADDED FOR NAVIGATION

// interface iProps {
//   manufacturerId: string;
// }

// const ManufacturerDetails: React.FC<iProps> = ({ manufacturerId }) => {
//   const router = useRouter(); // ADDED FOR NAVIGATION
//   const [manufacturerStatus, setManufacturerStatus] = useState<boolean>(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const [tab, setTab] = useState<string>("update");
//   const [filter, setFilter] = useState<string>("");
//   const [status, setStatus] = useState<string>("");
//   const [pageSize, setPageSize] = useState<string>("10");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
  
//   // Track selected product details
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const onPageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const {
//     getManufacturersData,
//     getManufacturersIsLoading,
//     refetchManufacturers,
//     setManufacturersFilter,
//   } = useGetManufacturers();
  
//   const findManufacturerById = (id: string) => {
//     if (!getManufacturersData?.data) return null;
//     return getManufacturersData.data.find(
//       (manufacturer: { id: any }) => String(manufacturer.id) === String(id)
//     );
//   };
  
//   const manufacturer = findManufacturerById(manufacturerId);

//   const { 
//     deleteProduct, 
//     isLoading: isDeletingProduct 
//   } = useDeleteProduct({
//     onSuccess: () => {
//       showSuccessAlert("Product deleted successfully!");
//       refetchManufacturerProducts();
//       setOpen(false);
//     },
//     onError: (error: any) => {
//       console.error("Failed to delete product:", error);
//     }
//   });

//   // NEW DELETE MANUFACTURER HOOK
//   // const { 
//   //   deleteManufacturer, 
//   //   isLoading: isDeletingManufacturer 
//   // } = useDeleteManufacturer({
//   //   onSuccess: () => {
//   //     showSuccessAlert("Manufacturer deleted successfully!");
//   //     setOpen(false);
//   //     router.push('/admin/manufacturers'); // Redirect after deletion
//   //   },
//   //   onError: (error: any) => {
//   //     console.error("Failed to delete manufacturer:", error);
//   //   }
//   // });

//   // const { 
//   //   deleteManufacturer, 
//   //   isLoading: isDeletingManufacturer 
//   // } = useDeleteManufacturer({
//   //   onSuccess: () => {
//   //     showSuccessAlert("Manufacturer deleted successfully!");
//   //     setOpen(false);
//   //     router.push('/admin/manufacturers');
//   //   },
//   //   onError: (error: any) => {
//   //     console.error("Failed to delete manufacturer:", error);
//   //     // Handle error (show toast, etc.)
//   //   }
//   // });

//   const { 
//     deleteManufacturer, 
//     isLoading: isDeletingManufacturer 
//   } = useDeleteManufacturer({
//     onSuccess: () => {
//       showSuccessAlert("Manufacturer deleted successfully!");
//       setOpen(false);
//       router.push('/admin/manufacturers');
//     },
//     onError: (error: any) => {
//       console.error("Failed to delete manufacturer:", error);
//       // Handle error (show toast, etc.)
//     }
//   });

//   const {
//     getManufacturerInfoData: data,
//     getManufacturerInfoIsLoading,
//     refetchManufacturerInfo,
//     setManufacturerInfoFilter,
//   } = useGetManufacturerInfo();

//   useEffect(() => {
//     setManufacturerInfoFilter(manufacturerId);
//   }, [manufacturerId]);
//   // const handleDeleteManufacturer = () => {
//   //   if (manufacturerId) {
//   //     deleteManufacturer(manufacturerId);
//   //   }
//   // };
//   const handleDelete = (manufacturer: { id: { toString: () => any; }; name: any; }) => {
//     // Ensure we're using the correct ID format
//     const idToDelete = manufacturer.id;
    
//     if (confirm(`Delete ${manufacturer.name}?`)) {
//       deleteManufacturer(idToDelete).catch(error => {
//         showToast(error.message, 'error');
//       });
//     }
//   };

//   const {
//     getManufacturerProductsData,
//     getManufacturerProductsError,
//     getManufacturerProductsIsLoading,
//     refetchManufacturerProducts,
//     setManufacturerProductsFilter,
//   } = useGetManufacturerProducts();

//   console.log(getManufacturerProductsData, "products")
  
//   const {
//     updateManufacturerStatusData,
//     updateManufacturerStatusIsLoading,
//     updateManufacturerStatusPayload,
//   } = useUpdateManufacturerStatus((res: any) => {
//     refetchManufacturerInfo();
//     showSuccessAlert("Manufacturer status updated succcessfully!");
//   });
  
//   const updatePayload = {
//     status: true,
//   };
  
//   const payload = {
//     page: currentPage,
//     pageSize,
//     type: status,
//   };

//   useEffect(() => {
//     setManufacturerProductsFilter({ manufacturerId, data: payload });
//   }, [filter, status, pageSize]);

//   // Handlers for product actions
//   const handleViewProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("view");
//     setOpen(true);
//   };

//   const handleEditProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("edit");
//     setOpen(true);
//   };

//   const handleDeleteProduct = (product: any) => {
//     setSelectedProduct(product);
//     setTab("delete-product");
//     setOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedProduct) {
//       deleteProduct(selectedProduct.id);
//     }
//   };

//   // NEW: Handle manufacturer deletion
//   // const handleDeleteManufacturer = () => {
//   //   if (manufacturerId) {
//   //     deleteManufacturer(manufacturerId);
//   //   }
//   // };

//   const renderItem = () => {
//     switch (tab) {
//       case "update":
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//       case "delete":
//         return (
//           <DeleteContent
//             handleClose={() => setOpen(false)}
//             title="Manufacturer"
//             handleClick={deleteManufacturer}
//             loading={isDeletingManufacturer}
//             warningMessage="Deleting this manufacturer will permanently remove it and all associated data. This action cannot be undone."
//           />
//         );
//       case "view":
//         return (
//           <ViewProduct 
//             setClose={() => setOpen(false)} 
//             productData={selectedProduct} 
//           />
//         );
//       case "edit":
//         return (
//           <EditProduct 
//             setClose={() => setOpen(false)} 
//           />
//         );
//       case "delete-product":
//         return (
//           <DeleteContent 
//             handleClose={() => setOpen(false)} 
//             title="Product" 
//             handleClick={handleConfirmDelete}
//             loading={isDeletingProduct}
//           />
//         );
//       default:
//         return <EditManufacturer setClose={() => setOpen(false)} />;
//     }
//   };

//   const handleToggle = () => {
//     updateManufacturerStatusPayload({
//       payload: updatePayload,
//       id: manufacturerId,
//     });
//   };

//   return (
//     <div>
//       <Card>
//         <CardContent className="p-4 ">
//           <div className="flex justify-between items-center mb-6">
//             <Header
//               title="Manufacturer"
//               subtext="Manage Manufacturer"
//               showBack={true}
//             />
//           </div>

//           <div className="mb-6">
//             <SupplierManagementCard
//               item={manufacturer}
//               handleUpdateManufacturerStatus={handleToggle}
//               showToggle={true}
//               showOptions={true}
//               setTab={setTab}
//               setOpen={setOpen}
//               loading={updateManufacturerStatusIsLoading || false}
//             />
//           </div>

//           <div className="flex items-center gap-4 mb-6">
//             <InputFilter
//               setQuery={setFilter}
//               placeholder="Search by customer name, categoryId, manufacturerId"
//             />

//             <SelectFilter
//               setFilter={setStatus}
//               placeholder="Product Type"
//               list={productTypeList}
//             />
//             <DatePickerWithRange
//               setFromDate={setStartDate}
//               setToDate={setEndDate}
//             />
//           </div>

//           <ProductDataTable
//             handleEdit={handleEditProduct}
//             handleView={handleViewProduct}
//             handleDelete={handleDeleteProduct}
//             setPageSize={setPageSize}
//             data={manufacturer?.products || []}
//             currentPage={currentPage}
//             onPageChange={onPageChange}
//             pageSize={Number(pageSize)}
//             totalPages={40}
//             loading={getManufacturerProductsIsLoading}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onOpenChange={() => setOpen(!open)}>
//         <DialogContent
//           className={`${
//             tab !== "delete" && tab !== "delete-product"
//               ? "right-0 p-8 max-w-[47.56rem] h-screen overflow-y-scroll"
//               : "max-w-[33.75rem] left-[50%] translate-x-[-50%] py-10"
//           }`}
//         >
//           {tab !== "delete" && tab !== "delete-product" && (
//             <DialogHeader>
//               <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-4.5 items-center">
//                 <div onClick={() => setOpen(false)} className="cursor-pointer">
//                   <ChevronLeft size={24} />
//                 </div>
//                 {capitalizeFirstLetter(tab)}{" "}
//                 {tab === "update" ? "Manufacturer" : "Product"}
//               </DialogTitle>
//             </DialogHeader>
//           )}
//           {renderItem()}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ManufacturerDetails;

// function showToast(message: any, arg1: string) {
//   throw new Error("Function not implemented.");
// }

"use client";

import Header from "@/app/(admin)/components/header";
import { Card, CardContent } from "@/components/ui/card";
import SupplierManagementCard from "@/components/widgets/supplier-management";
import { useEffect, useState } from "react";
import {
  useDeleteManufacturerProduct,
  useGetManufacturerInfo,
  useGetManufacturerProducts,
  useGetManufacturers,
  useUpdateManufacturerStatus,
  useDeleteManufacturer
} from "@/services/manufacturers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import EditManufacturer from "./edit-manufacturer";
import DeleteContent from "@/app/(admin)/components/delete-content";
import ViewProduct from "@/app/(admin)/admin/products/components/view-product";
import EditProduct from "@/app/(admin)/admin/products/components/edit-products";
import { InputFilter } from "@/app/(admin)/components/input-filter";
import { SelectFilter } from "@/app/(admin)/components/select-filter";
import DatePickerWithRange from "@/components/ui/date-picker";
import { productTypeList } from "@/constant";
import { capitalizeFirstLetter, showSuccessAlert } from "@/lib/utils";
import { useDeleteProduct } from "@/services/products";
import { useRouter } from "next/navigation";
import ProductDataTable from "@/app/(admin)/admin/products/components/data-table"; // Import the optimized component

interface iProps {
  manufacturerId: string;
}

const ManufacturerDetails: React.FC<iProps> = ({ manufacturerId }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("update");
  const [filter, setFilter] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pageSize, setPageSize] = useState<string>("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    getManufacturersData,
    getManufacturersIsLoading,
    refetchManufacturers,
    setManufacturersFilter,
  } = useGetManufacturers();
  
  const findManufacturerById = (id: string) => {
    if (!getManufacturersData?.data) return null;
    return getManufacturersData.data.find(
      (manufacturer: { id: any }) => String(manufacturer.id) === String(id)
    );
  };
  
  const manufacturer = findManufacturerById(manufacturerId);

  const { 
    deleteProduct, 
    isLoading: isDeletingProduct 
  } = useDeleteProduct({
    onSuccess: () => {
      showSuccessAlert("Product deleted successfully!");
      refetchManufacturerProducts();
      setOpen(false);
    },
    onError: (error: any) => {
      console.error("Failed to delete product:", error);
    }
  });

  const { 
    deleteManufacturer, 
    isLoading: isDeletingManufacturer 
  } = useDeleteManufacturer({
    onSuccess: () => {
      showSuccessAlert("Manufacturer deleted successfully!");
      setOpen(false);
      router.push('/admin/manufacturers');
    },
    onError: (error: any) => {
      console.error("Failed to delete manufacturer:", error);
    }
  });

  const {
    getManufacturerInfoData: data,
    getManufacturerInfoIsLoading,
    refetchManufacturerInfo,
    setManufacturerInfoFilter,
  } = useGetManufacturerInfo();

  useEffect(() => {
    setManufacturerInfoFilter(manufacturerId);
  }, [manufacturerId]);

  const handleDelete = (manufacturer: any) => {
    if (confirm(`Delete ${manufacturer.name}?`)) {
      deleteManufacturer(manufacturer.id);
    }
  };

  const {
    getManufacturerProductsData,
    getManufacturerProductsError,
    getManufacturerProductsIsLoading,
    refetchManufacturerProducts,
    setManufacturerProductsFilter,
  } = useGetManufacturerProducts();

  const {
    updateManufacturerStatusData,
    updateManufacturerStatusIsLoading,
    updateManufacturerStatusPayload,
  } = useUpdateManufacturerStatus((res: any) => {
    refetchManufacturerInfo();
    showSuccessAlert("Manufacturer status updated successfully!");
  });
  
  const updatePayload = {
    status: true,
  };
  
  const payload = {
    page: currentPage,
    pageSize,
    type: status,
  };

  useEffect(() => {
    setManufacturerProductsFilter({ manufacturerId, data: payload });
  }, [currentPage, filter, status, pageSize, manufacturerId]);

  // Handlers for product actions
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setTab("view");
    setOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setTab("edit");
    setOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setTab("delete-product");
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
    }
  };

  const renderItem = () => {
    switch (tab) {
      case "update":
        return <EditManufacturer setClose={() => setOpen(false)} />;
      case "delete":
        return (
          <DeleteContent
            handleClose={() => setOpen(false)}
            title="Manufacturer"
            handleClick={() => handleDelete(manufacturer)}
            loading={isDeletingManufacturer}
            warningMessage="Deleting this manufacturer will permanently remove it and all associated data. This action cannot be undone."
          />
        );
      case "view":
        return (
          <ViewProduct 
            setClose={() => setOpen(false)} 
            productData={selectedProduct} 
          />
        );
      case "edit":
        return (
          // <EditProduct 
          //   setClose={() => setOpen(false)} 
          //   productData={selectedProduct}
          // />
          <></>
        );
      case "delete-product":
        return (
          <DeleteContent 
            handleClose={() => setOpen(false)} 
            title="Product" 
            handleClick={handleConfirmDelete}
            loading={isDeletingProduct}
          />
        );
      default:
        return <EditManufacturer setClose={() => setOpen(false)} />;
    }
  };

  const handleToggle = () => {
    updateManufacturerStatusPayload({
      payload: updatePayload,
      id: manufacturerId,
    });
  };

  return (
    <div>
      <Card>
        <CardContent className="p-4 ">
          <div className="flex justify-between items-center mb-6">
            <Header
              title="Manufacturer"
              subtext="Manage Manufacturer"
              showBack={true}
            />
          </div>

          <div className="mb-6">
            <SupplierManagementCard
              item={manufacturer}
              handleUpdateManufacturerStatus={handleToggle}
              showToggle={true}
              showOptions={true}
              setTab={setTab}
              setOpen={setOpen}
              loading={updateManufacturerStatusIsLoading || false}
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <InputFilter
              setQuery={setFilter}
              placeholder="Search by product name, description"
            />

            <SelectFilter
              setFilter={setStatus}
              placeholder="Product Type"
              list={productTypeList}
            />
            <DatePickerWithRange
              setFromDate={setStartDate}
              setToDate={setEndDate}
            />
          </div>

          {/* Updated ProductDataTable with proper props */}
          <ProductDataTable
            handleEdit={handleEditProduct}
            handleView={handleViewProduct}
            handleDelete={handleDeleteProduct}
            setPageSize={setPageSize}
            data={getManufacturerProductsData?.data || []}
            currentPage={currentPage}
            onPageChange={onPageChange}
            pageSize={Number(pageSize)}
            totalPages={getManufacturerProductsData?.pagination?.totalPages || 1}
            loading={getManufacturerProductsIsLoading}
          />
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent
          className={`${
            tab !== "delete" && tab !== "delete-product"
              ? "right-0 p-8 max-w-[47.56rem] h-screen overflow-y-scroll"
              : "max-w-[33.75rem] left-[50%] translate-x-[-50%] py-10"
          }`}
        >
          {tab !== "delete" && tab !== "delete-product" && (
            <DialogHeader>
              <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-4.5 items-center">
                <div onClick={() => setOpen(false)} className="cursor-pointer">
                  <ChevronLeft size={24} />
                </div>
                {capitalizeFirstLetter(tab)}{" "}
                {tab === "update" ? "Manufacturer" : "Product"}
              </DialogTitle>
            </DialogHeader>
          )}
          {renderItem()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManufacturerDetails;