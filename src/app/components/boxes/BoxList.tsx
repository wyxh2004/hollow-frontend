"use client";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid2,
  Container,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "../Loading";

interface BoxItem {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BoxList() {
  const router = useRouter();

  const { data: boxes, isLoading } = useSWR<BoxItem[]>(
    "http://localhost:8080/api/boxes",
    fetcher,
    {
      revalidateOnFocus: false, // 当页面重新获得焦点时不重新获取数据
      refreshInterval: 30000, // 每30秒自动刷新一次
    }
  );

  if (isLoading) {
    return <Loading />;
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
        {boxes?.map((box) => (
          <Grid2 key={box.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                borderRadius: "10px",
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
                    router.push(`/boxes/${box.id}`);
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
