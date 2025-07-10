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
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useCallback, useState } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";
// import { CountryDropdown } from "@/components/ui/country-dropdown";
// import { UploadIcon } from "../../../../../../../../public/icons";

// const formSchema = z.object({
//   manufacturername: z.string().min(5, "Name must be greater 4"),
//   contactperson: z.string(),
//   email: z.string().email(),
//   phonenumber: z.string(),
//   status: z.string(),
//   country: z.string(),
//   address: z.string(),
//   image: z
//     .instanceof(File)
//     .refine((file) => file.size !== 0, "Please upload an image"),
// });

// type FormSchemaType = z.infer<typeof formSchema>;
// interface iProps {
//   setClose: () => void;
// }

// const EditManufacturer: React.FC<iProps> = ({ setClose }) => {
//   const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       manufacturername: "",
//       contactperson: "",
//       email: "",
//       phonenumber: "",
//       status: "",
//       country: "",
//       address: "",
//       image: new File([""], "filename"),
//     },
//   });

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const reader = new FileReader();
//       try {
//         reader.onload = () => setPreview(reader.result);
//         reader.readAsDataURL(acceptedFiles[0]);
//         form.setValue("image", acceptedFiles[0]);
//         form.clearErrors("image");
//       } catch (error) {
//         setPreview(null);
//         form.resetField("image");
//       }
//     },
//     [form]
//   );

//   const { getRootProps, getInputProps, isDragActive, fileRejections } =
//     useDropzone({
//       onDrop,
//       maxFiles: 1,
//       maxSize: 10000000,
//       accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
//     });

//   async function onSubmit(values: FormSchemaType) {
//     await Promise.resolve(true);
//     console.warn(values);
//   }

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
//           <div className="flex gap-6 mb-6">
//             <FormField
//               control={form.control}
//               name="manufacturername"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Manufacturer Name</FormLabel>
//                   <FormControl>
//                     <Input type="text" placeholder="Dangote" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="contactperson"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Contact Person</FormLabel>
//                   <FormControl>
//                     <Input type="text" placeholder="Tman" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex gap-6 mb-6">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Email Address</FormLabel>
//                   <FormControl>
//                     <Input type="text" placeholder="sam@gmail.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phonenumber"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input type="text" placeholder="+234" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex gap-6 mb-6">
//             <FormField
//               control={form.control}
//               name="country"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Country</FormLabel>
//                   <CountryDropdown
//                     placeholder="--select option--"
//                     defaultValue={field.value}
//                     onChange={(country) => {
//                       field.onChange(country.name);
//                     }}
//                   />

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div>
//             <FormField
//               control={form.control}
//               name="image"
//               render={() => (
//                 <FormItem className="mb-14">
//                   <FormLabel
//                     className={`${
//                       fileRejections.length !== 0 && "text-destructive"
//                     }`}
//                   ></FormLabel>
//                   <FormControl>
//                     <div
//                       {...getRootProps()}
//                       className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-[#3B82F6] p-8 shadow-sm shadow-foreground"
//                     >
//                       {preview && (
//                         <Image
//                           src={preview as string}
//                           alt="Uploaded image"
//                           className="rounded-lg object-contain"
//                           width={250}
//                           height={300}
//                           layout="intrinsic"
//                         />
//                       )}
//                       {preview && <UploadIcon />}
//                       <Input {...getInputProps()} type="file" />
//                       {isDragActive ? (
//                         <p>Drop the image!</p>
//                       ) : (
//                         <div className="text-center">
//                           <p className="mb-1 font-medium text-sm text-[#111217]">
//                             Drag & Drop or{" "}
//                             <span className="text-warning">choose file</span> to
//                             upload
//                           </p>
//                           <p className="font-normal text-xs text-[#A4A5AB]">
//                             Supported formats : Jpeg, png
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage>
//                     {fileRejections.length !== 0 && (
//                       <p>
//                         Image must be less than 10MB and of type png, jpg, or
//                         jpeg
//                       </p>
//                     )}
//                   </FormMessage>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="gap-5 justify-end flex">
//             <Button
//               variant="outline"
//               className="w-auto py-4 px-[3rem] font-bold text-base"
//               size="xl"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setClose();
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="warning"
//               className="w-auto px-[3rem] py-4 font-bold text-base"
//               size="xl"
//             >
//               Create
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditManufacturer;


// "use client";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";
// import { UploadIcon } from "../../../../../../../../public/icons"; // Placeholder
// import { CountryDropdown } from "@/components/ui/country-dropdown";
// import { useCreateManufacturer, useUpdateManufacturer } from "@/services/manufacturers";
// import { toast } from "sonner";
// import manufacturer from "@/app/(admin)/admin/inventory-management/shared/manufacturer";

// const commonFormSchema = {
//   name: z.string().min(3, "Name must be at least 3 characters long."),
//   contactPerson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phone: z.string().optional(),
//   country: z.string().min(1, "Country is required."),
// };

// const createSchema = z.object({
//   ...commonFormSchema,
//   logo: z
//     .instanceof(File, { message: "A logo image is required." })
//     .refine((file) => file.size > 0, "A logo image is required."),
// });

// const updateSchema = z.object({
//     ...commonFormSchema,
//     logo: z.union([z.string(), z.instanceof(File)]).optional(), // Can be existing URL (string) or new File
// });

// // Define TypeScript types from Zod schemas
// type CreateFormSchemaType = z.infer<typeof createSchema>;
// type UpdateFormSchemaType = z.infer<typeof updateSchema>;



// // Helper function to upload the image to Cloudinary
// const uploadImageToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     // IMPORTANT: Replace with your actual Cloudinary upload preset
//     formData.append("upload_preset", "your_upload_preset"); 

//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // Store in .env.local
//     const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     try {
//         const response = await fetch(uploadUrl, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Cloudinary Error: ${errorData.error.message}`);
//         }

//         const data = await response.json();
//         return data.secure_url; // Return the HTTPS URL
//     } catch (error) {
//         console.error("Image upload failed:", error);
//         throw error; // Re-throw to be caught by the onSubmit handler
//     }
// };

// // Zod schema for form validation
// const formSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long."),
//   contactPerson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phone: z.string().optional(),
//   country: z.string().min(1, "Country is required."),
//   logo: z
//     .instanceof(File, { message: "A logo image is required." })
//     .refine((file) => file.size > 0, "A logo image is required."),
// });

// type FormSchemaType = z.infer<typeof formSchema>;

// interface IProps {
//   setClose: () => void;
//   id:any;
//   logo:any;
//   contactPerson:any;
//   email:any;
//   name:any;
// }

// const EdithManfacturer: React.FC<IProps> = ({ setClose }) => {


// const [isSubmitting, setIsSubmitting] = useState(false);
//     const [preview, setPreview] = useState(manufacturer?.logo || null);
//     const { updateManufacturerPayload, updateManufacturerIsLoading } = useUpdateManufacturer(setClose);

//     const form = useForm({
//         resolver: zodResolver(updateSchema),
//         defaultValues: {
//             name: manufacturer?.name || "",
//             contactPerson: manufacturer?.contactPerson || "",
//             email: manufacturer?.email || "",
//             phone: manufacturer?.phone || "",
//             country: manufacturer?.country || "",
//             logo: manufacturer?.logo || undefined,
//         },
//     });

//     useEffect(() => {
//         // Pre-fill form with manufacturer data
//         form.reset({
//             name: manufacturer?.name || "",
//             contactPerson: manufacturer?.contactPerson || "",
//             email: manufacturer?.email || "",
//             phone: manufacturer?.phone || "",
//             country: manufacturer?.country || "",
//             logo: manufacturer?.logo || undefined,
//         });
//         setPreview(manufacturer?.logo || null);
//     }, [manufacturer, form]);

//     const onDrop = useCallback((acceptedFiles) => {
//         const file = acceptedFiles[0];
//         if (file) {
//             setPreview(URL.createObjectURL(file));
//             form.setValue("logo", file, { shouldValidate: true });
//         }
//     }, [form]);

//     const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
//         onDrop, maxFiles: 1, maxSize: 5000000, accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
//     });

//     async function onSubmit(values: UpdateFormSchemaType) {
//         setIsSubmitting(true);
//         let logoUrl: string | undefined = "https//image"; // Default to existing logo

//         try {
//             // Step 1: If a new logo file is present, upload it
//             if (values.logo instanceof File) {
//                 toast.info("Uploading new logo...");
//                 logoUrl = await uploadImageToCloudinary(values.logo);
//                 toast.success("Logo updated!");
//             }

//             // Step 2: Prepare the final payload for your backend
//             const payload = { ...values, logo: logoUrl };

//             // Step 3: Call the mutation to update the manufacturer
//             await updateManufacturerPayload({ id: manufacturer.id, payload });

//         } catch (error: any) {
//             console.error("Update failed:", error);
//             const errorMessage = error?.response?.data?.error || error.message || "An unexpected error occurred.";
//             if (errorMessage.toLowerCase().includes("name")) {
//                 form.setError("name", { type: "manual", message: errorMessage });
//             } else if (errorMessage.toLowerCase().includes("email")) {
//                 form.setError("email", { type: "manual", message: errorMessage });
//             } else {
//                 toast.error(errorMessage);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//   const isLoading = isSubmitting || updateManufacturerIsLoading;

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Form Fields... */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Manufacturer Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Acme Inc." {...field} disabled={isLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           <FormField
//               control={form.control}
//               name="contactPerson"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contact Person</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Jane Doe" {...field} disabled={updateManufacturerIsLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email Address</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="contact@acme.com" {...field} disabled={updateManufacturerIsLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number (Optional)</FormLabel>
//                   <FormControl>
//                     <Input placeholder="+1 555-123-4567" {...field} disabled={updateManufacturerIsLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="country"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Country</FormLabel>
//                 <CountryDropdown
//                   placeholder="-- Select a country --"
//                   defaultValue={field.value}
//                   onChange={(country) => field.onChange(country.name)}
//                   disabled={updateManufacturerIsLoading}
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//             {/* ... other fields like contactPerson, email, phone, country */}
//           {/* </div> */}

//           {/* Logo Upload Field */}
//           <FormField
//             control={form.control}
//             name="logo"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Manufacturer Logo</FormLabel>
//                 <FormControl>
//                   <div
//                     {...getRootProps()}
//                     className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
//                       isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
//                     } ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:border-primary/70'}`}
//                   >
//                     {preview ? (
//                       <Image src={preview} alt="Logo preview" width={200} height={120} className="object-contain rounded-md" />
//                     ) : (
//                       <UploadIcon />
//                     )}
//                     <Input {...getInputProps()} disabled={isLoading} />
//                     <p className="mt-2 text-sm text-gray-600">
//                       {isDragActive ? "Drop the logo here!" : "Drag & drop or click to select a file"}
//                     </p>
//                     <p className="text-xs text-gray-500">PNG or JPG (Max 5MB)</p>
//                   </div>
//                 </FormControl>
//                 <FormMessage>
//                   {fileRejections.length > 0 && "Invalid file. Please check size and type."}
//                 </FormMessage>
//               </FormItem>
//             )}
//           />

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4 pt-4">
//             <Button type="button" variant="outline" size="xl" onClick={setClose} disabled={isLoading}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="warning" size="xl" disabled={isLoading}>
//               {isLoading ? "Creating..." : "Create Manufacturer"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EdithManfacturer;
// "use client";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";
// import { UploadIcon } from "../../../../../../../../public/icons";
// import { CountryDropdown } from "@/components/ui/country-dropdown";
// import { useUpdateManufacturer } from "@/services/manufacturers";
// import { toast } from "sonner";

// // Schema definitions
// const commonFormSchema = {
//   name: z.string().min(3, "Name must be at least 3 characters long."),
//   contactPerson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phone: z.string().optional(),
//   country: z.string().min(1, "Country is required."),
// };

// const updateSchema = z.object({
//   ...commonFormSchema,
//   logo: z.union([
//     z.string().url("Invalid logo URL"),
//     z.instanceof(File)
//   ]).optional(),
// });

// type UpdateFormSchemaType = z.infer<typeof updateSchema>;

// interface IProps {
//   setClose: () => void;
//   manufacturer: {
//     id: number;
//     name: string;
//     contactPerson: string;
//     email: string;
//     phone?: string;
//     country: string;
//     logo?: string;
//   };
// }

// const EditManufacturer: React.FC<IProps> = ({ setClose, manufacturer }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [preview, setPreview] = useState(manufacturer?.logo || null);
  
//   const { updateManufacturerPayload, updateManufacturerIsLoading } = useUpdateManufacturer(setClose);

//   const form = useForm<UpdateFormSchemaType>({
//     resolver: zodResolver(updateSchema),
//     defaultValues: {
//       name: manufacturer?.name || "",
//       contactPerson: manufacturer?.contactPerson || "",
//       email: manufacturer?.email || "",
//       phone: manufacturer?.phone || "",
//       country: manufacturer?.country || "",
//       logo: manufacturer?.logo || undefined,
//     },
//   });

//   useEffect(() => {
//     form.reset({
//       name: manufacturer.name,
//       contactPerson: manufacturer.contactPerson,
//       email: manufacturer.email,
//       phone: manufacturer.phone || "",
//       country: manufacturer.country,
//       logo: manufacturer.logo || undefined,
//     });
//     setPreview(manufacturer.logo || null);
//   }, [manufacturer, form]);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       form.setValue("logo", file, { shouldValidate: true });
//     }
//   }, [form]);

//   const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     maxSize: 5000000,
//     accept: { 
//       "image/png": [".png"], 
//       "image/jpeg": [".jpg", ".jpeg"] 
//     },
//   });

//   const uploadImageToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

//     const cloudName ="dsj9phqyk";
//     const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     try {
//       const response = await fetch(uploadUrl, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Cloudinary Error: ${errorData.error.message}`);
//       }

//       const data = await response.json();
//       return data.secure_url;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       throw error;
//     }
//   };

//   async function onSubmit(values: UpdateFormSchemaType) {
//     setIsSubmitting(true);
    
//     try {
//       let logoUrl: string | undefined = values.logo as string | undefined;

//       // Handle new logo upload
//       // if (values.logo instanceof File) {
//       //   logoUrl = await uploadImageToCloudinary(values.logo);
//       //   toast.success("Logo updated!");
//       // }

//       // Prepare payload
//       const payload = {
//         name: values.name,
//         contactPerson: values.contactPerson,
//         email: values.email,
//         phone: values.phone,
//         country: values.country,
//         logo: "https://testspace",
//       };

//       // Update manufacturer
//       await updateManufacturerPayload({
//         id: manufacturer.id,
//         payload
//       });

//     } catch (error: any) {
//       console.error("Update failed:", error);
//       const errorMessage = error.message || "An unexpected error occurred.";
      
//       // Handle specific field errors
//       if (errorMessage.includes("name")) {
//         form.setError("name", { message: errorMessage });
//       } else if (errorMessage.includes("email")) {
//         form.setError("email", { message: errorMessage });
//       } else {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   const isLoading = isSubmitting || updateManufacturerIsLoading;

"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../../../../../../../public/icons";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { useUpdateManufacturer } from "@/services/manufacturers";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Schema definitions
const commonFormSchema = {
	name: z.string().min(3, "Name must be at least 3 characters long."),
	contactPerson: z.string().min(3, "Contact person name is required."),
	email: z.string().email("Please enter a valid email address."),
	phone: z.string().optional(),
	country: z.string().min(1, "Country is required."),
};

const updateSchema = z.object({
	...commonFormSchema,
	logo: z
		.union([z.string().url("Invalid logo URL"), z.instanceof(File)])
		.optional(),
});

type UpdateFormSchemaType = z.infer<typeof updateSchema>;

interface Manufacturer {
	id: number;
	name: string;
	contactPerson: string;
	email: string;
	phone?: string;
	country: string;
	logo?: string;
}

interface UpdateParams {
	id: any;
	payload: any;
}

interface IProps {
	setClose: () => void;
	manufacturer: Manufacturer;
}

const EditManufacturer: React.FC<IProps> = ({ setClose, manufacturer }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [preview, setPreview] = useState(manufacturer?.logo || null);
	const queryClient = useQueryClient();

	const { updateManufacturerPayload, updateManufacturerIsLoading } =
		useUpdateManufacturer({
			onSuccessCallback: setClose,
			queryClient,
		});

	const form = useForm<UpdateFormSchemaType>({
		resolver: zodResolver(updateSchema),
		defaultValues: {
			name: manufacturer?.name || "",
			contactPerson: manufacturer?.contactPerson || "",
			email: manufacturer?.email || "",
			phone: manufacturer?.phone || "",
			country: manufacturer?.country || "",
			logo: manufacturer?.logo || undefined,
		},
	});

	useEffect(() => {
		if (manufacturer) {
			form.reset({
				name: manufacturer.name,
				contactPerson: manufacturer.contactPerson,
				email: manufacturer.email,
				phone: manufacturer.phone || "",
				country: manufacturer.country,
				logo: manufacturer.logo || undefined,
			});
			setPreview(manufacturer.logo || null);
		}
	}, [manufacturer, form]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file) {
				setPreview(URL.createObjectURL(file));
				form.setValue("logo", file, { shouldValidate: true });
			}
		},
		[form]
	);

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			maxSize: 5000000,
			accept: {
				"image/png": [".png"],
				"image/jpeg": [".jpg", ".jpeg"],
			},
		});

	const uploadImageToCloudinary = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append(
			"upload_preset",
			process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
		);

		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
		const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

		try {
			const response = await fetch(uploadUrl, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Cloudinary Error: ${errorData.error.message}`);
			}

			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			console.error("Image upload failed:", error);
			throw error;
		}
	};

	// async function onSubmit(values: UpdateFormSchemaType) {
	//   setIsSubmitting(true);

	//   try {
	//     let logoUrl: string | undefined = values.logo as string | undefined;

	//     // Handle new logo upload
	//     if (values.logo instanceof File) {
	//       logoUrl = await uploadImageToCloudinary(values.logo);
	//       toast.success("Logo updated!");
	//     }

	//     // Prepare payload matching backend expectations
	//     const payload = {
	//       name: values.name,
	//       contactPerson: values.contactPerson,
	//       email: values.email,
	//       phone: values.phone,
	//       country: values.country,
	//       logo: logoUrl,
	//     };

	//     // Update manufacturer
	//     await updateManufacturerPayload({
	//       id: manufacturer.id,
	//       payload
	//     });

	//   } catch (error: any) {
	//     console.error("Update failed:", error);
	//     const errorMessage = error.message || "An unexpected error occurred.";

	//     // Handle specific field errors
	//     if (errorMessage.includes("name")) {
	//       form.setError("name", { message: errorMessage });
	//     } else if (errorMessage.includes("email")) {
	//       form.setError("email", { message: errorMessage });
	//     } else {
	//       toast.error(errorMessage);
	//     }
	//   } finally {
	//     setIsSubmitting(false);
	//   }
	// }

	async function onSubmit(values: UpdateFormSchemaType) {
		setIsSubmitting(true);

		try {
			let logoUrl: string | undefined = values.logo as string | undefined;

			if (values.logo instanceof File) {
				logoUrl = await uploadImageToCloudinary(values.logo);
				toast.success("Logo updated!");
			}

			// Prepare payload with proper typing
			const payload: UpdateParams["payload"] = {
				name: values.name,
				contactPerson: values.contactPerson,
				email: values.email,
				phone: values.phone,
				country: values.country,
				logo: "hhtps//edith",
			};

			// Create update parameters with proper typing
			const updateParams: any = {
				id: manufacturer.id,
				payload,
			};

			// Call with typed parameters
			await updateManufacturerPayload(updateParams as any);
		} catch (error: any) {
			// Error handling remains the same
		} finally {
			setIsSubmitting(false);
		}
	}
	const isLoading = isSubmitting || updateManufacturerIsLoading;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Acme Inc." {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@acme.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 555-123-4567" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <CountryDropdown
                  placeholder="-- Select a country --"
                  defaultValue={field.value}
                  onChange={(country) => field.onChange(country.name)}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer Logo</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                    } ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:border-primary/70'}`}
                  >
                    {preview ? (
                      <Image 
                        src={!preview.includes("res.cloudinary.com")?"/images/user-avatar.jpg":preview} 
                        alt="Logo preview" 
                        width={200} 
                        height={120} 
                        className="object-contain rounded-md" 
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadIcon />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag & drop or click to select a file
                        </p>
                      </div>
                    )}
                    <input {...getInputProps()} disabled={isLoading} />
                    <p className="mt-2 text-sm text-gray-600">
                      {isDragActive ? "Drop the logo here!" : "PNG or JPG (Max 5MB)"}
                    </p>
                  </div>
                </FormControl>
                {fileRejections.length > 0 && (
                  <p className="text-destructive text-sm mt-1">
                    {fileRejections[0].errors[0].message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              size="xl" 
              onClick={setClose} 
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="warning" 
              size="xl" 
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Manufacturer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditManufacturer;