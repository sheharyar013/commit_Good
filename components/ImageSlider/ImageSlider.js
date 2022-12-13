import { Image } from 'antd'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
function ImageSlider(item) {
  return (
    <Slide autoplay={false}>
      <div className="each-slide-effect">
        <Image
          className="d-block w-100"
          src={item ? item?.image.image : ''}
          alt="First slide"
        />
      </div>

      {item?.image?.merchant_images.map((el) => (
        <div className="each-slide-effect">
          <Image
            className="d-block w-100"
            src={el?.merchant_image_url}
            alt="First slide"
          />
        </div>
      ))}
    </Slide>
  )
}

export default ImageSlider
