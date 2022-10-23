class ImageService {
  singleImageUpload = async (imagePath, image) => {
    image.mv(imagePath, (err) => {
      if (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
    });
    return image;
  };
  multipleImageUpload = async (imagePath, images) => {
    if (!Array.isArray(images)) {
      console.log("You must select more than one image");
      return;
    }
    images.forEach((image, index) => {
      image.mv(imagePath + "/" + image.name, (err) => {
        if (err) {
          console.log(err);
          return [];
        }
      });
    });
    return images;
  };
}
module.exports = new ImageService();
