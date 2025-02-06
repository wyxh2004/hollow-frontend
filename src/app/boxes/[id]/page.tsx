"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { boxAPI } from "@/app/api/Apiclient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "@/app/components/Loading";

interface BoxDetail {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export default function BoxDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [box, setBox] = useState<BoxDetail | null>(null);

  useEffect(() => {
    const fetchBox = async () => {
      try {
        const response = await boxAPI.getBox(params.id as string);
        setBox(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (params.id) {
      fetchBox();
    }
  }, [params.id]);

  if (!box) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2 }}
      >
        返回
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {box.title}
        </Typography>

        <Box sx={{ mb: 3, display: "flex", gap: 2, color: "text.secondary" }}>
          <Typography variant="body2">作者：{box.author.username}</Typography>
          <Typography variant="body2">
            发布于：{new Date(box.createdAt).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {box.content}
        </Typography>
      </Paper>
    </Container>
  );
}
