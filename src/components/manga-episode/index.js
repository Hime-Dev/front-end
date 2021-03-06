import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative"
    },
    Navigator: {
    },
    NavigatorButtonContainer: {
    },
    NavigateBefore: {
        position: "fixed",
        bottom: 0,
        left: theme.spacing(12),
        [theme.breakpoints.down('sm')]: {
            position: "initial",
            width: `calc(50% - ${theme.spacing(1)}px)`,
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    },
    NavigateNext: {
        position: "fixed",
        bottom: 0,
        right: theme.spacing(12),
        [theme.breakpoints.down('sm')]: {
            position: "initial",
            width: `calc(50% - ${theme.spacing(1)}px)`,
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1)
        }
    },
    ReadingStyleButtonContainer: {
        display: "flex",
        marginTop: theme.spacing(2),
        justifyContent: "center",
        '& svg': {
            marginRight: theme.spacing(1)
        },
    },
    PagebyPage: {
        marginRight: theme.spacing(1)
    },
    ToManga: {
        marginLeft: theme.spacing(1)
    },
    WebtoonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    ImageContainer: {
        display: "flex",
        justifyContent: "center",
        position: "relative"
    },
    MainPageImage: {
        maxWidth: "100%",
        height: "auto"
    },
    ImageOverlayContainer: {
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    ImageOverlay: {
        width: "50%",
        cursor: "pointer"
    }
}))

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.paper"
}

export { useStyles, defaultBoxProps }