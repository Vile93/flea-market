import { Button } from '@/components/ui/button';
import * as FileUpload from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface UploadImageProps {
    images: File[];
    setImages: (images: File[]) => void;
}

export function UploadImage({ images, setImages }: UploadImageProps) {
    return (
        <div>
            <Label className="text-lg">Изображения</Label>
            <FileUpload.Root accept="image/*" value={images} onValueChange={setImages} maxFiles={8} multiple>
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
                    {images.map((file) => (
                        <FileUpload.Item key={file.name} value={file} className="flex justify-center w-48 sm:w-96">
                            <FileUpload.ItemPreview className="h-full w-full" />
                            <FileUpload.ItemDelete className="w-full h-full absolute right-0" />
                        </FileUpload.Item>
                    ))}
                </FileUpload.List>
                <FileUpload.Clear />
            </FileUpload.Root>
        </div>
    );
}
