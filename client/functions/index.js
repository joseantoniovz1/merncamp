
export const imageSource = (user) =>{
    //console.log(user);
    if(user.image){
        return user.image.url;
    } else {
        return "/images/avt.jpg";
    }
};