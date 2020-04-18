import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import objstr from 'obj-str';
import facebook from '../../web/images/icons/facebook.svg';
import github from '../../web/images/icons/github.svg';
import google from '../../web/images/icons/google.svg';
import instagram from '../../web/images/icons/instagram.svg';
import linkedin from '../../web/images/icons/linkedin.svg';
import twitter from '../../web/images/icons/twitter.svg';
import styles from './SVGIcon.css';

const iconMap = {
  facebook,
  github,
  google,
  instagram,
  linkedin,
  twitter,
};

const SVGIcon = ({ icon, className }) => {
  return (
    <SVGInline
      svg={ iconMap[icon] }
      component='div'
      className={objstr({
        [styles.icon]: true,
        [className]: true,
      })}
    />
  );
};

SVGIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SVGIcon.defaultProps = {
  className: '',
};

export default SVGIcon;
