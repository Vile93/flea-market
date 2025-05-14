import { Button } from '@/components/ui/button';
import * as FileUpload from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface UploadImageProps {
    images: File[];
    isLoading: boolean;
    setImages: (images: File[]) => void;
    setSendOfferImageArgs: (formData: FormData[]) => void;
    setImagesLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UploadImage({ images, setImages, setSendOfferImageArgs, setImagesLinks, isLoading }: UploadImageProps) {
    const handleFileAccept = (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        setSendOfferImageArgs([formData]);
    };
    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setImagesLinks((imagesLinks) => imagesLinks.filter((_, i) => i !== index));
    };
    return (
        <div>
            <Label className="text-lg">Изображения</Label>
            <FileUpload.Root
                accept="image/*"
                onFileAccept={handleFileAccept}
                value={images}
                onValueChange={setImages}
                maxFiles={8}
                multiple
                disabled={images.length >= 8 || isLoading}
            >
                <FileUpload.Dropzone className="cursor-pointer">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm">Перетащи фото сюда</p>
                        <FileUpload.FileUploadTrigger asChild className="cursor-pointer">
                            <Button variant="outline" size="sm" className="mt-2 w-fit">
                                Обзор файлов
                            </Button>
                        </FileUpload.FileUploadTrigger>
                    </div>
                </FileUpload.Dropzone>
                <FileUpload.List>
                    {images.map((file, index) => (
                        <FileUpload.Item key={index} value={file} className="flex justify-center w-48 sm:w-96">
                            <FileUpload.ItemPreview className="h-full w-full" />

                            <div
                                className="absolute top-8 right-8 z-50 rounded-full bg-background-white"
                                onClick={() => handleDelete(index)}
                            >
                                <FileUpload.ItemDelete className="w-full h-full cursor-pointer">
                                    <div className="bg-white rounded-full p-1">
                                        <X className="h-8 w-8 text-black" />
                                    </div>
                                </FileUpload.ItemDelete>
                            </div>
                        </FileUpload.Item>
                    ))}
                </FileUpload.List>
                <FileUpload.Clear />
            </FileUpload.Root>
        </div>
    );
}
