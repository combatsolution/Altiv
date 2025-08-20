import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// api
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function PostCommentForm({ postId, onCommentAdded }) {
  const { enqueueSnackbar } = useSnackbar();

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
  });

  const defaultValues = {
    comment: '',
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        commentType: 'string',
        isParentComment: true,
        blogsId: postId,
        comment: data.comment,
      };

      await axiosInstance.post('/comment', payload);

      reset();

      enqueueSnackbar('Comment posted successfully!');

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      enqueueSnackbar(error.message || 'Failed to post comment', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField
          name="comment"
          label="Comment"
          multiline
          rows={4}
          placeholder="Write your comment here..."
        />

        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ borderRadius: '100px' }}
            color="primary"
            loading={isSubmitting}
          >
            Post comment
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

PostCommentForm.propTypes = {
  postId: PropTypes.string,
  onCommentAdded: PropTypes.func,
};
