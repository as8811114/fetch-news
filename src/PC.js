import { Component } from "react";
import Card from "@mui/joy/Card";
import {
  AspectRatio,
  CardContent,
  Chip,
  Link,
  Option,
  Select,
  Typography,
} from "@mui/joy";
export default class PC extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("PC Mount");
    console.log(this.props.data[0]);
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Select
            defaultValue={"general"}
            sx={{ width: "10%", minWidth: "100px" }}
            onChange={(e, value) => {
              this.props.handleSelectCategory(value);
            }}
          >
            <Option value={"general"}>All</Option>
            <Option value={"health"}>Health</Option>
            <Option value={"entertainment"}>Entertainment</Option>
            <Option value={"business"}>Business</Option>
            <Option value={"science"}>Science</Option>
            <Option value={"sports"}>Sports</Option>
            <Option value={"technology"}>Technology</Option>
          </Select>
          {this.props.data.map((data, index) => {
            return (
              <Card
                key={data.title + index}
                sx={{ width: "70%", minWidth: "550px", margin: "10px" }}
              >
                <div>
                  <Link href={data.url} target={"_blank"}>
                    <Typography level="h3">{data.title}</Typography>{" "}
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      width: "60%",
                      alignItems: "center",
                    }}
                  >
                    <Typography level="body-sm" sx={{ marginRight: "10px" }}>
                      {`${data.publishedAt.substring(
                        0,
                        10
                      )} ${data.publishedAt.substring(11, 19)}`}
                    </Typography>

                    <Chip
                      color="neutral"
                      disabled={false}
                      size="sm"
                      variant="soft"
                      startDecorator={data.icon}
                    >
                      {this.props.category.toUpperCase()}
                    </Chip>
                  </div>
                </div>
                <CardContent orientation="horizontal">
                  <AspectRatio
                    minHeight="240px"
                    maxHeight="300px"
                    sx={{ width: "40%" }}
                  >
                    <img src={data.urlToImage} />
                  </AspectRatio>
                  <div style={{ maxWidth: "60%", textAlign: "justify" }}>
                    {data.description}
                    <Link
                      style={{ marginLeft: "10px" }}
                      href={data.url}
                      target={"_blank"}
                    >
                      Read More
                    </Link>
                  </div>
                </CardContent>
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="body-xs">Author: </Typography>
                    <Typography>{data.author}</Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
