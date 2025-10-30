import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
//
import { useGetCommentReplies } from 'src/api/blog';
import PostCommentItem from './post-comment-item';

// ----------------------------------------------------------------------

function CommentReplies({ commentId }) {
  const [showReplies, setShowReplies] = useState(false);
  const { replies, repliesLoading } = useGetCommentReplies(showReplies ? commentId : commentId);
  const replyCount = replies?.length || 0;

  const handleToggleReplies = useCallback(() => {
    setShowReplies((prev) => !prev);
  }, []);

  if (replyCount === 0) return null;

  return (
    <Stack alignItems="flex-start" sx={{ ml: 8, mt: 1 }}>
      {!showReplies ? (
        <Button size="small" onClick={handleToggleReplies} disabled={repliesLoading}>
          View {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
        </Button>
      ) : (
        <>
          {replies?.map((reply) => (
            <PostCommentItem
              key={reply.id}
              name={reply.user?.fullName || ''}
              message={reply.comment}
              postedAt={reply.createdAt}
              avatarUrl={reply.user?.avatarUrl || ''}
              tagUser={reply.tagUser}
              blogId={reply.blogsId}
              hasReply
            />
          ))}
          <Button size="small" onClick={handleToggleReplies} sx={{ mt: 1 }}>
            Hide replies
          </Button>
        </>
      )}
    </Stack>
  );
}

CommentReplies.propTypes = {
  commentId: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

export default function PostCommentList({ comments }) {
  return (
    <>
      {comments?.map((comment) => {
        const { id, name, message, postedAt, avatarUrl, blogId } = comment;

        return (
          <Box key={id} sx={{ mb: 3 }}>
            <PostCommentItem
              name={name}
              message={message}
              postedAt={postedAt}
              avatarUrl={avatarUrl}
              id={id}
              blogId={blogId}
            />
            <CommentReplies commentId={id} />
          </Box>
        );
      })}
      {/* <Pagination count={8} sx={{ my: 5, mx: 'auto' }} /> */}
    </>
  );
}

PostCommentList.propTypes = {
  comments: PropTypes.array,
};
