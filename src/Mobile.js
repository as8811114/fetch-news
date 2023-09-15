import {
  AspectRatio,
  Card,
  CardContent,
  Chip,
  Link,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { Component } from "react";
import noImageAlt from "./mqdefault.jpg";
export default class Mobile extends Component {
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
                sx={{ width: "70%", minWidth: "250px", margin: "10px" }}
              >
                <div>
                  <Link href={data.url} target={"_blank"}>
                    <Typography level="h4">{data.title}</Typography>{" "}
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography level="body-sm" sx={{ marginRight: "10px" }}>
                      {`${data.published_at.substring(
                        0,
                        10
                      )} ${data.published_at.substring(11, 19)}`}
                    </Typography>

                    <Chip
                      color="neutral"
                      disabled={false}
                      size="sm"
                      variant="soft"
                      startDecorator={data.icon}
                    >
                      {data.category.toUpperCase()}
                    </Chip>
                  </div>
                </div>
                <CardContent orientation="vertical">
                  {data.image && (
                    <AspectRatio minHeight="240px" maxHeight="300px">
                      <img src={data.image} alt={"no Image"} />
                    </AspectRatio>
                  )}
                  {!data.image && (
                    <AspectRatio minHeight="240px" maxHeight="300px">
                      <img src={noImageAlt} alt={"no Image"} />
                    </AspectRatio>
                  )}

                  <div style={{ textAlign: "start" }}>
                    {data.description}
                    <Link
                      style={{ marginLeft: "2px" }}
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
