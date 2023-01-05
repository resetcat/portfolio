import styles from '../../styles/Home.module.css'
import React from 'react';
import { Image } from 'antd';
import {getContributions, Props} from "../lib/contributions";
import ActivityCalendar from "react-activity-calendar";
import {getProjects} from "../lib/portfolio-projects";

export async function getServerSideProps() {
    const props = await getContributions();
    const rawProjects = await getProjects();
    return {
        props: {
            name: props.name,
            bio: props.bio,
            contribution: props.contribution,
            htmlUrl: props.htmlUrl,
            projects: rawProjects
        }
    }
}
export default function Home(props: Props) {
    // console.log(props.projects)
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
                    <code className={styles.code}>My projects:</code>
                </p>
                {/*todo cards*/}
                    <div className={styles.grid}>
                        {props.projects.map(project => (
                            <div className={styles.card}>
                                <li>{project.name}</li>
                                <span>{project.description}</span>
                                <Image src={project.smallImage}/>
                                <div>{project.badges.map(lang =>(
                                    <li style={{color: lang.color}}>{lang.name}</li>
                                ))}</div>
                            </div>
                        ))}
                    </div>
            </main>
        </div>
    )
}
