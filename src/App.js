import React, { Component } from "react";
import { ReactComponent as TwitterIcon } from "./photos/twitter.svg";
import { ReactComponent as FacebookIcon } from "./photos/facebook.svg";
import { ReactComponent as InstagramIcon } from "./photos/instagram.svg";
import "./App.scss";
import ImageGenerator from "./ImageGenerator";
import html2canvas from "html2canvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      file: null,
      blurb: "",
      bgPhoto: "",
      bgColor: "",
      showGeneratedImage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }

  handleChange(e) {
    //console.log(e.target.value);
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    let divImage = document.getElementById("generated-image");
    let button = document.getElementById("btn-download");
    e.preventDefault();

	this.toggleImage();

	html2canvas(document.getElementById("generated-image"), {allowTaint: true, backgroundColor: null, foreignObjectRendering: false}).then(canvas => {

		let base64 = canvas.toDataURL("image/png");
		// base64.replace(/^data:image\/(png|jpg);base64,/, "")
		// let something = base64.split(',')[1]
		button.href=base64
		console.log(button.href)
	
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

  downloadImage() {
    let divImage = document.getElementById("generated-image");
	let button = document.getElementById("btn-download");


    // let imgData = this.getBase64Image(divImage);
    // localStorage.setItem("imgData", imgData);

    // var dataImage = localStorage.getItem("imgData");
    // let bannerImg = document.getElementById("tableBanner");
    // bannerImg.src = "data:image/png;base64," + dataImage;
	// button.href = "data:image/png;base64," + dataImage;
	
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <section>
            <article className="textual">
              <h1>I Endorse Booker</h1>
              <p>
                Create your own endorsement graphic for Booker and other
                progressive candidates to share over Instagram, Twitter,
                Facebook, emails, and so forth!
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
                    checked={true}
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="orangeBG"
                    value="orangeBg"
                    onChange={this.handleChange}
                  />
                  <input
                    type="radio"
                    name="bgColor"
                    id="yellowBG"
                    value="yellowBg"
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
              {/* {this.state.showGeneratedImage ? ( */}
                <ImageGenerator
                  name={this.state.name}
                  location={this.state.location}
                  file={this.state.file}
                  blurb={this.state.blurb}
                  bgColor={this.state.bgColor}
                  bgPhoto={this.state.bgPhoto}
                />
              {/* ) : ( */}
                <img className="example" src="/img/example.png" alt="example" />
              {/* )} */}
              <a
                href="#top"
                class="button"
                id="btn-download"
				download="myendorsement.png"
              >
                Download
              </a>

              {/* social */}
              <div className="social">
                <a href="https://twitter.com/Booker4KY" taget="_blank">
                  <TwitterIcon />
                </a>
                <a href="https://www.facebook.com/Booker4KY/" taget="_blank">
                  <FacebookIcon />
                </a>
                <a href="https://www.instagram.com/booker4ky" taget="_blank">
                  <InstagramIcon />
                </a>
                <p>
                  If you like this, please follow me on social media — and say
                  hello! And when you share your image include the hashtag{" "}
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
