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
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useCallback, useState } from "react";
// import Image from "next/image";
// import { useDropzone } from "react-dropzone";
// import { UploadIcon } from "../../../../../public/icons";
// import { CountryDropdown } from "@/components/ui/country-dropdown";

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

// const AddManufacturer: React.FC<iProps> = ({ setClose }) => {
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

// export default AddManufacturer;


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
// import { UploadIcon } from "../../../../../public/icons"; // Placeholder for an upload icon
// import { CountryDropdown } from "@/components/ui/country-dropdown";
// import { useCreateManufacturer } from "@/services/manufacturers"; // Adjust path as needed
// import { toast } from "sonner"; // Using a toast library for user feedback is recommended

// /**
//  * MOCK IMAGE UPLOAD SERVICE
//  * In a real application, this function would upload the file to a cloud storage
//  * service (like AWS S3, Cloudinary, or Firebase Storage) and return its public URL.
//  * @param {File} file - The file to upload.
//  * @returns {Promise<string>} The URL of the uploaded file.
//  */
// const uploadImageService = async (file: File): Promise<string> => {
//     console.log("Simulating image upload for:", file.name);
//     // Create a FormData object to send the file
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_upload_preset"); // Example for Cloudinary

//     // const response = await fetch('YOUR_CLOUD_UPLOAD_URL', {
//     //   method: 'POST',
//     //   body: formData,
//     // });
//     // const data = await response.json();
//     // return data.secure_url;

//     // For demonstration, we'll simulate the delay and return a placeholder URL.
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return `https://placehold.co/400x300/e2e8f0/4a5568?text=${encodeURIComponent(file.name)}`;
// };

// // Zod schema for form validation, aligned with backend requirements
// const formSchema = z.object({
//   manufacturername: z.string().min(5, "Name must be at least 5 characters long."),
//   contactperson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phonenumber: z.string().optional(), // Phone is optional on the backend
//   country: z.string().min(1, "Country is required."),
//   image: z
//     .instanceof(File, { message: "A logo image is required." })
//     .refine((file) => file.size > 0, "A logo image is required."),
// });

// type FormSchemaType = z.infer<typeof formSchema>;

// interface iProps {
//   setClose: () => void;
// }

// const AddManufacturer: React.FC<iProps> = ({ setClose }) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   // Instantiate the custom hook to manage the creation logic
//   const { createManufacturer, isLoading } = useCreateManufacturer({
//     onSuccess: (data: { name: any; }) => {
//       toast.success(`Manufacturer "${data.name}" created successfully!`);
//       setClose(); // Close the form/modal on success
//     },
//   });

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       manufacturername: "",
//       contactperson: "",
//       email: "",
//       phonenumber: "",
//       country: "",
//       image: undefined,
//     },
//   });

//   // Handler for the dropzone component
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => setPreview(reader.result as string);
//         reader.readAsDataURL(file);
//         form.setValue("image", file, { shouldValidate: true });
//       }
//     },
//     [form]
//   );

//   const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     maxSize: 10000000, // 10MB
//     accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
//   });

//   // The main submission handler
//   async function onSubmit(values: FormSchemaType) {
//     try {
//       // Step 1: Upload the image file to get its URL.
//       // This is a critical step because the backend expects a URL string, not a file.
//       const logoUrl = await uploadImageService(values.image);

//       // Step 2: Call the createManufacturer function from our hook,
//       // providing the form values and overriding the 'image' field with the new URL.
//       await createManufacturer({
//         ...values,
//         image: logoUrl,
//       });
//     } catch (err: any) {
//       // The hook's internal error state can be used to display an inline error,
//       // but a toast provides immediate, visible feedback for submission errors.
//       toast.error(err.message || "Submission failed. Please try again.");
//       console.error("Submission process failed:", err);
//     }
//   }

//   // Display a general error message from the last API call
//   const apiError = form.formState.errors.root?.message ;

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Display API error message */}
//           {apiError && (
//              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
//                 {apiError}
//              </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="manufacturername"
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
//             <FormField
//               control={form.control}
//               name="contactperson"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contact Person</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Jane Doe" {...field} disabled={isLoading} />
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
//                     <Input type="email" placeholder="contact@acme.com" {...field} disabled={isLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phonenumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number (Optional)</FormLabel>
//                   <FormControl>
//                     <Input placeholder="+1 555-123-4567" {...field} disabled={isLoading} />
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
//                   disabled={isLoading}
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="image"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Manufacturer Logo</FormLabel>
//                 <FormControl>
//                   <div
//                     {...getRootProps()}
//                     className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
//                       isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                     } ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:border-blue-400'}`}
//                   >
//                     {preview ? (
//                       <Image src={preview} alt="Logo preview" width={200} height={120} className="object-contain rounded-md" />
//                     ) : (
//                       <UploadIcon  />
//                     )}
//                     <Input {...getInputProps()} disabled={isLoading} />
//                      <p className="mt-2 text-sm text-gray-600">
//                         {isDragActive ? "Drop the logo here!" : "Drag & drop or click to select a file"}
//                      </p>
//                      <p className="text-xs text-gray-500">PNG, JPG, or JPEG (Max 10MB)</p>
//                   </div>
//                 </FormControl>
//                 <FormMessage>
//                   {fileRejections.length > 0 && "File is invalid. Please check size and type."}
//                 </FormMessage>
//               </FormItem>
//             )}
//           />

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

// export default AddManufacturer;


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
// import { UploadIcon } from "../../../../../public/icons"; // Placeholder for an upload icon
// import { CountryDropdown } from "@/components/ui/country-dropdown";
// import { useCreateManufacturer } from "@/services/manufacturers"; // Adjust path as needed
// import { toast } from "sonner"; 

// /**
//  * Handles the actual image upload to Cloudinary.
//  * IMPORTANT: In a production application, you should perform this upload via a secure backend
//  * endpoint to avoid exposing your Cloudinary credentials on the client-side.
//  *
//  * @param {File} file - The file to upload.
//  * @returns {Promise<string>} The public URL of the uploaded file from Cloudinary.
//  */
// const uploadImageToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     // Replace 'YOUR_UPLOAD_PRESET' with your actual Cloudinary upload preset.
//     // An upload preset is a collection of upload settings you can define in your Cloudinary console.
//     formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); 

//     // Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name.

// //     CLOUDINARY_CLOUD_NAME="dsj9phqyk"
// // CLOUDINARY_API_KEY="944976139677579"
// // CLOUDINARY_API_SECRET="ht6R9JPtXhxRD-H4J41I18SAGgU"

//     const cloudName = 'dsj9phqyk';
//     const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     try {
//         const response = await fetch(uploadUrl, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Cloudinary upload failed: ${errorData.error.message}`);
//         }

//         const data = await response.json();
//         // The secure_url is the HTTPS URL of the uploaded file.
//         return data.secure_url;

//     } catch (error) {
//         console.error("Error uploading image to Cloudinary:", error);
//         // Re-throw the error to be caught by the onSubmit handler
//         throw error;
//     }
// };


// // Zod schema for form validation, aligned with backend requirements
// const formSchema = z.object({
//   manufacturername: z.string().min(5, "Name must be at least 5 characters long."),
//   contactperson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phonenumber: z.string().optional(), // Phone is optional on the backend
//   country: z.string().min(1, "Country is required."),
//   image: z
//     .instanceof(File, { message: "A logo image is required." })
//     .refine((file) => file.size > 0, "A logo image is required."),
// });

// type FormSchemaType = z.infer<typeof formSchema>;

// interface iProps {
//   setClose: () => void;
// }

// const AddManufacturer: React.FC<iProps> = ({ setClose }) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   // Instantiate the custom hook to manage the creation logic
//   const { createManufacturer, isLoading } = useCreateManufacturer({
//     onSuccess: (data: { name: any; }) => {
//       toast.success(`Manufacturer "${data.name}" created successfully!`);
//       setClose(); // Close the form/modal on success
//     },
//   });

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       manufacturername: "",
//       contactperson: "",
//       email: "",
//       phonenumber: "",
//       country: "",
//       image: undefined,
//     },
//   });

//   // Handler for the dropzone component
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => setPreview(reader.result as string);
//         reader.readAsDataURL(file);
//         form.setValue("image", file, { shouldValidate: true });
//       }
//     },
//     [form]
//   );

//   const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     maxSize: 10000000, // 10MB
//     accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
//   });

//   // The main submission handler
//   async function onSubmit(values: FormSchemaType) {
//     try {
//       // Step 1: Upload the image file to Cloudinary to get its URL.
//       const logoUrl = await uploadImageToCloudinary(values.image);

//       // Step 2: Call the createManufacturer function from our hook,
//       // providing the form values and overriding the 'image' field with the real Cloudinary URL.
//       await createManufacturer({
//         ...values,
//         image: logoUrl,
//       });
//     } catch (err: any) {
//       toast.error(err.message || "Submission failed. Please try again.");
//       console.error("Submission process failed:", err);
//     }
//   }

//   const apiError = form.formState.errors.root?.message;

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {apiError && (
//              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
//                 {apiError}
//              </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="manufacturername"
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
//             <FormField
//               control={form.control}
//               name="contactperson"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contact Person</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Jane Doe" {...field} disabled={isLoading} />
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
//                     <Input type="email" placeholder="contact@acme.com" {...field} disabled={isLoading} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phonenumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number (Optional)</FormLabel>
//                   <FormControl>
//                     <Input placeholder="+1 555-123-4567" {...field} disabled={isLoading} />
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
//                   disabled={isLoading}
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="image"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Manufacturer Logo</FormLabel>
//                 <FormControl>
//                   <div
//                     {...getRootProps()}
//                     className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
//                       isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                     } ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:border-blue-400'}`}
//                   >
//                     {preview ? (
//                       <Image src={preview} alt="Logo preview" width={200} height={120} className="object-contain rounded-md" />
//                     ) : (
//                       <UploadIcon />
//                     )}
//                     <Input {...getInputProps()} disabled={isLoading} />
//                      <p className="mt-2 text-sm text-gray-600">
//                         {isDragActive ? "Drop the logo here!" : "Drag & drop or click to select a file"}
//                      </p>
//                      <p className="text-xs text-gray-500">PNG, JPG, or JPEG (Max 10MB)</p>
//                   </div>
//                 </FormControl>
//                 <FormMessage>
//                   {fileRejections.length > 0 && "File is invalid. Please check size and type."}
//                 </FormMessage>
//               </FormItem>
//             )}
//           />

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

// export default AddManufacturer;

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../../../../public/icons"; // Placeholder for an upload icon
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { useCreateManufacturer } from "@/services/manufacturers"; // Adjust path as needed
import { toast } from "sonner"; 

/**
 * Handles the actual image upload to Cloudinary.
 *
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} The public URL of the uploaded file from Cloudinary.
 */
const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    // FIX: Replace the placeholder below with your actual Cloudinary upload preset name.
    // To get this, log in to your Cloudinary account, go to Settings (gear icon) -> Upload,
    // and find the "Upload presets" section. You need to use an "unsigned" preset for this client-side upload to work.
    // If you don't have one, create a new one and set the "Signing Mode" to "Unsigned".
    formData.append("upload_preset", "your_actual_upload_preset_name_here"); 

    const cloudName = 'dsj9phqyk'; // Using the cloud name you provided.
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary upload failed: ${errorData.error.message}`);
        }

        const data = await response.json();
        // The secure_url is the HTTPS URL of the uploaded file.
        return data.secure_url;

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        // Re-throw the error to be caught by the onSubmit handler
        throw error;
    }
};


// Zod schema for form validation, aligned with backend requirements
// const formSchema = z.object({
//   manufacturername: z.string().min(5, "Name must be at least 5 characters long."),
//   contactperson: z.string().min(3, "Contact person name is required."),
//   email: z.string().email("Please enter a valid email address."),
//   phonenumber: z.string().optional(), // Phone is optional on the backend
//   country: z.string().min(1, "Country is required."),
//   image: z
//     .instanceof(File, { message: "A logo image is required." })
//     .refine((file) => file.size > 0, "A logo image is required."),
// });

// type FormSchemaType = z.infer<typeof formSchema>;

const formSchema = z.object({
  manufacturername: z.string().min(5, "Name must be at least 5 characters long."),
  contactperson: z.string().min(3, "Contact person name is required."),
  email: z.string().email("Please enter a valid email address."),
  phonenumber: z.string().optional(),
  country: z.string().min(1, "Country is required."),
  logo: z  // Changed from 'image' to 'logo'
    .instanceof(File, { message: "A logo image is required." })
    .refine((file) => file.size > 0, "A logo image is required."),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface iProps {
  setClose: () => void;
}

const AddManufacturer: React.FC<iProps> = ({ setClose }) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Instantiate the custom hook to manage the creation logic
  // const { createManufacturer, isLoading } = useCreateManufacturer({
  //   onSuccess: (data: { name: any; }) => {
  //     toast.success(`Manufacturer "${data.name}" created successfully!`);
  //     setClose(); // Close the form/modal on success
  //   },
  // });

  const { createManufacturerPayload, createManufacturerIsLoading } = useCreateManufacturer((responseData: { message: any; }) => {
    // This code runs only on success
    toast.success(responseData.message || "Manufacturer created!");
    setClose(); // Close the modal
    // You could also refetch the manufacturers list here
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manufacturername: "",
      contactperson: "",
      email: "",
      phonenumber: "",
      country: "",
      logo: undefined,
    },
  });

  // Handler for the dropzone component
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
        form.setValue("logo", file, { shouldValidate: true });
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10000000, // 10MB
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
  });

  // The main submission handler
  // async function onSubmit(values: FormSchemaType) {
  //   try {
  //     // Step 1: Upload the image file to Cloudinary to get its URL.
  //     const logoUrl = await uploadImageToCloudinary(values.image);

  //     // Step 2: Call the createManufacturer function from our hook,
  //     // providing the form values and overriding the 'image' field with the real Cloudinary URL.
  //     await createManufacturer({
  //       ...values,
  //       image: logoUrl,
  //     });
  //   } catch (err: any) {
  //     toast.error(err.message || "Submission failed. Please try again.");
  //     console.error("Submission process failed:", err);
  //   }
  // }

  // async function onSubmit(values: FormSchemaType) {
  //   const formData = new FormData();

  //   // The keys ('logo', 'name', etc.) must match what your backend (multer) expects
  //   formData.append("logo", values.image); 
  //   formData.append("name", values.manufacturername);
  //   formData.append("contactPerson", values.contactperson);
  //   formData.append("email", values.email);
  //   formData.append("country", values.country);
  //   if (values.phonenumber) {
  //     formData.append("phone", values.phonenumber);
  //   }

  //   // This triggers the API call. You don't need a try/catch here
  //   // because the hook handles success and error internally.
  //   await createManufacturerPayload(formData);
  // }


  // async function onSubmit(values: FormSchemaType) {
  //   const formData = new FormData();
  
  //   // UPDATED: Changed 'image' to 'logo' to match backend expectation
  //   formData.append("logo", values.logo); // Field name must be "logo"
  //   formData.append("name", values.manufacturername);
  //   formData.append("contactPerson", values.contactperson);
  //   formData.append("email", values.email);
  //   formData.append("country", values.country);
    
  //   if (values.phonenumber) {
  //     formData.append("phone", values.phonenumber);
  //   }
  
  //   await createManufacturerPayload(formData);
  // }

  async function onSubmit(values: FormSchemaType) {
    // Add debug logs to verify file type
    console.log("Logo file type:", values.logo instanceof File); // Should be true
    console.log("Logo content:", values.logo);
  
    const formData = new FormData();
    
    // Append the file directly (should be File object)
    formData.append("logo", values.logo);
    
    // Append other fields
    formData.append("name", values.manufacturername);
    formData.append("contactPerson", values.contactperson);
    formData.append("email", values.email);
    formData.append("country", values.country);
    
    if (values.phonenumber) {
      formData.append("phone", values.phonenumber);
    }
  
    await createManufacturerPayload(formData);
  }
  const apiError = form.formState.errors.root?.message;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {apiError && (
             <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {apiError}
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="manufacturername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Acme Inc." {...field} disabled={createManufacturerIsLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactperson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} disabled={createManufacturerIsLoading} />
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
                    <Input type="email" placeholder="contact@acme.com" {...field} disabled={createManufacturerIsLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 555-123-4567" {...field} disabled={createManufacturerIsLoading} />
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
                  disabled={createManufacturerIsLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="logo"
            render={() => (
              <FormItem>
                <FormLabel>Manufacturer Logo</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    } ${createManufacturerIsLoading ? 'cursor-not-allowed opacity-60' : 'hover:border-blue-400'}`}
                  >
                    {preview ? (
                      <Image src={preview} alt="Logo preview" width={200} height={120} className="object-contain rounded-md" />
                    ) : (
                      <UploadIcon  />
                    )}
                    <Input {...getInputProps()} disabled={createManufacturerIsLoading} />
                     <p className="mt-2 text-sm text-gray-600">
                        {isDragActive ? "Drop the logo here!" : "Drag & drop or click to select a file"}
                     </p>
                     <p className="text-xs text-gray-500">PNG, JPG, or JPEG (Max 10MB)</p>
                  </div>
                </FormControl>
                <FormMessage>
                  {fileRejections.length > 0 && "File is invalid. Please check size and type."}
                </FormMessage>
              </FormItem>
            )}
          /> */}

<FormField
  control={form.control}
  name="logo"  // Changed from 'image' to 'logo'
  render={() => (
    <FormItem>
      <FormLabel>Manufacturer Logo</FormLabel>
      <FormControl>
        <div {...getRootProps()} className={`...`}>
          {preview ? (
            <Image src={preview} alt="Logo preview" width={200} height={120} />
          ) : (
            <UploadIcon />
          )}
          <Input {...getInputProps()} />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? "Drop the logo here!" : "Drag & drop or click to select a file"}
          </p>
        </div>
      </FormControl>
      <FormMessage>
        {fileRejections.length > 0 && "File is invalid. Please check size and type."}
      </FormMessage>
    </FormItem>
  )}
/>


          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" size="xl" onClick={setClose} disabled={createManufacturerIsLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="warning" size="xl" disabled={createManufacturerIsLoading}>
              {createManufacturerIsLoading ? "Creating..." : "Create Manufacturer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddManufacturer;
