import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
interface Props {
  id: string
  label: string
  required?: boolean
  multiple?: boolean
  accept?: string
  maxFileSizeMB?: number
  imageResolution?: {
    minWidth?: number
    minHeight?: number
  }
}
export default function FileUploadField({ id, label, required, multiple, accept, maxFileSizeMB, imageResolution }: Props) {
  const { register, setValue, formState: { errors } } = useFormContext()
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    setValue(id, files, { shouldValidate: true })
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <div
        onDragOver={e => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-dashed border-2 p-4 text-center ${dragging ? 'bg-gray-100' : ''}`}
      >
        <p>Drag & drop files here or</p>
        <input
          id={id}
          type="file"
          {...register(id, {
          required,
          validate: async (fileList) => {
            const file = (fileList as FileList)[0]
            if (!file) return true
            if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
              return `Max size ${maxFileSizeMB}MB`
            }
            if (accept && !accept.split(',').includes(file.type)) {
              return 'Invalid file type'
            }
            if (imageResolution) {
              try {
                const result = await new Promise<string | true>((resolve) => {
                  const img = new Image()
                  img.onload = () => {
                    URL.revokeObjectURL(img.src)
                    if (imageResolution.minWidth && img.width < imageResolution.minWidth) {
                      resolve(`Min width ${imageResolution.minWidth}px`)
                    } else if (imageResolution.minHeight && img.height < imageResolution.minHeight) {
                      resolve(`Min height ${imageResolution.minHeight}px`)
                    } else {
                      resolve(true)
                    }
                  }
                  img.onerror = () => {
                    URL.revokeObjectURL(img.src)
                    resolve('Invalid image file')
                  }
                  img.src = URL.createObjectURL(file)
                })
                return result
              } catch {
                return 'Invalid image file'
              }
            }
            return true
          }
        })}

          multiple={multiple}
          accept={accept}
          className="block mx-auto mt-2"
        />
      </div>
      {errors[id] && (
        <p className="form-error-alert">{errors[id].message as string}</p>
      )}
    </div>
  )
}
