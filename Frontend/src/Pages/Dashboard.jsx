// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Avatar,
// } from "@mui/material";
// import { FavoriteBorder } from "@mui/icons-material";
// import Siderbar from "../Components/Siderbar";
// import Appbar from "../Components/Appbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [currentuser, setCurrentUser] = useState(null);
//   const token = localStorage.getItem("token");
//   const [commentText, setCommentText] = useState({});
//   const navigate = useNavigate();
//   const [expandedComments, setExpandedComments] = useState({});
//   const [replyText, setReplyText] = useState({});

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const tokenFromURL = params.get("token");
//     const tokenInStorage = localStorage.getItem("token");

//     if (tokenFromURL) {
//       localStorage.setItem("token", tokenFromURL);
//       window.history.replaceState({}, document.title, "/dashboard");
//       navigate("/dashboard");
//     } else if (!tokenInStorage) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/posts/all");
//       setPosts(res.data);
//     } catch (error) {
//       console.error("Failed to load posts", error);
//     }
//   };

//   const fetchCurrentUserProfile = async () => {
//     try {
//       const profileRes = await axios.get(
//         "http://localhost:5000/api/profile/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setCurrentUser(profileRes.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCommentSubmit = async (e, postId) => {
//     e.preventDefault();
//     const text = commentText[postId];
//     if (!text) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/posts/comment/${postId}`,
//         { text },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setPosts((prevPosts) =>
//         prevPosts.map((post) => (post._id === postId ? res.data : post))
//       );
//       setCommentText({ ...commentText, [postId]: "" });
//       fetchPosts();
//     } catch (err) {
//       console.error("Failed to add comment", err);
//     }
//   };

//   const handleLikeToggle = async (postId, liked) => {
//     try {
//       const url = `http://localhost:5000/api/posts/${
//         liked ? "unlike" : "like"
//       }/${postId}`;
//       const res = await axios.put(
//         url,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setPosts((prevPosts) =>
//         prevPosts.map((post) => (post._id === postId ? res.data : post))
//       );
//       fetchPosts();
//     } catch (err) {
//       console.error("Failed to toggle like", err);
//     }
//   };

//   const handleReplySubmit = async (e, postId, commentIndex) => {
//     e.preventDefault();
//     const key = `${postId}-${commentIndex}`;
//     const text = replyText[key];
//     if (!text) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/posts/comment/${postId}/reply/${commentIndex}`,
//         { text },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setPosts((prevPosts) =>
//         prevPosts.map((p) => (p._id === postId ? res.data : p))
//       );
//       setReplyText({ ...replyText, [key]: "" });
//       fetchPosts();
//     } catch (error) {
//       console.error("Failed to post reply", error);
//     }
//   };

//   const toggleComments = (postId) => {
//     setExpandedComments((prevState) => ({
//       ...prevState,
//       [postId]: !prevState[postId],
//     }));
//   };

//   useEffect(() => {
//     fetchPosts();
//     fetchCurrentUserProfile();
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         position: "relative",
//         height: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       {/* Fixed Background */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: `url('/images/space2.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           zIndex: -1,
//         }}
//       />

//       {/* Sidebar */}
//       <Siderbar />

//       {/* Scrollable Content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           maxHeight: "100vh",
//           p: 3,
//           mt: 8,
//         }}
//       >
//         <Appbar />

//         {/* All Posts */}
//         {posts.map((post) => (
//           <Card
//             key={post._id}
//             sx={{
//               maxWidth: 600,
//               mx: "auto",
//               mt: 4,
//               background: "rgba(28, 33, 40, 0.9)",
//               color: "#fff",
//               borderRadius: 3,
//               p: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               {/* <Avatar sx={{ mr: 2 }} src={post.user?.profilePic} /> */}
//               <Avatar
//                 sx={{ mr: 2, cursor: "pointer" }}
//                 src={post.user?.profilePic}
//                 onClick={() => navigate(`/user/${post.user?._id}`)}
//               />
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   {post.user?.username}
//                 </Typography>
//                 <Typography variant="caption" color="gray">
//                   {post.category}
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ mt: 2 }}>
//               <img
//                 src={post.image}
//                 alt="Post"
//                 style={{ width: "100%", borderRadius: 8 }}
//               />
//             </Box>
//             <CardContent>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 {post.caption}
//               </Typography>
//               <Typography variant="body2" color="primary">
//                 {post.hashtags.map((tag, index) => (
//                   <span key={index}>#{tag} </span>
//                 ))}
//               </Typography>
//               {currentuser && (
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <IconButton
//                     sx={{
//                       color: post.likes?.includes(currentuser._id)
//                         ? "red"
//                         : "#1f6feb",
//                     }}
//                     onClick={() =>
//                       handleLikeToggle(
//                         post._id,
//                         post.likes?.includes(currentuser._id)
//                       )
//                     }
//                   >
//                     <FavoriteBorder />
//                   </IconButton>
//                   <Typography variant="body2">
//                     {post.likes?.length || 0} likes
//                   </Typography>
//                 </Box>
//               )}

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
//                   Comments:
//                 </Typography>

//                 {/* View all / Collapse toggle */}
//                 {post.comments && post.comments.length > 2 && (
//                   <Typography
//                     variant="body2"
//                     sx={{ cursor: "pointer", color: "#1f6feb", ml: 1 }}
//                     onClick={() => toggleComments(post._id)}
//                   >
//                     {expandedComments[post._id]
//                       ? "Hide comments"
//                       : `View all ${post.comments.length} comments`}
//                   </Typography>
//                 )}

//                 {/* Comment List */}
//                 <Box
//                   sx={{
//                     maxHeight: expandedComments[post._id] ? "150px" : "50px",
//                     overflowY: expandedComments[post._id] ? "auto" : "hidden",
//                     paddingRight: "8px",
//                     marginBottom: "8px",
//                   }}

//                 >
//                   {/* {post.comments
//                     ?.slice(
//                       0,
//                       expandedComments[post._id] ? post.comments.length : 2
//                     )
//                     .map((comment, index) => (
//                       <Typography
//                         key={index}
//                         variant="body2"
//                         sx={{ ml: 1, color: "#ddd", mb: 0.5 }}
//                       >
//                         <strong>{comment.user?.username || "User"}:</strong>{" "}
//                         {comment.text}
//                       </Typography>
//                     ))} */}

//                   {post.comments
//                     ?.slice(
//                       0,
//                       expandedComments[post._id] ? post.comments.length : 2
//                     )
//                     .map((comment, commentIndex) => (
//                       <Box key={commentIndex} sx={{ ml: 1, mb: 1 }}>
//                         <Typography variant="body2" sx={{ color: "#ddd" }}>
//                           <strong>{comment.user?.username || "User"}:</strong>{" "}
//                           {comment.text}
//                         </Typography>

//                         {/* Replies */}
//                         {comment.replies?.map((reply, i) => (
//                           <Typography
//                             key={i}
//                             variant="body2"
//                             sx={{ ml: 2.5, color: "#aaa" }}
//                           >
//                             ↳ <strong>{reply.user?.username || "User"}:</strong>{" "}
//                             {reply.text}
//                           </Typography>
//                         ))}

//                         {/* Reply Form */}
//                         <Box
//                           component="form"
//                           onSubmit={(e) =>
//                             handleReplySubmit(e, post._id, commentIndex)
//                           }
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             mt: 1,
//                           }}
//                         >
//                           <input
//                             type="text"
//                             placeholder="Reply..."
//                             value={
//                               replyText[`${post._id}-${commentIndex}`] || ""
//                             }
//                             onChange={(e) =>
//                               setReplyText({
//                                 ...replyText,
//                                 [`${post._id}-${commentIndex}`]: e.target.value,
//                               })
//                             }
//                             style={{
//                               flex: 1,
//                               padding: "6px",
//                               background: "#1e1e1e",
//                               color: "white",
//                               border: "1px solid #444",
//                               borderRadius: "12px",
//                             }}
//                           />
//                           <button
//                             type="submit"
//                             style={{
//                               backgroundColor: "#1f6feb",
//                               color: "white",
//                               padding: "6px 12px",
//                               border: "none",
//                               borderRadius: "12px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             Reply
//                           </button>
//                         </Box>
//                       </Box>
//                     ))}
//                 </Box>

//                 {/* Comment Input */}
//                 <Box
//                   component="form"
//                   onSubmit={(e) => handleCommentSubmit(e, post._id)}
//                   sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
//                 >
//                   <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     value={commentText[post._id] || ""}
//                     onChange={(e) =>
//                       setCommentText({
//                         ...commentText,
//                         [post._id]: e.target.value,
//                       })
//                     }
//                     style={{
//                       flex: 1,
//                       padding: "8px",
//                       background: "#2b3137",
//                       color: "white",
//                       border: "1px solid #444",
//                       borderRadius: "20px",
//                       outline: "none",
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     style={{
//                       padding: "8px 16px",
//                       backgroundColor: "#1f6feb",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "20px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Post
//                   </button>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

//******************************************************************************************************************************** */

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
} from "@mui/icons-material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      window.history.replaceState({}, document.title, "/dashboard");
      navigate("/dashboard");
    } else if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/all");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  };

  const fetchCurrentUserProfile = async () => {
    try {
      const profileRes = await axios.get(
        "http://localhost:5000/api/profile/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentUser(profileRes.data);
    } catch (error) {
      console.error("Error fetching current user", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUserProfile();
  }, []);

  const handleLikeToggle = async (postId, liked) => {
    try {
      const url = `http://localhost:5000/api/posts/${
        liked ? "unlike" : "like"
      }/${postId}`;
      const res = await axios.put(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
      fetchPosts();
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const handleOpenComments = (post) => {
    setSelectedPost(post);
    setCommentText("");
    setModalOpen(true);
    fetchPosts();
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedPost(null);
    fetchPosts();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${selectedPost._id}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Immediately update the selectedPost and posts state
      const updatedPost = res.data;

      setSelectedPost(updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );

      setCommentText(""); // Clear the input
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyText = replyTexts[commentId];
    if (!replyText?.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/reply/${selectedPost._id}/${commentId}`,
        { text: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update selectedPost with new reply
      const updatedPost = res.data;
      setSelectedPost(updatedPost);

      // Update posts as well (optional)
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );

      // Clear input
      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/images/space2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      <Siderbar />

      <Box
        sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "100vh", p: 3, mt: 8 }}
      >
        <Appbar />

        {posts.map((post) => (
          <Card
            key={post._id}
            sx={{
              maxWidth: 600,
              mx: "auto",
              mt: 4,
              background: "rgba(28, 33, 40, 0.9)",
              color: "#fff",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ mr: 2, cursor: "pointer" }}
                src={post.user?.profilePic}
                onClick={() => navigate(`/user/${post.user?._id}`)}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {post.user?.username}
                </Typography>
                <Typography variant="caption" color="gray">
                  {post.category}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <img
                src={post.image}
                alt="Post"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>

            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {post.caption}
              </Typography>
              <Typography variant="body2" color="primary">
                {post.hashtags.map((tag, i) => (
                  <span key={i}>#{tag} </span>
                ))}
              </Typography>

              {currentuser && (
                <Box
                  sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}
                >
                  <IconButton
                    sx={{
                      color: post.likes?.includes(currentuser._id)
                        ? "red"
                        : "#1f6feb",
                    }}
                    onClick={() =>
                      handleLikeToggle(
                        post._id,
                        post.likes?.includes(currentuser._id)
                      )
                    }
                  >
                    {post.likes?.includes(currentuser._id) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>

                  <IconButton
                    sx={{ color: "#1f6feb" }}
                    onClick={() => handleOpenComments(post)}
                  >
                    <ChatBubbleOutline />
                  </IconButton>

                  <Typography variant="body2">
                    {post.likes?.length || 0} likes
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}

        <Modal open={modalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              height: "80vh",
              display: "flex",
              bgcolor: "#1c2128",
              color: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 2,
            }}
          >
            {/* Left Side: Post */}
            <Box sx={{ flex: 1, pr: 2, overflowY: "auto" }}>
              <Card
                sx={{
                  background: "rgba(28, 33, 40, 0.8)",
                  color: "#fff",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar src={selectedPost?.user?.profilePic} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedPost?.user?.username}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {selectedPost?.category}
                    </Typography>
                  </Box>
                </Box>
                <img
                  src={selectedPost?.image}
                  alt="Post"
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography variant="body2" mt={2}>
                  {selectedPost?.caption}
                </Typography>
                <Typography variant="body2" color="primary">
                  {selectedPost?.hashtags?.map((tag, i) => (
                    <span key={i}>#{tag} </span>
                  ))}
                </Typography>
              </Card>
            </Box>

            {/* Right Side: Comments */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderLeft: "1px solid #333",
                pl: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Comments
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  pr: 1,
                }}
              >
                {selectedPost?.comments?.map((comment, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <Avatar
                      src={comment.user?.profilePic}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {comment.user?.username}
                      </Typography>
                      <Typography variant="body2">{comment.text}</Typography>

                      {/* 🔁 Replies */}
                      {comment.replies?.map((reply, rIndex) => (
                        <Box
                          key={rIndex}
                          sx={{ ml: 4, mt: 1, display: "flex" }}
                        >
                          <Avatar
                            src={reply.user?.profilePic}
                            sx={{ width: 28, height: 28, mr: 1 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {reply.user?.username || "Anonymous"}
                            </Typography>
                            <Typography variant="body2">
                              {reply.text}
                            </Typography>
                          </Box>
                        </Box>
                      ))}

                      {/* 📝 Reply Input */}
                      <Box
                        component="form"
                        onSubmit={(e) => handleReplySubmit(e, comment._id)}
                        sx={{ mt: 1, ml: 4 }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Reply..."
                          value={replyTexts[comment._id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({
                              ...prev,
                              [comment._id]: e.target.value,
                            }))
                          }
                          sx={{
                            background: "#2b3137",
                            borderRadius: 1,
                            mb: 1,
                            input: { color: "white" },
                          }}
                        />
                        <Button type="submit" variant="outlined" size="small">
                          Reply
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Fixed Comment Input */}
              <Box
                component="form"
                onSubmit={handleCommentSubmit}
                sx={{ pt: 1, borderTop: "1px solid #444" }}
              >
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  InputProps={{ sx: { color: "white" } }}
                  sx={{ background: "#2b3137", borderRadius: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1, float: "right" }}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Dashboard;
