"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { boxAPI, authAPI } from "@/app/api/Apiclient";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

interface Box {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface User {
  username: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boxesResponse, userResponse] = await Promise.all([
          boxAPI.getUserBoxes(),
          authAPI.getProfile(),
        ]);
        setBoxes(boxesResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          欢迎回来，{user?.username || "没有登录的小笨蛋"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/boxes/new")}
        >
          发布新话题
        </Button>
      </Box>

      <Grid2 container spacing={3}>
        {boxes.map((box) => (
          <Grid2 key={box.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {box.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {box.content}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  发布于：{new Date(box.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => router.push(`/boxes/${box.id}`)}
                >
                  查看详情
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {boxes.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            你还没有发布过话题哦
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => router.push("/boxes/new")}
            sx={{ mt: 2 }}
          >
            立即发布
          </Button>
        </Box>
      )}
    </Container>
  );
}
