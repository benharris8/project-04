import React, { useState } from 'react'
import clsx from 'clsx'
import { Link, withRouter } from 'react-router-dom'

import auth from '../../lib/auth'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import SmsRoundedIcon from '@material-ui/icons/SmsRounded'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { ProgressPlugin } from 'webpack'


const DrawerMenu = () => {
  const drawerWidth = 240
  // styling - move to scss
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }))

  const classes = useStyles()
  const theme = useTheme()

  // State for the left-hand side drawer menu
  const [openDrawer, setOpenDrawer] = useState(false)
  // State for the right-hand side icon menu
  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)
  // const [auth, setAuth] = useState(true)
  // State for the logged in user profile menu
  const [anchorEl, setAnchorEl] = useState(null)
  const openIcon = Boolean(anchorEl)

  // Handler functions
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorMenu(null)
  }

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    auth.logOut()
  }

  const isLoggedIn = auth.isLoggedIn()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer
        })}
      >
        {/* Drawer left-hand side menu */}
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to='/'
            className={classes.title}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <Typography
              variant='h6'
              id='app-title'
            >
              ('Hello Code!')
            </Typography>
          </Link>
          {/* Right-hand side Menu - Profile Menu */}
          {/* {auth && ( */}
          {isLoggedIn && (
            <IconButton
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleProfileMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-profile'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={openIcon}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleProfileClose}>
              <Link to='/myprofile'>
                My Profile
              </Link>
            </MenuItem>
            {/* change to handleLogout */}
            <MenuItem onClick={handleProfileClose}>
              <Link
                to='/'
                onClick={handleLogout}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
          )}

          {/* Right-hand side menu - Notifications */}
          <IconButton
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <IconButton
              onClick={handleMenuClose}
              aria-label='new chat notifications'
              color='inherit'
            >
              {/* change badgeContent */}
              <Badge badgeContent={4} color='secondary'>
                <Link to='/mychats' style={{ color: 'black' }}>
                  <SmsRoundedIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleMenuClose}
              aria-label='invite notifications'
              color='inherit'
            >
              {/* change badgeContent */}
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <SmsRoundedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <SmsRoundedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  )
}


export default withRouter(DrawerMenu)