import PropTypes from 'prop-types';
import { useSnackbar } from 'src/components/snackbar';
// hooks
import { useGetCommentReplies } from 'src/api/blog';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fDate } from 'src/utils/format-time';
// components
import Iconify from 'src/components/iconify';
// api
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function PostCommentItem({
  id,
  name,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
  blogId,
}) {
  const reply = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const [replyText, setReplyText] = useState('');
  const { mutateReplies } = useGetCommentReplies(id);

  const handleReplySubmit = async () => {
    try {
      const payload = {
        commentType: 'string',
        isParentComment: false,
        blogsId: blogId,
        repliedCommentId: id,
        comment: replyText,
      };

      await axiosInstance.post('/comment', payload);

      setReplyText('');
      reply.onToggle();

      // Refresh the replies list
      if (mutateReplies) {
        await mutateReplies();
      }

      enqueueSnackbar('Reply posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      enqueueSnackbar(error.message || 'Failed to post comment', { variant: 'error' });
    }
  };

  return (
    <ListItem
      sx={{
        p: 0,
        pt: 3,
        alignItems: 'flex-start',
        ...(hasReply && {
          pl: 8,
        }),
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, width: 48, height: 48 }} />

      <Stack
        flexGrow={1}
        sx={{
          pb: 3,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDate(postedAt)}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {tagUser && (
            <Box component="strong" sx={{ mr: 0.5 }}>
              @{tagUser}
            </Box>
          )}
          {message}
        </Typography>

        {reply.value && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              autoFocus
              placeholder="Write reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
              sx={{ borderRadius: '100px' }}
            >
              Send
            </Button>
          </Box>
        )}
      </Stack>

      {!hasReply && (
        <Button
          size="small"
          color={reply.value ? 'primary' : 'inherit'}
          startIcon={<Iconify icon="solar:pen-bold" width={16} />}
          onClick={reply.onToggle}
          sx={{ right: 0, position: 'absolute' }}
        >
          Reply
        </Button>
      )}
    </ListItem>
  );
}

PostCommentItem.propTypes = {
  id: PropTypes.number,
  avatarUrl: PropTypes.string,
  hasReply: PropTypes.bool,
  message: PropTypes.string,
  name: PropTypes.string,
  postedAt: PropTypes.string,
  tagUser: PropTypes.string,
  blogId: PropTypes.number,
};
