import defaultProfileImage from "../../public/default_profile_image.webp";

const getProfileImage = (user) => {
  return user.profileImage.publicId !== null
    ? user.profileImage.url
    : defaultProfileImage;
};
export default getProfileImage;
