module.exports.imgBase64=(file)=>{
    const newImg = file.data;
    const encImg = newImg.toString("base64");
    const mainImg = `data:${file.mimetype};base64,`+ encImg

    return mainImg;
  }