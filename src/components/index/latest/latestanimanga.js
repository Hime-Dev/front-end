import React, { useState, useRef } from 'react'
import { useGlobal } from 'reactn'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../../config/front-routes'


import { Grid, makeStyles, Popper, Fade } from '@material-ui/core';
import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import { CoverPlaceholder } from '../../../config/theming/images';
import { Skeleton } from '@material-ui/lab';
import Dotdotdot from 'react-dotdotdot';
import { contentCover } from '../../../config/api-routes';

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        '& *': {
            fontFamily: "'Overpass', sans-serif"
        }
    },
    Image: {
        position: "relative",
        paddingBottom: "140%",
        overflow: "hidden",
        boxShadow: theme.shadows[6],
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%"
        }
    },
    Title: {
        marginTop: theme.spacing(1),
        color: theme.palette.type === "dark" ? "inherit" : grey[700],
        '& *': {
            fontFamily: "'Overpass', sans-serif"
        }
    },
    PopperContainer: {
        zIndex: 1,
        '&[x-placement*="bottom"] $Arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${theme.palette.background.level1} transparent`,
            },
        },
        '&[x-placement*="top"] $Arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${theme.palette.background.level1} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $Arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.background.level1} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $Arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${theme.palette.background.level1}`,
            },
        },
    },
    Arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    InfoBox: {
        backgroundColor: theme.palette.background.level1,
        borderRadius: 4,
        padding: theme.spacing(2),
        maxWidth: 500,
        minWidth: 350,
        minHeight: 200,
        maxHeight: 275,
        overflow: "hidden"
    },
    GenresContainer: {
        marginTop: -4,
        '& span': {
            display: "inline-block",
            padding: "4px 4px 0",
            margin: "0 4px 4px 0",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    }
}))

export const LoadingDivAniManga = (key) => {
    return (
        <Grid key={key} item xs={4} sm={3} md={2} lg={2} xl={1}>
            <Skeleton width="100%" style={{ paddingBottom: "140%" }} variant="rect" />
        </Grid>
    )
}


export default function LatestAniManga(props) {
    const classes = useStyles()
    const { slug, cover_art, name, synopsis, release_date, version } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowEl, setArrowEl] = useState(null)
    const [imageError, setImageError] = useState(false)
    const refEl = useRef()
    const [mobile] = useGlobal("mobile")


    const genres = props.genres.split(',').map((d, i) => i < 5 ? (
        <Typography key={props.name + d} variant="subtitle2" component="span">
            {d}
        </Typography>
    ) : null)

    function handlePopperMouseEnter() {
        setAnchorEl(refEl.current)
    }

    function handlePopperMouseLeave() {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <>
            <Grid item xs={4} sm={3} md={2} lg={2} xl={1} className={classes.Container}>
                <Link to={props.type === "anime" ? animePage(slug) : mangaPage(slug)}
                    onMouseEnter={handlePopperMouseEnter}
                    onMouseOver={handlePopperMouseEnter}
                    onMouseLeave={handlePopperMouseLeave}
                >
                    <Grid item xs={12} className={classes.Image} ref={refEl}>
                        <img
                            src={contentCover(props.type, slug)}
                            onError={img => {
                                img.target.onerror = null
                                if (imageError) return img.target.src = CoverPlaceholder
                                img.target.src = cover_art
                                setImageError(true)
                            }}
                            alt={`${name} Poster Resmi`} />
                    </Grid>
                    {mobile ?
                        <Grid item xs={12} className={classes.Title}>
                            <Dotdotdot clamp={2} useNativeClamp>
                                {name}
                            </Dotdotdot>
                        </Grid>
                        : ""}
                </Link>
                {mobile ? "" :
                    <div>
                        <Popper
                            id={open ? name : undefined}
                            open={open}
                            anchorEl={anchorEl}
                            placement="right"
                            className={classes.PopperContainer}
                            disablePortal={true}
                            modifiers={{
                                flip: {
                                    enabled: true,
                                },
                                preventOverflow: {
                                    enabled: true,
                                    boundariesElement: 'scrollParent',
                                },
                                arrow: {
                                    enabled: true,
                                    element: arrowEl
                                },
                            }}
                            transition>
                            {({ TransitionProps }) =>
                                (
                                    <Fade {...TransitionProps} timeout={100} exit={false}>
                                        <div>
                                            <span className={classes.Arrow} ref={setArrowEl} />
                                            <div className={classes.InfoBox}>
                                                <Typography variant="body1" component="p">
                                                    <b>{name}{release_date ? ` - ${new Date(release_date).getFullYear()}` : ""}{version === "bd" ? ` - (Blu-ray)` : ""}</b>
                                                </Typography>
                                                <Typography variant="body1" component="div" className={classes.GenresContainer}>
                                                    {genres}
                                                </Typography>
                                                <Dotdotdot clamp={7} useNativeClamp>
                                                    <Typography variant="subtitle1" component="p">
                                                        {synopsis}
                                                    </Typography>
                                                </Dotdotdot>
                                            </div>
                                        </div>
                                    </Fade>
                                )
                            }
                        </Popper>
                    </div>}
            </Grid>
        </>
    )
}