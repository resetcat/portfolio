import styles from '../../styles/Home.module.css'
import React from 'react';
import { Image } from 'antd';
import {getContributions, Props} from "../lib/contributions";
import ActivityCalendar from "react-activity-calendar";

export async function getServerSideProps() {
    const rawProps = await getContributions();
    return {
        props: {
            name: rawProps.props.name,
            bio: rawProps.props.bio,
            contribution: rawProps.props.contribution,
            htmlUrl: rawProps.props.htmlUrl
        }
    }
}
export default function Home(props: Props) {
    // console.log(props.htmlUrl)
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                   <div> <Image className={styles.image}
                        src="https://media.licdn.com/dms/image/D4E03AQHt0ImgfP_yqg/profile-displayphoto-shrink_800_800/0/1667746379171?e=1676505600&v=beta&t=uBs1MFEhoYxaPGrKkBe0D4wKty39p_W3suXeMR48pJc"
                        // src={props.props.avatarUrl}
                        width={200}
                    />
                   </div>
                    <a>{props.name}</a>
                    <div className={styles.occupation}><a>{props.bio}</a></div>
                </h1>
                <ActivityCalendar color="#0070f3" data={props.contribution} ></ActivityCalendar>

                <p className={styles.description}>
                    PLACEHOLDER{' '}
                    <code className={styles.code}>projects:</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/canary/examples"
                        className={styles.card}
                    >
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>

            </main>

        </div>
    )
}
