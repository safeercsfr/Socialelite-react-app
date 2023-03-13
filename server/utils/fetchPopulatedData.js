// export const populatedData = (userId,isDelete)=>{
//     Post.find({ author: userId, isDelete: false })
//       .populate("author", "firstName lastName picturePath")
//       .populate("comments.author", "firstName lastName picturePath")
//       .sort({ createdAt: -1 })
//       .exec();
// }