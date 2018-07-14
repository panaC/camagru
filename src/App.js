import React, { Component } from 'react';
import './App.css'

class ImgCard extends Component {

}

class Img extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      img: [],
      error: null,
      isLoaded: false,
      count: 0,
      countPage: 0,
      nbPage: 1
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/img/count", { method: 'POST' })
      .then(res => res.json())
      .then((result) => {
        if (result.count && result.count > 0) {
          fetch("http://localhost:8080/api/img/page/" + this.state.page, { method: 'POST'})
            .then(res => res.json())
            .then((res) => {
              console.log(res);
              this.setState({
                page: this.state.page + 1,
                img: res.img,
                count: result.count,
                nbPage: res.page,
                countPage: res.count
              })
            }, (err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
            });
          this.setState({
            isLoaded: true,
            count: result.count
          });
        }
      }, (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  render() {
    const { error, isLoaded, count, img } = this.state;
    if (error) {
      return <div className="text-align">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="text-align">Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
          {img.map(item => {
            <div className="col-sm">
              <ImgCard img={item}></ImgCard>
            </div>
          })}
          </div>
        </div>
      );
    }
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="sticky">
          <div className="container">
            <div className="row">
              <div className="col-sm-11">
                <a href="/" className="logo">Camagru</a>
                <a href="/" className="button">Home</a>
              </div>
              <div className="col-sm-1">
                <a href="/" className="button">Connection</a>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="box"></div>
          </div>
          <div className="row">
            <div className="col-sm center">
              <Img></Img>
            </div>
          </div>
          <div className="row">
            <div className="box"></div>
          </div>
        </div>
        <footer>
          <p>Camagru instragram like - pleroux</p>
        </footer>
      </div>
    );
  }
}

export default App;
