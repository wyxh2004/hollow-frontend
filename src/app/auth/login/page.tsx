import { Container, Paper, Typography } from "@mui/material";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          登录
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
}
