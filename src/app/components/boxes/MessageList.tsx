import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  senderEmail?: string;
  isAnonymous: boolean;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
  onLike: (messageId: string) => Promise<void>;
}

export default function MessageList({ messages, onLike }: MessageListProps) {
  const [loadingLikes, setLoadingLikes] = useState<Record<string, boolean>>({});

  const handleLike = async (messageId: string) => {
    setLoadingLikes((prev) => ({ ...prev, [messageId]: true }));
    try {
      await onLike(messageId);
    } finally {
      setLoadingLikes((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="body1">{message.content}</Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title={message.isLiked ? "取消点赞" : "点赞"}>
                    <IconButton
                      onClick={() => handleLike(message.id)}
                      disabled={loadingLikes[message.id]}
                      size="small"
                      color="primary"
                    >
                      {message.isLiked ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {message.likeCount}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {message.isAnonymous ? "匿名用户" : message.senderEmail}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistance(new Date(message.createdAt), new Date(), {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
