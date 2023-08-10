// importing css styles from css module
import styles from "./album.module.css";


// Album function to show album icon in AlbumList
export default function Album(props){

    // info about the album and to open an album
    var {info,setOpenAlbum}=props;

    // onClick over Album open the Album's content
    function handleClick(){
        setOpenAlbum({albumId:info.id,open:true});
    }

    return(
        <>
            {/* main container  */}
            <div className={styles.cardContainer} >

                {/* album logo */}
                <div className={styles.cardImage} onClick={handleClick}>            
                </div>

                {/* album name*/}
                <div className={styles.cardName}>
                    {info.Albumname}
                </div>
            </div>
        </>
    )
}