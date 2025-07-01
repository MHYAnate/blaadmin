// // "use client";

// // import { Badge } from "@/components/ui/badge";
// // import { ProductData, AdminsData } from "@/types";
// // import Image from "next/image";
// // import { DeleteIcon, EditIcon, ViewIcon } from "../../../../../../public/icons";
// // import { ProductTableComponent } from "@/components/custom-table/productIndex";
// // // import { ProductTableComponent } from "@/components/custom-table/productIndex";

// // interface iProps {
// //   handleEdit: () => void;
// //   handleView: () => void;
// //   handleDelete: () => void;
// //   setPageSize: React.Dispatch<React.SetStateAction<string>>;
// //   data?: any;
// //   currentPage: number;
// //   onPageChange: (value: number) => void;
// //   pageSize: number;
// //   totalPages: number;
// //   loading: boolean;
// // }

// // const ProductDataTable: React.FC<iProps> = ({
// //   handleEdit,
// //   handleView,
// //   handleDelete,
// //   setPageSize,
// //   data,
// //   currentPage,
// //   onPageChange,
// //   pageSize,
// //   totalPages,
// //   loading,
// // }) => {
// //   const tableData: ProductData[] = [
// //     {
// //       id: 1,
// //       productname: "Rice",
// //       price: "55,000",
// //       quantity: 50,
// //       productid: "#123456",
// //       status: "In stock",
// //     },
// //     {
// //       id: 2,
// //       productname: "Spagetti",
// //       price: "55,000",
// //       quantity: 50,
// //       productid: "#123456",
// //       status: "Out of stock",
// //     },
// //     {
// //       id: 3,
// //       productname: "Nescafe Classic Coffe",
// //       price: "55,000",
// //       quantity: 50,
// //       productid: "#123456",
// //       status: "In stock",
// //     },
// //     {
// //       id: 4,
// //       productname: "Cowpea",
// //       price: "55,000",
// //       quantity: 50,
// //       productid: "#123456",
// //       status: "Out of stock",
// //     },
// //   ];

// //   const cellRenderers = {
// //     name: (item: ProductData) => (
// //       <div className="font-medium flex items-center gap-3">
// //         <Image
// //           src="/images/user-avatar.png"
// //           width={36}
// //           height={36}
// //           alt="Admin avatar"
// //           className="w-9 h-9 rounded-full"
// //         />
// //         <div>
// //           <p> {item.productname}</p>
// //           <p className="font-normal text-[0.75rem] text-[#A0AEC0]">Cocoa</p>
// //         </div>
// //       </div>
// //     ),
// //     price: (item: ProductData) => (
// //       <div className="font-medium">NGN{item.price}</div>
// //     ),
// //     quantity: (item: ProductData) => (
// //       <span className="font-medium">{item.quantity}</span>
// //     ),
// //     productid: (item: ProductData) => (
// //       <div className="font-medium">{item.productid}</div>
// //     ),
// //     status: (item: ProductData) => (
// //       <Badge
// //         variant={
// //           item.status.toLowerCase() === "in stock" ? "success" : "destructive"
// //         }
// //         className="py-1 px-[26px] font-semibold"
// //       >
// //         {item.status.toUpperCase()}
// //       </Badge>
// //     ),
// //     action: (item: ProductData) => (
// //       <div className="flex gap-2.5">
// //         <div className="bg-[#27A376] p-2.5 rounded-lg" onClick={handleView}>
// //           <ViewIcon />
// //         </div>
// //         <div className="bg-[#2F78EE] p-2.5 rounded-lg" onClick={handleEdit}>
// //           <EditIcon />
// //         </div>
// //         <div className="bg-[#E03137] p-2.5 rounded-lg" onClick={handleDelete}>
// //           <DeleteIcon />
// //         </div>
// //       </div>
// //     ),
// //   };

// //   const columnOrder: (keyof ProductData)[] = [
// //     "name",
// //     "price",
// //     "quantity",
// //     "productid",
// //     "status",
// //     "action",
// //   ];

// //   const columnLabels = {
// //     status: "Product Status",
// //     name: "Prroduct Name",
// //     price: "Price",
// //     quantity: "Quantity",
// //     action: "",
// //     productid: "Product ID",
// //   };

// //   return (
// //     <>
// //       <ProductTableComponent<ProductData>
// //         tableData={tableData}
// //         currentPage={currentPage}
// //         onPageChange={onPageChange}
// //         totalPages={Math.ceil(tableData.length / pageSize)}
// //         cellRenderers={cellRenderers}
// //         columnOrder={columnOrder}
// //         columnLabels={columnLabels}
// //         setFilter={setPageSize}
// //         isLoading={loading}
// //       />
// //     </>
// //   );
// // };

// // export default ProductDataTable;

// "use client";

// import { Badge } from "@/components/ui/badge";
// import { ProductData } from "@/types";
// import Image from "next/image";
// import { DeleteIcon, EditIcon, ViewIcon } from "../../../../../../public/icons";
// import { ProductTableComponent } from "@/components/custom-table/productIndex";

// interface iProps {
//   handleEdit: (productId: any) => void;
//   handleView: (productId: any) => void;
//   handleDelete: (productId: any) => void;
//   setPageSize: React.Dispatch<React.SetStateAction<string>>;
//   data?: any[];
//   currentPage: any;
//   onPageChange: (value: any) => void;
//   pageSize: any;
//   totalPages: any;
//   loading: boolean;
// }

// const ProductDataTable: React.FC<iProps> = ({
//   handleEdit,
//   handleView,
//   handleDelete,
//   setPageSize,
//   data = [],
//   currentPage,
//   onPageChange,
//   pageSize,
//   totalPages,
//   loading,
// }) => {
//   // Transform API data to match ProductData structure
//   const transformData = (apiData: any[]): ProductData[] => {
//     return apiData.map((product) => ({
//       id: product.id,
//       productname: product.name,
//       price: "N/A", // Add actual price field if available in API
//       quantity: 0,  // Add actual quantity field if available in API
//       productid: `#${product.id}`,
//       status: product.isActive ? "In stock" : "Out of stock",
//       // Include additional fields needed for rendering
//       description: product.description,
//       categoryId: product.categoryId,
//       manufacturerId: product.manufacturerId
//     }));
//   };

//   const tableData: ProductData[] = transformData(data);

//   const cellRenderers = {
//     name: (item: ProductData) => (
//       <div className="font-medium flex items-center gap-3">
//         <Image
//           src="/images/user-avatar.png"
//           width={36}
//           height={36}
//           alt="Product image"
//           className="w-9 h-9 rounded-full"
//         />
//         <div>
//           <p>{item.productname}</p>
//           <p className="font-normal text-[0.75rem] text-[#A0AEC0]">
//             {item.description}
//           </p>
//         </div>
//       </div>
//     ),
//     price: (item: ProductData) => (
//       <div className="font-medium">NGN {item.price}</div>
//     ),
//     quantity: (item: ProductData) => (
//       <span className="font-medium">{item.quantity}</span>
//     ),
//     productid: (item: ProductData) => (
//       <div className="font-medium">{item.productid}</div>
//     ),
//     status: (item: ProductData) => (
//       <Badge
//         variant={
//           item.status.toLowerCase() === "in stock" ? "success" : "destructive"
//         }
//         className="py-1 px-[26px] font-semibold"
//       >
//         {item.status.toUpperCase()}
//       </Badge>
//     ),
//     action: (item: ProductData) => (
//       <div className="flex gap-2.5">
//         <div 
//           className="bg-[#27A376] p-2.5 rounded-lg cursor-pointer" 
//           onClick={() => handleView(item.id)}
//         >
//           <ViewIcon />
//         </div>
//         <div 
//           className="bg-[#2F78EE] p-2.5 rounded-lg cursor-pointer" 
//           onClick={() => handleEdit(item.id)}
//         >
//           <EditIcon />
//         </div>
//         <div 
//           className="bg-[#E03137] p-2.5 rounded-lg cursor-pointer" 
//           onClick={() => handleDelete(item.id)}
//         >
//           <DeleteIcon />
//         </div>
//       </div>
//     ),
//   };

//   const columnOrder: (keyof ProductData)[] = [
//     "name",
//     "price",
//     "quantity",
//     "productid",
//     "status",
//     "action",
//   ];

//   const columnLabels = {
//     status: "Product Status",
//     name: "Product Name", // Fixed typo
//     price: "Price",
//     quantity: "Quantity",
//     action: "",
//     productid: "Product ID",
//   };

//   return (
//     <ProductTableComponent<ProductData>
//       tableData={tableData}
//       currentPage={currentPage}
//       onPageChange={onPageChange}
//       totalPages={totalPages}
//       cellRenderers={cellRenderers}
//       columnOrder={columnOrder}
//       columnLabels={columnLabels}
//       setFilter={setPageSize}
//       isLoading={loading}
//     />
//   );
// };

// export default ProductDataTable;

// ProductDataTable.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { ProductData } from "@/types";
import Image from "next/image";
import { DeleteIcon, EditIcon, ViewIcon } from "../../../../../../public/icons";
import { ProductTableComponent } from "@/components/custom-table/productIndex";

interface iProps {
  handleEdit: (product: any) => void;
  handleView: (product: any) => void;
  handleDelete: (product: any) => void;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
  data?: any[];
  currentPage: any;
  onPageChange: (value: any) => void;
  pageSize: any;
  totalPages: any;
  loading: boolean;
}

const ProductDataTable: React.FC<iProps> = ({
  handleEdit,
  handleView,
  handleDelete,
  setPageSize,
  data = [],
  currentPage,
  onPageChange,
  pageSize,
  totalPages,
  loading,
}) => {
  const cellRenderers = {
    name: (item: any) => (
      <div className="font-medium flex items-center gap-3">
        <Image
          src="/images/user-avatar.png"
          width={36}
          height={36}
          alt="Product image"
          className="w-9 h-9 rounded-full"
        />
        <div>
          <p>{item.name}</p>
          <p className="font-normal text-xs text-[#A0AEC0]">
            {item.description}
          </p>
        </div>
      </div>
    ),
    price: (item: any) => (
      <div className="font-medium">NGN {item.options[0].price || 'N/A'}</div>
    ),
    quantity: (item: any) => (
      <span className="font-medium">{item.options[0].inventory || 0}</span>
    ),
    productid: (item: any) => (
      <div className="font-medium">#{item.id}</div>
    ),
    status: (item: any) => (
      <Badge
        variant={item.isActive ? "success" : "destructive"}
        className="py-1 px-4 font-semibold"
      >
        {item.isActive ? "ACTIVE" : "INACTIVE"}
      </Badge>
    ),
    action: (item: any) => (
      <div className="flex gap-2.5">
        <div 
          className="bg-[#27A376] p-2 rounded-lg cursor-pointer" 
          onClick={() => handleView(item)}
        >
          <ViewIcon />
        </div>
        <div 
          className="bg-[#2F78EE] p-2 rounded-lg cursor-pointer" 
          onClick={() => handleEdit(item)}
        >
          <EditIcon />
        </div>
        <div 
          className="bg-[#E03137] p-2 rounded-lg cursor-pointer" 
          onClick={() => handleDelete(item)}
        >
          <DeleteIcon />
        </div>
      </div>
    ),
  };

  const columnOrder = [
    "name",
    "price",
    "quantity",
    "productid",
    "status",
    "action",
  ];

  const columnLabels = {
    status: "Status",
    name: "Product Name",
    price: "Price",
    quantity: "Quantity",
    action: "Actions",
    productid: "ID",
  };

  return (
    <ProductTableComponent
      tableData={data}
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalPages={totalPages}
      cellRenderers={cellRenderers}
      columnOrder={columnOrder}
      columnLabels={columnLabels}
      setFilter={setPageSize}
      isLoading={loading}
    />
  );
};

export default ProductDataTable;