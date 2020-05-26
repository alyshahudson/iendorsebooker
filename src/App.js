import React, { Component } from 'react';
import { ReactComponent as TwitterIcon } from './photos/twitter.svg';
import { ReactComponent as FacebookIcon } from './photos/facebook.svg';
import { ReactComponent as InstagramIcon } from './photos/instagram.svg';
import './App.scss';
import ImageGenerator from './ImageGenerator';
import html2canvas from 'html2canvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      file: null,
      blurb: '',
      bgPhoto: '',
      bgColor: '',
      showGeneratedImage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      showGeneratedImage: true,
    }, () => {
      let divImage = document.getElementById('generated-image');
      let button = document.getElementById('btn-download');
      let distanceFromTop =
        divImage.getBoundingClientRect().top + window.pageYOffset;
  
      // create canvas from html element
      html2canvas(divImage, {
        useCORS: true,
        y: distanceFromTop,
      }).then((canvas) => {
        let base64 = canvas.toDataURL('image/png');
        // make base64 of canvas the href for download button
        button.href = base64;
      });
    });
  }

  toggleImage() {
    if (this.state.showGeneratedImage === false) {
      this.setState({
        showGeneratedImage: true,
      });
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
    this.setState({
      bgColor:"redBg",
      bgPhoto: "/img/photo1.png"
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <section>
            <article className="textual">
              <h1>I Endorse Booker</h1>
              <p>
                Create your own endorsement graphic for Booker to share over
                Instagram, Twitter, Facebook, emails, and so forth!
              </p>
            </article>
          </section>
        </header>

        <section className="body">
          <article className="textual">
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
                  <img id="output" src={this.state.file} alt="" />
                </div>

                {/* colors */}
                <div className="input-group non-text colors">
                  <input
                    type="radio"
                    name="bgColor"
                    id="redBG"
                    value="redBg"
                    checked={this.state.bgColor === "redBg"}
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="orangeBG"
                    value="orangeBg"
                    checked={this.state.bgColor === "orangeBg"}
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="yellowBG"
                    value="yellowBg"
                    checked={this.state.bgColor === "yellowBg"}
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
                        checked={this.state.bgPhoto === "/img/photo1.png"}
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
                        checked={this.state.bgPhoto === "/img/photo2.jpg"}
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
                        checked={this.state.bgPhoto === "/img/photo3.jpg"}
                        onChange={this.handleChange}
                      />
                      <img src="/img/photo3.jpg" name="photo3" alt="" />
                    </div>
                  </div>

                  <label htmlFor="bgPhoto">Image</label>
                </div>

                <input type="submit" name="Generate!" />
              </form>
            </div>
            <div className="right-group">
              
               { this.state.showGeneratedImage ? (
                 <div>
                  <ImageGenerator
                    name={this.state.name}
                    location={this.state.location}
                    file={this.state.file}
                    blurb={this.state.blurb}
                    bgColor={this.state.bgColor}
                    bgPhoto={this.state.bgPhoto}
                  />
                  <a
                  href="#top"
                  className="button"
                  id="btn-download"
                  download="myendorsement.png"
                >Download</a>
              </div>

             ) : ( 

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
          </article>
        </section>
      </div>
    );
  }
}

export default App;
