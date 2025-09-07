import PostCard from '@components/containers/Home/RecentPost/PostCard';
import { Box, Container, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';
const RecentPost = () => {
  // Mock data for posts
  const posts = [
  {
    id: 1,
    title: "Manchester United sắp công bố bản hợp đồng bom tấn",
    excerpt:
      "Theo tin giả định, Quỷ Đỏ chuẩn bị chiêu mộ một tiền đạo hàng đầu châu Âu với mức phí kỷ lục.",
    date: "September 6, 2025",
    readTime: "4 min read",
    category: "Football",
    image: "https://picsum.photos/seed/mu1/1200/800",
  },
  {
    id: 2,
    title: "HLV Manchester United tiết lộ kế hoạch chiến thuật mới",
    excerpt:
      "Trong buổi họp báo giả tưởng, HLV cho biết đội sẽ thử nghiệm sơ đồ tấn công hoàn toàn mới ở mùa giải tới.",
    date: "September 5, 2025",
    readTime: "6 min read",
    category: "Football",
    image: "https://picsum.photos/seed/mu2/1200/800",
  },
  {
    id: 3,
    title: "Quỷ Đỏ bất ngờ thay đổi kế hoạch chuyển nhượng",
    excerpt:
      "Tin giả cho rằng CLB sẽ tập trung vào việc trẻ hóa lực lượng thay vì theo đuổi các ngôi sao lớn.",
    date: "September 4, 2025",
    readTime: "5 min read",
    category: "Transfer News",
    image: "https://picsum.photos/seed/mu3/1200/800",
  },
  {
    id: 4,
    title: "Manchester United ra mắt áo đấu đặc biệt",
    excerpt:
      "Một mẫu áo đấu giới hạn, lấy cảm hứng từ lịch sử 150 năm của CLB, sẽ được tung ra trong tháng tới.",
    date: "September 3, 2025",
    readTime: "3 min read",
    category: "Club News",
    image: "https://picsum.photos/seed/mu4/1200/800",
  },
  {
    id: 5,
    title: "Fan MU gây sốt với màn chào đón đội tại Old Trafford",
    excerpt:
      "Hàng ngàn CĐV đã giả tưởng tập trung bên ngoài sân vận động với màn cổ vũ cuồng nhiệt.",
    date: "September 2, 2025",
    readTime: "4 min read",
    category: "Fans",
    image: "https://picsum.photos/seed/mu5/1200/800",
  },
  {
    id: 6,
    title: "Cầu thủ trẻ MU gây ấn tượng trong buổi tập kín",
    excerpt:
      "Một tài năng trẻ từ học viện được cho là đã ghi 3 bàn trong trận đấu tập nội bộ.",
    date: "September 1, 2025",
    readTime: "5 min read",
    category: "Academy",
    image: "https://picsum.photos/seed/mu6/1200/800",
  },
  {
    id: 7,
    title: "Manchester United cân nhắc mở tour du đấu châu Á",
    excerpt:
      "Tin giả cho biết CLB đang bàn bạc để trở lại Việt Nam trong tour giao hữu 2026.",
    date: "August 31, 2025",
    readTime: "6 min read",
    category: "Club News",
    image: "https://picsum.photos/seed/mu7/1200/800",
  },
  {
    id: 8,
    title: "Nội bộ MU dậy sóng vì tin đồn chuyển nhượng",
    excerpt:
      "Một số trụ cột được cho là không hài lòng trước kế hoạch chiêu mộ một ngôi sao cùng vị trí.",
    date: "August 30, 2025",
    readTime: "7 min read",
    category: "Rumors",
    image: "https://picsum.photos/seed/mu8/1200/800",
  },
  {
    id: 9,
    title: "MU cân nhắc đổi tên khán đài Stretford End",
    excerpt:
      "Một thông tin giả khẳng định CLB có ý định bán quyền đặt tên cho một tập đoàn lớn.",
    date: "August 29, 2025",
    readTime: "4 min read",
    category: "Club Business",
    image: "https://picsum.photos/seed/mu9/1200/800",
  },
  {
    id: 10,
    title: "CĐV MU mở chiến dịch online đòi giữ chân ngôi sao",
    excerpt:
      "Hàng chục nghìn người hâm mộ đã ký vào bản kiến nghị giả tưởng để giữ một cầu thủ không ra đi.",
    date: "August 28, 2025",
    readTime: "5 min read",
    category: "Fans",
    image: "https://picsum.photos/seed/mu10/1200/800",
  },
];



  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={5}
        >
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Recent Posts
          </Typography>
        
            <MuiLink component={Link} href={"/posts"}>
              View All Posts  
            </MuiLink>
        </Stack>

        <Grid container spacing={4}>
          {posts.slice(0, 2).map((post) => (
            <Grid
              item
              xs={12}
              md={6}
              key={post.id}
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <PostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default RecentPost