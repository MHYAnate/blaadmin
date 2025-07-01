// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface iProps {
//   setClose: () => void;
//   productData:any;
// }

// const ViewProduct: React.FC<iProps> = ({ setClose, productData }) => {
//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center mb-auto">
//         <div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Product ID:</p>
//             <p className="font-semibold text-sm text-[#111827]">#1122112</p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Product Name:</p>
//             <p className="font-semibold text-sm text-[#111827]">
//               Nescafe Classic Coffee
//             </p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Product Price:</p>
//             <p className="font-semibold text-sm text-[#111827]">NGN580</p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Quantity:</p>
//             <p className="font-semibold text-sm text-[#111827]">120</p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Category:</p>
//             <p className="font-semibold text-sm text-[#111827]">Coffee</p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">
//               Product Status:
//             </p>
//             <p className="font-semibold text-sm text-[#111827]">In Stock</p>
//           </div>
//         </div>
//         <div>
//           <Image
//             width={274}
//             height={274}
//             alt="Product image"
//             src="/images/bladmin-login.jpg"
//             className="w-[274px] h-[274px] rounded-full"
//           />
//         </div>
//       </div>
//       <div className="gap-5 justify-end flex">
//         <Button
//           variant="warning"
//           className="w-auto px-[3rem] py-4 font-bold text-base"
//           size="xl"
//           onClick={(e) => {
//             e.preventDefault();
//             setClose();
//           }}
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ViewProduct;

// ViewProduct.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface iProps {
//   setClose: () => void;
//   productData: any;
// }

// const ViewProduct: React.FC<iProps> = ({ setClose, productData }) => {
//   // Return null if no product data
//   if (!productData) return null;

//   console.log("productdetail", productData)
  
//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center mb-auto">
//         <div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Product ID:</p>
//             <p className="font-semibold text-sm text-[#111827]">
//               #{productData}
//             </p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Product Name:</p>
//             <p className="font-semibold text-sm text-[#111827]">
//               {productData.name}
//             </p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Description:</p>
//             <p className="font-semibold text-sm text-[#111827]">
//               {productData.description}
//             </p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">Category ID:</p>
//             <p className="font-semibold text-sm text-[#111827]">
//               {productData.categoryId}
//             </p>
//           </div>
//           <div className="flex gap-1 items-center mb-[26px]">
//             <p className="font-normal text-sm text-[#667085]">
//               Product Status:
//             </p>
//             <p className="font-semibold text-sm text-[#111827]">
//               {productData.isActive ? "Active" : "Inactive"}
//             </p>
//           </div>
//         </div>
//         <div>
//           <Image
//             width={274}
//             height={274}
//             alt="Product image"
//             src="/images/bladmin-login.jpg"
//             className="w-[274px] h-[274px] rounded-full"
//           />
//         </div>
//       </div>
//       <div className="gap-5 justify-end flex">
//         <Button
//           variant="warning"
//           className="w-auto px-[3rem] py-4 font-bold text-base"
//           size="xl"
//           onClick={setClose}
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ViewProduct;

// ViewProduct.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface iProps {
  setClose: () => void;
  productData: any;
}

const ViewProduct: React.FC<iProps> = ({ setClose, productData }) => {
  if (!productData) return null;
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start mb-auto gap-8">
        <div className="w-full">
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Product ID:</p>
            <p className="font-semibold text-sm text-[#111827]">
              #{productData.id}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Name:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {productData.name}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Description:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {productData.description}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Category:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {productData.categoryId}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Status:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {productData.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Manufacturer:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {productData.manufacturerId}
            </p>
          </div>
          <div className="flex gap-1 items-center mb-4">
            <p className="font-normal text-sm text-[#667085] w-32">Created:</p>
            <p className="font-semibold text-sm text-[#111827]">
              {new Date(productData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="min-w-[274px]">
          <Image
            width={274}
            height={274}
            alt="Product image"
            src="/images/bladmin-login.jpg"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      <div className="gap-5 justify-end flex mt-8">
        <Button
          variant="warning"
          className="w-auto px-8 py-3 font-bold text-base"
          size="xl"
          onClick={setClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewProduct;