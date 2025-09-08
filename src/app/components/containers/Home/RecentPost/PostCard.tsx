import { CalendarToday, Schedule } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const PostCard = ({
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
}: PostCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 200, // fix cao 200px
          width: '100%',
          objectFit: 'cover', // crop ảnh vừa khung
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Chip
          label={category}
          size="small"
          color="primary"
          sx={{ mb: 2, fontWeight: 600 }}
        />

        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '1.25rem',
            lineHeight: 1.3,
            mb: 2,
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          {excerpt}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mt: 'auto', pt: 2 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {readTime}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;