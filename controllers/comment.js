const Comment = require('../models/comment');
const Tracks = require('../models/tracks');

// Controller function to add a comment to a track
async function addComment(req, res) {
    const { rating, text } = req.body;
    const trackId = req.params.trackId;
  
    try {
      const track = await Tracks.findById(trackId);
  
      if (!track) {
        throw new Error('Track not found');
      }
  
      const newComment = new Comment({
        user: req.user ? req.user.username : 'Guest User',
        rating,
        text,
      });
  
      track.comments.push(newComment);
      await track.save();
  
      res.redirect(`/trackView/track/${trackId}`);
    } catch (error) {
      res.render('error', { message: 'Error adding comment', error });
    }
  }

  // Controller function to render the edit comment page
async function renderEditCommentPage(req, res) {
    const trackId = req.params.trackId;
    const commentId = req.params.commentId;
  
    try {
      const track = await Tracks.findById(trackId);
      const comment = track.comments.id(commentId);
      res.render('editComment', { track, comment });
    } catch (error) {
      res.render('error', { message: 'Error rendering edit comment page', error });
    }
  }

// Controller function to edit a comment
async function editComment(req, res) {
  const { rating, text } = req.body;
  const trackId = req.params.trackId;
  const commentId = req.params.commentId;

  try {
    const track = await Tracks.findById(trackId);
    const comment = track.comments.id(commentId);
    comment.rating = rating;
    comment.text = text;
    await track.save();

    res.redirect(`/trackView/track/${trackId}`);
  } catch (error) {
    res.render('error', { message: 'Error editing comment', error });
  }
}

// Controller function to delete a comment
async function deleteComment(req, res) {
    const trackId = req.params.trackId;
    const commentId = req.params.commentId;
  
    try {
      const track = await Tracks.findById(trackId);
      if (!track) {
        throw new Error('Track not found');
      }
  
      await track.comments.findByIdAndDelete(commentId);
  
      res.redirect(`/trackView/track/${trackId}`);
    } catch (error) {
      res.render('error', { message: 'Error deleting comment', error });
    }
  }


module.exports = {
  addComment,
  editComment,
  deleteComment,
  renderEditCommentPage,
};