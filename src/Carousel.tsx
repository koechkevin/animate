import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardContent, CardMedia, Divider, TextField, Popover } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons';
import { useMedia } from 'react-use';

import s from './App.module.scss';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/pro-regular-svg-icons';
import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 800,
    width: '96vw',
    position: 'relative',
  },
  head: {
    height: 48,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginRight: 16,
    marginBottom: 0,
  },
  body: {},
  icon: {
    marginRight: 8,
    marginTop: 8,
  },
  banner: {
    background: '#e7f6fc',
    padding: 8,
    display: 'flex',
  },
  wysiwyg: {
    width: 200,
  },
  media: {
    height: 140,
  },
  holder: {
    marginTop: 16,
    overflowX: 'hidden',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  cHolder: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    transition: 'width linear 0.5s',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
  },
  image: {
    height: 140,
    background: '#e8ebf1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  typography: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.65)',
  },
  description: {
    padding: 0,
    width: '100%',
    borderColor: 'transparent',
  },
  box: {
    height: 32,
    lineHeight: '32px',
    textAlign: 'center',
    color: '#0050c8',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  svg: {
    fontSize: 16,
  },
  popover: {
    padding: 8,
  },
});

const Wysiwyg: FC<any> = (props) => {
  const { position } = props;
  const [buttons, setButtons] = useState(['Button#1']);
  const styles = useStyles();
  const [image, setImage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const onOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className={[s.div, position > 0 ? s.margin : ''].join(' ')}>
      <Card className={styles.wysiwyg}>
        <Box onClick={onOpen} component="span">
          {image && <CardMedia className={styles.media} image={image} title="Image" />}
          {!image && (
            <>
              <Box className={styles.image} component="div">
                <FontAwesomeIcon color="#a7adb8" style={{ fontSize: 32 }} icon={faCameraAlt} />
                <Typography className={styles.typography}>Add Image</Typography>
              </Box>
            </>
          )}
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box className={styles.popover} component="div">
            <TextField
              onBlur={(e: any) => e.target.value && setImage(e.target.value)}
              className={s.imageUrl}
              multiline
              placeholder="Enter image URL"
              variant="outlined"
            />
          </Box>
        </Popover>
        <TextField placeholder="Enter your title" className={[styles.input, s.input].join(' ')} variant="outlined" />
        <TextField
          rows={2}
          multiline
          id="description"
          placeholder="Enter your description here..."
          className={[styles.description, s.description].join(' ')}
        />
        {buttons.map((each: React.ReactNode, index: string | number | undefined) => (
          <Box key={index} className={styles.box} component="div">
            {each}
          </Box>
        ))}
      </Card>
      <div className={s.divide} />
      <div style={{ display: 'flex' }}>
        <Card
          onClick={() => setButtons((s) => [...s, `Button#${s.length + 1}`])}
          className={[styles.addIcon, s.icon].join(' ')}
        >
          <FontAwesomeIcon color="#0050c8" className={styles.svg} icon={faPlus} />
        </Card>
        <Typography style={{ lineHeight: '32px' }} className={s.typography} color="textSecondary" gutterBottom>
          Add Button
        </Typography>
      </div>
    </div>
  );
};

const Holder: FC<any> = (props) => {
  const { width, cards, setCards } = props;
  const styles = useStyles();
  const [animate, setAnimate] = useState(false);

  return (
    <Box id="holder" component="div" className={[styles.holder, s.holder].join(' ')}>
      <Box id="scroll" style={{ width }} className={[styles.cHolder, animate ? s.cHolder : ''].join(' ')}>
        {cards.map((each: any, index: any) => (
          <Wysiwyg position={cards.length - (index + 1)} key={index} />
        ))}
        <Box className={s.card} component="div">
          <Box className={s.right} component="div" />
        </Box>
        <Box className={s.card} component="div">
          <Card
            onClick={() => {
              setAnimate(true);
              setCards((s: any) => [...s, {}]);
              setTimeout(() => setAnimate(false), 1000);
            }}
            className={[styles.addIcon].join(' ')}
          >
            <FontAwesomeIcon color="#0050c8" className={styles.svg} icon={faPlus} />
          </Card>
        </Box>
      </Box>
      <Box style={{ minWidth: 136 }} component="div" />
    </Box>
  );
};
const Carousel: FC<any> = () => {
  const styles = useStyles();
  const isMobile = useMedia('(max-width: 675px)');
  const d = document.getElementById('scroll');
  const initialState = !isMobile ? (d && d.offsetWidth) || 600 : 275;
  const [width, setWidth] = useState(initialState);
  const [cards, setCards] = useState([{}]);

  const leftVisible = (cards.length + 1) * 200 > width;
  const rightVisible = cards.length > 1 && (width > (cards.length + 1) * 200 || width > (isMobile ? 275 : 600));

  const onLeft = () => {
    if (leftVisible) {
      setWidth((w) => w + 200);
      if (d) {
        d.style.width = `${width + 200}`;
      }
    }
  };

  const onRight = () => {
    if (rightVisible) {
      setWidth((w) => w - 200);
      if (d) {
        d.style.width = `${width - 200}`;
      }
    }
  };
  return (
    <Box style={{ position: 'relative' }} component="div">
      {rightVisible && (
        <Card onClick={onRight} className={[styles.addIcon, s.scroller, s.right].join(' ')}>
          <FontAwesomeIcon color="#0050c8" className={styles.svg} icon={faChevronRight} />
        </Card>
      )}
      {leftVisible && (
        <Card onClick={onLeft} className={[styles.addIcon, s.scroller, s.left].join(' ')}>
          <FontAwesomeIcon color="#0050c8" className={styles.svg} icon={faChevronLeft} />
        </Card>
      )}
      <Card id="root" className={styles.root}>
        <CardContent className={styles.head}>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            Filters
          </Typography>
          <Card onClick={() => {}} className={[styles.addIcon].join(' ')}>
            <FontAwesomeIcon color="#0050c8" className={styles.svg} icon={faPlus} />
          </Card>
        </CardContent>
        <Divider />
        <CardContent className={styles.body}>
          <Box className={styles.banner} component="div">
            <FontAwesomeIcon className={styles.icon} icon={faQuestionCircle} />
            <Typography color="textSecondary" gutterBottom>
              They should be easy to scan for relevant and actionable information. Elements, like text and images. They
              should be easy to scan for relevant and actionable information. Elements, like text and images.
            </Typography>
          </Box>
          <Holder cards={cards} setCards={setCards} width={width} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Carousel;
