import React, { Component } from 'react';
import { ReactComponent as TwitterIcon } from './icons/twitter.svg';
import { ReactComponent as FacebookIcon } from './icons/facebook.svg';
import { ReactComponent as InstagramIcon } from './icons/instagram.svg';
import './App.scss';
import ImageGenerator from './ImageGenerator';
import html2canvas from 'html2canvas';
import fitty from 'fitty';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      file: '/img/default.jpg',
      blurb: '',
      bgPhoto: '',
      bgColor: '',
      showGeneratedImage: false,
      isIE: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeCanvas = this.makeCanvas.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        ...this.state,
        [e.target.name]: e.target.value,
      },
      () => this.makeCanvas()
    );

    if (e.target.name === 'name') {
      // change name font-size to fit
      fitty('.name-output', { maxSize: 50 });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // change name font-size to fit
    fitty('.name-output', { maxSize: 50 });

    this.setState(
      {
        ...this.state,
        showGeneratedImage: true,
      },
      () => this.makeCanvas()
    );
  }

  makeCanvas() {
    let divImage = document.getElementById('generated-image');
    let button = document.getElementById('btn-download');

    // otherwise generated-image and button are hidden
    if (this.state.showGeneratedImage) {
      let distanceFromTop = divImage.getBoundingClientRect().top + window.pageYOffset;

  
      html2canvas(divImage, {
          useCORS: true,
          y: distanceFromTop,
        }).then((canvas) => {
          // make base64 of canvas the href for download button
          let base64 = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          button.href = base64;
        });

      // if(window.innerWidth < 766){
      //   // create canvas from html element
      //   html2canvas(divImage, {
      //     useCORS: true,
      //     scrollX: 0,
      //     scrollY: -window.scrollY,
      //     height: divImage.offsetHeight,
      //     width: divImage.offsetWidth,
      //     y: distanceFromTop,
      //   }).then((canvas) => {
      //     // make base64 of canvas the href for download button
      //     let base64 = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      //     button.href = base64;
      //   });
      // } else{
      //   // create canvas from html element
      //   html2canvas(divImage, {
      //     useCORS: true,
      //     scrollX: 0,
      //     scrollY: -window.scrollY,
      //     height: divImage.offsetHeight,
      //     width: divImage.offsetWidth
      //   }).then((canvas) => {
      //     // make base64 of canvas the href for download button
      //     let base64 = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      //     button.href = base64;
      //   });
      // }
    }
  }

  readFile(e) {
    if (e.target.files[0]) {
      this.setState({
        ...this.state,
        file: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  componentDidMount() {
    // check browser
    let browser = window.navigator.userAgent;
    let old_ie = browser.indexOf('MSIE ');
    let new_ie = browser.indexOf('Trident/');

    this.setState({
      bgColor: 'purpleBg',
      bgPhoto: '/img/photo1.png',
      isIE: old_ie > -1 || new_ie > -1,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <section>
            <article className="textual">
              <img
                className="logo"
                src="/img/booker-logo.png"
                alt="booker-campaign-logo"
              />
              <h1>I Endorse Booker</h1>
              <p>
                Create your own endorsement graphic for Booker to share over
                Instagram, Twitter, Facebook, emails, and so forth!
              </p>
            </article>
          </section>
        </header>

        <section className="body">
          {this.state.isIE === true ? (
            <div className="left-group">
              <h2 class="ie">Sorry, this is not a supported browser</h2>
            </div>
          ) : (
            <div className="left-group">
              <form onSubmit={this.handleSubmit}>
                {/* name */}
                <div className="input-group standard">
                  <input
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    placeholder="Enter Full Name"
                    value={this.state.name}
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>

                {/* location */}
                <div className="input-group standard">
                  <input
                    type="text"
                    name="location"
                    onChange={this.handleChange}
                    placeholder="Enter Location"
                    value={this.state.location}
                    required
                  />
                  <label htmlFor="location">Job Title/Location</label>
                </div>

                {/* why */}
                <div className="input-group standard">
                  <textarea
                    onChange={this.handleChange}
                    name="blurb"
                    placeholder="Your text here"
                    rows="6"
                    value={this.state.blurb}
                    maxLength="400"
                    required
                  />
                  <label htmlFor="blurb">
                    Why do you endorse Charles Booker?
                  </label>
                </div>

                {/* photo upload */}
                <div className="input-group non-text">
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={this.readFile}
                  />
                  <label htmlFor="inputImg">Upload photo</label>
                  <img
                    id="output"
                    src={
                      this.state.file === '/img/default.jpg'
                        ? null
                        : this.state.file
                    }
                    alt=""
                  />
                </div>

                {/* colors */}
                <div className="input-group non-text colors">
                  <input
                    type="radio"
                    name="bgColor"
                    id="purpleBG"
                    value="purpleBg"
                    checked={this.state.bgColor === 'purpleBg'}
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="yellowBG"
                    value="yellowBg"
                    checked={this.state.bgColor === 'yellowBg'}
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="greenBG"
                    value="greenBg"
                    checked={this.state.bgColor === 'greenBg'}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="bgColor">Color</label>
                </div>

                {/* image */}
                <div className="input-group non-text image-selector">
                  <div className="options">
                    <div className="img-radio">
                      <input
                        type="radio"
                        name="bgPhoto"
                        id="choice-1"
                        value="/img/photo1.png"
                        checked={this.state.bgPhoto === '/img/photo1.png'}
                        onChange={this.handleChange}
                      />
                      <img src="/img/photo1.png" name="photo1" alt="" />
                    </div>
                    <div className="img-radio">
                      <input
                        type="radio"
                        name="bgPhoto"
                        id="choice-2"
                        value="/img/photo2.jpg"
                        checked={this.state.bgPhoto === '/img/photo2.jpg'}
                        onChange={this.handleChange}
                      />
                      <img src="/img/photo2.jpg" name="photo2" alt="" />
                    </div>
                    <div className="img-radio">
                      <input
                        type="radio"
                        name="bgPhoto"
                        id="choice-3"
                        value="/img/photo3.jpg"
                        checked={this.state.bgPhoto === '/img/photo3.jpg'}
                        onChange={this.handleChange}
                      />
                      <img src="/img/photo3.jpg" name="photo3" alt="" />
                    </div>
                  </div>

                  <label htmlFor="bgPhoto">Image</label>
                </div>

                {/* submit */}
                <input type="submit" name="Generate!" />
              </form>
            </div>
          )}

          <div className="right-group">
            {/* generated image */}
            {this.state.showGeneratedImage ? (
              <div>
                <ImageGenerator
                  name={this.state.name}
                  location={this.state.location}
                  file={this.state.file}
                  blurb={this.state.blurb}
                  bgColor={this.state.bgColor}
                  bgPhoto={this.state.bgPhoto}
                />

                {/* download button */}
                <a
                  href="#top"
                  className="button"
                  id="btn-download"
                  download="myendorsement.png"
                >
                  Download
                </a>
              </div>
            ) : (
              // example image
              <img className="example" src="/img/example.png" alt="example" />
            )}

            {/* social */}
            <div className="social">
              <a
                href="https://twitter.com/Booker4KY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.facebook.com/Booker4KY/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/booker4ky"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <p>
                If you like this, please follow me on social media — and say
                hello! And when you share your image include the hashtag{' '}
                <span className="bold">#IEndorseBooker</span>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
