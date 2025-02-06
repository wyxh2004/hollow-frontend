"use client";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)", // 减去header高度
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
          style={{
            borderRadius: "2vw",
            // 设置半透明背景
            background: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
                mt: 4,
              }}
            >
              🎄留言树洞
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              在这里，你可以随意分享你的想法、故事和心情。
              让我们一起创造一个充满温暖的社区。⭐
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push("/boxes")}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.2rem",
                borderRadius: "50px",
                textTransform: "none",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)",
                  transform: "translateY(-2px)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              开始使用
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
