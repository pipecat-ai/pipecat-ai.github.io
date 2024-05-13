import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Read something",
    img: require("@site/static/img/cat-2.png").default,
    description: (
      <>
        Read the <a href="docs/intro">docs</a> to learn how to start building
        bots with Pipecat.
      </>
    ),
  },
  {
    title: "Build something",
    img: require("@site/static/img/cat-1.png").default,
    description: (
      <>
        Skip the boring stuff and use an{" "}
        <a href="https://github.com/pipecat-ai/pipecat/tree/main/examples">
          example bot
        </a>{" "}
        to get started even faster.
      </>
    ),
  },
  {
    title: "Hack something",
    img: require("@site/static/img/cat-3.png").default,
    description: (
      <>
        Find out more at{" "}
        <a href="https://github.com/pipecat-ai/pipecat">
          the framework GitHub repo
        </a>
        .
      </>
    ),
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={img} alt={title} width="80%" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
