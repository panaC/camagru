import React, { Component } from 'react';
import IsVisible from 'react-on-screen';
import './App.css'

class ImgCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      name: null,
    }
  }

//warning to check success json before use
  componentDidMount() {
    const bodyPost = "idUser=" + this.props.img.idUser
    fetch("http://localhost:8080/api/user/info",
    {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: bodyPost
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          isLoaded: true,
          name: res.name
        })
      }, (err) => {
        this.setState({
          isLoaded: true,
          error: err
        });
      });
  }

  render() {
    const { error, isLoaded, name } = this.state;
    if (error) {
      return <div className="text-align">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="text-align">Loading...</div>;
    } else {
      return (
        <div class="card">
          <div class="section">
            <img className="icon"
              src={"http://localhost:8080/api/avatar/" + this.props.img.idUser}
            />
            <h4 class="doc">{name.first + " " + name.last}</h4>
          </div>
          <img className="section media"
            src={"http://localhost:8080/api/img/get/" + this.props.img.hash}
          />
        </div>
      )
    }
  }
}

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      page: 1,
      img: [],
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
              this.setState({
                isLoaded: true,
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
    const { error, isLoaded, img } = this.state;
    if (error) {
      return <div className="text-align">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="text-align">Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
          {img.map(item => (
            <div>
              <ImgCard img={item}></ImgCard>
            </div>
          ))}
          </div>
          <IsVisible once>
            {({ isVisible }) => this.props.onVisible(isVisible)}
          </IsVisible>
        </div>
      );
    }
  }
}

class ImgBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbPage: []
    }
  }
  render() {
    console.log(this.state.nbPage);
    return (
      <div className="col-sm-10 col-md-10">
      <Img onVisible={
        (isVisible) => {
          if (isVisible) console.log(isVisible)}
      }/>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <header className="sticky">
        <a href="/" className="logo">Camagru</a>
        <a href="/" className="button">Home</a>
        <a href="/" className="button">Connection</a>
      </header>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Camagru instragram like - pleroux</p>
      </footer>
    )
  }
}

class Board extends Component {
  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="box"></div>
        </div>
        <div className="row" style={{margin: 'auto', width: '70%', 'justifyContent': 'center'}}>
        <ImgBoard></ImgBoard>
        </div>
        <div className="row">
          <div className="box"></div>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Board></Board>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
