import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EntrySVG(props) {
  return (
    <Svg height={25} viewBox="0 0 64 64" width={25} {...props}>
      <Path
        d="M50 2H16c2.21 0 4 1.79 4 4v40h34V6c0-2.21-1.79-4-4-4z"
        fill="#e6e9ed"
      />
      <Path
        d="M44 18H24v8.1c.91.2 1.75.65 2.41 1.31L32 33l4.59 4.59c.9.9 1.41 2.13 1.41 3.41v1h12V18z"
        fill="#ffeaa7"
      />
      <Path d="M50 14v4H32v-4z" fill="#fcd770" />
      <Path d="M24 14h8v4h-8z" fill="#b4dd7f" />
      <Path d="M42 6h8v4h-8z" fill="#ff826e" />
      <Path
        d="M20 6v16h-8V6c0-1.1.45-2.1 1.17-2.83C13.9 2.45 14.9 2 16 2c2.21 0 4 1.79 4 4z"
        fill="#ffeaa7"
      />
      <Path d="M62 46v4c0 2.21-1.79 4-4 4H27l8-8h19z" fill="#fcd770" />
      <Path
        d="M24 26.1c.91.2 1.75.65 2.41 1.31L32 33l4.59 4.59a4.83 4.83 0 010 6.82L35 46l-8 8-6.59 6.59a4.83 4.83 0 01-6.82 0L3.41 50.41a4.83 4.83 0 010-6.82l16.18-16.18c.13-.13.27-.25.41-.36.85-.68 1.91-1.05 3-1.05.34 0 .67.04 1 .1z"
        fill="#4fc1e9"
      />
      <Path d="M18 47l-6 6-3-3 3-3-3-3 3-3z" fill="#ffc729" />
      <Path
        d="M6.879 44.879h4.243v4.243H6.879z"
        fill="#fcd770"
        transform="rotate(-45 8.992 47.005)"
      />
      <Path d="M23 30l-3 3-3 3 3 3 3-3 3-3z" fill="#b4dd7f" />
      <Path d="M55 45V6c0-2.757-2.243-5-5-5H16c-2.757 0-5 2.243-5 5v17h8v3.597c-.04.038-.082.071-.121.11L2.707 42.879C1.622 43.964 1 45.466 1 47s.622 3.036 1.707 4.121l10.172 10.172C13.979 62.394 15.443 63 17 63s3.021-.606 4.121-1.707L27.414 55H58c2.757 0 5-2.243 5-5v-5zM13 21V6c0-1.654 1.346-3 3-3s3 1.346 3 3v15zm6.974-18H50c1.654 0 3 1.346 3 3v39H37.402a5.832 5.832 0 001.233-2H51V13H23v12c-.694 0-1.367.127-2 .358V6c0-1.13-.391-2.162-1.026-3zM39 19h4v22h-4zm6 0h4v22h-4zm4-2H33v-2h16zm-18 0h-6v-2h6zm-6 2h6v11.586l-3.879-3.879A5.8 5.8 0 0025 25.358zm8 0h4v17.586l-4-4zM19.707 59.879c-1.446 1.445-3.968 1.445-5.414 0L4.121 49.707C3.409 48.994 3 48.008 3 47s.409-1.994 1.121-2.707l16.172-16.172C21.016 27.398 21.978 27 23 27s1.984.398 2.707 1.121l10.172 10.172C36.591 39.006 37 39.992 37 41s-.409 1.994-1.121 2.707zM61 50c0 1.654-1.346 3-3 3H29.414l6-6H61z" />
      <Path d="M4.586 47L12 54.414 19.414 47 12 39.586zM9 45.414L10.586 47 9 48.586 7.414 47zm3 6.172L10.414 50l3-3-3-3L12 42.414 16.586 47zM23 28.586L15.586 36 20 40.414 27.414 33zM24.586 33L23 34.586 21.414 33 23 31.414zm-6.172 3L20 34.414 21.586 36 20 37.586z" />
      <Path d="M32.293 40.707h2v2h-2z" transform="rotate(-45 33.287 41.716)" />
      <Path d="M29.464 43.535h2v2h-2z" transform="rotate(-45 30.46 44.544)" />
      <Path
        d="M26.722 46.329h1.899v2h-1.899z"
        transform="rotate(-45 27.665 47.338)"
      />
      <Path
        d="M20.136 41.5h12.728v2H20.136z"
        transform="rotate(-45 26.494 42.507)"
      />
      <Path d="M51 5H41v6h10zm-2 4h-6V7h6zM23 5h2v2h-2zM27 5h2v2h-2zM31 5h2v2h-2zM57 49h2v2h-2zM53 49h2v2h-2zM49 49h2v2h-2z" />
    </Svg>
  )
}

export default EntrySVG
