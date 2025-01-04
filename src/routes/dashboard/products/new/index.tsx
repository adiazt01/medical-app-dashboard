import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDropzone } from 'react-dropzone'

export const Route = createFileRoute('/dashboard/products/new/')({
  component: RouteComponent,
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 5 // Maximum number of files allowed

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  dosage: z.string().min(1, {
    message: "Dosage is required.",
  }),
  activeIngredients: z.string().min(1, {
    message: "Active ingredients are required.",
  }),
  form: z.string({
    required_error: "Please select a product form.",
  }),
  manufacturer: z.string().min(2, {
    message: "Manufacturer name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  sideEffects: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Price must be a valid number with up to 2 decimal places.",
  }),
  images: z
    .array(z.any())
    .refine((files) => files.length > 0, "At least one image is required.")
    .refine((files) => files.length <= MAX_FILES, `You can upload up to ${MAX_FILES} images.`)
    .refine(
      (files) => files.every((file) => file?.size <= MAX_FILE_SIZE),
      `Each file size should be less than 5MB.`
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp'].includes(file?.type)
        ),
      ".jpg, .png or .webp files are accepted."
    ),
})

type FileWithPreview = File & { preview: string };

function RouteComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: "",
      activeIngredients: "",
      form: "",
      manufacturer: "",
      description: "",
      sideEffects: "",
      price: "",
      images: [],
    },
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    
    setUploadedFiles(prev => {
      const updated = [...prev, ...newFiles].slice(0, MAX_FILES);
      form.setValue('images', updated);
      return updated;
    });
  }, [form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: MAX_FILES,
    multiple: true
  })

  const removeFile = (file: FileWithPreview) => {
    const updatedFiles = uploadedFiles.filter(f => f !== file);
    setUploadedFiles(updatedFiles);
    form.setValue('images', updatedFiles);
    URL.revokeObjectURL(file.preview);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (!values.images || values.images.length === 0) {
        throw new Error("No files uploaded")
      }

      // Handle file uploads
      const uploadPromises = values.images.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        // return await uploadFile(formData)
      })

      const uploadResults = await Promise.all(uploadPromises)

      // Here you would typically send the form data to your backend
      // For now, we'll just simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Product Added",
        description: "The medicine product has been successfully added.",
      })
      form.reset()
      setUploadedFiles([])
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "There was a problem adding the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    return () => uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  }, [uploadedFiles])

  return(
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Medicine Product</CardTitle>
        <CardDescription>Enter the details of the new medicine product below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 500mg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activeIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Ingredients</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Paracetamol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="form"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Form</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="liquid">Liquid</SelectItem>
                      <SelectItem value="cream">Cream</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter manufacturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sideEffects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side Effects</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter potential side effects" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormDescription>Enter the price in your local currency.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <div 
                      {...getRootProps()} 
                      className={`mt-2 border-2 border-dashed rounded-md p-6 ${
                        isDragActive ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <p className="text-center">
                        {isDragActive
                          ? "Drop the files here"
                          : `Drag 'n' drop some files here, or click to select files (max ${MAX_FILES})`}
                      </p>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload product images (max 5MB each, up to {MAX_FILES} images, .jpg, .png, or .webp)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <Label>Image Previews:</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-2">
                        <div className="relative aspect-square">
                          <img 
                            src={file.preview} 
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full h-full rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1"
                            onClick={() => removeFile(file)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            <Button type="submit" disabled={isSubmitting || uploadedFiles.length === 0}>
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
