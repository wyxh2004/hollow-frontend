import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import CssBaseline from "@mui/material/CssBaseline";

export default function Header() {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🎄树洞
        </Typography>
        <Stack direction="row" spacing={3}>
          <CssBaseline />
          <Button color="inherit" component={Link} href="/">
            首页
          </Button>
          <Button color="inherit" component={Link} href="/boxes">
            留言广场
          </Button>
          <Button color="inherit" component={Link} href="/dashboard">
            我的主页
          </Button>
          <ModeSwitch />
          {/* <AuthButtons /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
