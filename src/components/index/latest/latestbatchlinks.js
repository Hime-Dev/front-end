import React from 'react'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { Typography, Grid, makeStyles, fade } from '@material-ui/core'
import { animePage } from '../../../config/front-routes'
import { contentHeader } from '../../../config/api-routes'
import { HeaderPlaceholder } from '../../../config/theming/images'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        '&:hover': {
            '& $Backdrop': {
                opacity: 0.3
            },
            '& $Text': {
                opacity: 0
            }
        }
    },
    ImageContainer: {
        position: "relative",
        boxShadow: theme.shadows[6],
        paddingBottom: "25%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            marginTop: "-12%"
        }
    },
    Text: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        textAlign: "center",
        zIndex: 3,
        padding: `0 ${theme.spacing(1)}px`,
        opacity: 1,
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short })
    },
    Backdrop: {
        position: "absolute",
        backgroundColor: fade(theme.palette.background.default, 0.7),
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
        opacity: 1,
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short })
    }
}))

export default (props) => {
    const { anime_slug, anime_name, loading } = props
    const classes = useStyles(props)

    if (loading) {
        return (
            <Grid item xs={6} md={4} lg={2}>
                <Skeleton variant="rect" width="100%" style={{ paddingBottom: "25%" }} />
            </Grid>
        )
    }
    else
        return (
            <>
                <Grid item xs={6} md={4} lg={2}>
                    <Link to={animePage(anime_slug)}>
                        <div className={classes.Container}>
                            <div className={classes.ImageContainer}>
                                <img src={contentHeader("anime", anime_slug)} onError={img => {
                                    img.target.onerror = null
                                    img.target.src = HeaderPlaceholder
                                }} alt={anime_name + " toplu"} />
                            </div>
                            <div className={classes.Text}>
                                <Dotdotdot clamp={1} useNativeClamp>
                                    <Typography variant="h6">
                                        {anime_name}
                                    </Typography>
                                </Dotdotdot>
                            </div>
                            <div className={classes.Backdrop} />
                        </div>
                    </Link>
                </Grid>
            </>
        )
}