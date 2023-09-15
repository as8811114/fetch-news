import { Component } from "react";

import Footer from "./Footer";
import Mobile from "./Mobile";
import PC from "./PC";
import { Icon } from "@iconify/react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      type: "PC",
      data: [],
      news: [],
    };
    this.category = "general";
    this.page = 1;
  }
  handleSelectCategory = async (value) => {
    console.log(this.category);
    console.log("select");
    this.category = value;
    console.log(this.category);
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
    await fetch("http://127.0.0.1:3030/getData?catagory=" + this.category)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("successful");
        this.setState({ news: [...response.data.data] });
      })
      .catch((error) => {
        console.log(error);
      });

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
