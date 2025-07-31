// "use client";

// import Header from "@/app/(admin)/components/header";
// import { InputFilter } from "@/app/(admin)/components/input-filter";
// import { SelectFilter } from "@/app/(admin)/components/select-filter";
// import { Card, CardContent } from "@/components/ui/card";
// import FeedbackCard from "@/components/widgets/feeedback";
// import {  useEffect, useState } from "react";
// import ViewSupport from "./support-details";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ChevronLeft } from "lucide-react";
// import { FeedbackBarComponent } from "./feedback-chart";
// import {useGetFeedbackByUser, useGetAllFeedback} from "@/services/feedback"
// import { useGetCustomerInfo } from "@/services/customers";


// const Feedbacks: React.FC = () => {
//   const [role, setRole] = useState<string>("");
//   const [filter, setFilter] = useState<string>("");
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const [filters, setFilters] = useState({
//     page: 1,
//     pageSize: 10,
//     sort: 'recent'
//   });
//   const customerId = "67"
//   const [localcustomerId, setLocalcustomerId] = useState(customerId);
  
//   const {
//     getFeedbackByUserIsLoading,
//     getFeedbackByUserData,
//     setFeedbackByUserFilter
//   } = useGetFeedbackByUser();

//   // Trigger fetch when customerId changes
//   useEffect(() => {
//     if (localcustomerId) {
//       setFeedbackByUserFilter(Number(localcustomerId));
//     }
//   }, [localcustomerId]);



//   const {
//     getAllFeedbackIsLoading,
//     getAllFeedbackData,
//     getAllFeedbackCount,
//     setAllFeedbackFilter
//   } = useGetAllFeedback();

//   // Apply filters when they change
//   useEffect(() => {
//     setAllFeedbackFilter(filters);
//   }, [filters]);

//   const handlePageChange = (newPage: any) => {
//     setFilters(prev => ({ ...prev, page: newPage }));
//   };

//     const {
//       getCustomerInfoData: data,
//       setCustomerInfoFilter,
//       getCustomerInfoIsLoading,
//       refetchCustomerInfo,
//     } = useGetCustomerInfo();

//     useEffect(() => {
//       setCustomerInfoFilter(customerId);
  
//     }, [customerId]);

//   console.log(getFeedbackByUserData, "getDataFeedBack 67", getAllFeedbackData, "feedback" , data, "customer" )

//   const roleList = [
//     {
//       text: "Admin",
//       value: "admin",
//     },
//     {
//       text: "Super Admin",
//       value: "super-admin",
//     },
//   ];

//   return (
//     <>
//       <Card className="bg-white">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <Header
//               title="Customer Feedback Center"
//               subtext="View and manage customer feedback to improve service and address concerns effectively."
//             />
//           </div>
//           {/* <FeedbackBarComponent /> */}
//           <div className="flex items-center gap-4 my-6">
//             <InputFilter setQuery={setFilter} placeholder="Search customers" />

//             <SelectFilter
//               setFilter={setRole}
//               placeholder="Select Role"
//               list={roleList}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <FeedbackCard key={index} onClick={() => setIsOpen(true)} />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!open)}>
//         <DialogContent
//           className={`${"right-0 p-8 max-w-[40.56rem] h-screen overflow-y-scroll"}`}
//         >
//           <DialogHeader>
//             <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-[18px] items-center">
//               <div onClick={() => setIsOpen(false)} className="cursor-pointer">
//                 <ChevronLeft size={24} />
//               </div>
//               <div>
//                 <h5 className="font-bold text-2xl text-[#111827] mb-2">
//                   Feedback Details
//                 </h5>
//               </div>
//             </DialogTitle>
//           </DialogHeader>

//           <ViewSupport setClose={setIsOpen} />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Feedbacks;



"use client";

import Header from "@/app/(admin)/components/header";
import { InputFilter } from "@/app/(admin)/components/input-filter";
import { SelectFilter } from "@/app/(admin)/components/select-filter";
import { Card, CardContent } from "@/components/ui/card";
import FeedbackCard from "@/components/widgets/feeedback";
import { useEffect, useState } from "react";
import ViewSupport from "./support-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { useGetFeedbackByUser, useGetAllFeedback } from "@/services/feedback";
import { useGetCustomerInfo } from "@/services/customers";

// Define Feedback type
type Feedback = {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const Feedbacks: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    sort: 'recent'
  });
  
  const customerId = "67";
  const [localcustomerId, setLocalcustomerId] = useState(customerId);
  
  const {
    getFeedbackByUserIsLoading,
    getFeedbackByUserData,
    setFeedbackByUserFilter
  } = useGetFeedbackByUser();

  const {
    getAllFeedbackIsLoading,
    getAllFeedbackData,
    getAllFeedbackCount,
    setAllFeedbackFilter
  } = useGetAllFeedback();

  const {
    getCustomerInfoData: customerData,
    setCustomerInfoFilter,
    getCustomerInfoIsLoading,
    refetchCustomerInfo,
  } = useGetCustomerInfo();

  // Trigger fetches
  useEffect(() => {
    if (localcustomerId) {
      setFeedbackByUserFilter(Number(localcustomerId));
      setCustomerInfoFilter(localcustomerId);
    }
    setAllFeedbackFilter(filters);
  }, [localcustomerId, filters]);

  const handlePageChange = (newPage: any) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const roleList = [
    { text: "Admin", value: "admin" },
    { text: "Super Admin", value: "super-admin" },
  ];

  // Get user name from customer data
  const getUserName = (userId: number) => {
    if (!customerData || customerData.id !== userId.toString()) return "Unknown User";
    return `${customerData.firstName} ${customerData.lastName}` || "Unknown User";
  };

  return (
    <>
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Header
              title="Customer Feedback Center"
              subtext="View and manage customer feedback to improve service and address concerns effectively."
            />
          </div>
          <div className="flex items-center gap-4 my-6">
            <InputFilter setQuery={setFilter} placeholder="Search customers" />
            <SelectFilter
              setFilter={setRole}
              placeholder="Select Role"
              list={roleList}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {getAllFeedbackData?.data?.map((feedback: Feedback) => (
              <FeedbackCard 
                key={feedback.id} 
                onClick={() => {
                  setSelectedFeedback(feedback);
                  setIsOpen(true);
                }}
                feedback={feedback}
                userName={getUserName(feedback.userId)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="right-0 p-8 max-w-[40.56rem] h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="mb-6 text-2xl font-bold text-[#111827] flex gap-[18px] items-center">
              <div onClick={() => setIsOpen(false)} className="cursor-pointer">
                <ChevronLeft size={24} />
              </div>
              <h5 className="font-bold text-2xl text-[#111827]">
                Feedback Details
              </h5>
            </DialogTitle>
          </DialogHeader>
          <ViewSupport 
            setClose={setIsOpen} 
            feedback={selectedFeedback} 
            userName={selectedFeedback ? getUserName(selectedFeedback.userId) : "Unknown User"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Feedbacks;