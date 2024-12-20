import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { useState,Fragment} from "react";
import CommonForm from "@/components/common/form";
import {addProductFormElements} from '@/config';
import ProductImageUpload from "@/components/admin-view/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import {fetchAllProducts, addNewProduct, editProduct, deleteProduct} from '@/store/admin/products-slice';
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/Product-tile";

const initialFormData= {
    image : null,
    title : '',
    description : "",
    category: "",
    brand : "",
    price : 0 ,
    salePrice: 0 ,
    totalStock : 0
}

function AdminProducts() {

    const [openCreateProducts, setOpenCreateProducts] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile,setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState('');
    const[imageLoadingState,setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);


    const {productList} = useSelector(state=> state.adminProducts);
    const dispatch = useDispatch();
    const {toast} = useToast();

    function onSubmit(event){
            event.preventDefault();
            currentEditedId !== null ? 
            dispatch(editProduct(
                    {
                        id : currentEditedId,
                        formData
                    }
            )).then((data) => {
                console.log(data, "edit");
                if(data?.payload?.success){
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProducts(false);
                    setCurrentEditedId(null);
                }
            }) :
            dispatch(addNewProduct({
                ...formData,
                image: uploadImageUrl
            })).then((data)=>{
                console.log(data);
                if(data?.payload?.success){
                    dispatch(fetchAllProducts());
                    setOpenCreateProducts(false);
                    setImageFile(null);
                    setFormData(initialFormData); 
                    toast({
                        title: 'Product added successfully.'
                    })
                }
            });
    }

    function handleDelete(getCurrentProductId){
            console.log(getCurrentProductId);
            dispatch(deleteProduct(getCurrentProductId)).then(data=>{
                if(data?.payload?.success){
                    dispatch(fetchAllProducts());
                }
            })
    }

    function isFormValid() {
        return (
            Object.keys(formData).map((key)=> formData[key] !== "").every((item) => item)
        );
            
    }

    useEffect(()=>{
        dispatch(fetchAllProducts());
    },[dispatch]);

    console.log(productList,uploadImageUrl,"productList");

    return(
        <Fragment >
            <div className = "mb-5 w-full flex justify-end">
                <Button onClick = {() => setOpenCreateProducts(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ?
                    productList.map(productItem => 
                        <AdminProductTile 
                        setFormData={setFormData} 
                        setOpenCreateProducts= {setOpenCreateProducts}
                        setCurrentEditedId = {setCurrentEditedId} product={productItem}
                        handleDelete= {handleDelete}
                        
                    />)
                    : null
                }
            </div>
            <Sheet 
                open={openCreateProducts}
                onOpenChange = {() =>  
                    {
                    setOpenCreateProducts(false);
                    setCurrentEditedId(null); 
                    setFormData(initialFormData);
                    }

            } 
            >
                <SheetContent side = "right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? "Edit the product" : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>
                    <p id="sheet-description" className="text-sm text-gray-600">
                        {`Fill in the form below to ${currentEditedId ? 'edit' : 'add'} a new product.`}
                    </p>
                    <ProductImageUpload 
                    imageFile ={imageFile} 
                    setImageFile = {setImageFile} 
                    uploadImageUrl={uploadImageUrl} 
                    setUploadImageUrl= {setUploadImageUrl} 
                    setImageLoadingState= {setImageLoadingState}
                    imageLoadingState = {imageLoadingState}
                    isEditMode= {currentEditedId !== null}
                    />
                    <div className="py-6 ">
                        <CommonForm
                            formControls={addProductFormElements}
                            formData = {formData} 
                            setFormData = {setFormData} 
                            buttonText = {currentEditedId !== null ? "Edit" : "Add"}
                            onSubmit={onSubmit}
                            isBtnDisabled = {!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts ;