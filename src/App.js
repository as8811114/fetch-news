import { Component } from "react";
import axios from "axios";
import Footer from "./Footer";
import Mobile from "./Mobile";
import PC from "./PC";
import { Icon } from "@iconify/react";
import data from "./data";
class App extends Component {
  constructor() {
    super();
    this.state = {
      type: "PC",
      data: [],
      news: data,
    };
    this.page = 1;
    this.category = "general";
  }
  handleSelectCategory = async (value) => {
    console.log("select");
    this.category = value;
    this.page = 1;
    await this.fetchNewsData();
  };
  checkUserWindowSize = () => {
    if (window.innerWidth < 600) this.setState({ type: "Mobile" });
    else this.setState({ type: "PC" });

    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) this.setState({ type: "Mobile" });
      else this.setState({ type: "PC" });
    });
  };
  loadLocalNewsData = () => {
    window.addEventListener("scroll", () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= scrollableHeight) {
        console.log("load more data");
        window.scrollTo(0, 0);
        console.log(this.page);
        console.log(this.state.news.length);
        if (this.page < parseInt(this.state.news.length / 10)) {
          this.page = this.page + 1;
          this.setState({
            data: this.state.news.slice(this.page * 10 - 10, this.page * 10),
          });
          console.log(
            this.state.news.slice(this.page * 10 - 10, this.page * 10)
          );
        } else {
          const nextPageData = this.state.news.slice(
            this.page * 10,
            this.state.news.length
          );

          if (nextPageData.length > 0)
            this.setState({
              data: this.state.news.slice(
                this.page * 10,
                this.state.news.length
              ),
            });
        }
      }
    });
  };
  fetchNewsData = async () => {
    // console.log(
    //   "fetch Data from Url: " +
    //     "https://newsapi.org/v2/top-headlines?country=us&apiKey=2c290375b25a4567851c4153c45b0b5f&pageSize=100&category=" +
    //     this.category
    // );
    // const url = new URL(
    //   "https://newsapi.org/v2/top-headlines?country=us&apiKey=2c290375b25a4567851c4153c45b0b5f&pageSize=100&category=" +
    //     this.category
    // );

    // await fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log("fetch data successful");
    //     console.log(response.articles);
    //     this.setState({ news: [...response.articles] });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.setState({ news: data });
    console.log(this.state.news);

    const fixData = this.state.news.map((data, i) => {
      if (this.category === "sports")
        return { ...data, icon: <Icon icon="ph:soccer-ball-fill" /> };
      else if (this.category === "business")
        return {
          ...data,
          icon: <Icon icon="material-symbols:business-center" />,
        };
      else if (this.category === "entertainment")
        return { ...data, icon: <Icon icon="mingcute:movie-fill" /> };
      else if (this.category === "health")
        return { ...data, icon: <Icon icon="mdi:health-potion" /> };
      else if (this.category === "science")
        return { ...data, icon: <Icon icon="gridicons:science" /> };
      else if (this.category === "technology")
        return { ...data, icon: <Icon icon="jam:computer-f" /> };
      else return { ...data, icon: <Icon icon="arcticons:cbc-news" /> };
    });

    this.setState({ data: fixData.slice(0, 10), news: fixData });
  };
  componentDidMount = () => {
    console.log("test");
    this.fetchNewsData();
    this.checkUserWindowSize();
    this.loadLocalNewsData();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.liveNewsAPIUrl !== this.state.liveNewsAPIUrl)
      console.log("update URL");
  }

  render() {
    return (
      <div>
        {this.state.type === "Mobile" ? (
          <Mobile
            data={this.state.data}
            handleSelectCategory={this.handleSelectCategory}
            category={this.category}
          />
        ) : (
          <PC
            data={this.state.data}
            handleSelectCategory={this.handleSelectCategory}
            category={this.category}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
