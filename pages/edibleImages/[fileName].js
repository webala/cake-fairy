import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getEdibleImageUrl } from "../../firebase"

function EdibleImage() {
    const [imageUrl, setimageUrl] = useState()
    const router = useRouter()
    
    const {fileName} = router.query
    console.log('filename query: ', fileName)

    useEffect(() => {
      
      if (router.isReady) {
        getEdibleImageUrl(fileName)
        .then(url => setimageUrl(url))
      } else return
      
    }, [router.isReady])
    
  return (
    <div>
        {imageUrl && <Image src={imageUrl} layout='fill'/>}
    </div>
  )
}

export default EdibleImage