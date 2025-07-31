"use client"
import { useEffect, useState } from "react";
import {useGetFeedbackByUser, useGetAllFeedback} from "@/services/feedback"

export default function CustomersPage() {

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    sort: 'recent'
  });
  const userId = "67"
  const [localUserId, setLocalUserId] = useState(userId);
  
  const {
    getFeedbackByUserIsLoading,
    getFeedbackByUserData,
    setFeedbackByUserFilter
  } = useGetFeedbackByUser();

  // Trigger fetch when userId changes
  useEffect(() => {
    if (localUserId) {
      setFeedbackByUserFilter(Number(localUserId));
    }
  }, [localUserId]);

  console.log(getFeedbackByUserData, "getDataFeedBack 67")

  const {
    getAllFeedbackIsLoading,
    getAllFeedbackData,
    getAllFeedbackCount,
    setAllFeedbackFilter
  } = useGetAllFeedback();

  // Apply filters when they change
  useEffect(() => {
    setAllFeedbackFilter(filters);
  }, [filters]);

  const handlePageChange = (newPage: any) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

console.log(getAllFeedbackData, "all FeedBack")
  return (
    <>
     new
    </>
  );
}
