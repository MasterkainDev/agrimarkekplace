"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string[]) => void
  onRemove: (value: string) => void
  value: string[]
  maxFiles?: number
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const urls = acceptedFiles.map((file: any) => {
        const reader = new FileReader()
        reader.onload = () => {
          onChange([...value, reader.result as string])
        }
        reader.readAsDataURL(file)
        return reader.result
      })
    },
    [onChange, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    disabled,
    maxFiles: maxFiles || 1,
  })

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 transition hover:border-primary/50",
          isDragActive && "border-primary/50 bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or
            drag and drop
          </div>
          <div className="text-xs text-muted-foreground">
            PNG, JPG or JPEG (max. 5MB)
          </div>
        </div>
      </div>
      {value.map((url) => (
        <div
          key={url}
          className="relative mt-4 h-[200px] w-[200px] overflow-hidden rounded-lg"
        >
          <div className="absolute right-2 top-2 z-10">
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
              size="icon"
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Image fill className="object-cover" alt="Image" src={url} />
        </div>
      ))}
    </div>
  )
}
