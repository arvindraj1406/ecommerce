export default function Images({
  data,
  setFeatureImage,
  featureImage,
  setImageList,
  imageList,
}) {
  return (
    <section className="flex flex-col flex-1 gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Images</h1>
      {/* Feature Image Show at the time of edit */}
      <div className="flex flex-col gap-1">
        {data?.featuredImageURL &&
          !featureImage && ( //shows the old image &&  if the user selects a new image (featureImage becomes true)
            <div className="flex">
              <img
                className="h-20 w-20 object-cover rounded-lg"
                src={data?.featuredImageURL} // Show a preview URL that already exists in database
                alt="Featured Image"
              />
            </div>
          )}
        {/* Feature Image Upload */}
        {featureImage && (
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded-lg"
              src={URL.createObjectURL(featureImage)} // Create a preview URL for the new uploaded image
              alt="Featured Image"
            />
          </div>
        )}
        <label htmlFor="product-title" className="text-gray-500 text-sm">
          Feature Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="product-feature-image"
          name="product-feature-image"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFeatureImage(e.target.files[0]); // Store the first selected file as the featured image
            }
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
        />
      </div>

      {/* Multiple Images Upload */}
      <div className="flex flex-col gap-1">
        {imageList?.length === 0 &&
          data?.imageList?.length != 0 && ( // Check if `imageList` is empty (no images currently selected/processed) but `data.imageList` is not empty , this component will display those images.
            <div className="flex flex-wrap gap-2">
              {data?.imageList?.map((item, index) => {
                return (
                  <img
                    key={index}
                    className="w-20 h-20 object-cover rounded-lg"
                    src={item} // preview URL for each uploaded image for show
                    alt={`Product Image ${index}`}
                  />
                );
              })}
            </div>
          )}
        {imageList?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageList?.map((item, index) => {
              return (
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  key={index}
                  src={URL.createObjectURL(item)} // Create a preview URL for each uploaded image
                  alt={`Product Image ${index}`}
                />
              );
            })}
          </div>
        )}
        <label htmlFor="product-images" className="text-gray-500 text-sm">
          Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="product-images"
          name="product-images"
          multiple
          onChange={(e) => {
            const newFiles = [];
            for (let i = 0; i < e.target.files.length; i++) {
              newFiles.push(e.target.files[i]); // Store all selected files in an array
            }
            setImageList(newFiles); // Update the image list state
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
        />
      </div>
    </section>
  );
}
