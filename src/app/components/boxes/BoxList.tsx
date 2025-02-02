"use client";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid2,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface BoxItem {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export default function BoxList() {
  const [boxes, setBoxes] = useState<BoxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/boxes");
      setBoxes(response.data);
      setLoading(false);
    } catch (err) {
      setError("获取留言盒子列表失败");
      setLoading(false);
      console.error("Error fetching boxes:", err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button
        variant="contained"
        style={{
          width: "60vw",
          borderRadius: "10px",
          display: "flex",
          margin: "auto",
          marginTop: "12vh",
          marginBottom: "3vh",
        }}
        onClick={() => {
          alert("clicked");
        }}
      >
        发布留言
      </Button>

      <Grid2 container spacing={3}>
        {boxes.map((box) => (
          <Grid2 item xs={12} sm={6} md={4} key={box.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {box.name}
                </Typography>
                <Typography color="text.secondary">
                  {box.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  创建时间：
                  {new Date(box.created_at).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    // TODO: 跳转到盒子详情页
                    // window.location.href = `/box/${box.id}`;
                    router.push(`/box/${box.id}`);
                  }}
                >
                  查看留言
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
