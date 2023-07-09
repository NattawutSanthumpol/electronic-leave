// import { Link } from "react-router-dom"


// const Header = () => {
//   return (
//     <></>
//     // <Navbar bg="primary" data-bs-theme="dark">
//     //     <Container fluid>
//     //     <Navbar.Brand as={Link} to="/">ใบลาอิเล็กทรอนิกส์</Navbar.Brand>
//     //             <Navbar.Toggle aria-controls="navbarScroll" />
//     //             <Navbar.Collapse id="navbarScroll">
//     //                 <Nav
//     //                     className="me-auto my-2 my-lg-0"
//     //                     style={{ maxHeight: '100px' }}
//     //                     navbarScroll
//     //                 >
//     //                     <Nav.Link as={Link} to="/addLeave">เพิ่มข้อมูล</Nav.Link>
//     //                 </Nav>
//     //             </Navbar.Collapse>
//     //     </Container>
//     // </Navbar>
//   )
// }

// export default Header

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}