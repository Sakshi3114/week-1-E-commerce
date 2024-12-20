import { Input } from "../ui/input";
import { useRef } from "react";
import { Label } from "../ui/label";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,setImageFile,uploadImageUrl, setUploadImageUrl,setImageLoadingState, imageLoadingState,isEditMode}){

    const inputRef = useRef(null);

    function handleImageFileChange(event){
        console.log(event.target.files, "event.target.files");
        const selectedFile = event.target.files?.[0];
        
        if(selectedFile) setImageFile(selectedFile);
    }


    async function uploadImageUrlToCloudinary(){
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file',imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/product/upload-image',data);
        if(response?.data?.success) {
            setUploadImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
        
    }

    useEffect(()=> {
        if(imageFile !== null) uploadImageUrlToCloudinary();
    }, [imageFile]);


    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDropOver(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);

    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className= "text-lg font-semibold mb-2 block ">Upload Image</Label>
            <div 
            onDragOver={handleDragOver} 
            onDrop= {handleDropOver} 
            className= {` ${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}>
                <Input 
                id = "image-upload"
                type="file" 
                className=" hidden"
                ref = {inputRef} 
                onChange = {handleImageFileChange}
                disabled = {isEditMode}
                />
                {
                    !imageFile ? 
                    <Label htmlFor = "image-upload" 
                    className = {`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col justify-center items-center h-32 cursor-pointer`}>
                        <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag and Drop or click to upload image</span>
                    </Label> :(
                        imageLoadingState ? 
                        <Skeleton className= "h-10 bg-gray-100"/> :
                        <div className="flex items-center justify-between">
                            <div className=" flex items-center ">
                            <FileIcon className="w-8 text-primary h-8 mr-2"/>
                            </div>
                                <p className="text-sm font-medium">{imageFile.name}</p>
                            <Button variant = "ghost" size = "icon" className= "text-muted-foreground hover:text-foreground " onClick= {handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                                <span className="sr-only">Remove File</  span>
                            </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;