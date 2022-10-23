class ImageService {
  singleImageUpload = async (imagePath, file) => {};
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
