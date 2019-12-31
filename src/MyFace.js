import React from 'react';
import {drawRotatedImage} from "./ctxUtil";
import RotatedImg from "./RotatedImg";
import face from "./assets/face.jpg"
import rightEye from "./assets/rightEye.png"
import leftEye from "./assets/leftEye.png"
import nose from "./assets/nose.png"
import mouse from "./assets/mouse.png"
// import logo from "./logo.svg"

const parts = [
  rightEye,
  leftEye,
  nose,
  mouse,
];

class MyFace extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId = setInterval(() => {
      this.setState(prevState => {
        return {degree: (prevState.degree + 1) % 360}
      });
    }, 5);
    this.state = {
      pos: {
        top: 0,
        left: 0,
      },
      partNum: 0,
      degree: 0,
      image: '#',
    };
    this.canvas = React.createRef();

    this.size = 0.3
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const dw = img.width * this.size;
      const dh = img.height * this.size;
      console.log(dw);
      ctx.drawImage(img, 0, 0, dw, dh);
    };
    img.src = face;
  }

  setPos = (e) => {
    e.persist();
    this.setState({
        pos: {
          top: e.pageY,
          left: e.pageX,
        }
    })
  };

  addPart = () => {
    const {partNum, degree, pos} = this.state;
    const img = new Image();
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    img.src = parts[partNum];

    const dx = pos.left - canvas.offsetLeft;
    const dy = pos.top - canvas.offsetTop;
    drawRotatedImage(ctx, img, dx, dy, this.size, degree);

    this.setState(prevState => {
      const {partNum} = prevState;
      return {partNum: partNum + 1}
    });
    this.setImage();
  };

  download = (e) => {
    const {partNum} = this.state;
    if (partNum < parts.length) {
      e.preventDefault();
      alert('まだ！');
    }
  };

  setImage = () => {
    const canvas = this.canvas.current;
    const base64 = canvas.toDataURL("image/jpeg");
    this.setState({image: base64});
  };

  render() {
    const {partNum, degree, pos, image} = this.state;
    return (
      <React.Fragment>
        <div style={{fontSize: 'large'}}>
          <p>遊び方：</p>
          <p>パーツの置きたい位置をタップする。(ドラッグ未対応)</p>
          <p>位置が決まったら確定！</p>
          <p>右目→左目→鼻→口の順番</p>
        </div>
      <div
        // onMouseMove={this.setPos}
        onClick={partNum < parts.length ? this.setPos : null}
      >
        <canvas
          width='400px'
          height='500px'
          style={{backgroundColor: '#FFFFFF'}}
          ref={this.canvas}
        />
        {partNum < parts.length &&
        <RotatedImg
          src={parts[partNum]}
          degree={degree}
          size={this.size}
          top={pos.top}
          left={pos.left}
        />}
      </div>
        <button style={{fontSize: 'xx-large'}} onClick={this.addPart}>確定！！</button>
        {partNum >= parts.length &&
        <a
          href={image}
          download='canvas.jpg'
          onClick={this.download}
          style={{backgroundColor: '#ffffff'}}
        >
          画像を保存！
        </a>}
      </React.Fragment>
    );
  }
}

export default MyFace;
