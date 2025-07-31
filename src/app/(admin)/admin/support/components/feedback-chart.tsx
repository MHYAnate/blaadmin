"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface FeedbackData {
	new: number;
	inReview: number;
	escalated: number;
	resolved: number;
}

interface WorkloadData {
	resolvedWithin24h: number;
	resolvedWithin2_3Days: number;
	resolvedWithinWeek: number;
	unresolved: number;
}

const feedbackData: Record<string, FeedbackData> = {
	today: { new: 38, inReview: 49, escalated: 35, resolved: 28 },
	week: { new: 156, inReview: 203, escalated: 89, resolved: 178 },
	month: { new: 642, inReview: 789, escalated: 234, resolved: 892 },
};

const workloadData: Record<string, WorkloadData> = {
	today: {
		resolvedWithin24h: 50,
		resolvedWithin2_3Days: 30,
		resolvedWithinWeek: 15,
		unresolved: 5,
	},
	week: {
		resolvedWithin24h: 45,
		resolvedWithin2_3Days: 35,
		resolvedWithinWeek: 15,
		unresolved: 5,
	},
	month: {
		resolvedWithin24h: 42,
		resolvedWithin2_3Days: 38,
		resolvedWithinWeek: 15,
		unresolved: 5,
	},
};

export function FeedbackBarComponent() {
	const [selectedPeriod, setSelectedPeriod] = useState("today");

	const currentFeedback = feedbackData[selectedPeriod];
	const currentWorkload = workloadData[selectedPeriod];

	const feedbackItems = [
		{ label: "New", value: currentFeedback.new, color: "bg-blue-400" },
		{
			label: "In Review",
			value: currentFeedback.inReview,
			color: "bg-green-400",
		},
		{
			label: "Escalated",
			value: currentFeedback.escalated,
			color: "bg-pink-400",
		},
		{
			label: "Resolved",
			value: currentFeedback.resolved,
			color: "bg-orange-400",
		},
	];

	const workloadItems = [
		{
			label: "Resolved",
			sublabel: "within 24 hours",
			value: currentWorkload.resolvedWithin24h,
		},
		{
			label: "Resolved within",
			sublabel: "2-3 days",
			value: currentWorkload.resolvedWithin2_3Days,
		},
		{
			label: "Resolved within",
			sublabel: "a week",
			value: currentWorkload.resolvedWithinWeek,
		},
		{
			label: "Unresolved",
			sublabel: "",
			value: currentWorkload.unresolved,
		},
	];

	const maxFeedbackValue = 100;
	const getBarHeight = (value: number) => (value / maxFeedbackValue) * 100;

	return (
		<div className="flex gap-6 p-6 bg-gray-50 h-fit">
			{/* Left Component - Feedback Status Distribution */}
			<Card className="flex-[2] bg-white shadow-sm border border-gray-200">
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg font-medium text-gray-700">
							Feedback Status Distribution
						</CardTitle>
						<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
							<SelectTrigger className="w-24 h-8 text-sm border-gray-300">
								<SelectValue />
								<ChevronDown className="h-3 w-3 opacity-50" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="today">Today</SelectItem>
								<SelectItem value="week">This Week</SelectItem>
								<SelectItem value="month">This Month</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="flex gap-3">
						{/* Y-Axis */}
						<div className="flex flex-col-reverse justify-between text-xs text-gray-400 h-40 py-1">
							<span>0</span>
							<span>10</span>
							<span>20</span>
							<span>30</span>
							<span>40</span>
							<span>50</span>
						</div>

						{/* Bar Chart */}
						<div className="flex-1 flex items-end justify-between gap-3 h-40 border-l border-gray-200 pl-4">
							{feedbackItems.map((item, index) => (
								<div
									key={item.label}
									className="flex flex-col items-center gap-2 flex-1"
								>
									<div
										className={`w-full ${item.color} transition-all duration-300 ease-in-out hover:opacity-80 cursor-pointer`}
										style={{ height: `${getBarHeight(item.value)}%` }}
										title={`${item.label}: ${item.value}`}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Legend */}
				{/* Legend - Feedback Items */}
<div className="flex flex-wrap gap-4 text-[0.65rem] mt-6 pl-8 sm:text-[0.7rem] md:text-xs lg:flex-nowrap lg:overflow-x-auto">
  {feedbackItems.map((item) => (
    <div key={item.label} className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 ${item.color} rounded-sm`} />
      <span className="text-gray-500">{item.label}</span>
    </div>
  ))}
</div>

				</CardContent>
			</Card>

			{/* Right Component - Support Team Workload Overview */}
			<Card className="flex-[3] bg-white shadow-sm border border-gray-200">
				<CardHeader className="pb-6">
					<CardTitle className="text-lg font-medium text-gray-700">
						Support Team Workload Overview
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-5">
						{workloadItems.map((item, index) => (
							<div key={index} className="flex items-center gap-4">
								{/* Label */}
								<div className="w-32 flex-shrink-0 text-sm text-gray-500">
									<div>{item.label}</div>
									{item.sublabel && <div>{item.sublabel}</div>}
								</div>

								{/* Progress Bar Container */}
								{/* <div className="flex-1 relative">
                  <div className="w-full h-4 bg-gray-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500 ease-out"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div> */}
								<div className="flex-1 relative">
									<div className="w-full h-4 bg-gray-100 rounded-sm overflow-hidden relative">
										<div
											className="h-full bg-green-500 transition-all duration-500 ease-out relative"
											style={{ width: `${item.value}%` }}
										>
											{/* Percentage Label at the tip of progress */}
											<span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-white font-semibold px-1">
												{item.value}%
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Updated Scale to 100% */}
<div className="flex justify-between text-xs text-gray-400 mt-6 pt-2 ml-36">
  {[0, 20, 40, 60, 80, 100].map((value) => (
    <span key={value}>{value}</span>
  ))}
</div>

				</CardContent>
			</Card>
		</div>
	);
}
