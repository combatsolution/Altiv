import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDate } from 'src/utils/format-time';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function PostItem({ post }) {
  const theme = useTheme();
  const { coverUrl, title, description, tags = [], createdAt, slug } = post;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[16],
        },
      }}
    >
      <Box sx={{ position: 'relative', height: 0, pb: '50%' }}>
        <Image
          alt={title}
          src={coverUrl}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '50%' }}>
        <Typography
          variant="overline"
          sx={{
            mb: 2,
            color: 'text.disabled',
            display: 'block',
          }}
        >
          {fDate(createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={paths.post.details(slug)}
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          <TextMaxLine variant="h6" sx={{ mb: 2, height: 60 }}>
            {title}
          </TextMaxLine>
        </Link>

        <TextMaxLine variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {description}
        </TextMaxLine>

        {tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 'auto', pt: 2 }}>
            {tags.slice(0, 4).map((tag) => (
              <Typography
                key={tag}
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 0.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                }}
              >
                {tag}
              </Typography>
            ))}
            {tags.length > 4 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', pt: 1 }}>
                +{tags.length - 4} more
              </Typography>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    coverUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};

// ----------------------------------------------------------------------
