// import styles 
import styles from "./image.module.css"


// to show all the images within an album
export default function Image(props){

    const {image,index,handleImageEdit,handleImageDelete,openLightbox}=props;

    return(
        <>
            {/* main container of Image */}
            <div className={styles.imageCard}>
                
                {/* showing image */}
                <div className={styles.imageBox}>
                    <img src={image.link} 
                        alt="image"  
                        onClick={() => openLightbox(index)}/>
                </div>

                {/* Image name with buttons to delete or edit image */}
                <div className={styles.imageInfo}>
                    {image.name}
                    {/* for edit */}
                    <button className={`${styles.imageBtn} ${styles.editBtn}`} 
                        onClick={()=>handleImageEdit(image)}>Edit
                    </button>

                    {/* for delete */}
                    <button className={`${styles.imageBtn} ${styles.deleteBtn}`} 
                        onClick={()=>handleImageDelete(image)}>X
                    </button>
                </div>
            </div>
        </>
    )
}