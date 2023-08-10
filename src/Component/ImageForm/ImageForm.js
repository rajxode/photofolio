// react hooks
import {useEffect,useRef} from "react"

// import styles
import styles from "./imageForm.module.css"

// firestore database
import {db} from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 

// toast for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// function to render the Image form to add new images to imageList(within any album)
export default function ImageForm(props){

    const {albumId,updateImage,setUpdateImage,setShowImageForm} = props;
    
    // to store image name and image url
    const imageNameRef=useRef();
    const imageUrlRef=useRef();

    // check whether to update an image or not
    useEffect(()=>{
        if(updateImage){
            // storing value of image inside the input box when click on edit
            imageNameRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[updateImage]);


    // claer image form's data 
    function clearForm(){
        imageNameRef.current.value=null;
        imageUrlRef.current.value=null;
        imageNameRef.current.focus();
    }

    // to update any image within the imagelist
    async function handleUpdateSubmit(e){
        e.preventDefault();

        // old data of image inside the database
        const oldData={
            name:updateImage.name,
            link:updateImage.link
        };
        
        // new updated data entered by the user
        const newData={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        // adding new Image
        const albumRef = doc(db, 'album', albumId);
         updateDoc(albumRef,{
            imageList:arrayUnion(newData)
        });
        
        // removing old image 
        updateDoc(albumRef,{
            imageList:arrayRemove(oldData),
            
        });

        toast.success(" Image Updated !")

        // setting update to false
        setUpdateImage(null);

        // hide the ImageForm
        setShowImageForm(false);
        
        // clear data within the ImageForm
        clearForm();
    }



    // add a new Image in Image list
    async function handleSubmit(e){
        e.preventDefault();

        // data of the Image
        const data={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        // adding new image inside the array of image in database
        const albumRef = doc(db, 'album', albumId);
        await updateDoc(albumRef,{
            imageList:arrayUnion(data)
        });

        // success notification
        toast.success("New Image Added to your Album!")
        
        // clear form's data
        clearForm();
    }

    return(
        <>
            <ToastContainer />
            {/* main container of the form  */}
            <div className="formContainer">
                {/* showing heading of the form with condition */}
                <h1>{!updateImage?"Add an Image":"Update Image"}</h1>
                
                {/* calling submit function on condition */}
                <form onSubmit={updateImage?handleUpdateSubmit:handleSubmit}>
                    
                    {/* for name of the image */}
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Name"
                        ref={imageNameRef}
                        required/>

                    {/* for image url */}
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Url"
                        ref={imageUrlRef}
                        required />
                    <br />

                    {/* to add/update image */}
                    <button className={`${styles.btn} ${styles.add}`}>
                            {/* show add or update on the button   */}
                        {!updateImage?"Add":"Update"}
                    </button>

                    {/* clear data inside the input box */}
                    <button className={`${styles.btn} ${styles.clear}`} 
                        onClick={clearForm}>Clear
                    </button>
                </form>
            </div>
        </>
    )
}